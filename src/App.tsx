import { useState } from 'react';
import { Delete } from 'lucide-react';

import { calculatorKeys } from './utils/calculatorKeys';

interface CalculatorKeysProps {
  type: string;
  title: string;
  value: string;
  precedence?: number;
}

export default function App() {
  const [expression, setExpression] = useState<CalculatorKeysProps[]>([]);
  // const [stack, setStack] = useState<CalculatorKeysProps[]>([]);
  // const [list, setList] = useState<CalculatorKeysProps[]>([]);
  const [result, setResult] = useState<number | null>();

  // function removeStackLastElement() {
  //   setStack(prevState => prevState.slice(0, -1));
  // }

  function handleOperatorPressed(keyData: CalculatorKeysProps) {
    setExpression((prevState) => [...prevState, keyData]);
  }

  function handleNumberPressed(keyData: CalculatorKeysProps) {
    if (expression.length > 0) {
      const lastExpressionIndex = expression.length - 1;

      if (expression[lastExpressionIndex].type === 'number') {
        setExpression((prevState) => {
          const newExpression = [...prevState];
          const item = prevState[lastExpressionIndex];

          newExpression[lastExpressionIndex] = {
            ...item,
            value: item.value.concat(keyData.value),
            title: item.title.concat(keyData.title),
          };

          return newExpression;
        });

        return;
      }
    }

    setExpression((prevState) => [...prevState, keyData]);
  }

  function handleBackspace() {
    if (expression.length > 0) {
      const lastExpressionIndex = expression.length - 1;

      if (expression[lastExpressionIndex].type === 'number') {
        setExpression((prevState) => {
          const item = prevState[lastExpressionIndex];
          const newExpression = [...prevState];

          if (item.value.length === 1) {
            newExpression.splice(lastExpressionIndex, 1);

            return newExpression;
          }

          newExpression[lastExpressionIndex] = {
            ...item,
            value: item.value.slice(0, -1),
            title: item.title.slice(0, -1),
          };

          return newExpression;
        });
      } else
        setExpression((prevState) => prevState.splice(lastExpressionIndex, 1));
    }
  }

  function handleClearEntry() {
    if (expression.length > 0) {
      const lastExpressionIndex = expression.length - 1;
      setExpression((prevState) => prevState.splice(lastExpressionIndex, 1));
    }
  }

  function handleClear() {
    setExpression([]);
    // setList([]);
    // setStack([]);
    setResult(null);
  }

  function handleCalculateResult() {
    const list: CalculatorKeysProps[] = [];
    const stack: CalculatorKeysProps[] = [];

    console.log('Expressão: ', expression);

    expression.forEach((expressionItem) => {
      // Se for um número, adiciona direto na lista
      if (expressionItem.type === 'number') {
        // setList((prevState) => [...prevState, expressionItem]);
        list.push(expressionItem);
      }
      // Se for um "(" (abre parêntesis), adiciona direto na pilha
      else if (expressionItem.precedence === 1) {
        // setStack((prevState) => [...prevState, expressionItem]);
        stack.push(expressionItem);
      }
      // Se for um ")" (fecha parêntesis), adiciona todos os elementos da pilha até encontrar um "(" (abre parêntesis)
      else if (expressionItem.precedence === 0) {
        let stackIndex = stack.length - 1;

        while (stack[stackIndex].precedence !== 1) {
          // setList((prevState) => [...prevState, stack[stackIndex]]);
          // removeStackLastElement();
          const lastStackElement = stack.pop();
          list.push(lastStackElement!);

          stackIndex--;
        }

        // removeStackLastElement();
        stack.pop();
      }
      // Se a pilha estiver vazia, adiciona direto na pilha
      else if (stack.length === 0) {
        stack.push(expressionItem);
      }
      // Checa se algum elemento da pilha tem precedência maior ou igual ao elemento da expressão, adicionando-o na lista caso tiver
      else {
        let stackIndex = stack.length - 1;

        while (stackIndex >= 0 && stack[stackIndex].precedence !== 1) {
          if (stack[stackIndex].precedence! >= expressionItem.precedence!) {
            list.push(stack[stackIndex]);
            stack.splice(stackIndex, 1);
          }

          stackIndex--;
        }
      }
    });

    while (stack.length > 0) {
      // setList((prevState) => [...prevState, stack[stack.length - 1]]);
      // removeStackLastElement();
      console.log(stack);
      const lastStackElement = stack.pop();
      list.push(lastStackElement!);
    }

    const polishStack: number[] = [];

    console.log('Pilha: ', stack);
    console.log('Lista: ', list);

    for (let listIndex = 0; listIndex < list.length; listIndex++) {
      if (list[listIndex].type === 'number') {
        polishStack.push(parseFloat(list[listIndex].value));
      } else if (list[listIndex].type === 'operator') {
        const firstNumber = polishStack.pop();
        const secondNumber = polishStack.pop();

        switch (list[listIndex].value) {
          case '+':
            polishStack.push(secondNumber! + firstNumber!);
            break;

          case '-':
            polishStack.push(secondNumber! - firstNumber!);
            break;

          case '*':
            polishStack.push(secondNumber! * firstNumber!);
            break;

          case '/':
            polishStack.push(secondNumber! / firstNumber!);
            break;

          default:
            break;
        }
      }
    }

    console.log('Pilha polonesa: ', polishStack);

    setResult(polishStack[0]);
  }

  return (
    <div className='w-full h-screen bg-zinc-950 text-neutral-200 flex items-center justify-center'>
      <header></header>

      <main className=''>
        <div className='operation-box | w-full mb-5 flex items-center justify-end text-4xl'>
          {result ? (
            <div className='flex flex-col items-end'>
              <div className='text-sm'>
                {expression.map((data) => (
                  <span>{data.value}</span>
                ))}
              </div>

              {result}
            </div>
          ) : expression.length ? (
            expression.map((data) => <span>{data.value}</span>)
          ) : (
            <span>0</span>
          )}
        </div>

        <div className='calculator-box | w-full flex flex-col gap-4'>
          <div className='row-box | w-full flex justify-between accent-orange-600 text-lg'>
            <div className='flex justify-start gap-2'>
              <input
                type='checkbox'
                name='inv'
                id='inv'
              />
              <label htmlFor='inv'>Inv</label>
            </div>

            <div className='flex gap-4'>
              <div className='flex gap-2'>
                <input
                  type='radio'
                  name='degreesOrRadians'
                  id='degrees'
                />
                <label htmlFor='degrees'>Graus</label>
              </div>

              <div className='flex gap-2'>
                <input
                  type='radio'
                  name='degreesOrRadians'
                  id='radians'
                />
                <label htmlFor='radians'>Radianos</label>
              </div>
            </div>
          </div>

          <div className='row-box | w-full flex justify-end gap-4'>
            <button
              className='key-box | w-16 h-16 flex items-center justify-center text-xl bg-orange-600 rounded-full hover:bg-orange-500 duration-200'
              onClick={handleBackspace}
            >
              <Delete />
            </button>
            <button
              className='key-box | w-16 h-16 flex items-center justify-center text-xl bg-orange-600 rounded-full hover:bg-orange-500 duration-200'
              onClick={handleClearEntry}
            >
              CE
            </button>
            <button
              className='key-box | w-16 h-16 flex items-center justify-center text-xl bg-orange-600 rounded-full hover:bg-orange-500 duration-200'
              onClick={handleClear}
            >
              C
            </button>
          </div>

          {calculatorKeys.map((row, index) => {
            return (
              <div
                key={index}
                className='row-box | w-full flex items-center justify-end gap-4'
              >
                {row.map((data, index) => {
                  if (data.type === 'equals') {
                    return (
                      <button
                        key={index}
                        className='key-box | w-16 h-16 flex items-center justify-center text-xl bg-orange-600 rounded-full hover:bg-orange-500 duration-200'
                        onClick={handleCalculateResult}
                      >
                        {data.title}
                      </button>
                    );
                  }

                  if (data.type === 'operator') {
                    return (
                      <button
                        key={index}
                        className='key-box | w-16 h-16 flex items-center justify-center text-xl bg-orange-600 rounded-full hover:bg-orange-500 duration-200'
                        onClick={() => handleOperatorPressed(data)}
                      >
                        {data.title}
                      </button>
                    );
                  }

                  if (data.type === 'number') {
                    return (
                      <button
                        key={index}
                        className='key-box | w-16 h-16 flex items-center justify-center text-xl bg-zinc-800 rounded-full hover:bg-zinc-700 duration-200'
                        onClick={() => handleNumberPressed(data)}
                      >
                        {data.title}
                      </button>
                    );
                  }

                  if (data.type === 'memory') {
                    return (
                      <button
                        key={index}
                        className='key-box | w-16 h-16 flex items-center justify-center text-xl bg-orange-600 rounded-full hover:bg-orange-500 duration-200'
                        onClick={() => console.log('Memory key')}
                      >
                        {data.title}
                      </button>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}


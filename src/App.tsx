import { useState } from 'react';
import { Delete } from 'lucide-react';

import { OrangeButton } from './components/OrangeButton';
import { Calculator } from './components/Calculator';

export interface CalculatorKeysProps {
  type: string;
  title: string;
  value: string;
  precedence?: number;
}

export default function App() {
  const [expression, setExpression] = useState<CalculatorKeysProps[]>([]);
  const [result, setResult] = useState<number | null>();
  const [memory, setMemory] = useState<number>();
  const [isDegreesOrRadians, setIsDegreesOrRadians] = useState<
    'degrees' | 'radians'
  >();

  // Adiciona o número 1 e o operador dividir à expressão
  function handleOneDividedByX() {
    setExpression((prevState) => [
      ...prevState,
      {
        type: 'number',
        title: '1',
        value: '1',
      },
      {
        type: 'operator',
        title: '/',
        value: '/',
        precedence: 4,
      },
    ]);
  }

  // Adiciona a constante de Euler e o operador de potência à expressão
  function handleEulerPowerX() {
    setExpression((prevState) => [
      ...prevState,
      {
        type: 'number',
        title: 'e',
        value: '2.71',
      },
      {
        type: 'operator',
        title: '^',
        value: '^',
        precedence: 5,
      },
    ]);
  }

  // Adiciona o operador de potência e o número 2 à expressão
  function handlePowerSquare() {
    setExpression((prevState) => [
      ...prevState,
      {
        type: 'operator',
        title: '^',
        value: '^',
        precedence: 5,
      },
      {
        type: 'number',
        title: '2',
        value: '2',
      },
    ]);
  }

  // Adiciona ... à expressão
  // ʸ√x = x^(1/y)
  function handleYRoot() {
    setExpression((prevState) => [
      ...prevState,
      {
        type: 'number',
        title: '1',
        value: '1',
      },
      {
        type: 'operator',
        title: '√x',
        value: '√',
        precedence: 7,
      },
    ]);
  }

  function handleOperatorPressed(keyPressed: CalculatorKeysProps) {
    setExpression((prevState) => [...prevState, keyPressed]);
  }

  function handleNumberPressed(keyPressed: CalculatorKeysProps) {
    if (expression.length > 0) {
      const lastExpressionIndex = expression.length - 1;

      if (expression[lastExpressionIndex].type === 'number') {
        setExpression((prevState) => {
          const newExpression = [...prevState];
          const item = prevState[lastExpressionIndex];

          newExpression[lastExpressionIndex] = {
            ...item,
            value: item.value.concat(keyPressed.value),
            title: item.title.concat(keyPressed.title),
          };

          return newExpression;
        });

        return;
      }
    }

    setExpression((prevState) => [...prevState, keyPressed]);
  }

  function handleBackspace() {
    if (expression.length > 0) {
      const lastExpressionIndex = expression.length - 1;

      if (expression[lastExpressionIndex].type === 'number') {
        setExpression((prevState) => {
          const item = prevState[lastExpressionIndex];
          const newExpression = [...prevState];

          if (item.value.length === 1) {
            newExpression.slice(0, -1);

            return newExpression;
          }

          newExpression[lastExpressionIndex] = {
            ...item,
            value: item.value.slice(0, -1),
            title: item.title.slice(0, -1),
          };

          return newExpression;
        });
      } else setExpression((prevState) => prevState.slice(0, -1));
    }
  }

  function handleClearEntry() {
    if (expression.length > 0) {
      setExpression((prevState) => prevState.slice(0, -1));
    }
  }

  function handleClear() {
    setExpression([]);
    setResult(null);
  }

  function handleCalculateResult() {
    const list: CalculatorKeysProps[] = [];
    const stack: CalculatorKeysProps[] = [];

    console.log('Expressão: ', expression);

    expression.forEach((expressionItem) => {
      // Se for um número, adiciona direto na lista
      if (expressionItem.type === 'number') {
        list.push(expressionItem);
      }
      // Se for um "(" (abre parêntesis), adiciona direto na pilha
      else if (expressionItem.precedence === 1) {
        stack.push(expressionItem);
      }
      // Se for um ")" (fecha parêntesis), adiciona todos os elementos da pilha até encontrar um "(" (abre parêntesis)
      else if (expressionItem.precedence === 0) {
        let stackIndex = stack.length - 1;

        while (stack[stackIndex].precedence !== 1) {
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

  function handleMemoryPressed(value: string) {
    switch (value) {
      case 'MC':
        setMemory(0);
        break;

      case 'MR':
        setExpression((prevState) => [
          ...prevState,
          {
            type: 'number',
            title: `${memory}`,
            value: `${memory}`,
          },
        ]);
        break;

      case 'MS':
        result && setMemory(result);
        break;
      // Adiciona o valor da expressão ou resultado ao valor armazenado na memória

      case 'M+':
        result && memory && setResult(result + memory);
        break;

      default:
        alert('Invalid memory value: ' + value);
        break;
    }
  }

  return (
    <div className='w-full h-screen bg-zinc-950 text-neutral-200 flex items-center justify-center'>
      <header></header>

      <main className=''>
        <div className='operation-box | w-full mb-5 flex items-center justify-end text-4xl'>
          {result ? (
            <div className='flex flex-col items-end'>
              <div className='text-sm'>
                {expression.map((data, index) => (
                  <span key={index}>{data.value}</span>
                ))}
              </div>

              {result}
            </div>
          ) : expression.length ? (
            expression.map((data, index) => (
              <span key={index}>{data.value}</span>
            ))
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
                  onClick={() => setIsDegreesOrRadians('degrees')}
                />
                <label htmlFor='degrees'>Graus</label>
              </div>

              <div className='flex gap-2'>
                <input
                  type='radio'
                  name='degreesOrRadians'
                  id='radians'
                  onClick={() => setIsDegreesOrRadians('radians')}
                />
                <label htmlFor='radians'>Radianos</label>
              </div>
            </div>
          </div>

          <div className='row-box | w-full flex justify-end gap-4'>
            <OrangeButton onClick={handleBackspace}>
              <Delete />
            </OrangeButton>
            <OrangeButton onClick={handleClearEntry}>CE</OrangeButton>
            <OrangeButton onClick={handleClear}>C</OrangeButton>
          </div>

          <Calculator
            handleOperatorPressed={handleOperatorPressed}
            handleNumberPressed={handleNumberPressed}
            handleMemoryPressed={handleMemoryPressed}
            handleOneDividedByX={handleOneDividedByX}
            handleEulerPowerX={handleEulerPowerX}
            handlePowerSquare={handlePowerSquare}
            handleYRoot={handleYRoot}
          />

          <div className='self-end'>
            <OrangeButton onClick={handleCalculateResult}>=</OrangeButton>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}


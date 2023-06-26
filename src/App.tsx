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
  const [isDegrees, setIsDegrees] = useState<boolean>();
  const [inv, setIsInv] = useState<boolean>(false);

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
        type: 'operator',
        title: '^',
        value: '^',
        precedence: 5,
      },
      {
        type: 'operator',
        title: '(',
        value: '(',
        precedence: 1,
      },
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
            return newExpression.slice(0, -1);
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

    for (
      let expressionIndex = 0;
      expressionIndex < expression.length;
      expressionIndex++
    ) {
      // Se for um número, adiciona direto na lista
      if (expression[expressionIndex].type === 'number') {
        list.push(expression[expressionIndex]);
        continue;
      }
      // Se for um "(" (abre parêntesis), adiciona direto na pilha
      if (expression[expressionIndex].precedence === 1) {
        stack.push(expression[expressionIndex]);
        continue;
      }
      // Se for um ")" (fecha parêntesis), adiciona todos os elementos da pilha até encontrar um "(" (abre parêntesis)
      if (expression[expressionIndex].precedence === 0) {
        let stackIndex = stack.length - 1;
        while (stack[stackIndex].precedence !== 1) {
          const lastStackElement = stack.pop();
          list.push(lastStackElement!);

          stackIndex--;
        }

        stack.pop();

        continue;
      }
      // Se a pilha estiver vazia, adiciona direto na pilha
      if (stack.length === 0) {
        stack.push(expression[expressionIndex]);
        continue;
      }
      // Checa se algum elemento da pilha tem precedência maior ou igual ao elemento da expressão, adicionando-o na lista caso tiver
      if (stack.length > 0) {
        let stackIndex = stack.length - 1;

        while (stackIndex >= 0 && stack[stackIndex].precedence !== 1) {
          if (
            stack[stackIndex].precedence! >=
            expression[expressionIndex].precedence!
          ) {
            const lastStackElement = stack.pop();
            list.push(lastStackElement!);
          }
          stackIndex--;
        }

        stack.push(expression[expressionIndex]);

        continue;
      }
    }

    while (stack.length > 0) {
      const lastStackElement = stack.pop();
      list.push(lastStackElement!);
    }

    console.log('Pilha: ', stack);
    console.log('Lista: ', list);

    const polishStack: number[] = [];
    let firstNumber: number | undefined;
    let secondNumber: number | undefined;

    for (let listIndex = 0; listIndex < list.length; listIndex++) {
      if (list[listIndex].type === 'number') {
        polishStack.push(parseFloat(list[listIndex].value));
      } else if (list[listIndex].type === 'operator') {
        switch (list[listIndex].value) {
          case '+':
            firstNumber = polishStack.pop();
            secondNumber = polishStack.pop();
            // @ts-ignore
            polishStack.push(Module._my_soma(secondNumber!, firstNumber!));
            break;

          case '-':
            firstNumber = polishStack.pop();
            secondNumber = polishStack.pop();
            // @ts-ignore
            polishStack.push(Module._my_subtracao(secondNumber!, firstNumber!));
            break;

          case '*':
            firstNumber = polishStack.pop();
            secondNumber = polishStack.pop();
            polishStack.push(
              // @ts-ignore
              Module._my_multiplicacao(secondNumber!, firstNumber!)
            );
            break;

          case '/':
            firstNumber = polishStack.pop();
            secondNumber = polishStack.pop();
            // @ts-ignore
            polishStack.push(Module._my_divisao(secondNumber!, firstNumber!));
            break;

          case 'sin':
            firstNumber = polishStack.pop();
            if (inv) {
              // @ts-ignore
              polishStack.push(Module._my_arcsin(firstNumber!, !isDegrees));
              break;
            }
            // @ts-ignore
            polishStack.push(Module._my_sin(firstNumber!, isDegrees ? 1 : 0));
            break;

          case 'cos':
            firstNumber = polishStack.pop();
            if (inv) {
              // @ts-ignore
              polishStack.push(Module._my_arccos(firstNumber!, !isDegrees));
              break;
            }
            // @ts-ignore
            polishStack.push(Module._my_cos(firstNumber!, isDegrees ? 1 : 0));
            break;

          case 'tan':
            firstNumber = polishStack.pop();
            if (inv) {
              // @ts-ignore
              polishStack.push(Module._my_arctg(firstNumber!, !isDegrees));
              break;
            }
            // @ts-ignore
            polishStack.push(Module._my_tg(firstNumber!, isDegrees ? 1 : 0));
            break;

          case 'sqrt':
            firstNumber = polishStack.pop();
            polishStack.push(Module._my_sqrt(firstNumber!));
            break;

          // case 'xElevadoAoQuadrado':
          //   firstNumber = polishStack.pop();
          //   polishStack.push(Module._my_xElevadoAoQuadrado(firstNumber!));
          //   break;

          // case 'RaizNdeX':
          //   firstNumber = polishStack.pop();
          //   secondNumber = polishStack.pop();
          //   polishStack.push(Module._my_RaizNdeX(firstNumber!, secondNumber!));
          //   break;

          case 'log':
            firstNumber = polishStack.pop();
            secondNumber = polishStack.pop();
            // @ts-ignore
            polishStack.push(Module._my_log(firstNumber!, secondNumber!));
            break;

          case 'ln':
            firstNumber = polishStack.pop();
            // @ts-ignore
            polishStack.push(Module._my_ln(firstNumber!));
            break;

          case '^':
            firstNumber = polishStack.pop();
            secondNumber = polishStack.pop();
            polishStack.push(
              // @ts-ignore
              Module._my_xElevadoAy(secondNumber!, firstNumber!)
            );
            break;

          case '!':
            firstNumber = polishStack.pop();
            // @ts-ignore
            polishStack.push(Module._my_fatorial(firstNumber!));
            break;

          case '~':
            firstNumber = polishStack.pop();
            polishStack.push(-firstNumber!);
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
                onClick={() => setIsInv(!inv)}
              />
              <label htmlFor='inv'>Inv</label>
            </div>

            <div className='flex gap-4'>
              <div className='flex gap-2'>
                <input
                  type='radio'
                  name='degreesOrRadians'
                  id='degrees'
                  onClick={() => setIsDegrees(true)}
                />
                <label htmlFor='degrees'>Graus</label>
              </div>

              <div className='flex gap-2'>
                <input
                  type='radio'
                  name='degreesOrRadians'
                  id='radians'
                  onClick={() => setIsDegrees(false)}
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

import { Delete } from 'lucide-react';
import { useState } from 'react';

interface CalculatorKeysProps {
  type: string;
  title: string;
  value: string;
  precedence?: number;
}

export default function App() {
  const [expression, setExpression] = useState<CalculatorKeysProps[]>([]);
  const [stack, setStack] = useState<CalculatorKeysProps[]>([]);
  const [list, setList] = useState<CalculatorKeysProps[]>([]);

  // const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // const operadores = [
  //   '+',
  //   '-',
  //   '*',
  //   '/',
  //   '~',
  //   '^',
  //   '(',
  //   ')',
  //   'sin',
  //   'cos',
  //   'tan',
  //   '!',
  // ];

  const calculatorRows = [
    // Primeira linha
    [
      {
        type: 'memory',
        title: 'MC',
        value: 'MC',
      },
      {
        type: 'operator',
        title: 'ln',
        value: 'ln',
        precedence: 7,
      },
      {
        type: 'operator',
        title: 'log',
        value: 'log',
        precedence: 7,
      },
      {
        type: 'operator',
        title: 'n!',
        value: '!',
        precedence: 7,
      },
      {
        type: 'operator',
        title: '1/x',
        value: '1/',
        precedence: 7,
      },
      {
        type: 'operator',
        title: 'sin',
        value: 'sin',
        precedence: 7,
      },
      {
        type: 'operator',
        title: 'eˣ',
        value: 'e^',
        precedence: 7,
      },
    ],
    // Segunda linha
    [
      {
        type: 'memory',
        title: 'MR',
        value: 'MR',
      },
      {
        type: 'number',
        title: '7',
        value: '7',
      },
      {
        type: 'number',
        title: '8',
        value: '8',
      },
      {
        type: 'number',
        title: '9',
        value: '9',
      },
      {
        type: 'operator',
        title: '/',
        value: '/',
        precedence: 4,
      },
      {
        type: 'operator',
        title: 'cos',
        value: 'cos',
        precedence: 7,
      },
      {
        type: 'operator',
        title: 'xʸ',
        value: '^',
        precedence: 5,
      },
    ],
    // Terceira linha
    [
      {
        type: 'memory',
        title: 'MS',
        value: 'MS',
      },
      {
        type: 'number',
        title: '4',
        value: '4',
      },
      {
        type: 'number',
        title: '5',
        value: '5',
      },
      {
        type: 'number',
        title: '6',
        value: '6',
      },
      {
        type: 'operator',
        title: '*',
        value: '*',
        precedence: 4,
      },
      {
        type: 'operator',
        title: 'tan',
        value: 'tan',
        precedence: 7,
      },
      {
        type: 'operator',
        title: 'x²',
        value: '^2',
        precedence: 5,
      },
    ],
    // Quarta linha
    [
      {
        type: 'memory',
        title: 'M+',
        value: 'M+',
      },
      {
        type: 'number',
        title: '1',
        value: '1',
      },
      {
        type: 'number',
        title: '2',
        value: '2',
      },
      {
        type: 'number',
        title: '3',
        value: '3',
      },
      {
        type: 'operator',
        title: '-',
        value: '-',
        precedence: 6,
      },
      {
        type: 'operator',
        title: 'ʸ√x',
        value: 'ʸ√',
        precedence: 7,
      },
      {
        type: 'operator',
        title: '√x',
        value: '√',
        precedence: 7,
      },
    ],
    // Quinta linha
    [
      {
        type: 'number',
        title: 'pi',
        value: '3.14',
      },
      {
        type: 'number',
        title: '0',
        value: '0',
      },
      {
        type: 'number',
        title: '.',
        value: '.',
      },
      {
        type: 'operator',
        title: '+/-',
        value: '~',
        precedence: 6,
      },
      {
        type: 'operator',
        title: '+',
        value: '+',
        precedence: 3,
      },
      {
        type: 'operator',
        title: '(',
        value: '(',
        precedence: 1,
      },
      {
        type: 'operator',
        title: ')',
        value: ')',
        precedence: 0,
      },
    ],
    // Sexta linha
    [
      {
        type: 'equals',
        title: '=',
        value: '=',
      },
    ],
  ];

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
            value: item.value.slice(item.value.length - 2),
            title: item.title.slice(item.title.length - 2),
          };

          return newExpression;
        });
      } else
        setExpression((prevState) => prevState.splice(lastExpressionIndex, 1));
    }
  }

  function handleClear() {
    setExpression([]);
    setList([]);
    setStack([]);
  }

  function handleCalculate() {
    console.log('Calula resultado');
  }

  return (
    <div className='w-full h-screen bg-zinc-950 text-neutral-200 flex items-center justify-center'>
      <header></header>

      <main className=''>
        <div className='input-box | w-full mb-5 flex items-center justify-end text-4xl'>
          {expression.length ? (
            expression.map((data) => <span>{data.value}</span>)
          ) : (
            <span>0</span>
          )}
        </div>

        <div className='calculator-box | w-full flex flex-col gap-4'>
          <div className='row-box | w-full flex justify-end gap-4'>
            <button
              className='key-box | w-16 h-16 flex items-center justify-center text-xl bg-orange-600 rounded-full hover:bg-orange-500 duration-200'
              onClick={handleBackspace}
            >
              <Delete />
            </button>
            <button
              className='key-box | w-16 h-16 flex items-center justify-center text-xl bg-orange-600 rounded-full hover:bg-orange-500 duration-200'
              onClick={handleBackspace}
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

          {calculatorRows.map((row, index) => {
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
                        onClick={handleCalculate}
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


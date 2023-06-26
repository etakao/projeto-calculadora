import { CalculatorKeysProps } from '../App';
import { GreyButton } from './GreyButton';
import { OrangeButton } from './OrangeButton';

interface CalculatorProps {
  handleOperatorPressed: (element: CalculatorKeysProps) => void;
  handleNumberPressed: (element: CalculatorKeysProps) => void;
  handleMemoryPressed: (value: string) => void;
  handleOneDividedByX: () => void;
  handleEulerPowerX: () => void;
  handlePowerSquare: () => void;
  handleYRoot: () => void;
}

export function Calculator({
  handleOperatorPressed,
  handleNumberPressed,
  handleMemoryPressed,
  handleOneDividedByX,
  handleEulerPowerX,
  handlePowerSquare,
  handleYRoot,
}: CalculatorProps) {
  const calculatorKeys = [
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
        precedence: 5,
      },
      {
        type: 'operator',
        title: 'log',
        value: 'log',
        precedence: 5,
      },
      {
        type: 'operator',
        title: 'n!',
        value: '!',
        precedence: 4,
      },
      {
        type: 'operator',
        title: '1/x',
        value: 'oneDivided',
        precedence: 4,
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
        value: 'eulerPower',
        precedence: 5,
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
        value: 'powerSquare',
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
        precedence: 3,
      },
      {
        type: 'operator',
        title: 'ʸ√x',
        value: 'yroot',
        precedence: 5,
      },
      {
        type: 'operator',
        title: '√x',
        value: 'sqrt',
        precedence: 5,
      },
    ],
    // Quinta linha
    [
      {
        type: 'number',
        title: 'π',
        value: '3.14',
      },
      {
        type: 'operator',
        title: '+/-',
        value: '~',
        precedence: 6,
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
  ];

  return calculatorKeys.map((row, index) => {
    return (
      <div
        key={index}
        className='row-box | w-full flex items-center justify-end gap-4'
      >
        {row.map((calculatorKey, index) => {
          if (calculatorKey.type === 'operator') {
            if (calculatorKey.value === 'oneDivided') {
              return (
                <OrangeButton
                  key={index}
                  onClick={handleOneDividedByX}
                >
                  {calculatorKey.title}
                </OrangeButton>
              );
            }

            if (calculatorKey.value === 'eulerPower') {
              return (
                <OrangeButton
                  key={index}
                  onClick={handleEulerPowerX}
                >
                  {calculatorKey.title}
                </OrangeButton>
              );
            }

            if (calculatorKey.value === 'powerSquare') {
              return (
                <OrangeButton
                  key={index}
                  onClick={handlePowerSquare}
                >
                  {calculatorKey.title}
                </OrangeButton>
              );
            }

            if (calculatorKey.value === 'yroot') {
              return (
                <OrangeButton
                  key={index}
                  onClick={handleYRoot}
                >
                  {calculatorKey.title}
                </OrangeButton>
              );
            }

            return (
              <OrangeButton
                key={index}
                onClick={() => handleOperatorPressed(calculatorKey)}
              >
                {calculatorKey.title}
              </OrangeButton>
            );
          }

          if (calculatorKey.type === 'number') {
            return (
              <GreyButton
                key={index}
                onClick={() => handleNumberPressed(calculatorKey)}
              >
                {calculatorKey.title}
              </GreyButton>
            );
          }

          if (calculatorKey.type === 'memory') {
            return (
              <OrangeButton
                key={index}
                onClick={() => handleMemoryPressed(calculatorKey.value)}
              >
                {calculatorKey.title}
              </OrangeButton>
            );
          }
        })}
      </div>
    );
  });
}

export const calculatorKeys = [
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
      precedence: 3,
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
      title: 'π',
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

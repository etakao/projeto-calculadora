// Lógica: cada tecla da calculadora executa uma função de push na pilha de operadores (checando a precedência) ou na lista de valores

const operadores = [
  '+',
  '-',
  '*',
  '/',
  '~',
  '^',
  '(',
  ')',
  'sin',
  'cos',
  'tan',
  '!',
];

function calcularExpressao(expressao) {
  const tokens = expressao.split(' ');

  const pilha = [];
  const lista = [];

  for (const token of tokens) {
    if (isNumero(token)) {
      lista.push(parseFloat(token));
    } else if (isOperador(token)) {
      const tokenPilha = pilha.pop();
      if (checarPrecedencia(token, tokenPilha)) {
      }
    }
  }

  return pilha.pop();
}

function isNumero(token) {
  return !isNaN(parseFloat(token));
}

function isOperador(token) {
  return operadores.includes(token);
}

function checarPrecedencia(pilha) {
  switch (pilha) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      throw new Error('Operador inválido');
  }
}

function executarOperacao(num1, num2, operador) {
  switch (operador) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      throw new Error('Operador inválido');
  }
}

// Exemplo de uso
const expressao = '3 4 + 2 *';
const resultado = calcularExpressao(expressao);
console.log(resultado); // Output: 14

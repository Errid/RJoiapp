module.exports = {
  root: true,
  env: {
    es6: true,
    node: true, // ADICIONE ESTA LINHA: Diz ao ESLint que é um ambiente Node.js
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    quotes: ['error', 'single'],
    // NOVO: Adicione regras para ignorar variáveis não utilizadas que não começam com maiúscula/underline
    // Isso resolverá os avisos de 'context', 'description', 'customerEmail'
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_|context|description|customerEmail' }],
  },
  parserOptions: {
    ecmaVersion: 2020, // Garante suporte a sintaxe moderna (async/await)
  },
};

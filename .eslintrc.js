module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off', // Taken care of by TypeScript
    'react/self-closing-comp': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/no-unescaped-entities': 'off',
    eqeqeq: 'off',
    radix: 'off'
  }
}

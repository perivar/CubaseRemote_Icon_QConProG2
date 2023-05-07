module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  endOfLine: 'auto',
  semi: false,
  printWidth: 150,
  overrides: [
    {
      files: ['jsconfig.json', 'tsconfig.json'],
      options: {
        tabWidth: 2,
      },
    },
  ],
}

module.exports = {
    arrowParens: 'always',
    bracketSpacing: true,
    bracketSameLine: true,
    singleQuote: true,
    trailingComma: 'es5',
    tabWidth: 4,
    endOfLine: 'auto',
    semi: true,
    printWidth: 140,
    overrides: [
        {
            files: ['jsconfig.json', 'tsconfig.json'],
            options: {
                tabWidth: 2,
            },
        },
    ],
}

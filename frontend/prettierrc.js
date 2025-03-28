/** @type {import('@types/prettier').Config} */
module.exports = {
  semi: false,
  tabWidth: 2,
  useTabs: false,
  printWidth: 80, // Reduce the print width to force line breaks
  endOfLine: 'auto',
  singleQuote: true,
  arrowParens: 'avoid',
  bracketSpacing: true,
  trailingComma: 'none',
  quoteProps: 'as-needed',
  jsxBracketSameLine: false,
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
}
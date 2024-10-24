/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */

const config = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'always',
  semi: false,
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config

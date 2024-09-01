/** @type {import('prettier').Config} */
const config = {
  endOfLine: 'lf',
  semi: false,
  useTabs: false,
  singleQuote: true,
  arrowParens: 'avoid',
  tabWidth: 2,
  trailingComma: 'none',
  plugins: ['prettier-plugin-tailwindcss']
}

export default config

module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  ignorePatterns: ['node_modules', 'dist', 'coverage', '__snapshots__'],
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      },
      plugins: ['@typescript-eslint', 'simple-import-sort'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier'
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_', ignoreRestSiblings: true}
        ],
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/member-ordering': [
          'error',
          {
            classes: {},
            default: {
              order: 'natural'
            }
          }
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['variable', 'parameter'],
            types: ['boolean'],
            format: ['PascalCase'],
            prefix: ['is', 'are', 'should', 'has', 'can', 'did', 'will', 'fallback']
          }
        ],
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/unbound-method': 'off', // Too many false positives
        'no-empty-function': 'off', // Already handled by @typescript-eslint/no-empty-function
        'no-unused-vars': 'off', // Already handled by @typescript-eslint/no-unused-vars
        'no-useless-catch': 'error',
        'no-use-before-define': 'off', // Already handled by @typescript-eslint/no-use-before-define
        'no-shadow': 'off', // Already handled by @typescript-eslint/no-shadow
        'no-plusplus': 'off',
        'sort-keys': ['error', 'asc', {natural: true}],
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              [
                // React import.
                '^react',
                // Packages, e.g. import classnames from 'classnames' or import userEvent from '@testing-library/user-event'
                '^@?\\w',
                '^testUtils/',
                '^cat-lover/',
                // Relative imports.
                '^\\.',
                // Relative imports with side effects, .e.g import './styles.scss' or import '../styles/styles.scss'
                '\\u0000\\.{1,2}/'
              ]
            ]
          }
        ]
      }
    },
    {
      files: ['*.tsx'],
      excludedFiles: ['*.test.*'],
      plugins: ['react', 'react-hooks'],
      extends: ['plugin:react/recommended', 'prettier'],
      rules: {
        'react-hooks/exhaustive-deps': 'warn',
        'react/destructuring-assignment': ['warn', 'always', {destructureInSignature: 'always'}],
        'react/hook-use-state': ['error', {allowDestructuredState: true}],
        'react/jsx-boolean-value': 'error',
        'react/jsx-curly-brace-presence': 'error',
        'react/jsx-fragments': ['error', 'syntax'],
        'react/jsx-max-depth': ['error', {max: 5}],
        'react/jsx-no-constructed-context-values': 'error',
        'react/jsx-no-useless-fragment': 'error',
        'react/jsx-sort-props': 'error',
        'react/no-array-index-key': 'warn',
        'react/no-unstable-nested-components': 'error',
        'react/no-unused-class-component-methods': 'error',
        'react/no-unused-prop-types': 'error'
      }
    },
    {
      files: ['*.test.*'],
      env: {
        jest: true
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'jest/consistent-test-it': ['error', {fn: 'it'}],
        'jest/max-expects': ['error', {max: 9}],
        'jest/max-nested-describe': ['error', {max: 7}],
        'jest/no-conditional-expect': 'error',
        'jest/no-conditional-in-test': 'error',
        'jest/no-duplicate-hooks': 'error',
        'jest/prefer-called-with': 'error',
        'jest/prefer-comparison-matcher': 'error',
        'jest/prefer-equality-matcher': 'error',
        'jest/prefer-hooks-in-order': 'error',
        'jest/prefer-hooks-on-top': 'error',
        'jest/prefer-mock-promise-shorthand': 'error',
        'jest/prefer-strict-equal': 'error',
        'jest/prefer-to-be': 'error',
        'jest/prefer-to-have-length': 'error',
        'jest/require-hook': ['warn', {allowedFunctionCalls: ['runCommonTests']}],
        'jest/require-to-throw-message': 'error',
        'jest/require-top-level-describe': 'error',
        'jest/valid-title': 'error'
      }
    },
    {
      files: ['*.test.tsx'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'testing-library/no-container': 'warn',
        'testing-library/no-manual-cleanup': 'warn',
        'testing-library/no-node-access': 'warn',
        'testing-library/prefer-screen-queries': 'off',
        'testing-library/prefer-user-event': 'error'
      }
    }
  ]
};

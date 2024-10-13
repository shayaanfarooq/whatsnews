import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import * as imp from 'eslint-plugin-import' // Add eslint-plugin-import for import order rules

export default tseslint.config(
   { ignores: ['dist'] },
   {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
         ecmaVersion: 2020,
         globals: globals.browser
      },
      plugins: {
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh,
         import: imp
      },
      rules: {
         ...reactHooks.configs.recommended.rules,
         'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
         'import/order': [
            'error',
            {
               groups: [['builtin', 'external', 'internal']],
               alphabetize: { order: 'asc', caseInsensitive: true },
               'newlines-between': 'always'
            }
         ]
      }
   }
)

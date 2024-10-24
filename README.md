# React Project Template

A React standard template with TS, Eslint, TailwindCSS and productive configurations

## Steps

### 1. Create a directory for your project, e.g. "my-project"

Run `cd [my-project]` to enter the project folder.

### 2. Vite + React + SWC setup

Run `npm create vite@latest .` to create the project using the latest Vite, with React + SWC support.

### 3. SVG component support on React

Run `npm i -D vite-plugin-svgr` to add easy SVG support with svgr library and with vite configuration. Follow [vite-plugin-svgr installation steps](https://github.com/pd4d10/vite-plugin-svgr) to finish it's setup.

### 4. Add alias path support: @/... for imports

Run `npm i -D @types/node` to add path resolution for vite's configuration.

Your `vite.config.js` should be like:

```js
import * as path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
```

Add the following lines to your `tsconfig.json` file (or `tsconfig.app.json` and `tsconfig.node.json` separately, if needed), under the `compilerOptions` key:

```json
  ...
  "compilerOptions": {
    ...
    "paths": {
      "@/*": ["./src/*"]
    }
  }
```

### 5. Install Tailwind CSS

Run `npm i -D tailwindcss postcss autoprefixer` to add tailwind and its peer dependencies.

Run `npx tailwindcss init` to create the `tailwind.config.js` file.

Follow the remaining instructions from [tailwind documentation](https://tailwindcss.com/docs/installation/using-postcss).

Your `tailwind.config.js` should be like this:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create a folder `.vscode` and add a new file called `settings.json` with the content below, to prevent vscode warnings:

```json
{
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

Run `npm i --save clsx` to add [clsx](https://github.com/lukeed/clsx) support for easier work with TailwindCSS.

Also, rename `postcss.config.js` to `postcss.config.cjs` to prevent ES module errors from PostCSS dependency.

### 6. Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) for React specific linting rules

### 7. Install prettier

Run `npm i -D prettier prettier-plugin-tailwindcss eslint-config-prettier eslint-plugin-prettier` to install prettier and its dependencies to work along with eslint.

Create the file `prettier.config.js` with the content below:

```js
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
```

### 8. Add auto fix/sort imports with ESLint

Run `npm i -D eslint-plugin-import eslint-import-resolver-typescript` to install the eslint plugin for auto fixing import sorting.

Run `npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser` to install dependencies that will solve path resolving issues between import plugin and path aliases configurations.

### 9. ESLint configuration

ESLint configuration is extensive and a pain to set it correctly.

Below you can see the final version I got after making all the previous steps working accordingly. If something is not working properly, verify if your `eslint.config.js` looks like this:

```js
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  react.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  eslintConfigPrettier,
  eslintPluginPrettier,
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
    ],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: { project: 'tsconfig.app.json' },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/services/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/hooks/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/contexts/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/containers/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/styles/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  }
)
```

## Testing your setup

Run `npm run dev`. ;P

You should have something like this:
![image](https://github.com/user-attachments/assets/bbda8a3c-8031-4c98-8b40-b79c0e35cace)

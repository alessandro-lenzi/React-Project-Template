# React Project Template

A React standard template with TS, Eslint, TailwindCSS and productive configurations

## Steps

1. Create a directory for your project, e.g. "my-project"

Run `cd [my-project]` to enter the project folder.

2. Vite + React + SWC setup

Run `npm create vite@latest .` to create the project using the latest Vite, with React + SWC support.

3. SVG component support on React

Run `npm i -D vite-plugin-svgr` to add easy SVG support with svgr library and with vite configuration. Follow [vite-plugin-svgr installation steps](https://github.com/pd4d10/vite-plugin-svgr) to finish it's setup.

4. Add alias path support: @/... for imports

Run `npm i -D @types/node` to add path resolution for vite's configuration.

Your `vite.config.js` should be like:

```js
import * as path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
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

5. Install Tailwind CSS

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
};
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

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

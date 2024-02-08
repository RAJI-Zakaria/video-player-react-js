# Rich Interface Project
First of all, we would like to express our enthusiasm as we embark on a React journey, inspired by `M. Marc Poppleton's` insightful teachings. This project is dedicated to creating a dynamic React app featuring a video player with interactive chapters, keywords, a map, and a live comment section. 

Just as M. Marc Poppleton encouraged exploration and innovation, this endeavor seeks to encapsulate the essence of learning through hands-on experience and interactive elements.

# Authors
- Abir 
- Ferhat
- Zakaria

# Table of Contents
- [Rich Interface Project](#rich-interface-project)
- [Authors](#authors)
- [Table of Contents](#table-of-contents)
- [React + TypeScript + Vite](#react--typescript--vite)
  - [Expanding the ESLint configuration](#expanding-the-eslint-configuration)


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

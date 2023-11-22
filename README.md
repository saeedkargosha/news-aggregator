# News Aggregator

## Content

- [How to run](#how-to-run)
- [How to test](#how-to-test)
- [Built with](#built-with)
- [Features](#features)
- [Styles Documentation](#styles-documentation)
- [UIKit Documentation](#uikit-documentation)

## How to run

Clone the project or download it as a zip file, you can run `yarn install` to install dependencies. After that, you can run:

````bash
# npm
yarn dev

OR

docker-compose up

And You can see the client application running in your browser by going to http://localhost:3000.

---

## How to test

- Running test

```bash
yarn test
````

- Running End-to-End (E2E) Tests

```bash
yarn cy:open
```

## Built with

- [React.js](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [SASS](https://sass-lang.com)
- [Cypress](https://www.cypress.io/)
- [Storybook](https://storybook.js.org)
- [React Query](https://tanstack.com/query/latest)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Infinite Scroll](https://github.com/thebuilder/react-intersection-observer)

## Features

✅ Unit tests

✅ End-to-End

✅ Documentation

✅ Data Storage

## UIKit Documentation

### Overview:

The uikit directory is a collection of reusable UI components designed to provide consistency and modularity across the application. These components are meant to standardize the look and behavior of common UI elements and reduce redundancy in code.

### Viewing Components:

To visualize the components and understand their props, you can use Storybook, a tool that showcases the components in various states and provides an interactive playground for them.

Run the following command to launch Storybook:

```bash
yarn storybook
```

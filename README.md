# To Do List App

## [Demo](https://quyha.github.io/todo-app)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

This project uses Typescript, Sass for styles and store data to LocalStorage.
It contains some basic components. Each component is a TSX file and a .scss file that is associated to the component.

## Folder Structure

I use `kebab-case` for all my files and folders in this project.

```
src
├── components              
│   └── button
│   └── input
│   └── ...
├── containers
├── hooks
├── services
├── utils
├── styles
├── index.tsx
```

* `components`: Generic and reusable across the whole app. Presentational components eg. Button, Input, etc
* `containers`: Contains components of app
* `hooks`: Contains common utility hooks
* `services`: All the common services, eg. storage, api, etc
* `utils`: Contains util and helper function
* `styles`: All common styles (css) or theme (sass)

## Library
* [react-datepicker](https://github.com/Hacker0x01/react-datepicker)

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

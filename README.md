# AltSchool First Semester Project

Replicated the Scissors Web.

This is a simple React-based application designed for ease of use and practicality. With this application, you can effortlessly adjust the margin for both increment and decrement operations, reset the count to its initial state, and directly edit the count value.

Additionally, we've implemented robust error handling. In case of non-numeric entries (NaN) or values exceeding 8 characters, the app will gracefully handle these scenarios. We've also included a "Test Error Handling" button for convenient testing.

Explore the app effortlessly and enjoy a polished and user-friendly experience, complete with a "Not Found" page for incorrect URLs.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Dependencies](#dependencies)
- [Custom Hook](#custom-hook)
- [Error Handling](#error-handling)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [Screenshot](#screenshot)
- [Built With](#built-with)

## Demo

You can try the app live at [Counter404 Demo App](https://altschool-counter404.netlify.app/).

## Features

- Set Margin for both increment and decrement operations.
- Increment the count value.
- Decrement the count value.
- Reset the count value to its initial state.
- Edit the count value directly.
- Error handling for NaN and count length > 8.
- Error handling by click of a button.
- Error handling for missing page.

## Dependencies

- react
- react-dom
- react-router-dom
- react-error-boundary
- react-feather
- @phosphor-icons/react

## Custom Hook

The app uses a custom hook called useCounter to manage the count value and editing state. You can find this hook in the useCounter.js file.

## Error Handling

The app includes error handling for NaN (Not a Number) inputs and count length exceeding 8 characters. When such errors occur, the app will navigate to an error page.

It can also trigger an Error by using the "Test Error Handling" button and when you navigate to a missing page through a wrong/ non-existent url.

## Folder Structure

The project structure is organized as follows: src/: Contains the source code of the application.
components/: React components used in the app.
App.js: The main application component.
public/: Contains the public assets.
package.json: Lists the project dependencies and scripts.
README.md/: The documentation file.
index.html
...and others

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

    Fork the project.
    Create a new branch for your feature: git checkout -b feature-name.
    Make your changes and commit them: git commit -m 'Add some feature'.
    Push to the branch: git push origin feature-name.
    Submit a pull request.

## Screenshot

![Desktop screenshot](./public/counter-desktop.png)
![Mobile screenshot](./public/counter.png)
![404 Error screenshot](./public/404.png)
![ErrorBoundary screenshot](./public/error.png)

## Built with

- React
- JSX
- Vanilla JavaScript
- Semantic HTML5 markup
- CSS custom properties

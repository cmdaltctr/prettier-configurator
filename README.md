# Prettier Configurator

A web application to help configure Prettier settings. It provides a user interface to modify Prettier options and generate a .prettierrc.json file.

## Project Structure

```text
.
├── index.html
├── style.css
├── js/
│   ├── configData.js
│   ├── main.js
│   └── ui.js
└── src/
    ├── images/
        └── logo-prettier.png
```

## Project Files

- [`index.html`](index.html): The main HTML file that provides the structure and content of the web page.
- [`style.css`](style.css): Contains the CSS rules for styling the web page.
- [`js/configData.js`](js/configData.js): Holds data related to Prettier configurations or settings.
- [`js/main.js`](js/main.js): The main JavaScript file, containing the core logic and initialisation.
- [`js/ui.js`](js/ui.js): Contains JavaScript code related to the user interface and handling user interactions.

## Usage

1. Download the file to your computer.
2. Open `index.html` in your web browser.
3. Modify the Prettier options using the user interface.
4. Click the "Generate .prettierrc.json" button to generate the configuration file.
5. Save the generated `.prettierrc.json` file to your project.
6. Run Prettier in your project to format your code according to the configured settings.

## Additional Information

- The `configData.js` file contains the default Prettier settings and options.
- The `main.js` file handles the logic for generating the `.prettierrc.json` file based on the user's selections.

## License

This project is licensed under the MIT License - see [`License.md`](License.md) for details.

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

## Local Prism.js Setup

To avoid potential CORS errors when opening `index.html` directly in the browser, you can download and host the Prism.js files locally. Follow these steps:

1. Create a directory named `lib/prismjs` in the project root.
2. Download the following files from the Prism.js CDN and place them in the `lib/prismjs` directory:
   - [https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css](https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css) (Save as `lib/prismjs/prism-tomorrow.min.css`)
   - [https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-core.min.js](https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-core.min.js) (Save as `lib/prismjs/prism-core.min.js`)
   - [https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js](https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js) (Save as `lib/prismjs/prism-autoloader.min.js`)
3. Uncommented the `index.html` file to reference the local Prism.js files instead of the CDN URLs, then commentted the CDN URLs:

   ```html
   <link
   	rel="stylesheet"
   	href="lib/prismjs/prism-tomorrow.min.css"
   />
   <script src="lib/prismjs/prism-core.min.js"></script>
   <script
   	src="lib/prismjs/prism-autoloader.min.js"
   	data-dependencies-path="lib/prismjs/"
   ></script>
   ```

## License

This project is licensed under the MIT License - see [`License.md`](License.md) for details.

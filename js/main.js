// js/main.js
// This is the main entry point for the application's JavaScript logic.
// It orchestrates UI rendering, event handling, and configuration generation.

import { prettierOptions } from './configData.js'; // Data for Prettier options
import { renderConfigurator, toggleDarkMode, applySavedTheme } from './ui.js'; // UI manipulation functions

// DOM element references
const downloadButton = document.getElementById('downloadButton');
const generatedConfigTextarea = document.getElementById('generatedConfig');
const themeSwitch = document.getElementById('themeSwitch');

/**
 * Gathers current selections from all configuration cards and builds the
 * Prettier configuration object. Only options that differ from their default
 * values (or specific always-included options like printWidth) are included.
 * @returns {object} The Prettier configuration object.
 */
function buildPrettierConfig() {
	const config = {}; // Initialise an empty object to hold the configuration

	// Iterate over each Prettier option defined in configData.js
	prettierOptions.forEach((option) => {
		const inputElement = document.getElementById(option.id); // Get the input element for this option
		if (inputElement) {
			let value;
			// Determine the value based on the input type
			switch (option.inputType) {
				case 'number':
					value = parseInt(inputElement.value, 10);
					// Only add to config if the value is a valid number AND
					// it's different from the default, OR it's a commonly set option.
					if (
						!isNaN(value) &&
						(value !== option.defaultValue || ['printWidth', 'tabWidth'].includes(option.id))
					) {
						config[option.id] = value;
					}
					break;
				case 'boolean':
					value = inputElement.checked;
					// Add to config if the value is different from the default.
					if (value !== option.defaultValue) {
						config[option.id] = value;
					}
					break;
				case 'select':
					value = inputElement.value;
					// For select, convert to number if the original default was a number (e.g. tabWidth if it were a select)
					// This is a bit of an edge case, usually select values are strings.
					const defaultValue = option.defaultValue;
					if (typeof defaultValue === 'number' && !isNaN(parseFloat(value))) {
						value = parseFloat(value);
					}
					// Add to config if the value is different from the default.
					if (value !== defaultValue) {
						config[option.id] = value;
					}
					break;
			}
		}
	});
	return config; // Return the constructed configuration object
}

/**
 * Updates the textarea with the pretty-printed JSON of the generated Prettier configuration.
 * Also enables/disables the download button based on whether the config is empty.
 */
function displayGeneratedConfig() {
	const prettierConfig = buildPrettierConfig(); // Get the current configuration
	// Stringify the object with an indent of 2 spaces for readability
	generatedConfigTextarea.value = JSON.stringify(prettierConfig, null, 2);
	// Enable download button only if the configuration object is not empty
	downloadButton.disabled = Object.keys(prettierConfig).length === 0;
}

/**
 * Handles the download of the generated configuration file as '.prettierrc.json'.
 */
function downloadConfigFile() {
	const configJson = generatedConfigTextarea.value;
	// Prevent download if the configuration is empty
	if (!configJson || configJson === '{}') {
		alert('Configuration is empty. Please make some selections first.');
		return;
	}
	// Create a Blob with the JSON data
	const blob = new Blob([configJson], { type: 'application/json' });
	// Create a temporary URL for the Blob
	const url = URL.createObjectURL(blob);
	// Create a temporary anchor element to trigger the download
	const a = document.createElement('a');
	a.href = url;
	a.download = '.prettierrc.json'; // Standard Prettier configuration filename
	document.body.appendChild(a); // Append to body to make it clickable
	a.click(); // Programmatically click the anchor to start download
	document.body.removeChild(a); // Clean up by removing the anchor
	URL.revokeObjectURL(url); // Release the object URL
}

/**
 * Initialises the application.
 * This function is called when the DOM is fully loaded.
 */
function init() {
	// Apply any previously saved theme (light/dark mode)
	applySavedTheme();

	// Render all the configuration cards into the UI
	renderConfigurator();

	// Display the initial configuration (which will likely be empty or based on defaults)
	displayGeneratedConfig();

	// --- Event Listeners ---

	// Attach event listener to the download button
	if (downloadButton) {
		downloadButton.addEventListener('click', downloadConfigFile);
	}

	// Attach event listener to the theme switch toggle
	if (themeSwitch) {
		themeSwitch.addEventListener('change', toggleDarkMode);
	}

	// Listen for the custom 'configChange' event.
	// This event is dispatched from ui.js whenever an option's value changes.
	// This allows the generated config display to update live.
	document.addEventListener('configChange', displayGeneratedConfig);
}

// --- Application Entry Point ---
// Wait for the HTML document to be fully loaded and parsed before running the init function.
document.addEventListener('DOMContentLoaded', init);

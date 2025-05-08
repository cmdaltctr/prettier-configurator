// js/ui.js
// This module is responsible for all UI rendering and manipulation.
import { prettierOptions } from './configData.js'; // Data source for Prettier options

// DOM element where configuration cards will be placed
const configuratorGrid = document.getElementById('configuratorGrid');

/**
 * Creates and appends a Prettier configuration card to the grid.
 * Each card allows configuring one Prettier option.
 * @param {import('./configData.js').PrettierOption} option - The Prettier option data from configData.js.
 */
function createConfigCard(option) {
	// Create the main container for the card
	const card = document.createElement('div');
	card.className = 'config-card';
	card.dataset.optionId = option.id; // Store option ID for potential future use

	let inputHtml = '';
	// Determine the language for Prism.js syntax highlighting for this option's examples.
	// Defaults to 'javascript' if not specified in the option's data.
	const exampleLanguage = option.language || 'javascript';

	// Generate HTML for the input control (number, boolean checkbox, or select dropdown)
	switch (option.inputType) {
		case 'number':
			inputHtml = `
                <label for="${option.id}">${option.title}:</label>
                <input type="number" id="${option.id}" name="${option.id}" value="${option.defaultValue}" class="config-input">
            `;
			break;
		case 'boolean':
			inputHtml = `
                <div class="checkbox-container">
                    <input type="checkbox" id="${option.id}" name="${option.id}" class="config-input" ${option.defaultValue ? 'checked' : ''}>
                    <span class="custom-checkbox"></span>
                    <label for="${option.id}" class="label-text">${option.title}</label>
                </div>
            `;
			break;
		case 'select':
			// Generate <option> elements for the select dropdown
			const optionsHtml = option.choices
				.map(
					(choice) =>
						`<option value="${choice.value}" ${String(choice.value) === String(option.defaultValue) ? 'selected' : ''}>${choice.label}</option>`,
				)
				.join('');
			inputHtml = `
                <label for="${option.id}">${option.title}:</label>
                <select id="${option.id}" name="${option.id}" class="config-input">
                    ${optionsHtml}
                </select>
            `;
			break;
	}

	// Prepare initial example content (input, output, notes) based on the option's default value
	let exampleInputContent = '';
	let exampleOutputContent = '';
	let exampleNoteContent = option.exampleNote
		? `<p class="example-note">${escapeHtml(option.exampleNote)}</p>`
		: '';

	if (option.inputType === 'select' && option.choices) {
		const defaultChoice = option.choices.find(
			(c) => String(c.value) === String(option.defaultValue),
		);
		if (defaultChoice) {
			exampleInputContent = defaultChoice.exampleInput || '';
			exampleOutputContent = defaultChoice.exampleOutput || '';
		}
	} else if (option.inputType === 'boolean') {
		exampleInputContent = option.exampleInput || '';
		exampleOutputContent = option.defaultValue
			? option.exampleOutputTrue || ''
			: option.exampleOutputFalse || '';
	} else {
		// For 'number' or other types with general examples
		exampleInputContent = option.exampleInput || '';
		exampleOutputContent = option.exampleOutputTrue || ''; // exampleOutputTrue serves as the general output
	}

	// Construct the card's inner HTML, including the title, description, input control, and example section
	// Code blocks use <pre> and <code> with appropriate language classes for Prism.js.
	card.innerHTML = `
        <h3>${escapeHtml(option.title)}</h3>
        <p class="description">${escapeHtml(option.description)}</p>
        ${inputHtml}
        ${
					exampleInputContent || exampleOutputContent || exampleNoteContent
						? `
        <div class="example-section">
            <h4>Example:</h4>
            ${exampleNoteContent}
            ${exampleInputContent ? `<h5>Input:</h5><pre class="line-numbers language-${exampleLanguage}"><code class="language-${exampleLanguage}">${escapeHtml(exampleInputContent)}</code></pre>` : ''}
            ${exampleOutputContent ? `<h5>Output:</h5><pre class="line-numbers language-${exampleLanguage}"><code class="language-${exampleLanguage} example-output-code">${escapeHtml(exampleOutputContent)}</code></pre>` : ''}
        </div>
        `
						: ''
				}
    `;
	configuratorGrid.appendChild(card); // Add the newly created card to the grid

	// Add an event listener to the input element within this card.
	// When the input value changes, it updates the example display and notifies main.js.
	const inputElement = card.querySelector('.config-input');
	if (inputElement) {
		// Existing 'change' listener for all input types (fires on blur or Enter for number inputs)
		inputElement.addEventListener('change', (event) => {
			updateExampleDisplay(option, event.target, card);
			if (option.inputType === 'boolean') {
				console.log(
					`Change event fired for boolean option: ${option.id}, checked: ${event.target.checked}`,
				);
			}
			// Dispatch a custom event to signal that a configuration option has changed.
			// main.js listens for this to update the generated JSON output.
			document.dispatchEvent(new CustomEvent('configChange'));
		});

		// Add 'input' listener specifically for number inputs for real-time updates as the user types
		if (option.inputType === 'number') {
			inputElement.addEventListener('input', (event) => {
				updateExampleDisplay(option, event.target, card);
				// Also dispatch configChange for the main output to update in real-time
				document.dispatchEvent(new CustomEvent('configChange'));
			});
		}
	}
}

/**
 * Updates the example display (input and output code blocks) within a configuration card
 * when its corresponding option value changes.
 * @param {import('./configData.js').PrettierOption} optionData - The configuration data for the option.
 * @param {HTMLElement} inputElement - The HTML input element that triggered the change.
 * @param {HTMLElement} cardElement - The DOM element for the configuration card.
 */
function updateExampleDisplay(optionData, inputElement, cardElement) {
	const exampleSection = cardElement.querySelector('.example-section');
	if (!exampleSection) return; // Exit if there's no example section in this card

	// Get references to the <code> elements where example code is displayed.
	const inputCodeElement = exampleSection.querySelector('pre:first-of-type code');
	// Select the second <pre> element within the example section, which is the output block
	const outputPreElement = exampleSection.querySelectorAll('pre')[1];
	const outputCodeElement = outputPreElement ? outputPreElement.querySelector('code') : null;

	let newExampleInput = '';
	let newExampleOutput = '';
	const exampleLanguage = optionData.language || 'javascript'; // Default to JavaScript for highlighting

	// Determine the new example content based on the input type and its new value
	if (optionData.inputType === 'select') {
		const selectedChoice = optionData.choices.find(
			(c) => String(c.value) === String(inputElement.value),
		);
		if (selectedChoice) {
			newExampleInput = selectedChoice.exampleInput || '';
			newExampleOutput = selectedChoice.exampleOutput || '';
		}
	} else if (optionData.inputType === 'boolean') {
		newExampleInput = optionData.exampleInput || '';
		newExampleOutput = inputElement.checked
			? optionData.exampleOutputTrue || ''
			: optionData.exampleOutputFalse || '';
		console.log(
			`updateExampleDisplay: Boolean option ${optionData.id}, checked: ${inputElement.checked}`,
		);
		console.log(`updateExampleDisplay: newExampleOutput:`, newExampleOutput);
	} else if (optionData.inputType === 'number') {
		// To make this dynamic, a client-side formatting library is needed.
		// This is a placeholder for calling a formatting function.
		// Only update output for tabWidth, keep input static
		if (optionData.id !== 'tabWidth') {
			newExampleInput = optionData.exampleInput || '';
		} else {
			// For tabWidth, the input example should remain static
			newExampleInput = inputCodeElement
				? inputCodeElement.textContent
				: optionData.exampleInput || '';
		}
		try {
			// Assuming a formatCode function is available globally or imported
			// This function would take the code and an options object
			const formatOptions = { [optionData.id]: parseFloat(inputElement.value) };
			// Replace this with the actual call to your formatting library
			// For example: newExampleOutput = Prettier.format(newExampleInput, { ...formatOptions, parser: exampleLanguage });
			newExampleOutput = `// Dynamic formatting for ${optionData.id} with value ${inputElement.value}\n${newExampleInput}`; // Placeholder output
		} catch (error) {
			console.error(`Error formatting example for ${optionData.id}:`, error);
			newExampleOutput = `Error formatting example: ${error.message}`;
		}
	}

	// Update the input example block's content and visibility
	// Update the input example block's content and visibility
	if (inputCodeElement) {
		// Only update input if it's not the tabWidth option
		if (optionData.id !== 'tabWidth') {
			if (newExampleInput) {
				inputCodeElement.textContent = newExampleInput; // Set new code content
				// Ensure parent <pre> also has the correct language class
				inputCodeElement.parentElement.className = `line-numbers language-${exampleLanguage}`;
				inputCodeElement.parentElement.style.display = ''; // Make sure it's visible
			} else {
				inputCodeElement.parentElement.style.display = 'none'; // Hide if no input example
			}
		} else {
			// For tabWidth, ensure the input block remains visible if it had content initially
			if (inputCodeElement.textContent) {
				inputCodeElement.parentElement.style.display = '';
			} else {
				inputCodeElement.parentElement.style.display = 'none';
			}
		}
	}

	// Update the output example block's content and visibility
	if (outputCodeElement) {
		if (newExampleOutput) {
			outputCodeElement.textContent = newExampleOutput;
			outputCodeElement.parentElement.className = `line-numbers language-${exampleLanguage}`;
			outputCodeElement.parentElement.style.display = '';
		} else {
			outputCodeElement.parentElement.style.display = 'none';
		}
	}

	// If Prism.js is available, re-highlight the updated code elements.
	// The autoloader will fetch new languages if they haven't been loaded yet.
	if (window.Prism) {
		if (inputCodeElement && newExampleInput) Prism.highlightElement(inputCodeElement);
		if (outputCodeElement && newExampleOutput) Prism.highlightElement(outputCodeElement);
	}
}

/**
 * Renders all configuration cards based on the prettierOptions data.
 * This function is typically called once on application initialization.
 */
export function renderConfigurator() {
	// Clear any existing cards (important if this function could be called multiple times)
	configuratorGrid.innerHTML = '';
	// Create and append a card for each Prettier option defined in configData.js
	prettierOptions.forEach(createConfigCard);

	// After all cards are created and added to the DOM,
	// instruct Prism.js to highlight all code blocks on the page.
	if (window.Prism) {
		Prism.highlightAll();
	}
}

/**
 * Toggles the dark mode theme on the <body> element and saves the preference to localStorage.
 */
export function toggleDarkMode() {
	document.body.classList.toggle('dark-mode');
	const isDarkMode = document.body.classList.contains('dark-mode');
	// Store the theme preference so it can be reapplied on future visits
	localStorage.setItem('darkMode', isDarkMode.toString()); // Store as 'true' or 'false'
}

/**
 * Applies the saved dark mode preference from localStorage when the page loads.
 */
export function applySavedTheme() {
	const savedDarkMode = localStorage.getItem('darkMode');
	if (savedDarkMode === 'true') {
		// Check against the string 'true'
		document.body.classList.add('dark-mode');
		const themeToggleCheckbox = document.getElementById('themeSwitch');
		if (themeToggleCheckbox) {
			themeToggleCheckbox.checked = true; // Sync the toggle switch's visual state
		}
	}
}

/**
 * Escapes HTML special characters in a string to prevent XSS and to render them literally
 * when displayed in HTML (e.g., inside <pre><code> tags).
 * @param {string} unsafeText - The string containing potentially unsafe HTML characters.
 * @returns {string} The escaped string.
 */
function escapeHtml(unsafeText) {
	if (typeof unsafeText !== 'string') return ''; // Gracefully handle non-string inputs
	return unsafeText
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

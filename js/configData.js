// js/configData.js

// This file defines the configuration data structure and content
// for displaying and configuring Prettier options in a user interface.

/**
 * @typedef {Object} Choice
 * Defines the structure for a single option choice within a 'select' type Prettier option.
 * @property {string|number|boolean} value - The actual value for the Prettier config.
 * @property {string} label - The user-friendly label for the choice displayed in the UI.
 * @property {string} [exampleInput] - Optional example code before formatting (overrides parent option's example).
 * @property {string} [exampleOutput] - Optional example code after formatting (overrides parent option's example).
 * @property {string} [language] - Optional language for prism.js syntax highlighting (default: 'javascript').
 */

/**
 * @typedef {Object} PrettierOption
 * Defines the structure for a single configurable Prettier option to be displayed in the UI.
 * Each object represents one setting like 'printWidth' or 'semi'.
 * @property {string} id - Unique ID, corresponds to Prettier's option name (e.g., 'printWidth').
 * @property {string} title - User-friendly title for the option (e.g., 'Print Width').
 * @property {string} description - Explanation of what the option does.
 * @property {'number'|'boolean'|'select'} inputType - Type of input control to render (number input, checkbox, or dropdown).
 * @property {string|number|boolean} defaultValue - Default value for the option.
 * @property {Choice[]} [choices] - Array of Choice objects (required for 'select' inputType).
 * @property {string} [exampleInput] - General example input code before formatting (used for boolean/number types, or as fallback for select).
 * @property {string} [exampleOutputTrue] - Example output if a boolean option is true.
 * @property {string} [exampleOutputFalse] - Example output if a boolean option is false.
 * @property {string} [exampleOutput] - General example output code after formatting (used for number types, or as fallback for select).
 * @property {string} [exampleNote] - Additional note to display with the example section.
 * @property {string} [language] - Language for prism.js for this option's examples (default: 'javascript').
 */

/**
 * Array of Prettier configuration options.
 * This is the main data structure exported by this file.
 * Each object inside this array configures one specific Prettier setting
 * and provides data for rendering its UI control and examples.
 * @type {PrettierOption[]}
 */
export const prettierOptions = [
	// --- 'printWidth' Option Configuration ---
	{
		id: 'printWidth',
		title: 'Print Width',
		description: 'Specify the line length that the printer will wrap on.',
		inputType: 'select', // Use a dropdown for this option
		defaultValue: 80,
		choices: [
			// Choices for the 'printWidth' select input
			{
				value: 80,
				label: '(default) 80',
				exampleInput: `const veryLongVariableName = "This is a very long string that will exceed the print width and should be wrapped nicely by Prettier if the print width is set appropriately.";`,
				exampleOutput: `const veryLongVariableName =
  "This is a very long string that will exceed the print width and should be wrapped nicely by Prettier if the print width is set appropriately.";`,
			},
			{
				value: 100,
				label: '100',
				exampleInput: `const veryLongVariableName = "This is a very long string that will exceed the print width and should be wrapped nicely by Prettier if the print width is set appropriately.";`,
				exampleOutput: `const veryLongVariableName = "This is a very long string that will exceed the print width and should be wrapped nicely by Prettier if the print width is set appropriately.";`,
			},
			{
				value: 120,
				label: '120',
				exampleInput: `const veryLongVariableName = "This is a very long string that will exceed the print width and should be wrapped nicely by Prettier if the print width is set appropriately.";`,
				exampleOutput: `const veryLongVariableName = "This is a very long string that will exceed the print width and should be wrapped nicely by Prettier if the print width is set appropriately.";`,
			},
		],
		exampleNote: 'Output depends on the chosen printWidth. Example for printWidth: 80.',
	},

	// --- 'tabWidth' Option Configuration ---
	{
		id: 'tabWidth',
		title: 'Tab Width',
		description: 'Specify the number of spaces per indentation-level.',
		inputType: 'select', // Use a dropdown for this option
		defaultValue: 2,
		choices: [
			// Choices for the 'tabWidth' select input
			{
				value: 2,
				label: '(default) 2',
				exampleInput: `function example() {
  // This line will be indented
  console.log("Hello");
}`,
				exampleOutput: `function example() {
  // This line will be indented
  console.log("Hello");
}`,
			},
			{
				value: 4,
				label: '4',
				exampleInput: `function example() {
    // This line will be indented
    console.log("Hello");
}`,
				exampleOutput: `function example() {
    // This line will be indented
    console.log("Hello");
}`,
			},
			{
				value: 8,
				label: '8',
				exampleInput: `function example() {
        // This line will be indented
        console.log("Hello");
}`,
				exampleOutput: `function example() {
        // This line will be indented
        console.log("Hello");
}`,
			},
		],
		exampleNote: 'Output shows indentation based on tabWidth. Example for tabWidth: 2.',
	},

	// --- 'useTabs' Option Configuration ---
	{
		id: 'useTabs',
		title: 'Use Tabs',
		description: 'Indent lines with tabs instead of spaces.',
		inputType: 'boolean', // Use a checkbox for this option
		defaultValue: false,
		exampleInput: `function example() {
    console.log("Indented line");
}`,
		exampleOutputTrue: `function example() {
\tconsole.log("Indented line"); // Indented with a tab
}`,
		exampleOutputFalse: `function example() {
  console.log("Indented line"); // Indented with spaces (e.g., 2 if tabWidth is 2)
}`,
	},

	// --- 'semi' Option Configuration ---
	{
		id: 'semi',
		title: 'Semicolons',
		description: 'Print semicolons at the ends of statements.',
		inputType: 'boolean', // Use a checkbox for this option
		defaultValue: true,
		exampleInput: `const foo = 1
const bar = 2`,
		exampleOutputTrue: `const foo = 1;
const bar = 2;`,
		exampleOutputFalse: `const foo = 1
const bar = 2`,
	},

	// --- 'singleQuote' Option Configuration ---
	{
		id: 'singleQuote',
		title: 'Single Quotes',
		description: 'Use single quotes instead of double quotes for strings.',
		inputType: 'boolean', // Use a checkbox for this option
		defaultValue: false,
		exampleInput: `const greeting = "Hello, world!";`,
		exampleOutputTrue: `const greeting = 'Hello, world!';`,
		exampleOutputFalse: `const greeting = "Hello, world!";`,
	},

	// --- 'quoteProps' Option Configuration ---
	{
		id: 'quoteProps',
		title: 'Quote Props',
		description: 'Change when object properties are quoted.',
		inputType: 'select', // Use a dropdown for this option
		defaultValue: 'as-needed',
		choices: [
			// Choices for the 'quoteProps' select input
			{
				value: 'as-needed',
				label: 'As Needed',
				exampleInput: `const obj = {\n  foo: 1,\n  "bar-baz": 2,\n  "1q": 3\n};`,
				exampleOutput: `const obj = {\n  foo: 1,\n  "bar-baz": 2,\n  "1q": 3\n};`,
			},
			{
				value: 'consistent',
				label: 'Consistent',
				exampleInput: `const obj = {\n  foo: 1,\n  "bar-baz": 2,\n  "1q": 3\n};`,
				exampleOutput: `const obj = {\n  "foo": 1,\n  "bar-baz": 2,\n  "1q": 3\n}; // If any prop needs quotes, all get quotes`,
			},
			{
				value: 'preserve',
				label: 'Preserve',
				exampleInput: `const obj = {\n  foo: 1,\n  "bar-baz": 2,\n  '1q': 3\n};`,
				exampleOutput: `const obj = {\n  foo: 1,\n  "bar-baz": 2,\n  '1q': 3\n}; // Respects input quoting`,
			},
		],
	},

	// --- 'jsxSingleQuote' Option Configuration ---
	{
		id: 'jsxSingleQuote',
		title: 'JSX Single Quotes',
		description: 'Use single quotes instead of double quotes in JSX attributes.',
		inputType: 'boolean', // Use a checkbox for this option
		defaultValue: false,
		language: 'jsx', // Specify language for Prism.js syntax highlighting
		exampleInput: `<div className="container" data-custom="value">Hello</div>;`,
		exampleOutputTrue: `<div className='container' data-custom='value'>Hello</div>;`,
		exampleOutputFalse: `<div className="container" data-custom="value">Hello</div>;`,
	},

	// --- 'trailingComma' Option Configuration ---
	{
		id: 'trailingComma',
		title: 'Trailing Commas',
		description: 'Print trailing commas where valid in multi-line JSON5 & ES5.',
		inputType: 'select', // Use a dropdown for this option
		defaultValue: 'es5',
		choices: [
			// Choices for the 'trailingComma' select input
			{
				value: 'es5',
				label: 'ES5',
				exampleInput: `const obj = {\n  foo: 1,\n  bar: 2\n};\nconst arr = [\n  1,\n  2\n];`,
				exampleOutput: `const obj = {\n  foo: 1,\n  bar: 2,\n};\nconst arr = [\n  1,\n  2,\n];`,
			},
			{
				value: 'none',
				label: 'None',
				exampleInput: `const obj = {\n  foo: 1,\n  bar: 2\n};\nconst arr = [\n  1,\n  2\n];`,
				exampleOutput: `const obj = {\n  foo: 1,\n  bar: 2\n};\nconst arr = [\n  1,\n  2\n];`,
			},
			{
				value: 'all',
				label: 'All',
				exampleInput: `function greet(\n  name,\n  age\n) {}\ngreet(\n  "Prettier",\n  5\n);`,
				exampleOutput: `function greet(\n  name,\n  age,\n) {}\ngreet(\n  "Prettier",\n  5,\n); // Also for function parameters/arguments`,
			},
		],
	},

	// --- 'bracketSpacing' Option Configuration ---
	{
		id: 'bracketSpacing',
		title: 'Bracket Spacing',
		description: 'Print spaces between brackets in object literals.',
		inputType: 'boolean', // Use a checkbox for this option
		defaultValue: true,
		exampleInput: `const obj = {foo: 1, bar: 2};`,
		exampleOutputTrue: `const obj = { foo: 1, bar: 2 };`,
		exampleOutputFalse: `const obj = {foo: 1, bar: 2};`,
	},

	// --- 'jsxBracketSameLine' Option Configuration ---
	{
		id: 'jsxBracketSameLine',
		title: 'JSX Bracket Same Line',
		description:
			'Put the `>` of a multi-line JSX element at the end of the last line instead of on its own line.',
		inputType: 'boolean', // Use a checkbox for this option
		defaultValue: false,
		language: 'jsx', // Specify language for Prism.js syntax highlighting
		exampleInput: `<button\n  className="btn"\n  type="button"\n>\n  Click Me\n</button>`,
		exampleOutputTrue: `<button\n  className="btn"\n  type="button">\n  Click Me\n</button>`,
		exampleOutputFalse: `<button\n  className="btn"\n  type="button"\n>\n  Click Me\n</button>`,
	},

	// --- 'arrowParens' Option Configuration ---
	{
		id: 'arrowParens',
		title: 'Arrow Function Parentheses',
		description: 'Include parentheses around a sole arrow function parameter.',
		inputType: 'select', // Use a dropdown for this option
		defaultValue: 'always',
		choices: [
			// Choices for the 'arrowParens' select input
			{
				value: 'always',
				label: 'Always',
				exampleInput: `const fn = x => x * 2;`,
				exampleOutput: `const fn = (x) => x * 2;`,
			},
			{
				value: 'avoid',
				label: 'Avoid',
				exampleInput: `const fn = (x) => x * 2;`,
				exampleOutput: `const fn = x => x * 2;`,
			},
		],
	},

	// --- 'endOfLine' Option Configuration ---
	{
		id: 'endOfLine',
		title: 'End of Line',
		description: 'Control the line ending used (e.g., lf, crlf, cr, auto).',
		inputType: 'select', // Use a dropdown for this option
		defaultValue: 'lf',
		choices: [
			// Choices for the 'endOfLine' select input
			{
				value: 'lf',
				label: 'LF (\\n)',
				exampleNote: 'Lines end with Line Feed. Common on Linux/macOS.',
			},
			{
				value: 'crlf',
				label: 'CRLF (\\r\\n)',
				exampleNote: 'Lines end with Carriage Return + Line Feed. Common on Windows.',
			},
			{
				value: 'cr',
				label: 'CR (\\r)',
				exampleNote: 'Lines end with Carriage Return. Rarely used.',
			},
			{
				value: 'auto',
				label: 'Auto',
				exampleNote:
					'Maintains existing line endings (mixed values are normalized to the first one found).',
			},
		],
		// Note specifically for this option's examples
		exampleNote:
			"This primarily affects file compatibility across OS. Visual example isn't very illustrative for code blocks.",
	},

	// --- 'htmlWhitespaceSensitivity' Option Configuration ---
	{
		id: 'htmlWhitespaceSensitivity',
		title: 'HTML Whitespace Sensitivity',
		description: 'Specify how to handle whitespace in HTML (css, strict, ignore).',
		inputType: 'select', // Use a dropdown for this option
		defaultValue: 'css',
		language: 'html', // Specify language for Prism.js syntax highlighting
		choices: [
			// Choices for the 'htmlWhitespaceSensitivity' select input
			{
				value: 'css',
				label: 'CSS',
				exampleInput: `<div>\n  <span>Hello</span>\n  <span>World</span>\n</div>`,
				exampleOutput: `<div>\n  <span>Hello</span>\n  <span>World</span>\n</div> <!-- Respects CSS display property -->`,
			},
			{
				value: 'strict',
				label: 'Strict',
				exampleInput: `<div> <span>Hello</span> <span>World</span> </div>`,
				exampleOutput: `<div><span>Hello</span> <span>World</span></div> <!-- Collapses all whitespace -->`,
			},
			{
				value: 'ignore',
				label: 'Ignore',
				exampleInput: `<div>\n  <span>Hello</span>\n  \n  <span>World</span>\n</div>`,
				exampleOutput: `<div>\n  <span>Hello</span>\n  <span>World</span>\n</div> <!-- Collapses whitespace like 'strict' but also handles newlines differently -->`,
			},
		],
		exampleNote: 'Affects how spacing and newlines in HTML are treated by Prettier.',
	},

	// --- 'proseWrap' Option Configuration (Markdown) ---
	{
		id: 'proseWrap',
		title: 'Prose Wrap (Markdown)',
		description: 'How to wrap prose in Markdown files (always, never, preserve).',
		inputType: 'select', // Use a dropdown for this option
		defaultValue: 'preserve',
		language: 'markdown', // Specify language for Prism.js syntax highlighting
		choices: [
			// Choices for the 'proseWrap' select input
			{
				value: 'always',
				label: 'Always',
				exampleInput: `This is a very long sentence in a Markdown file that should be wrapped by Prettier if printWidth is configured.`,
				exampleOutput: `This is a very long\nsentence in a Markdown\nfile that should be\nwrapped by Prettier if\nprintWidth is configured. (Conceptual example for low printWidth)`,
			},
			{
				value: 'never',
				label: 'Never',
				exampleInput: `This is a very long sentence in a Markdown file that should not be wrapped by Prettier.`,
				exampleOutput: `This is a very long sentence in a Markdown file that should not be wrapped by Prettier.`,
			},
			{
				value: 'preserve',
				label: 'Preserve',
				exampleInput: `This is a very long sentence\nin a Markdown file that Prettier\nshould preserve the existing wrapping for.`,
				exampleOutput: `This is a very long sentence\nin a Markdown file that Prettier\nshould preserve the existing wrapping for.`,
			},
		],
		exampleNote: 'Most effective when `printWidth` is also configured for Markdown.',
	},

	// Add more Prettier options here following the same structure
];

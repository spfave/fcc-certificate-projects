import {useState} from 'react';

import './calculator.css';

// Data
// type button = {display: '', type: 'number' | 'operator' | 'clear' | 'equal'}

// Utility functions
function evaluate(input: string) {
	try {
		const result = eval(input);
		if (typeof result === 'number') return result;
		return 'NaN';
	} catch (error) {
		console.error(error);
		return 'Invalid computation';
	}
}

// Component: Calculator
export default function Calculator() {
	const [input, setInput] = useState('1*2.2');
	const [output, setOutput] = useState(0);

	// function updateInput(input: string) {}

	function handleClear() {
		setInput('');
		setOutput(0);
	}

	function handleEvaluate() {
		const result = evaluate(input);

		if (typeof result === 'number') setOutput(result);
		else setInput(result);
	}

	return (
		<div className="calculator">
			<div className="display-input">{input}</div>
			<div className="display-output" id="display">
				{output}
			</div>
			<div className="keypad">
				<button id="clear" data-clear onClick={handleClear}>
					AC
				</button>
				<button id="divide" data-operator>
					&divide;
				</button>
				<button id="multiply" data-operator>
					&times;
				</button>
				<button id="seven" data-number>
					7
				</button>
				<button id="eight" data-number>
					8
				</button>
				<button id="nine" data-number>
					9
				</button>
				<button id="subtract" data-operator>
					&minus;
				</button>
				<button id="four" data-number>
					4
				</button>
				<button id="five" data-number>
					5
				</button>
				<button id="six" data-number>
					6
				</button>
				<button id="add" data-operator>
					+
				</button>
				<button id="one" data-number>
					1
				</button>
				<button id="two" data-number>
					2
				</button>
				<button id="three" data-number>
					3
				</button>
				<button id="equals" data-equal onClick={handleEvaluate}>
					=
				</button>
				<button id="zero" data-number>
					0
				</button>
				<button id="decimal" data-number>
					.
				</button>
			</div>
		</div>
	);
}

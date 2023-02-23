import {useState} from 'react';

import './calculator.css';

// Data
// type button = {display: '', type: 'number' | 'operation'}

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
			<div className="buttons">
				<button id="clear" className="text">
					AC
				</button>
				<button id="divide">&divide;</button>
				<button id="multiply">&times;</button>
				<button id="seven" className="text">
					7
				</button>
				<button id="eight" className="text">
					8
				</button>
				<button id="nine" className="text">
					9
				</button>
				<button id="subtract">&minus;</button>
				<button id="four" className="text">
					4
				</button>
				<button id="five" className="text">
					5
				</button>
				<button id="six" className="text">
					6
				</button>
				<button id="add">+</button>
				<button id="one" className="text">
					1
				</button>
				<button id="two" className="text">
					2
				</button>
				<button id="three" className="text">
					3
				</button>
				<button id="equals" onClick={handleEvaluate}>
					=
				</button>
				<button id="zero" className="text">
					0
				</button>
				<button id="decimal">.</button>
			</div>
		</div>
	);
}

import {useState} from 'react';

import './calculator.css';

// Component: Calculator
export default function Calculator() {
	const [input, setInput] = useState('1+2');
	const [output, setOutput] = useState(1234567890);

	// function updateInput(input: string) {}

	function evaluate() {
		const result = eval(input);
		setOutput(result);
	}

	return (
		<div className="calculator">
			<div className="display-input">{input}</div>
			<div className="display-output" id="display">
				{output}
			</div>
			<div className="buttons">
				<button id="clear">AC</button>
				<button id="divide">/</button>
				<button id="multiply">x</button>
				<button id="seven">7</button>
				<button id="eight">8</button>
				<button id="nine">9</button>
				<button id="subtract">-</button>
				<button id="four">4</button>
				<button id="five">5</button>
				<button id="six">6</button>
				<button id="add">+</button>
				<button id="one">1</button>
				<button id="two">2</button>
				<button id="three">3</button>
				<button id="equals" onClick={evaluate}>
					=
				</button>
				<button id="zero">0</button>
				<button id="decimal">.</button>
			</div>
		</div>
	);
}

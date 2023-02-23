import {useState} from 'react';

import './calculator.css';

// Component: Calculator
export default function Calculator() {
	const [input, setInput] = useState('1*2.2');
	const [output, setOutput] = useState(0);

	// function updateInput(input: string) {}

	function evaluate() {
		try {
			const result = eval(input);
			if (typeof result === 'number') setOutput(result);
			else setInput('NaN');
		} catch (error) {
			setInput('Invalid computation');
			console.error(error);
		}
	}

	return (
		<div className="calculator">
			<div className="display-input">{input}</div>
			<div className="display-output" id="display">
				{output}
			</div>
			<div className="buttons">
				<button className="text" id="clear">
					AC
				</button>
				<button id="divide">&divide;</button>
				<button id="multiply">&times;</button>
				<button className="text" id="seven">
					7
				</button>
				<button className="text" id="eight">
					8
				</button>
				<button className="text" id="nine">
					9
				</button>
				<button id="subtract">&minus;</button>
				<button className="text" id="four">
					4
				</button>
				<button className="text" id="five">
					5
				</button>
				<button className="text" id="six">
					6
				</button>
				<button id="add">+</button>
				<button className="text" id="one">
					1
				</button>
				<button className="text" id="two">
					2
				</button>
				<button className="text" id="three">
					3
				</button>
				<button id="equals" onClick={evaluate}>
					=
				</button>
				<button className="text" id="zero">
					0
				</button>
				<button id="decimal">.</button>
			</div>
		</div>
	);
}

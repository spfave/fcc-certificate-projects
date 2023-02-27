import {useReducer} from 'react';

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

// Calculator Reducer
type CalculatorState = {
	input: string;
	output: number;
};
type CalculatorActions =
	| {type: 'CLEAR'}
	| {type: 'EVALUATE'}
	| {type: 'ENTER_NUMBER'; payload: string}
	| {type: 'ENTER_OPERATOR'; payload: string};

const calculatorInitialState: CalculatorState = {input: '', output: 0};

function calculatorReducer(
	state: CalculatorState,
	action: CalculatorActions,
): CalculatorState {
	switch (action.type) {
		case 'CLEAR':
			return calculatorInitialState;
		case 'EVALUATE': {
			const result = evaluate(state.input);
			if (typeof result === 'number') return {...state, output: result};
			else return {...state, input: result};
		}
		default:
			return state;
	}
}

// Component: Calculator
export default function Calculator() {
	const [{input, output}, calcDispatch] = useReducer(
		calculatorReducer,
		{input: '1 + 12', output: 0}, //testing input
		// calculatorInitialState,
	);

	function handleClear() {
		calcDispatch({type: 'CLEAR'});
	}

	function handleEvaluate() {
		calcDispatch({type: 'EVALUATE'});
	}

	return (
		<div className="calculator">
			<div className="display-input">{input}</div>
			<div className="display-output" id="display">
				{output}
			</div>
			<div className="keypad">
				<button id="clear" style={{gridArea: 'clear'}} data-clear onClick={handleClear}>
					AC
				</button>
				<button id="divide" data-operator onClick={handleEnterOperator}>
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
				<button
					id="equals"
					style={{gridArea: 'equals'}}
					data-equal
					onClick={handleEvaluate}
				>
					=
				</button>
				<button id="zero" style={{gridArea: 'zero'}} data-number>
					0
				</button>
				<button id="decimal" data-number>
					.
				</button>
			</div>
		</div>
	);
}

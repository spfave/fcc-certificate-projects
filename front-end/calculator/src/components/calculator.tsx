import {useReducer} from 'react';

import './calculator.css';

// Data
type KeypadButton = {
	display: string;
	type: 'action' | 'number' | 'operator';
};
const keypadButtons: Map<string, KeypadButton> = new Map([
	['clear', {display: 'AC', type: 'action'}],
	['one', {display: '1', type: 'number'}],
	['two', {display: '2', type: 'number'}],
	['three', {display: '3', type: 'number'}],
	['four', {display: '4', type: 'number'}],
	['five', {display: '5', type: 'number'}],
	['six', {display: '6', type: 'number'}],
	['seven', {display: '7', type: 'number'}],
	['eight', {display: '8', type: 'number'}],
	['nine', {display: '9', type: 'number'}],
	['zero', {display: '0', type: 'number'}],
	['decimal', {display: '.', type: 'number'}],
	['add', {display: '+', type: 'operator'}],
	['subtract', {display: '−', type: 'operator'}],
	['multiply', {display: '×', type: 'operator'}],
	['divide', {display: '÷', type: 'operator'}],
	['equals', {display: '=', type: 'operator'}],
]);

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

function calculatorReducer(state: CalculatorState, action: CalculatorActions) {
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
			<Keypad />
		</div>
	);
}

type KeypadProps = {temp?: null};
function Keypad(props: KeypadProps) {
	return (
		<div className="keypad">
			{[...keypadButtons.entries()].map(([key, btn]) => (
				<button key={key} id={key} style={{gridArea: key}} data-type={btn.type}>
					{btn.display}
				</button>
			))}
		</div>
	);
}

import {useReducer} from 'react';

import './calculator.css';

// Data
type KeypadButton = {
	display: string;
	type: 'action' | 'number' | 'operator';
};
const KEYPAD_BUTTONS: Map<string, KeypadButton> = new Map([
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
const NUMBERS = '1234567890';
const OPERATORS = '+−×÷';

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

	// function handleEvaluate() {
	// 	calcDispatch({type: 'EVALUATE'});
	// }
	// function handleClear() {
	// 	calcDispatch({type: 'CLEAR'});
	// }

	// function handleEnterNumber(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
	// 	// event.currentTarget;
	// }

	// function handleEnterOperator(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
	// 	console.info(`event: `, event); //LOG
	// 	console.info(`event.target: `, event.target); //LOG
	// 	console.info(`event.currentTarget: `, event.currentTarget); //LOG
	// }

	function handleKeyClick(key: string) {
		if (NUMBERS.includes(key)) calcDispatch({type: 'ENTER_NUMBER', number: key});
		else if (OPERATORS.includes(key))
			calcDispatch({type: 'ENTER_OPERATOR', operator: key});
		else if (key === '=') calcDispatch({type: 'EVALUATE'});
		else if (key === 'AC') calcDispatch({type: 'CLEAR'});
	}

	return (
		<div className="calculator">
			<div className="display-input">{input}</div>
			<div className="display-output" id="display">
				{output}
			</div>
			<Keypad handleKeyClick={handleKeyClick} />
		</div>
	);
}

type KeypadProps = {handleKeyClick: (key: string) => void};
function Keypad(props: KeypadProps) {
	const {handleKeyClick} = props;

	return (
		<div className="keypad">
			{[...KEYPAD_BUTTONS.entries()].map(([key, btn]) => (
				<button
					key={key}
					id={key}
					style={{gridArea: key}}
					data-type={btn.type}
					onClick={() => handleKeyClick(btn.display)}
				>
					{btn.display}
				</button>
			))}
		</div>
	);
}

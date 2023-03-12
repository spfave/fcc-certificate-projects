import {useReducer} from 'react';

import {Calculator, isNumber, isOperator, NUMBERS, OPERATORS} from './calculator';

import './keypad.css';

// Data
type KeypadButton = {
	type: 'action' | 'number' | 'operator';
	display: string;
	value?: string;
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
	['add', {display: '+', type: 'operator', value: '+'}],
	['subtract', {display: '−', type: 'operator', value: '-'}],
	['multiply', {display: '×', type: 'operator', value: '*'}],
	['divide', {display: '÷', type: 'operator', value: '/'}],
	['equals', {display: '=', type: 'operator'}],
]);

// Calculator Reducer
type CalculatorState = {
	input: string[];
	output: number;
};
type CalculatorActions =
	| {type: 'CLEAR'}
	| {type: 'EVALUATE'}
	| {type: 'ENTER_NUMBER'; number: string}
	| {type: 'ENTER_OPERATOR'; operator: string};

const calculatorInitialState: CalculatorState = {input: [], output: 0};

function calculatorReducer(state: CalculatorState, action: CalculatorActions) {
	const calculator = new Calculator([...state.input], state.output);

	switch (action.type) {
		case 'ENTER_NUMBER':
			return calculator.enterNumber(action.number);
		case 'ENTER_OPERATOR':
			return calculator.enterOperator(action.operator);
		case 'EVALUATE': {
			const result = calculator.evaluate();
			if (typeof result === 'number') return {...state, output: result};
			else return {...state, input: [result]};
		}
		case 'CLEAR':
			return calculator.clear();
		default:
			return state;
	}
}

// Component: Calculator
export default function Keypad() {
	const [{input, output}, calcDispatch] = useReducer(
		calculatorReducer,
		{input: ['1', '+', '12'], output: 0}, //testing input
		// calculatorInitialState,
	);

	function handleKeyClick(key: string) {
		if (isNumber(key)) calcDispatch({type: 'ENTER_NUMBER', number: key});
		else if (isOperator(key)) calcDispatch({type: 'ENTER_OPERATOR', operator: key});
		else if (key === '=') calcDispatch({type: 'EVALUATE'});
		else if (key === 'AC') calcDispatch({type: 'CLEAR'});
	}

	function formatNumber(value: number) {
		return value.toLocaleString('en', {maximumFractionDigits: 6});
	}

	return (
		<div className="calculator">
			<div className="display-input">{input.join(' ')}</div>
			<div className="display-output" id="display">
				{formatNumber(output)}
			</div>
			<KeypadButtons handleKeyClick={handleKeyClick} />
		</div>
	);
}

type KeypadButtonsProps = {handleKeyClick: (key: string) => void};
function KeypadButtons(props: KeypadButtonsProps) {
	const {handleKeyClick} = props;

	return (
		<div className="keypad">
			{[...KEYPAD_BUTTONS.entries()].map(([key, btn]) => (
				<button
					key={key}
					id={key}
					style={{gridArea: key}}
					data-type={btn.type}
					onClick={() => handleKeyClick(btn.value ?? btn.display)}
				>
					{btn.display}
				</button>
			))}
		</div>
	);
}

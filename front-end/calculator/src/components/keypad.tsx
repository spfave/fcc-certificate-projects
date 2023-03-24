import {useReducer} from 'react';

import {Calculator, isInputNumber, isInputOperator} from './calculator';

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
type KeypadState = {
	history: string[];
	display: string;
};
type KeypadActions =
	| {type: 'CLEAR'}
	| {type: 'EVALUATE'}
	| {type: 'ENTER_NUMBER'; number: string}
	| {type: 'ENTER_OPERATOR'; operator: string};

const keypadInitialState: KeypadState = {history: [], display: ''};

function calculatorReducer(state: KeypadState, action: KeypadActions) {
	const calculator = new Calculator([...state.history], state.display);

	switch (action.type) {
		case 'ENTER_NUMBER':
			return calculator.enterNumber(action.number);
		case 'ENTER_OPERATOR':
			return calculator.enterOperator(action.operator);
		case 'EVALUATE':
			return calculator.evaluate();
		case 'CLEAR':
			return calculator.clear();
		default:
			return state;
	}
}

// Component: Calculator
export default function Keypad() {
	const [{history, display}, calcDispatch] = useReducer(
		calculatorReducer,
		keypadInitialState,
	);

	function handleKeyClick(key: string) {
		if (isInputNumber(key)) calcDispatch({type: 'ENTER_NUMBER', number: key});
		else if (isInputOperator(key)) calcDispatch({type: 'ENTER_OPERATOR', operator: key});
		else if (key === '=') calcDispatch({type: 'EVALUATE'});
		else if (key === 'AC') calcDispatch({type: 'CLEAR'});
	}

	return (
		<div className="calculator">
			<div className="display-input">{history.join(' ')}</div>
			<div className="display-output" id="display">
				{display || '0'}
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

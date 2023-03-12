export const NUMBERS = '1234567890.';
export const OPERATORS = '+-*/';

function formatNumber(value: number, numDecimalPlaces = 6) {
	return value.toLocaleString('en', {maximumFractionDigits: numDecimalPlaces});
}
export function isInputNumber(item: string) {
	return NUMBERS.includes(item);
}
export function isInputOperator(item: string) {
	return OPERATORS.includes(item);
}

export class Calculator {
	#history: string[];
	#display: string;

	constructor(history: string[], display: string) {
		this.#history = history;
		this.#display = display;
	}

	enterNumber(number: string) {
		const lastInput = this.#getLastInput();

		// handle adding new number
		if (!lastInput || isInputOperator(lastInput)) {
			if (number === '.') this.#history.push('0.');
			else this.#history.push(number);
		}
		// handle appending to last number
		else if (!isNaN(parseFloat(lastInput))) {
			if (number === '.' && lastInput.includes('.')) null;
			else {
				const newNumber = lastInput.concat(number);
				this.#history.splice(-1, 1, newNumber);
			}
		}

		return {history: this.#history, display: this.#display};
	}

	enterOperator(operator: string) {
		const lastInput = this.#getLastInput();

		if (lastInput && isInputOperator(lastInput)) this.#history.splice(-1, 1, operator);
		else if (lastInput) this.#history.push(operator);
		else null;

		return {history: this.#history, display: this.#display};
	}

	evaluate() {
		try {
			const result = eval(this.#history.join(''));
			if (typeof result === 'number') {
				this.#history = this.#history.concat('=');
				this.#display = formatNumber(result);
			} else this.#display = 'NaN';
		} catch (error) {
			console.error(error);
			this.#display = 'Invalid computation';
		}
		return {history: this.#history, display: this.#display};
	}

	clear() {
		this.#history = [];
		this.#display = '0';
		return {history: this.#history, display: this.#display};
	}

	#getLastInput() {
		return this.#history.at(-1);
	}
}

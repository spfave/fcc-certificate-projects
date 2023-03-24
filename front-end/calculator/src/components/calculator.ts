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
		let lastInput = this.#getHistory();

		// handle new number on last result
		if (lastInput === '=') {
			this.clear();
			lastInput = this.#getHistory();
		}

		// handle adding new number
		if (!lastInput || isInputOperator(lastInput)) {
			this.#display = number === '.' ? '0.' : number;
			this.#history.push(this.#display);
		}
		// handle appending to existing number
		else {
			if (number === '0' && this.#display === '0') null;
			else if (number === '.' && this.#display.includes('.')) null;
			else {
				this.#display = this.#display.concat(number);
				this.#history.splice(-1, 1, this.#display);
			}
		}

		return {history: this.#history, display: this.#display};
	}

	enterOperator(operator: string) {
		let lastInput = this.#getHistory();

		// handle new operation on last result
		if (lastInput === '=') {
			this.#history = [this.#display];
			lastInput = this.#getHistory();
		}

		// handle updating operation
		if (lastInput && isInputOperator(lastInput)) {
			this.#display = operator;
			this.#history.splice(-1, 1, this.#display);
		}
		// handle adding new operation
		else if (lastInput) {
			this.#display = operator;
			this.#history.push(this.#display);
		}

		return {history: this.#history, display: this.#display};
	}

	evaluate() {
		// return early if already evaluated
		const lastInput = this.#getHistory();
		if (lastInput === '=') return {history: this.#history, display: this.#display};

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
		this.#display = '';
		return {history: this.#history, display: this.#display};
	}

	#getHistory(position = -1) {
		return this.#history.at(position);
	}
}

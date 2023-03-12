export const NUMBERS = '1234567890.';
export const OPERATORS = '+-*/';

export function isNumber(item: string) {
	return NUMBERS.includes(item);
}
export function isOperator(item: string) {
	return OPERATORS.includes(item);
}

export class Calculator {
	#input: string[];
	#output: number;

	constructor(input: string[], output: number) {
		this.#input = input;
		this.#output = output;
	}

	enterNumber(number: string) {
		const lastInput = this.#getLastInput();

		if (!lastInput || isOperator(lastInput)) this.#input.push(number);
		else if (lastInput && !isNaN(parseFloat(lastInput))) {
			if (number === '.' && lastInput.includes('.')) null;
			else {
				const newNumber = lastInput.concat(number);
				this.#input.splice(-1, 1, newNumber);
			}
		}

		return {input: this.#input, output: this.#output};
	}

	enterOperator(operator: string) {
		const lastInput = this.#getLastInput();

		if (lastInput && isOperator(lastInput)) this.#input.splice(-1, 1, operator);
		else if (lastInput) this.#input.push(operator);
		else null;

		return {input: this.#input, output: this.#output};
	}

	evaluate() {
		try {
			this.#output = eval(this.#input.join(''));
			if (typeof this.#output === 'number') return this.#output;
			return 'NaN';
		} catch (error) {
			console.error(error);
			return 'Invalid computation';
		}
	}

	clear() {
		this.#input = [];
		this.#output = 0;
		return {input: this.#input, output: this.#output};
	}

	#getLastInput() {
		return this.#input.at(-1);
	}
}

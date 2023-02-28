export class Calculator {
	#input: string;
	#output: number;

	constructor(input: string, output: number) {
		this.#input = input;
		this.#output = output;
	}

	// enterNumber() {}

	// enterOperator() {}

	evaluate() {
		try {
			this.#output = eval(this.#input);
			if (typeof this.#output === 'number') return this.#output;
			return 'NaN';
		} catch (error) {
			console.error(error);
			return 'Invalid computation';
		}
	}

	clear() {
		this.#input = '';
		this.#output = 0;
		return {input: this.#input, output: this.#output};
	}
}

import { describe, test, expect } from 'vitest';
import { render, screen, userEvent } from 'test-utils';
import { fireEvent } from '@testing-library/react';

import DrumMachine from './drum-machine';

const user = userEvent.setup();

describe('Drum Machine', () => {
	test('Render Component	', () => {
		render(<DrumMachine />);
	});

	test('Use drum machine', async () => {
		render(<DrumMachine />);

		const soundDisplay = screen.getByTestId('sound-display');

		// Click drum button
		const btnDrum = screen.getByRole('button', { name: 'Q' });
		await user.click(btnDrum);

		expect(soundDisplay).toHaveTextContent('Heater 1');

		// Adjust volume slider
		const volumeSlider = screen.getByRole('slider');
		expect(volumeSlider).toHaveValue(String(0.5));

		fireEvent.change(volumeSlider, { target: { value: 0.25 } });
		expect(volumeSlider).toHaveValue(String(0.25));

		// Use keydown event listener
		await user.keyboard('w');
		expect(soundDisplay).toHaveTextContent('Heater 2');
	});
});

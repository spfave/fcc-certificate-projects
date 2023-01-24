import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';

import QuoteCard from './quote-card';

describe('QuoteCard Component', () => {
	test('Render component', () => {
		render(<QuoteCard />);

		expect(screen.getByRole('button', {name: 'New Quote'})).toBeInTheDocument();
	});
});

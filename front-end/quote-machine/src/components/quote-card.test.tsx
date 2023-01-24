import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';

import QuoteCard from './quote-card';

describe('QuoteCard Component', () => {
	test('Render component', () => {
		render(<QuoteCard />);

		expect(screen.findByRole('button', {name: 'New Quote'}));
	});
});

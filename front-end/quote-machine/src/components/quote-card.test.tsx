import {describe, expect, test, vi, Mock} from 'vitest';
import {render, screen, userEvent, waitFor} from 'test-utils';

import QuoteCard, {QuoteData} from './quote-card';

/** Notes
 * https://www.leighhalliday.com/mock-fetch-jest
 * https://kentcdodds.com/blog/stop-mocking-fetch
 */

// Mock data
const mockQuoteData: QuoteData = {
	_id: 'ikwurijalue',
	content: 'This is the mock quote content',
	author: 'Mock Author',
	authorSlug: 'mock-author',
	length: 30,
	tags: ['test-quote'],
};

// Mock functions
const spyFetch = vi.spyOn(global, 'fetch') as Mock; // w/o type assertion requires full Response type for mock response value

// Tests
const user = userEvent.setup();
describe('QuoteCard Component with fetch mocked', () => {
	test('Render component', () => {
		render(<QuoteCard />);

		expect(screen.getByText('...fetching a quote')).toBeInTheDocument();
		expect(screen.getByRole('button', {name: 'New Quote'})).toBeInTheDocument();
	});

	test('Fetch quote on load', async () => {
		spyFetch.mockResolvedValueOnce({ok: true, json: async () => mockQuoteData});
		render(<QuoteCard />);

		expect(spyFetch).toHaveBeenCalledOnce();

		const btnNewQuote = screen.getByRole('button', {name: 'New Quote'});
		expect(btnNewQuote).toBeDisabled();

		expect(await screen.findByText(mockQuoteData.content)).toBeInTheDocument();
		expect(await screen.findByText(`- ${mockQuoteData.author}`)).toBeInTheDocument();
		expect(btnNewQuote).toBeEnabled();
	});

	test('Show error message on quote fetch non-ok response', async () => {
		spyFetch.mockResolvedValueOnce({ok: false, json: async () => ({})});
		render(<QuoteCard />);

		expect(await screen.findByText('Failed to retrieve quote')).toBeInTheDocument();
	});

	test('Show error message on quote fetch rejection', async () => {
		spyFetch.mockRejectedValueOnce({});
		render(<QuoteCard />);

		expect(await screen.findByText('Failed to retrieve quote')).toBeInTheDocument();
	});

	test('Fetch new quote on button click', async () => {
		spyFetch
			.mockResolvedValueOnce({ok: true, json: async () => mockQuoteData})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					...mockQuoteData,
					content: 'This is the second mock quote content',
					author: 'Second Author',
				}),
			});
		render(<QuoteCard />);
		expect(spyFetch).toHaveBeenCalledOnce();

		const btnNewQuote = screen.getByRole('button', {name: 'New Quote'});
		await waitFor(() => {
			expect(btnNewQuote).toBeEnabled();
		});

		user.click(btnNewQuote);
		await waitFor(() => {
			expect(btnNewQuote).toBeDisabled();
		});
		expect(spyFetch).toHaveBeenCalledTimes(2);

		const newQuote = await screen.findByText('This is the second mock quote content');
		expect(newQuote).toBeInTheDocument();
		expect(await screen.findByText(`- Second Author`)).toBeInTheDocument();
		expect(btnNewQuote).toBeEnabled();
	});
});

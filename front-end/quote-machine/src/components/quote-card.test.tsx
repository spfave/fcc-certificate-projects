import {describe, expect, test, vi, Mock, beforeAll, afterEach, afterAll} from 'vitest';
import {render, screen, userEvent, waitFor} from 'test-utils';
import {server, rest, mockMSWQuoteData} from '~/tests/server';

import QuoteCard, {QuoteData} from './quote-card';

/** Notes
 * https://www.leighhalliday.com/mock-fetch-jest
 * https://kentcdodds.com/blog/stop-mocking-fetch
 *
 * // MSW and node v18, TLDR: MSW is not currently compatible with node experiemntal fetch
 * https://github.com/mswjs/msw/issues/1388
 * https://github.com/mswjs/msw/discussions/1464
 * https://github.com/mswjs/msw/blob/feat/standard-api/MIGRATING.md
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

// Tests
const user = userEvent.setup();
describe('QuoteCard Component with fetch mocked', () => {
	// Mock fetch
	const spyFetch = vi.spyOn(global, 'fetch') as Mock; // w/o type assertion requires full Response type for mock response value

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

describe.skip('QuoteCard Componet with Mock Service Worker', () => {
	// Use cross-fetch to replace window.fetch in client to work with MSW
	// See notes above for additional details

	beforeAll(() => server.listen({onUnhandledRequest: 'error'}));
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('Fetch quote on load', async () => {
		server.use(
			rest.get('https://api.quotable.io/random', (_req, res, ctx) => {
				console.info(`HANDLER API QUOTE GET`); //LOG
				return res(ctx.status(200), ctx.json(mockMSWQuoteData));
			}),
		);
		render(<QuoteCard />);

		expect(await screen.findByText(mockMSWQuoteData.content)).toBeInTheDocument();
		expect(await screen.findByText(`- ${mockMSWQuoteData.author}`)).toBeInTheDocument();
	});

	test('Show error message on quote fetch rejection', async () => {
		server.use(
			rest.get('https://api.quotable.io/random', (_req, res, ctx) => {
				return res(ctx.status(404));
			}),
		);
		render(<QuoteCard />);

		expect(await screen.findByText('Failed to retrieve quote')).toBeInTheDocument();
	});
});

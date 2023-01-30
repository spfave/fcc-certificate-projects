import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {QuoteData} from '~/components/quote-card';

const mockMSWQuoteData: QuoteData = {
	_id: 'ikwurijalue',
	content: 'This is the MSW mock quote content',
	author: 'MSW Author',
	authorSlug: 'mock-author',
	length: 34,
	tags: ['test-quote'],
};

const handlers = [
	rest.get('https://api.quotable.io/random', (_req, res, ctx) => {
		return res(ctx.status(200), ctx.json(mockMSWQuoteData));
	}),
	rest.get('*', (req, res, ctx) => {
		console.error(`Please add request handler for ${req.url.toString()}`);
		return res(ctx.status(500), ctx.json({error: 'You must add a request handler.'}));
	}),
];
const server = setupServer(...handlers);

export {server, rest, mockMSWQuoteData};

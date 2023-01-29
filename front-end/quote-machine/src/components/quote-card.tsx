import {useCallback, useEffect, useState} from 'react';

import './quote-card.css';
import twitterSVG from '~/assets/icons8-twitter.svg';

// Model types
type Status = 'idle' | 'pending' | 'resolved' | 'error';
export type QuoteData = {
	_id: string;
	content: string; // Quote text
	author: string; // Full name of the author
	authorSlug: string; // `slug` of the quote author
	length: number; // Length of quote (number of characters)
	tags: string[]; // Array of tag names for quote
};
type Quote = Pick<QuoteData, 'content' | 'author'> & {tweet: string};

// Data fetching
const quoteUrl = 'https://api.quotable.io/random?maxLength=240'; //https://github.com/lukePeavey/quotable
async function getQuote(init?: RequestInit | undefined) {
	try {
		const response = await fetch(quoteUrl, init);
		const data = await response.json();
		if (!response.ok) throw data;
		return data as QuoteData;
	} catch (error) {
		console.error(error);
	}
}

// Utils
function formatQuote(qData: QuoteData): Quote {
	return {
		author: qData.author,
		content: qData.content,
		tweet: `"${qData.content}" \n - ${qData.author}`,
	};
}

// Component custom hook
function useQuote() {
	const [status, setStatus] = useState<Status>('idle');
	const [error, setError] = useState<string | null>(null);
	const [quote, setQuote] = useState<Quote>({
		content: '',
		author: '',
		tweet: '',
	});

	const handleGetNewQuote = useCallback(async (init?: RequestInit | undefined) => {
		setStatus('pending');
		setError(null);

		const qData = await getQuote(init);
		if (qData) {
			setQuote(formatQuote(qData));
			setStatus('resolved');
		} else {
			setError('Failed to retrieve quote');
			setStatus('error');
		}
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		handleGetNewQuote({signal: controller.signal});
		return () => controller.abort('cancel request');
	}, [handleGetNewQuote]);

	return {status, quote, handleGetNewQuote, error};
}

// Component
export default function QuoteCard() {
	const {status, quote, handleGetNewQuote, error} = useQuote();

	return (
		<div id="quote-box">
			{(status === 'idle' || status === 'pending') && (
				<p className="msg">...fetching a quote</p>
			)}
			{status === 'error' && <p className="msg">{error}</p>}
			{status === 'resolved' && (
				<div className="quote">
					<blockquote id="text">{quote.content}</blockquote>
					<cite id="author"> - {quote.author}</cite>
				</div>
			)}

			<div className="buttons">
				<button
					id="new-quote"
					className="btn"
					onClick={() => handleGetNewQuote()}
					disabled={status === 'pending'}
				>
					New Quote
				</button>
				<a
					id="tweet-quote"
					className="btn"
					href={`https://twitter.com/intent/tweet?text=${encodeURI(quote.tweet)}`}
					target="_blank"
					rel="noreferrer"
				>
					<img src={twitterSVG} alt="twitter icon" height={20} width={20} />
				</a>
			</div>
		</div>
	);
}

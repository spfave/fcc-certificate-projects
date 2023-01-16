import {useEffect, useState} from 'react';

import './quote-card.css';

type QuoteData = {
	_id: string;
	content: string; // Quote text
	author: string; // Full name of the author
	authorSlug: string; // `slug` of the quote author
	length: number; // Length of quote (number of characters)
	tags: string[]; // Array of tag names for quote
};
type Quote = Pick<QuoteData, 'content' | 'author'> & {tweet: string};

const quoteUrl = 'https://api.quotable.io/random?maxLength=240'; //https://github.com/lukePeavey/quotable
async function getQuote() {
	try {
		const response = await fetch(quoteUrl);
		const data = await response.json();
		if (!response.ok) throw data;
		return data as QuoteData;
	} catch (error) {
		console.error(error);
	}
}

function formatQuote(qData: QuoteData): Quote {
	return {
		author: qData.author,
		content: qData.content,
		tweet: `"${qData.content}" \n - ${qData.author}`,
	};
}

function useQuote() {
	const [quote, setQuote] = useState<Quote>({
		content: '...fetching a quote',
		author: '',
		tweet: '',
	});

	useEffect(() => {
		handleGetNewQuote();
	}, []);

	async function handleGetNewQuote() {
		const qData = await getQuote();
		qData ? setQuote(formatQuote(qData)) : null;
	}

	return {quote, handleGetNewQuote};
}

export default function QuoteCard() {
	const {quote, handleGetNewQuote} = useQuote();

	return (
		<div id="quote-box">
			<div className="quote">
				<blockquote id="text">{quote.content}</blockquote>
				<cite id="author"> - {quote.author}</cite>
			</div>

			<div className="buttons">
				<button id="new-quote" className="btn" onClick={handleGetNewQuote}>
					New Quote
				</button>
				<a
					id="tweet-quote"
					className="btn"
					href={`https://twitter.com/intent/tweet?text=${encodeURI(quote.tweet)}`}
					target="_blank"
					rel="noreferrer"
				>
					Tweet
				</a>
			</div>
		</div>
	);
}

import { useEffect, useState } from 'react';

import { FaTwitter } from 'react-icons/fa';

import './QuoteCard.scss';

export function QuoteCard() {
  const [quote, setQuote] = useState({
    author: '',
    text: '',
    tweet: '',
  });

  useEffect(() => {
    getQuote();
  }, []);

  async function getQuote() {
    // Fetch a random famous quote
    const quoteAPI =
      'https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous';
    const quoteParams = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.REACT_APP_QUOTE_API_HOST,
        'x-rapidapi-key': process.env.REACT_APP_QUOTE_API_KEY,
      },
    };
    const response = await fetch(quoteAPI, quoteParams);
    if (!response.ok) throw response.json();
    const quote = (await response.json())[0];
    setQuote({
      author: quote.author,
      text: quote.quote,
      tweet: `"${quote.quote}" \n - ${quote.author}`,
    });
  }

  return (
    <div id="quote-box">
      <div>
        <h1 id="text">
          <q>{quote.text}</q>
        </h1>
        <p id="author">- {quote.author}</p>
      </div>
      <div className="buttons">
        <button id="new-quote" className="btn" onClick={getQuote}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          className="btn-link"
          href={`https://twitter.com/intent/tweet?text=${encodeURI(
            quote.tweet,
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
      </div>
    </div>
  );
}

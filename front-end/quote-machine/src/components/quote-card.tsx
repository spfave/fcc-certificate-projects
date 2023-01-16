import './quote-card.css';

export default function QuoteCard() {
	const quote = {
		text: 'Lorem ipsum dolor sit veniam maxime facere nihil rem sapiente quidem quaerat quas error nisi nemo eius recusandae aperiam quam mollitia molestias similique. Dolor ipsam eos provident explicabo quasi non iure, consectetur, repellat inventore commodi dolores illo eligendi optio.',
		author: 'Author',
		tweet: `"quoted text" \n - Author`,
	};

	return (
		<div id="quote-box">
			<div className="quote">
				<blockquote id="text">{quote.text}</blockquote>
				<cite id="author"> - {quote.author}</cite>
			</div>

			<div className="buttons">
				<button id="new-quote" className="btn">
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

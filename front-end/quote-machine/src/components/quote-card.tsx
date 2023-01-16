import './quote-card.css';

export default function QuoteCard() {
	return (
		<div id="quote-box">
			<div className="quote">
				<blockquote id="text">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi cupiditate ab, at
					quo quam ratione maiores libero, nemo asperiores dolore eum quisquam harum
					quaerat ea nisi nam tempora atque rem.
				</blockquote>
				<cite id="author"> - Author</cite>
			</div>

			<div className="buttons">
				<button id="new-quote" className="btn">
					New Quote
				</button>
				<a
					id="tweet-quote"
					className="btn"
					// href=""
					target="_blank"
					rel="noreferrer"
				>
					Tweet
				</a>
			</div>
		</div>
	);
}

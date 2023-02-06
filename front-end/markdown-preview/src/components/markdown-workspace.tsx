import ReactMarkdown from 'react-markdown';

import MarkdownProvider, {useMarkdown, useMarkdownUpdate} from './markdown-provider';

import './markdown-workspace.css';
import {markdownStarter} from '~/assets/markdown-starter';

export default function MarkdownWorkspace() {
	return (
		<div className="markdown-workspace">
			<MarkdownProvider initialMarkdown={markdownStarter}>
				<MarkdownEditor />
				<MarkdownPreview />
			</MarkdownProvider>
		</div>
	);
}

function MarkdownEditor() {
	const markdown = useMarkdown();
	const updateMarkdwon = useMarkdownUpdate();

	return (
		<section className="markdown-section">
			<h2>Editor</h2>
			<div>
				<textarea
					id="editor"
					name="markdown"
					placeholder={markdownStarter}
					value={markdown}
					onChange={updateMarkdwon}
				>
					{markdown}
				</textarea>
			</div>
		</section>
	);
}

function MarkdownPreview() {
	const markdown = useMarkdown();

	return (
		<section className="markdown-section">
			<h2>Preview</h2>
			<div id="preview">
				<ReactMarkdown>{markdown}</ReactMarkdown>
			</div>
		</section>
	);
}

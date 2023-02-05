import ReactMarkdown from 'react-markdown';

import MarkdownProvider from './markdown-provider';

import './markdown-workspace.css';

export default function MarkdownWorkspace() {
	return (
		<div className="markdown-workspace">
			<MarkdownProvider initialMarkdown={''}>
				<MarkdownEditor />
				<MarkdownPreview />
			</MarkdownProvider>
		</div>
	);
}

function MarkdownEditor() {
	return (
		<section className="markdown-section">
			<h2>Editor</h2>
			<div>
				<textarea id="editor" name="markdown"></textarea>
			</div>
		</section>
	);
}

function MarkdownPreview() {
	return (
		<section className="markdown-section">
			<h2>Preview</h2>
			<div id="preview">
				<ReactMarkdown>{'test'}</ReactMarkdown>
			</div>
		</section>
	);
}

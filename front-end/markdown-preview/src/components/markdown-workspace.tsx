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
	return <section className="editor">Editor</section>;
}

function MarkdownPreview() {
	return <section className="preview">Preview</section>;
}

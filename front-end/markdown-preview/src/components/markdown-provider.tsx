import {createContext, useContext, useState} from 'react';

// Context definition
type MarkdownWorkspace = ReturnType<typeof useMarkdownWorkspace>;

const MarkdownContext = createContext<MarkdownWorkspace>({
	markdown: '',
	updateMarkdown: () => undefined,
});
MarkdownContext.displayName = 'Markdown Context';

// Custom hook
function useMarkdownWorkspace(initialMarkdown = '') {
	const [markdown, setMarkdown] = useState(initialMarkdown);

	function updateMarkdown(event: React.ChangeEvent<HTMLTextAreaElement>) {
		setMarkdown(event.target.value);
	}

	return {markdown, updateMarkdown};
}

// Provider component
type MarkdownProviderProps = React.PropsWithChildren<{initialMarkdown: string}>;

export default function MarkdownProvider(props: MarkdownProviderProps) {
	const {children, initialMarkdown} = props;

	return (
		<MarkdownContext.Provider value={useMarkdownWorkspace(initialMarkdown)}>
			{children}
		</MarkdownContext.Provider>
	);
}

// Context consumer hooks
export function useMarkdown() {
	const {markdown} = useContext(MarkdownContext);
	return markdown;
}

export function useMarkdownUpdate() {
	const {updateMarkdown} = useContext(MarkdownContext);
	return updateMarkdown;
}

import {describe, expect, test} from 'vitest';
import {render, screen, within, userEvent} from 'test-utils';

import MarkdownWorkspace from './markdown-workspace';
import {markdownStarter} from '~/assets/markdown-starter';

const user = userEvent.setup();

describe('Markdown Workspace', () => {
	test('Render component', () => {
		render(<MarkdownWorkspace />);

		const editor = screen.getByRole('textbox');
		const preview = screen.getByRole('document');

		expect(screen.getByRole('heading', {name: 'Editor'})).toBeInTheDocument();
		expect(screen.getByRole('heading', {name: 'Preview'})).toBeInTheDocument();
		expect(
			within(editor).getByText('Welcome to my React Markdown Previewer!', {exact: false}),
		).toBeInTheDocument();
		expect(
			within(preview).getByText('Welcome to my React Markdown Previewer!'),
		).toBeInTheDocument();
	});

	test('Update markdown input', async () => {
		render(<MarkdownWorkspace />);

		const editor = screen.getByRole('textbox');
		const preview = screen.getByRole('document');

		// Clear markdown editor
		await user.clear(editor);
		expect(preview).toBeEmptyDOMElement();

		// Type in markdown editor
		const testTextEntry = 'markdown type test';
		await user.type(editor, 'markdown type test');
		expect(editor).toHaveValue(testTextEntry);
		expect(within(preview).getByText(testTextEntry)).toBeInTheDocument();
	});
});

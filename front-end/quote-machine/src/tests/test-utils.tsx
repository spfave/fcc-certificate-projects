import {ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react';

// App providers for wrapping components in testing
// function TestAppProviders({children}: {children: React.ReactNode}) {
// 	return <Provider>{children}</Provider>;
// }

// Custom render function with App provider
function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
	return render(ui, {...options});
	// return render(ui, {wrapper: TestAppProviders, ...options});
}

// Re-export contents from React-Testing-Library and User-Event with custom render function
export * from '@testing-library/react';
export {default as userEvent} from '@testing-library/user-event';
export {customRender as render};

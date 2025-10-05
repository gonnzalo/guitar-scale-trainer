import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Custom render function that includes providers
function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => <ErrorBoundary>{children}</ErrorBoundary>,
    ...options
  });
}

// Re-export everything from testing library
export { customRender as render };
export { screen, waitFor, within, fireEvent } from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';

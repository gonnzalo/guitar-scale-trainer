import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎸💥</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                The app hit a wrong note. Don't worry, we can try again!
              </p>
            </div>

            {this.state.error && (
              <div className="mb-6">
                <details className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Error Details
                  </summary>
                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="font-mono text-sm text-red-600 dark:text-red-400 break-words">
                        {this.state.error.toString()}
                      </p>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-mono whitespace-pre-wrap break-words">
                          {this.state.errorInfo.componentStack}
                        </p>
                      </div>
                    )}
                  </div>
                </details>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Back to Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Reload Page
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>If this problem persists, try clearing your browser cache or checking the console for more details.</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

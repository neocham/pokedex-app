import React from 'react';
import { PerformanceMonitor } from '../services/PerformanceMonitor';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    PerformanceMonitor.mark('error-boundary-triggered');
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    
    // Log error details for debugging
    console.error('Pokemon App Error Boundary:', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      errorBoundary: this.constructor.name
    });

    // Report to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo);
    }
  }

  reportError = (error, errorInfo) => {
    // Implementation for error reporting service (Sentry, Bugsnag, etc.)
    console.log('Reporting error to service:', { error, errorInfo });
  };

  handleRetry = () => {
    PerformanceMonitor.mark('error-recovery-attempt');
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center" role="alert">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="ml-3 text-xl font-bold text-red-600">
                Something went wrong
              </h2>
            </div>
            
            <p className="text-gray-600 mb-4">
              We're sorry, but something unexpected happened. The error has been logged and our team will investigate.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={this.handleRetry}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Retry loading the application"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Refresh the entire page"
              >
                Refresh Page
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 p-4 bg-gray-50 rounded border">
                <summary className="cursor-pointer font-medium text-gray-700">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 text-xs text-gray-600 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
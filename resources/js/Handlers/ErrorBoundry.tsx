import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error occurred:", error);
        console.error("Error details:", errorInfo.componentStack);

        this.setState({ errorInfo });
    }

    render() {
        const { hasError, error, errorInfo } = this.state;

        if (hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
                    <h1 className="text-2xl font-bold mb-4">
                        Something went wrong!
                    </h1>
                    <p className="mb-2">
                        {error
                            ? `Error: ${error.message}`
                            : "An unknown error occurred."}
                    </p>
                    {errorInfo?.componentStack && (
                        <pre className="bg-gray-200 p-4 rounded text-sm overflow-x-auto">
                            {errorInfo.componentStack}
                        </pre>
                    )}
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => window.location.reload()}
                    >
                        Reload Application
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

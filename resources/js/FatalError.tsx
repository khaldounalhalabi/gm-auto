function FatalErrorPage({ error }: { error: Error }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            {/* Laravel logo style header */}
            <div className="mb-8 text-center">
                <svg
                    className="w-20 h-20 mx-auto text-red-600"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                >
                    <path d="M104 0l104 60v120L104 120 0 180V60zM208 60l104-60 104 60v120l-104 60-104-60zM0 240l104-60 104 60v120l-104 60-104-60zM312 180l104-60 104 60v120l-104 60-104-60z" />
                </svg>
                <h1 className="mt-4 text-3xl font-bold text-gray-800">
                    Oops! Something went wrong
                </h1>
                <p className="mt-2 text-gray-600">
                    An unexpected error occurred while loading the application.
                </p>
            </div>

            {/* Error card */}
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full">
                <h2 className="text-lg font-semibold text-red-600 mb-2">
                    {error.name || "Application Error"}
                </h2>
                <p className="text-gray-800 mb-4">{error.message}</p>
                <details className="bg-gray-50 rounded p-4 text-sm text-gray-700">
                    <summary className="cursor-pointer font-medium">
                        Trace
                    </summary>
                    <pre className="mt-2 whitespace-pre-wrap">
                        {error.stack}
                    </pre>
                </details>
            </div>

            {/* Reload button */}
            <button
                onClick={() => window.location.reload()}
                className="mt-8 bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg shadow"
            >
                Reload Application
            </button>
        </div>
    );
}

export default FatalErrorPage;

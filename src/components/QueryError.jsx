import { Button } from '@heroui/react'
import { AlertCircle, RefreshCw } from 'lucide-react'

const QueryError = ({
    height = '100vh',
    title = 'Query Failed',
    message = '',
    error = null,
    onRetry,
    isLoading = false,
    showRetry = true,
    showLogo = true,
}) => {
    const getErrorMessage = () => {
        if (message) return message

        if (!error) return 'An unexpected error occurred'

        if (error?.data?.message) {
            return error.data.message
        }
        if (error?.data?.errors) {
            return error.data.errors
        }
        if (error?.message) {
            return error.message
        }

        if (error?.status) {
            return `Error ${error.status}: ${error.statusText || 'Request failed'}`
        }

        return 'Unable to load data. Please try again.'
    }

    const containerStyle = {
        height: height.toString().includes('%') || height.toString().includes('vh')
            ? height
            : `${height}px`,
    }

    return (
        <div
            className="w-full flex flex-col items-center justify-center p-6"
            style={containerStyle}
        >
            {showLogo && (
                <img
                    src="/icons/darul-quran-logo.svg"
                    alt="Darul Quran"
                    className="w-32 h-32 mb-6 opacity-80"
                />
            )}

            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {title}
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    {getErrorMessage()}
                </p>

                {showRetry && onRetry && (
                    <Button
                        color="danger"
                        variant="solid"
                        onPress={onRetry}
                        isLoading={isLoading}
                        startContent={<RefreshCw className="w-4 h-4" />}
                        className="font-medium"
                    >
                        Try Again
                    </Button>
                )}

                {!showRetry && (
                    <p className="text-sm text-gray-500">
                        Please refresh the page or try again later
                    </p>
                )}
            </div>
        </div>
    )
}

/**
 * HOC to wrap RTK Query hooks with automatic error handling
 * @param {React.ComponentType} WrappedComponent - Component to wrap
 * @param {Function} useQueryHook - RTK Query hook to use
 * @param {Object} options - Configuration options
 * @returns {React.ComponentType} Wrapped component with error handling
 */
export function withQueryHandler(WrappedComponent, useQueryHook, options = {}) {
    return function QueryHandlerWrapper(props) {
        const {
            emptyText = 'No data available',
            loadingText = 'Loading...',
            showErrorPage = true,
            ...queryParams
        } = options

        const { data, error, isLoading, refetch } = useQueryHook(queryParams)

        if (isLoading) {
            if (options.LoaderComponent) {
                const Loader = options.LoaderComponent
                return <Loader text={loadingText} />
            }
            return (
                <div className="h-screen flex items-center justify-center">
                    <p className="text-gray-600">{loadingText}</p>
                </div>
            )
        }

        if (error) {
            if (!showErrorPage) {
                return <WrappedComponent {...props} data={data} error={error} refetch={refetch} />
            }
            return (
                <QueryError
                    error={error}
                    onRetry={refetch}
                    height={options.height || '100vh'}
                />
            )
        }

        if (!data || (Array.isArray(data) && data.length === 0)) {
            return (
                <div className="h-screen flex items-center justify-center">
                    <p className="text-gray-600">{emptyText}</p>
                </div>
            )
        }

        return <WrappedComponent {...props} data={data} refetch={refetch} />
    }
}

/**
 * Hook-based error handler for RTK Query
 * @param {Object} queryResult - Result from RTK Query hook
 * @param {Object} options - Configuration options
 * @returns {Object} { showError, errorComponent, isLoading, data, refetch }
 */
export function useQueryErrorHandler(
    queryResult,
    options = {}
) {
    const { data, error, isLoading, refetch } = queryResult
    const {
        height = '100vh',
        title,
        message,
        showRetry = true,
    } = options

    if (isLoading) {
        return {
            isLoading: true,
            showError: false,
            errorComponent: null,
            data: null,
            refetch,
        }
    }

    if (error) {
        return {
            isLoading: false,
            showError: true,
            errorComponent: (
                <QueryError
                    height={height}
                    title={title}
                    message={message}
                    error={error}
                    onRetry={showRetry ? refetch : undefined}
                    showRetry={showRetry}
                />
            ),
            data: null,
            refetch,
        }
    }

    return {
        isLoading: false,
        showError: false,
        errorComponent: null,
        data,
        refetch,
    }
}

export default QueryError

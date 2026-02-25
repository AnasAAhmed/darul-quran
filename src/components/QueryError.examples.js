/**
 * QueryError Component Usage Examples
 * 
 * The QueryError component handles RTK Query errors with:
 * - Adjustable height (default: 100vh for full page)
 * - Dynamic error messages
 * - Website theme (green/success colors from Loader)
 * - Darul Quran logo
 * - Optional retry functionality
 */

// ============================================================================
// EXAMPLE 1: Basic Usage in a Component
// ============================================================================

import { useGetCoursesQuery } from '@/redux/api/courses'
import QueryError from '@/components/QueryError'

function CourseList() {
    const { data, error, isLoading, refetch } = useGetCoursesQuery()

    if (isLoading) {
        return <Loader text="Loading courses..." />
    }

    if (error) {
        return (
            <QueryError
                error={error}
                onRetry={refetch}
                title="Failed to Load Courses"
            />
        )
    }

    return (
        <div>
            {/* Render your courses */}
        </div>
    )
}


// ============================================================================
// EXAMPLE 2: Using with Custom Height (for partial page areas)
// ============================================================================

import { useGetStudentQuery } from '@/redux/api/user'
import QueryError from '@/components/QueryError'

function StudentCard() {
    const { data, error, isLoading, refetch } = useGetStudentQuery()

    if (error) {
        return (
            <QueryError
                height="300px"  // Fixed pixel height
                error={error}
                onRetry={refetch}
                showLogo={false}  // Hide logo for smaller areas
            />
        )
    }

    return <div>{/* Render student card */}</div>
}


// ============================================================================
// EXAMPLE 3: Using Percentage Height
// ============================================================================

import { useGetDashboardQuery } from '@/redux/api/dashboard'
import QueryError from '@/components/QueryError'

function DashboardOverview() {
    const { data, error, isLoading, refetch } = useGetDashboardQuery()

    if (error) {
        return (
            <QueryError
                height="80vh"  // 80% of viewport height
                error={error}
                onRetry={refetch}
                title="Dashboard Load Error"
                message="Unable to fetch dashboard data"
            />
        )
    }

    return <div>{/* Render dashboard */}</div>
}


// ============================================================================
// EXAMPLE 4: Using the HOC (Higher Order Component)
// ============================================================================

import { useGetCoursesQuery } from '@/redux/api/courses'
import { withQueryHandler } from '@/components/QueryError'
import Loader from '@/components/Loader'

function CourseList({ data, refetch }) {
    return (
        <div>
            <h1>Courses</h1>
            {/* Render courses from data */}
        </div>
    )
}

export default withQueryHandler(CourseList, useGetCoursesQuery, {
    height: '100vh',
    loadingText: 'Loading courses...',
    emptyText: 'No courses available',
    LoaderComponent: Loader,
})


// ============================================================================
// EXAMPLE 5: Using the Hook-based Handler
// ============================================================================

import { useGetAnnouncementsQuery } from '@/redux/api/announcements'
import { useQueryErrorHandler } from '@/components/QueryError'
import Loader from '@/components/Loader'

function AnnouncementsPage() {
    const queryResult = useGetAnnouncementsQuery()
    
    const { isLoading, showError, errorComponent, data, refetch } = 
        useQueryErrorHandler(queryResult, {
            height: '100vh',
            title: 'Announcements Error',
        })

    if (isLoading) {
        return <Loader text="Loading announcements..." />
    }

    if (showError) {
        return errorComponent
    }

    return (
        <div>
            {/* Render announcements from data */}
        </div>
    )
}


// ============================================================================
// EXAMPLE 6: Without Retry Button (for non-retryable errors)
// ============================================================================

import { useGetCourseQuery } from '@/redux/api/courses'
import QueryError from '@/components/QueryError'

function CourseDetail({ courseId }) {
    const { data, error, isLoading } = useGetCourseQuery(courseId)

    if (error && error.status === 404) {
        return (
            <QueryError
                error={error}
                title="Course Not Found"
                message="The course you're looking for doesn't exist or has been removed"
                showRetry={false}  // Don't show retry for 404 errors
                height="100vh"
            />
        )
    }

    return <div>{/* Render course details */}</div>
}


// ============================================================================
// EXAMPLE 7: Inline in Card/Section (Small Height)
// ============================================================================

import { useGetAttendanceQuery } from '@/redux/api/attendance'
import QueryError from '@/components/QueryError'

function AttendanceCard() {
    const { data, error, isLoading, refetch } = useGetAttendanceQuery()

    return (
        <div className="card">
            <h3>Attendance</h3>
            {error ? (
                <QueryError
                    height="200px"
                    error={error}
                    onRetry={refetch}
                    showLogo={false}
                    title="Load Failed"
                />
            ) : (
                /* Render attendance data */
            )}
        </div>
    )
}


// ============================================================================
// PROP REFERENCE
// ============================================================================

/**
 * QueryError Props:
 * 
 * @prop {string|number} height - Container height (default: '100vh')
 *                            - Accepts: '100vh', '50%', '300px', etc.
 * 
 * @prop {string} title - Error title (default: 'Query Failed')
 * 
 * @prop {string} message - Custom error message (overrides error.message)
 * 
 * @prop {Object} error - RTK Query error object
 * 
 * @prop {Function} onRetry - Callback function for retry button
 * 
 * @prop {boolean} showRetry - Show/hide retry button (default: true)
 * 
 * @prop {boolean} showLogo - Show/hide Darul Quran logo (default: true)
 */


/**
 * withQueryHandler Options:
 * 
 * @prop {string} height - Height for error page
 * @prop {string} loadingText - Text shown during loading
 * @prop {string} emptyText - Text shown when no data
 * @prop {boolean} showErrorPage - Show error page or pass error to component
 * @prop {Component} LoaderComponent - Custom loader component
 */


/**
 * useQueryErrorHandler Options:
 * 
 * @prop {string} height - Height for error component
 * @prop {string} title - Custom error title
 * @prop {string} message - Custom error message
 * @prop {boolean} showRetry - Show retry button
 */

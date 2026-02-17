import { Spinner } from '@heroui/react'

const Loader = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <img
                src="/icons/darul-quran-logo.svg"
                alt="Darul Quran"
                className=" w-36 h-36"
            />
            <Spinner size="lg" variant="dots" labelColor="success" color="success" />
        </div>
    )
}
// FormOverlayLoader.tsx
export function FormOverlayLoader({ loading = false, loadingText = "Loading..." }) {
    if (!loading) return null;

    return (
        <div className="absolute inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-center rounded-xl z-50">
            <Spinner color='success' label={loadingText} labelColor='success' size='lg' />
        </div>
    );
}

export default Loader

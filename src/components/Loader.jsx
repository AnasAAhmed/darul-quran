import { Spinner } from '@heroui/react'
import React from 'react'

const Loader = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <Spinner size="lg" label={"Loading..."} labelColor="success" color="success" />
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

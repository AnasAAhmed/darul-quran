import { Spinner } from '@heroui/react'
import React from 'react'

const Loader = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <Spinner size="lg" label={"Loading..."} labelColor="success" color="success" />
        </div>
    )
}

export default Loader

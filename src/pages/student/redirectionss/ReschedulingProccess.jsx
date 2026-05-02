import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ReschedulingProccess = () => {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const action = queryParams.get("action");
        const scheduleId = queryParams.get("scheduleId");

        if (action === "deny" && scheduleId) {
            
        }
    }, [location.search, navigate]);

    return (
        <div>ReschedulingProccess</div>
    )
}

export default ReschedulingProccess
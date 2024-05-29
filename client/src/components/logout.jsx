import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = () => {
            localStorage.removeItem("token");
            navigate('/');
            window.location.reload();
        };

        handleLogout();
    }, [navigate]);

    return null; // No need to render anything
};

export default Logout;

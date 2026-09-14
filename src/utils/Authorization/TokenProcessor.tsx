import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../../contexts/Auth/useAuth';

const TokenProcessor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const isNewUser = searchParams.get('isNewUser') === 'true';

        if (!accessToken || !refreshToken) {
            navigate('/login?error=true', { replace: true });
            return;
        }

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);

        login();

        if (isNewUser) {
            navigate('/onboarding/nickname', { replace: true });
            return;
        }

        navigate('/home', { replace: true });
    }, [location.search, login, navigate]);

    return <></>;
};

export default TokenProcessor;
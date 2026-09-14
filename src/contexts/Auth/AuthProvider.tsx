import { useCallback, useState } from 'react';

import AuthContext from './AuthContext';
import type { AuthProviderProps } from './AuthContext.types';

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => Boolean(sessionStorage.getItem('accessToken')),
    );

    const login = useCallback(() => {
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');

        setIsAuthenticated(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
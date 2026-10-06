import { createContext } from 'react';

import type { AuthContextType } from './AuthContext.types';

const defaultContext: AuthContextType = {
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export default AuthContext;
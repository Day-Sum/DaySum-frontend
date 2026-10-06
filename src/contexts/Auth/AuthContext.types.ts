import type { ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export type {
    AuthContextType,
    AuthProviderProps,
};
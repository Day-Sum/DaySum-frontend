import { createBrowserRouter, Navigate } from 'react-router-dom';

import AppLayout from './layouts/AppLayout/AppLayout';
import ProtectedLayout from './layouts/ProtectedLayout';

import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import NicknamePage from './pages/Onboarding/NicknamePage';

import TokenProcessor from './utils/Authorization/TokenProcessor';

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/home" replace />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/loginwait',
                element: <TokenProcessor />,
            },
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        path: '/home',
                        element: <HomePage />,
                    },
                    {
                        path: '/onboarding/nickname',
                        element: <NicknamePage />,
                    },
                ],
            },
        ],
    },
]);

export default router;
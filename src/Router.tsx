import { createBrowserRouter, Navigate } from 'react-router-dom';

import AppLayout from './layouts/AppLayout/AppLayout';
import ProtectedLayout from './layouts/ProtectedLayout';

import DrawingPage from './pages/Drawing/DrawingPage';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import CoupleInvitePage from './pages/Onboarding/CoupleInvitePage';
import NicknamePage from './pages/Onboarding/NicknamePage';
import RelationshipStartDatePage from './pages/Onboarding/RelationshipStartDatePage';

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
                        path: '/drawing',
                        element: <DrawingPage />,
                    },
                    {
                        path: '/onboarding/nickname',
                        element: <NicknamePage />,
                    },
                    {
                        path: '/onboarding/start-date',
                        element: <RelationshipStartDatePage />,
                    },
                    {
                        path: '/onboarding/invite',
                        element: <CoupleInvitePage />,
                    },
                ],
            },
        ],
    },
]);

export default router;

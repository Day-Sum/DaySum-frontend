import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { REISSUE } from '../../constants/endPoint';

interface ErrorResponse {
    code: string;
}

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

interface ReissueResponse {
    data: TokenResponse;
}

interface RetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError<ErrorResponse>) => {
        const originalConfig = error.config as RetryConfig | undefined;

        if (!originalConfig) {
            return Promise.reject(error);
        }

        if (
            error.response?.status === 401 &&
            error.response.data?.code === 'TOKEN_EXPIRED' &&
            !originalConfig._retry
        ) {
            originalConfig._retry = true;

            try {
                const accessToken =
                    sessionStorage.getItem('accessToken');

                const refreshToken =
                    sessionStorage.getItem('refreshToken');

                if (!accessToken || !refreshToken) {
                    sessionStorage.clear();
                    window.location.href = '/login';

                    return Promise.reject(error);
                }

                const response = await axios.post<ReissueResponse>(
                    BASE_URL + REISSUE,
                    {
                        accessToken,
                        refreshToken,
                    },
                );

                const newAccessToken =
                    response.data.data.accessToken;

                const newRefreshToken =
                    response.data.data.refreshToken;

                sessionStorage.setItem(
                    'accessToken',
                    newAccessToken,
                );

                sessionStorage.setItem(
                    'refreshToken',
                    newRefreshToken,
                );

                originalConfig.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return apiClient.request(originalConfig);
            } catch (reissueError) {
                sessionStorage.clear();
                window.location.href = '/login';

                return Promise.reject(reissueError);
            }
        }

        if (error.response?.status === 401) {
            sessionStorage.clear();
            window.location.href = '/login';
        }

        return Promise.reject(error);
    },
);

export default apiClient;
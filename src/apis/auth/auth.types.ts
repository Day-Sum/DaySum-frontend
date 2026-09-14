interface ApiResponse<T> {
    status: number;
    message: string;
    code: string;
    timestamp: string;
    data: T;
}

interface SignupRequest {
    nickname: string;
}

interface UserResponse {
    userId: number;
    email: string;
    nickname: string;
    socialType: string;
    createdTime: string;
}

interface TokenResponse {
    grantType: string;
    accessToken: string;
    accessTokenExpiresIn: number;
    refreshToken: string;
}

interface SignupResponse {
    userResponseDto: UserResponse;
    tokenResponseDto: TokenResponse;
}

export type {
    ApiResponse,
    SignupRequest,
    SignupResponse,
    TokenResponse,
    UserResponse,
};

interface ApiResponse<T> {
    status: number;
    message: string;
    code: string;
    timestamp: string;
    data: T;
}

interface CurrentActivity {
    activity: string;
    startedAt?: string;
    endedAt?: string | null;
}

interface SaveActivityRequest {
    activity: string;
}

interface SaveActivityResponse {
    currentActivity: CurrentActivity | null;
}

export type {
    ApiResponse,
    CurrentActivity,
    SaveActivityRequest,
    SaveActivityResponse,
};

interface ApiResponse<T> {
    status: number;
    message: string;
    code: string;
    timestamp: string;
    data: T;
}

interface UpdateMoodRequest {
    mood: string;
}

interface UpdateMoodResponse {
    mood: string;
    version: number;
}

export type {
    ApiResponse,
    UpdateMoodRequest,
    UpdateMoodResponse,
};

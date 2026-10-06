interface ApiResponse<T> {
    status: number;
    message: string;
    code: string;
    timestamp: string;
    data: T;
}

interface DrawingResponse {
    drawingObjectKey: string;
    version: number;
}

export type {
    ApiResponse,
    DrawingResponse,
};

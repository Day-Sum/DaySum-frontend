interface ApiResponse<T> {
    status: number;
    message: string;
    code: string;
    timestamp: string;
    data: T;
}

interface CoupleStatusResponse {
    connected: boolean;
    coupleId: number | null;
}

interface CoupleProfileResponse {
    coupleId: number;
    partnerUserId: number;
    partnerNickname: string;
    relationshipStartedOn: string;
    dayCount: number;
}

interface ConnectCodeResponse {
    connectCode: string | null;
}

interface ConnectCoupleRequest {
    connectCode: string;
    relationshipStartedOn: string;
}

interface ConnectCoupleResponse {
    coupleId: number;
    partnerUserId: number;
    partnerNickname: string;
    relationshipStartedOn: string;
}

export type {
    ApiResponse,
    CoupleProfileResponse,
    CoupleStatusResponse,
    ConnectCodeResponse,
    ConnectCoupleRequest,
    ConnectCoupleResponse,
};

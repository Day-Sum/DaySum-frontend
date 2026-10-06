interface ApiResponse<T> {
    status: number;
    message: string;
    code: string;
    timestamp: string;
    data: T;
}

interface MusicInfo {
    provider: string;
    trackId: string;
    title: string;
    artist: string;
    artworkUrl: string | null;
    storeUrl: string | null;
    previewUrl: string | null;
}

interface MusicSearchResponse {
    musics: MusicInfo[];
}

type UpdateTodayMusicRequest = MusicInfo;

interface MusicResponse extends MusicInfo {
    version: number;
}

export type {
    ApiResponse,
    MusicInfo,
    MusicResponse,
    MusicSearchResponse,
    UpdateTodayMusicRequest,
};

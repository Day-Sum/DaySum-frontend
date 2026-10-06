import type { CurrentActivity } from '../activity/activity.types';
import type { MusicInfo } from '../music/music.types';

interface ApiResponse<T> {
    status: number;
    message: string;
    code: string;
    timestamp: string;
    data: T;
}

interface PartnerTodayResponse {
    mood: string | null;
    photoObjectKey: string | null;
    drawingObjectKey: string | null;
    diaryShared: boolean;
    music: MusicInfo | null;
    currentActivity: CurrentActivity | null;
}

export type {
    ApiResponse,
    PartnerTodayResponse,
};

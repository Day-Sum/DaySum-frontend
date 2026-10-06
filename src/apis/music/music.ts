import ApiBuilder from '../config/builder/ApiBuilder';
import type {
    ApiResponse,
    MusicResponse,
    MusicSearchResponse,
    UpdateTodayMusicRequest,
} from './music.types';

const END_POINT = {
    SEARCH: '/music/search',
    TODAY_MUSIC: '/daily-records/today/music',
};

const searchMusic = (query: string) => {
    return ApiBuilder.create<void, ApiResponse<MusicSearchResponse>>(
        END_POINT.SEARCH,
    )
        .setMethod('GET')
        .setParams({ query });
};

const updateTodayMusic = () => {
    return ApiBuilder.create<
        UpdateTodayMusicRequest,
        ApiResponse<MusicResponse>
    >(END_POINT.TODAY_MUSIC).setMethod('PUT');
};

const deleteTodayMusic = () => {
    return ApiBuilder.create<void, ApiResponse<void>>(
        END_POINT.TODAY_MUSIC,
    ).setMethod('DELETE');
};

export {
    deleteTodayMusic,
    searchMusic,
    updateTodayMusic,
};

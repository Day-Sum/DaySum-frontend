import ApiBuilder from '../config/builder/ApiBuilder';
import type {
    ApiResponse,
    UpdateMoodRequest,
    UpdateMoodResponse,
} from './mood.types';

const END_POINT = {
    TODAY_MOOD: '/daily-records/today/mood',
};

const updateTodayMood = () => {
    return ApiBuilder.create<
        UpdateMoodRequest,
        ApiResponse<UpdateMoodResponse>
    >(END_POINT.TODAY_MOOD).setMethod('PUT');
};

export { updateTodayMood };

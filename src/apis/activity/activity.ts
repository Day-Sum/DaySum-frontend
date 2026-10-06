import ApiBuilder from '../config/builder/ApiBuilder';
import type {
    ApiResponse,
    SaveActivityRequest,
    SaveActivityResponse,
} from './activity.types';

const END_POINT = {
    ACTIVITIES: '/activities',
    CURRENT_ACTIVITY: '/activities/current',
};

const saveCurrentActivity = () => {
    return ApiBuilder.create<
        SaveActivityRequest,
        ApiResponse<SaveActivityResponse>
    >(END_POINT.ACTIVITIES).setMethod('PUT');
};

const clearCurrentActivity = () => {
    return ApiBuilder.create<void, ApiResponse<void>>(
        END_POINT.CURRENT_ACTIVITY,
    ).setMethod('DELETE');
};

export {
    clearCurrentActivity,
    saveCurrentActivity,
};

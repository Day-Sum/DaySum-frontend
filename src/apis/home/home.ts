import ApiBuilder from '../config/builder/ApiBuilder';
import type {
    ApiResponse,
    HomeResponse,
} from './home.types';

const END_POINT = {
    HOME: '/home',
};

const getHome = () => {
    return ApiBuilder.create<void, ApiResponse<HomeResponse>>(
        END_POINT.HOME,
    ).setMethod('GET');
};

export {
    getHome,
};

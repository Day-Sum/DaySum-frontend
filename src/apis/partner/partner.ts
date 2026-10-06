import ApiBuilder from '../config/builder/ApiBuilder';
import type {
    ApiResponse,
    PartnerTodayResponse,
} from './partner.types';

const END_POINT = {
    TODAY: '/partner/today',
};

const getPartnerToday = () => {
    return ApiBuilder.create<void, ApiResponse<PartnerTodayResponse>>(
        END_POINT.TODAY,
    ).setMethod('GET');
};

export { getPartnerToday };

import ApiBuilder from '../config/builder/ApiBuilder';
import type {
    ApiResponse,
    CoupleProfileResponse,
    CoupleStatusResponse,
    ConnectCodeResponse,
    ConnectCoupleRequest,
    ConnectCoupleResponse,
} from './couple.types';

const END_POINT = {
    COUPLE: '/couples',
    STATUS: '/couples/status',
    CONNECT_CODE: '/couples/connect-code',
};


const getCoupleStatus = () => {
    return ApiBuilder.create<void, ApiResponse<CoupleStatusResponse>>(
        END_POINT.STATUS,
    ).setMethod('GET');
};

const getCoupleProfile = () => {
    return ApiBuilder.create<void, ApiResponse<CoupleProfileResponse>>(
        END_POINT.COUPLE,
    ).setMethod('GET');
};

const getConnectCode = () => {
    return ApiBuilder.create<void, ApiResponse<ConnectCodeResponse>>(
        END_POINT.CONNECT_CODE,
    ).setMethod('GET');
};

const reissueConnectCode = () => {
    return ApiBuilder.create<void, ApiResponse<ConnectCodeResponse>>(
        END_POINT.CONNECT_CODE,
    ).setMethod('POST');
};

const connectCouple = () => {
    return ApiBuilder.create<
        ConnectCoupleRequest,
        ApiResponse<ConnectCoupleResponse>
    >(END_POINT.COUPLE).setMethod('POST');
};

export {
    connectCouple,
    getCoupleProfile,
    getCoupleStatus,
    getConnectCode,
    reissueConnectCode,
};

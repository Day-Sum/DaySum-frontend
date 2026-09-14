import ApiBuilder from '../config/builder/ApiBuilder';
import type {
    ApiResponse,
    ConnectCodeResponse,
    ConnectCoupleRequest,
    ConnectCoupleResponse,
} from './couple.types';

const END_POINT = {
    COUPLE: '/couples',
    CONNECT_CODE: '/couples/connect-code',
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
    getConnectCode,
    reissueConnectCode,
};

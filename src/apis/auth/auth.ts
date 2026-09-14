import ApiBuilder from '../config/builder/ApiBuilder';
import type {
    ApiResponse,
    SignupRequest,
    SignupResponse,
} from './auth.types';

const END_POINT = {
    SIGNUP: '/signup',
};

const signup = () => {
    return ApiBuilder.create<SignupRequest, ApiResponse<SignupResponse>>(
        END_POINT.SIGNUP,
    ).setMethod('PUT');
};

export {
    signup,
};

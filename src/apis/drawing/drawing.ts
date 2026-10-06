import ApiBuilder from '../config/builder/ApiBuilder';
import type {
    ApiResponse,
    DrawingResponse,
} from './drawing.types';

const END_POINT = {
    TODAY_DRAWING: '/daily-records/today/drawing',
};

const updateTodayDrawing = () => {
    return ApiBuilder.create<FormData, ApiResponse<DrawingResponse>>(
        END_POINT.TODAY_DRAWING,
    ).setMethod('PUT');
};

export {
    updateTodayDrawing,
};

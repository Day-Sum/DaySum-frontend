import {
    type PointerEvent as ReactPointerEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { useApiMutation } from '../../apis/config/builder/ApiBuilder';
import { updateTodayDrawing } from '../../apis/drawing/drawing';
import { queryClient } from '../../QueryClient';
import * as S from './DrawingPage.styles';

type Point = { x: number; y: number };
type Stroke = { points: Point[] };

const HOME_QUERY_KEY = ['home'];
const DRAWING_PREVIEW_STORAGE_KEY = 'daysum:today-drawing-preview';
const EXPORT_SIZE = 1200;

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
);

const UndoIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 8 5 12l4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="M6 12h6.2c3.5 0 5.8 1.9 5.8 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
);

const RedoIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m15 8 4 4-4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="M18 12h-6.2C8.3 12 6 13.9 6 17" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
);

const DrawingPage = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const drawingRef = useRef(false);
    const activeStrokeRef = useRef<Stroke | null>(null);
    const pendingPreviewRef = useRef<string | null>(null);

    const [strokes, setStrokes] = useState<Stroke[]>([]);
    const [redoStrokes, setRedoStrokes] = useState<Stroke[]>([]);

    const drawingMutation = useApiMutation(updateTodayDrawing(), {
        onSuccess: async () => {
            if (pendingPreviewRef.current) {
                window.sessionStorage.setItem(
                    DRAWING_PREVIEW_STORAGE_KEY,
                    pendingPreviewRef.current,
                );
            }

            await queryClient.invalidateQueries({ queryKey: HOME_QUERY_KEY });
            navigate('/home', {
                replace: true,
                state: { showDrawingPreview: true },
            });
        },
    });

    const configureContext = (context: CanvasRenderingContext2D) => {
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = '#3f3129';
        context.fillStyle = '#3f3129';
        context.lineWidth = 3.2;
    };

    const drawStroke = useCallback((context: CanvasRenderingContext2D, stroke: Stroke, width: number, height: number) => {
        if (stroke.points.length === 0) return;

        const first = stroke.points[0];

        if (stroke.points.length === 1) {
            context.beginPath();
            context.arc(first.x * width, first.y * height, context.lineWidth / 2, 0, Math.PI * 2);
            context.fill();
            return;
        }

        context.beginPath();
        context.moveTo(first.x * width, first.y * height);

        for (let index = 1; index < stroke.points.length; index += 1) {
            const point = stroke.points[index];
            context.lineTo(point.x * width, point.y * height);
        }

        context.stroke();
    }, []);

    const renderCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const dpr = window.devicePixelRatio || 1;
        const width = Math.round(rect.width * dpr);
        const height = Math.round(rect.height * dpr);

        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        const context = canvas.getContext('2d');
        if (!context) return;

        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.clearRect(0, 0, rect.width, rect.height);
        configureContext(context);

        strokes.forEach((stroke) => drawStroke(context, stroke, rect.width, rect.height));
    }, [drawStroke, strokes]);

    useEffect(() => {
        renderCanvas();

        const canvas = canvasRef.current;
        if (!canvas) return;

        const observer = new ResizeObserver(renderCanvas);
        observer.observe(canvas);

        return () => observer.disconnect();
    }, [renderCanvas]);

    const getPoint = (event: ReactPointerEvent<HTMLCanvasElement>): Point | null => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const rect = canvas.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return null;

        return {
            x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
            y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
        };
    };

    const startDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        if (drawingMutation.isPending) return;

        const canvas = canvasRef.current;
        const point = getPoint(event);
        if (!canvas || !point) return;

        drawingRef.current = true;
        activeStrokeRef.current = { points: [point] };
        setRedoStrokes([]);
        canvas.setPointerCapture(event.pointerId);
    };

    const draw = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        if (!drawingRef.current) return;

        const canvas = canvasRef.current;
        const stroke = activeStrokeRef.current;
        const point = getPoint(event);
        if (!canvas || !stroke || !point) return;

        const previousPoint = stroke.points[stroke.points.length - 1];
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const context = canvas.getContext('2d');
        if (!previousPoint || !context) return;

        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        configureContext(context);
        context.beginPath();
        context.moveTo(previousPoint.x * rect.width, previousPoint.y * rect.height);
        context.lineTo(point.x * rect.width, point.y * rect.height);
        context.stroke();
        stroke.points.push(point);
    };

    const stopDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        if (!drawingRef.current) return;

        const canvas = canvasRef.current;
        const stroke = activeStrokeRef.current;
        drawingRef.current = false;
        activeStrokeRef.current = null;

        if (canvas?.hasPointerCapture(event.pointerId)) {
            canvas.releasePointerCapture(event.pointerId);
        }

        if (!stroke || stroke.points.length === 0) return;
        setStrokes((current) => [...current, stroke]);
    };

    const undo = () => {
        setStrokes((current) => {
            const lastStroke = current[current.length - 1];
            if (!lastStroke) return current;
            setRedoStrokes((redoCurrent) => [...redoCurrent, lastStroke]);
            return current.slice(0, -1);
        });
    };

    const redo = () => {
        setRedoStrokes((current) => {
            const lastStroke = current[current.length - 1];
            if (!lastStroke) return current;
            setStrokes((strokeCurrent) => [...strokeCurrent, lastStroke]);
            return current.slice(0, -1);
        });
    };

    const saveDrawing = () => {
        if (strokes.length === 0 || drawingMutation.isPending) return;

        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = EXPORT_SIZE;
        exportCanvas.height = EXPORT_SIZE;

        const context = exportCanvas.getContext('2d');
        if (!context) return;

        context.fillStyle = '#fffdf8';
        context.fillRect(0, 0, EXPORT_SIZE, EXPORT_SIZE);
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = '#3f3129';
        context.fillStyle = '#3f3129';
        context.lineWidth = 11;

        strokes.forEach((stroke) => drawStroke(context, stroke, EXPORT_SIZE, EXPORT_SIZE));

        pendingPreviewRef.current = exportCanvas.toDataURL('image/png');

        exportCanvas.toBlob((blob) => {
            if (!blob) return;

            const formData = new FormData();
            formData.append(
                'imageFile',
                new File([blob], 'today-drawing.png', { type: 'image/png' }),
            );
            drawingMutation.mutate(formData);
        }, 'image/png');
    };

    return (
        <S.DrawingPageContainer>
            <S.TopBar>
                <S.CloseButton type="button" onClick={() => navigate('/home')} aria-label="그림 그리기 닫기">
                    <CloseIcon />
                </S.CloseButton>
                <S.TopSpacer aria-hidden="true" />
            </S.TopBar>

            <S.Intro>
                <S.Eyebrow>오늘의 낙서</S.Eyebrow>
                <S.Title>지금 떠오르는 걸 그려주세요</S.Title>
                <S.Description>잘 그리지 않아도 돼요. 오늘의 한 장을 가볍게 남겨봐요.</S.Description>
            </S.Intro>

            <S.CanvasSection>
                <S.PaperFrame>
                    <S.Canvas
                        ref={canvasRef}
                        aria-label="오늘의 낙서 그리기 영역"
                        onPointerDown={startDrawing}
                        onPointerMove={draw}
                        onPointerUp={stopDrawing}
                        onPointerCancel={stopDrawing}
                    />
                    {strokes.length === 0 && <S.CanvasHint>손가락이나 마우스로 그려봐</S.CanvasHint>}
                </S.PaperFrame>

                <S.HistoryControls>
                    <S.HistoryButton
                        type="button"
                        onClick={undo}
                        disabled={strokes.length === 0 || drawingMutation.isPending}
                        aria-label="실행 취소"
                    >
                        <UndoIcon />
                    </S.HistoryButton>
                    <S.HistoryButton
                        type="button"
                        onClick={redo}
                        disabled={redoStrokes.length === 0 || drawingMutation.isPending}
                        aria-label="다시 실행"
                    >
                        <RedoIcon />
                    </S.HistoryButton>
                </S.HistoryControls>
            </S.CanvasSection>

            <S.Footer>
                <S.CompleteButton
                    type="button"
                    onClick={saveDrawing}
                    disabled={strokes.length === 0 || drawingMutation.isPending}
                >
                    {drawingMutation.isPending ? '저장 중...' : '완료'}
                </S.CompleteButton>
            </S.Footer>
        </S.DrawingPageContainer>
    );
};

export default DrawingPage;

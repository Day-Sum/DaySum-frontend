import styled from '@emotion/styled';

const DrawingPageContainer = styled.section`
    position: relative;
    display: flex;
    height: 100%;
    min-height: 0;
    max-height: 100dvh;
    flex-direction: column;
    padding:
        calc(env(safe-area-inset-top, 0px) + 18px)
        18px
        calc(env(safe-area-inset-bottom, 0px) + 18px);
    overflow: hidden;
    background:
        radial-gradient(circle at 18% 12%, rgba(255, 226, 180, 0.16), transparent 28%),
        linear-gradient(180deg, #fffdf8 0%, #fbf6eb 100%);
`;

const TopBar = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 44px;
`;

const CloseButton = styled.button`
    display: grid;
    width: 42px;
    height: 42px;
    padding: 0;
    place-items: center;
    background: rgba(255, 255, 255, 0.56);
    border: 1px solid rgba(71, 54, 44, 0.12);
    border-radius: 50%;
    color: #49392f;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    svg {
        width: 21px;
        height: 21px;
    }

    &:active {
        transform: scale(0.94);
    }
`;

const TopSpacer = styled.span`
    width: 42px;
    height: 42px;
`;

const Intro = styled.div`
    margin-top: clamp(8px, 3dvh, 28px);
`;

const Eyebrow = styled.span`
    display: block;
    margin-bottom: 7px;
    color: rgba(73, 57, 47, 0.46);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.02em;
`;

const Title = styled.h1`
    margin: 0;
    color: #3f3129;
    font-size: clamp(21px, 5.8vw, 26px);
    font-weight: 800;
    line-height: 1.25;
    letter-spacing: -0.045em;
`;

const Description = styled.p`
    margin: 8px 0 0;
    color: rgba(63, 49, 41, 0.54);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: -0.018em;
`;

const CanvasSection = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    min-height: 0;
    padding: clamp(6px, 2dvh, 16px) 0 clamp(4px, 1.5dvh, 12px);
`;

const PaperFrame = styled.div`
    position: relative;
    width: min(100%, 410px, calc(100dvh - 280px));
    aspect-ratio: 1;
    align-self: center;
    overflow: hidden;
    background:
        radial-gradient(circle at 18% 25%, rgba(108, 80, 61, 0.035) 0 1px, transparent 1.3px),
        radial-gradient(circle at 76% 68%, rgba(108, 80, 61, 0.03) 0 1px, transparent 1.2px),
        rgba(255, 254, 250, 0.94);
    background-size: 19px 21px, 27px 23px, auto;
    border: 1.5px solid rgba(72, 54, 43, 0.56);
    border-radius: 16px 13px 18px 12px / 14px 18px 12px 17px;
    box-shadow: 0 16px 34px rgba(61, 43, 32, 0.1);

    &::before {
        position: absolute;
        z-index: 1;
        inset: 5px 4px 4px 5px;
        border: 1px solid rgba(72, 54, 43, 0.16);
        border-radius: 12px 15px 11px 16px / 15px 11px 16px 12px;
        content: '';
        pointer-events: none;
    }
`;

const Canvas = styled.canvas`
    position: absolute;
    z-index: 2;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: crosshair;
    touch-action: none;
`;

const CanvasHint = styled.span`
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    color: rgba(73, 57, 47, 0.3);
    font-size: 12px;
    font-weight: 650;
    letter-spacing: -0.02em;
    transform: translate(-50%, -50%);
    user-select: none;
    pointer-events: none;
`;

const HistoryControls = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: clamp(4px, 1.5dvh, 12px);
`;

const HistoryButton = styled.button`
    display: grid;
    width: 40px;
    height: 40px;
    padding: 0;
    place-items: center;
    background: transparent;
    border-radius: 50%;
    color: rgba(67, 52, 44, 0.76);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    svg {
        width: 23px;
        height: 23px;
    }

    &:active:not(:disabled) {
        background: rgba(79, 60, 49, 0.06);
        transform: scale(0.94);
    }

    &:disabled {
        cursor: default;
        color: rgba(67, 52, 44, 0.2);
    }
`;

const Footer = styled.footer`
    padding-top: 4px;
`;

const CompleteButton = styled.button`
    width: 100%;
    min-height: clamp(46px, 6.5dvh, 54px);
    padding: 0 18px;
    background: rgba(255, 253, 247, 0.76);
    border: 1.5px solid rgba(69, 52, 43, 0.72);
    border-radius: 15px 13px 16px 12px / 13px 16px 12px 15px;
    color: #403129;
    box-shadow: 0 7px 18px rgba(60, 42, 31, 0.07);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.02em;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:active:not(:disabled) {
        transform: translateY(1px) scale(0.995);
    }

    &:disabled {
        cursor: default;
        opacity: 0.42;
    }
`;

export {
    Canvas,
    CanvasHint,
    CanvasSection,
    CloseButton,
    CompleteButton,
    Description,
    DrawingPageContainer,
    Eyebrow,
    Footer,
    HistoryButton,
    HistoryControls,
    Intro,
    PaperFrame,
    Title,
    TopBar,
    TopSpacer,
};

import styled from '@emotion/styled';
import type { HomeTimePeriod } from '../../components/BottomNavigation/BottomNavigation.types';

type ThemeProps = {
    $timePeriod: HomeTimePeriod;
};

export const HomePageContainer = styled.div<ThemeProps>`
    --bottom-nav-height: 100px;

    position: relative;
    width: 100%;
    height: 100dvh;
    min-height: 0;
    max-height: 100dvh;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scrollbar-width: none;
    container-type: inline-size;

    &::-webkit-scrollbar {
        display: none;
    }
    background: #faf8ef;
    color: #39332d;

    @media (max-height: 700px) {
        --bottom-nav-height: 76px;
    }
`;

export const HomeHeader = styled.header<ThemeProps & { $overlay?: boolean }>`
    position: ${p => (p.$overlay ? 'absolute' : 'relative')};
    z-index: 4;
    top: ${p => (p.$overlay ? '0' : 'auto')};
    left: ${p => (p.$overlay ? '0' : 'auto')};
    right: ${p => (p.$overlay ? '0' : 'auto')};
    padding: calc(18px + env(safe-area-inset-top, 0px)) 20px 14px;
    min-height: 0;

    @media (min-height: 760px) {
        padding-top: calc(24px + env(safe-area-inset-top, 0px));
    }
`;

export const HeaderTopRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
`;

export const BrandBlock = styled.div`
    min-width: 0;
    flex: 1;
`;

export const DateLine = styled.p<ThemeProps>`
    margin: 8px 0 0 3px;
    color: #6c5c4a;
    font-size: clamp(11px, 3.4cqw, 15px);
    font-weight: 500;
    line-height: 1.45;
    letter-spacing: -0.04em;
`;

export const TogetherBadge = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 34%;
    max-width: 142px;
    min-width: 94px;
    aspect-ratio: 1.9;
    flex-shrink: 0;
`;

export const TogetherLabel = styled.span`
    position: relative;
    font-size: 10px;
    line-height: 1.45;
    color: #655044;
`;

export const TogetherDays = styled.strong`
    position: relative;
    font-size: clamp(20px, 6cqw, 28px);
    letter-spacing: -0.06em;
    line-height: 1.15;
`;

export const RelationshipButton = styled.button<
    ThemeProps & { $clickable: boolean }
>`
    min-height: 52px;
    padding: 10px;
    background: #fbe7de;
    color: #6b4e40;
    border-radius: 48% 45% 50% 44%;
    font-size: 12px;
    cursor: pointer;
`;

export const LowerSection = styled.section<ThemeProps>`
    position: absolute;
    z-index: 6;
    left: 0;
    right: 0;
    bottom: calc(
        var(--bottom-nav-height, 100px) + env(safe-area-inset-bottom, 0px)
    );
    padding: 0 20px;
`;

export const InviteBanner = styled.button<ThemeProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 48px;
    padding: 10px 14px;
    background: #fff3dd;
    border: 1px dashed #cdbc9f;
    border-radius: 17px;
    color: #6e5946;
    font-size: 12px;
    line-height: 1.4;
    cursor: pointer;
`;

export const Notice = styled.div`
    position: absolute;
    z-index: 8;
    left: 0;
    right: 0;
    top: calc(112px + env(safe-area-inset-top, 0px));
    margin: 0 20px;
    padding: 12px 14px;
    border: 1px solid #e2ceb1;
    border-radius: 16px;
    background: #fff7e7ee;
    color: #775639;
    font-size: 12px;
    line-height: 1.5;

    button {
        min-height: 40px;
        margin-top: 6px;
        padding: 7px 12px;
        background: #eadac2;
        color: #59422f;
        border-radius: 10px;
        cursor: pointer;
    }
`;

export const Loading = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
    min-height: 0;
    color: #8b7660;
    font-size: 14px;
`;

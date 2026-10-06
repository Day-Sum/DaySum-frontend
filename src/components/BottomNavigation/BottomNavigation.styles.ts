import styled from '@emotion/styled';

export const BottomNavigation = styled.nav`
    position: relative;
    z-index: 40;

    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    width: min(100%, 480px);
    margin: 0 auto;
    height: calc(
        var(--bottom-nav-height, 100px) + env(safe-area-inset-bottom, 0px)
    );
    padding: 12px 12px calc(12px + env(safe-area-inset-bottom, 0px));

    background: #faf8effa;
    border-top: 0;
    box-shadow: 0 -6px 20px #75593306;

    @media (max-height: 700px) {
        padding: 8px 10px calc(8px + env(safe-area-inset-bottom, 0px));
    }
`;

export const NavigationItem = styled.button<{ $active: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    min-width: 0;
    min-height: 74px;
    padding: 0 0 7px;
    background: transparent;
    color: #65513d;
    cursor: pointer;

    @media (max-height: 700px) {
        min-height: 60px;
        gap: 4px;
        padding-bottom: 4px;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        width: ${p => (p.$active ? '22px' : '0')};
        height: 3px;
        border-radius: 50%;
        background: #f08d80;
    }

    &:active {
        transform: translateY(1px);
    }
`;

export const IconSlot = styled.span`
    display: grid;
    place-items: center;
    width: clamp(36px, 10vw, 49px);
    height: clamp(36px, 10vw, 49px);

    @media (max-height: 700px) {
        width: 36px;
        height: 36px;
    }
`;

export const NavigationLabel = styled.span`
    font-size: 11px;
    font-weight: 600;
    line-height: 1.2;
`;

import styled from '@emotion/styled';

const ITEM_HEIGHT = 48;

const Picker = styled.div`
    position: relative;

    display: grid;
    grid-template-columns: 1.15fr 1fr 0.8fr;

    width: min(330px, calc(100vw - 56px));
    height: ${ITEM_HEIGHT * 5}px;

    overflow: hidden;

    mask-image: linear-gradient(
        to bottom,
        transparent,
        #000 18%,
        #000 82%,
        transparent
    );

    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        z-index: 1;

        height: ${ITEM_HEIGHT}px;

        border-radius: 22px;
        background: rgba(220, 220, 220, 0.55);

        pointer-events: none;
        transform: translateY(-50%);
    }
`;

const Column = styled.div`
    position: relative;
    z-index: 2;

    height: 100%;
    padding: ${ITEM_HEIGHT * 2}px 0;

    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
    scroll-snap-type: y mandatory;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Item = styled.button<{ selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: ${ITEM_HEIGHT}px;
    padding: 0;

    border: none;
    background: transparent;
    color: ${({ selected }) => (selected ? '#303030' : '#a9a9a9')};

    font-size: ${({ selected }) => (selected ? '26px' : '22px')};
    font-weight: ${({ selected }) => (selected ? 600 : 400)};

    cursor: pointer;
    scroll-snap-align: center;

    transition:
        color 0.15s ease,
        font-size 0.15s ease;
`;

export {
    Column,
    ITEM_HEIGHT,
    Item,
    Picker,
};

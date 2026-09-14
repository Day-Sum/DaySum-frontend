import styled from '@emotion/styled';

import paperBackground from '../../assets/login/paper-background.webp';

const Container = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;
    min-height: 100dvh;

    background-image: url(${paperBackground});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const Header = styled.header`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 92px;
    padding: env(safe-area-inset-top) 20px 0;
`;

const Brand = styled.div`
    color: #454545;

    font-size: 30px;
    font-weight: 500;
    letter-spacing: -1px;
`;

const HeaderButton = styled.button<{ position: 'left' | 'right' }>`
    position: absolute;
    ${({ position }) => position}: 22px;
    top: calc(50% + env(safe-area-inset-top) / 2);

    display: flex;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;
    padding: 0;

    background: transparent;
    color: #323232;

    cursor: pointer;

    transform: translateY(-50%);
`;

const BackIcon = styled.span`
    position: relative;

    display: block;

    width: 25px;
    height: 25px;

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 1px;
        top: 12px;

        display: block;

        width: 18px;
        height: 2px;

        background: currentColor;
        border-radius: 999px;
        transform-origin: left center;
    }

    &::before {
        transform: rotate(-42deg);
    }

    &::after {
        transform: rotate(42deg);
    }
`;

const CloseIcon = styled.span`
    position: relative;

    display: block;

    width: 28px;
    height: 28px;

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 13px;
        top: 0;

        width: 2px;
        height: 28px;

        background: currentColor;
        border-radius: 999px;
    }

    &::before {
        transform: rotate(45deg);
    }

    &::after {
        transform: rotate(-45deg);
    }
`;

const Body = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

    width: 100%;
`;

export {
    BackIcon,
    Body,
    Brand,
    CloseIcon,
    Container,
    Header,
    HeaderButton,
};

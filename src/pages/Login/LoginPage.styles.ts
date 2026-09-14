import styled from '@emotion/styled';

import paperBackground from '../../assets/login/paper-background.webp';

const LoginPageContainer = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;
    min-height: 100dvh;

    background-image: url(${paperBackground});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    overflow: hidden;
`;


const LoginContent = styled.div`
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 36vh;
`;

const LogoText = styled.div`
    font-family: serif;
    font-size: 48px;
    font-style: italic;
    font-weight: 700;

    color: #292828;
`;

const LoginBottom = styled.div`
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;

    width: 100%;
    padding: 0 20px;

    margin-top: auto;
    margin-bottom: 48px;
`;

const KakaoLoginButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;

    width: 100%;
    height: 64px;

    border: none;
    border-radius: 10px;

    background: #fee500;
    color: #191919;

    font-size: 18px;
    font-weight: 600;

    cursor: pointer;
`;

const KakaoIcon = styled.span`
    position: relative;

    flex-shrink: 0;

    width: 30px;
    height: 23px;

    border-radius: 50%;
    background: #3c1e1e;

    &::after {
        content: '';

        position: absolute;
        left: 2px;
        bottom: -3px;

        width: 11px;
        height: 9px;

        background: #3c1e1e;

        clip-path: polygon(0 0, 100% 0, 22% 100%);
        transform: rotate(25deg);
        transform-origin: top left;
    }
`;

const ErrorMessage = styled.div`
    margin-bottom: 12px;

    text-align: center;

    font-size: 14px;
    color: #d84a4a;
`;

export {
    LoginPageContainer,
    LoginContent,
    LogoText,
    LoginBottom,
    KakaoLoginButton,
    KakaoIcon,
    ErrorMessage,
};
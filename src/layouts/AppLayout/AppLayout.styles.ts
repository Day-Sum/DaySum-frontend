import styled from '@emotion/styled';

const LayoutContainer = styled.div`
    position: relative;
    isolation: isolate;
    width: 100%;
    height: 100dvh;
    min-height: 0;
    max-height: 100dvh;
    overflow: hidden;

    background: var(--outside-background);

    @media (min-width: 1024px) {
        background-color: #f3efe5;
        background-image: radial-gradient(#b49b7420 .6px, transparent .6px);
        background-size: 5px 5px;
    }
`;

const AppContainer = styled.main`
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: var(--mobile-max-width);
    height: 100dvh;
    min-height: 0;
    max-height: 100dvh;
    overflow: hidden;

    margin: 0 auto;

    background: #fffdf8;

    @media (min-width: 1024px) {
        box-shadow: 0 0 0 1px #ab957721, 0 0 40px #7d62440a;
    }
`;

export {
    LayoutContainer,
    AppContainer,
};

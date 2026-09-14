import styled from '@emotion/styled';

const LayoutContainer = styled.div`
    width: 100%;
    min-height: 100dvh;

    background: var(--outside-background);
`;

const AppContainer = styled.main`
    width: 100%;
    max-width: var(--mobile-max-width);
    min-height: 100dvh;

    margin: 0 auto;

    background: var(--app-background);
`;

export {
    LayoutContainer,
    AppContainer,
};
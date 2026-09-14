import styled from '@emotion/styled';

const Content = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    padding: 0 20px;

    margin-top: clamp(32px, 7dvh, 76px);
`;

const Title = styled.h1`
    margin: 0;

    text-align: center;
    white-space: pre-line;

    color: #111111;

    font-size: clamp(30px, 8vw, 42px);
    line-height: 1.55;
    font-weight: 600;
`;

const Description = styled.p`
    margin: 24px 0 0;

    color: #707070;

    font-size: 20px;
    font-weight: 300;
`;

const InputArea = styled.div`
    display: flex;
    justify-content: center;

    width: min(280px, 75%);

    margin-top: 66px;
`;

const Bottom = styled.footer`
    width: 100%;
    padding: 0 20px max(28px, env(safe-area-inset-bottom));

    margin-top: auto;
`;

export {
    Bottom,
    Content,
    Description,
    InputArea,
    Title,
};

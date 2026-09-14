import styled from '@emotion/styled';

const Content = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    padding: 0 20px;

    margin-top: clamp(36px, 8dvh, 82px);
`;

const Title = styled.h1`
    margin: 0;

    text-align: center;
    white-space: pre-line;

    color: #111111;

    font-size: clamp(30px, 8vw, 40px);
    line-height: 1.5;
    font-weight: 600;
`;

const Description = styled.p`
    margin: 24px 0 0;

    color: #555555;

    font-size: 19px;
    font-weight: 300;
`;

const PickerArea = styled.div`
    margin-top: clamp(86px, 14dvh, 140px);
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
    PickerArea,
    Title,
};

import styled from '@emotion/styled';

const Content = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    padding: 0 20px max(28px, env(safe-area-inset-bottom));

    margin-top: clamp(62px, 11dvh, 118px);
`;

const Title = styled.h1`
    margin: 0;

    color: #111111;

    text-align: center;
    font-size: clamp(31px, 8vw, 40px);
    font-weight: 600;
`;

const Description = styled.p`
    margin: 18px 0 0;

    color: #666666;

    text-align: center;
    font-size: 19px;
    font-weight: 300;
`;

const Card = styled.section`
    width: 100%;
    margin-top: 58px;
    padding: 26px 20px 34px;
    
`;

const CardHeading = styled.h2`
    margin: 0 0 20px;

    color: #303030;

    font-size: 22px;
    font-weight: 500;
`;

const CodeSection = styled.div`
    width: 100%;
`;

const ShareArea = styled.div`
    margin-top: 18px;
`;

const Divider = styled.div`
    width: 100%;
    margin: 28px 0;

    border-top: 1px dashed #dadada;
`;

const ErrorMessage = styled.p`
    margin: 12px 2px 0;

    color: #d84a4a;

    font-size: 13px;
    text-align: left;
`;

const HelpText = styled.p`
    margin: 12px 2px 0;

    color: #858585;

    font-size: 13px;
    text-align: left;
`;

export {
    Card,
    CardHeading,
    CodeSection,
    Content,
    Description,
    Divider,
    ErrorMessage,
    HelpText,
    ShareArea,
    Title,
};

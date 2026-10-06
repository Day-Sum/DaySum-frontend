import styled from '@emotion/styled';

const Content = styled.main`
    display: flex; flex-direction: column; align-items: center; width: 100%; padding: 0 20px;
    margin-top: clamp(18px, 5dvh, 54px);
`;
const Title = styled.h1`
    margin: 0; text-align: center; white-space: pre-line; color: #111111;
    font-size: clamp(27px, min(8vw, 5.2dvh), 42px); line-height: 1.45; font-weight: 600;
`;
const Description = styled.p`margin: clamp(12px,2.5dvh,24px) 0 0; color:#707070; font-size:clamp(16px,2.4dvh,20px); font-weight:300;`;
const InputArea = styled.div`display:flex;justify-content:center;width:min(280px,75%);margin-top:clamp(32px,7dvh,66px);`;
const Bottom = styled.footer`width:100%;padding:0 20px max(18px,env(safe-area-inset-bottom));margin-top:auto;flex:0 0 auto;`;
export { Bottom, Content, Description, InputArea, Title };

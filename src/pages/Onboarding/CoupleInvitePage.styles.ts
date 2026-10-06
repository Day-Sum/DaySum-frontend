import styled from '@emotion/styled';

const Content = styled.main`
    display:flex;flex-direction:column;align-items:center;width:100%;min-height:0;
    padding:0 20px max(12px,env(safe-area-inset-bottom));margin-top:clamp(8px,2.8dvh,28px);
`;
const Title = styled.h1`margin:0;color:#111;text-align:center;font-size:clamp(26px,min(7.5vw,4.5dvh),38px);font-weight:600;line-height:1.2;`;
const Description = styled.p`margin:clamp(7px,1.5dvh,14px) 0 0;color:#666;text-align:center;font-size:clamp(15px,2.2dvh,18px);font-weight:300;`;
const Card = styled.section`
    width:100%;margin-top:clamp(12px,2.8dvh,28px);padding:clamp(8px,1.6dvh,16px) 10px clamp(10px,1.8dvh,18px);
`;
const CardHeading = styled.h2`margin:0 0 clamp(7px,1.4dvh,14px);color:#303030;font-size:clamp(17px,2.4dvh,21px);font-weight:500;`;
const CodeSection = styled.div`width:100%;`;
const ShareArea = styled.div`margin-top:clamp(7px,1.4dvh,14px);`;
const Divider = styled.div`width:100%;margin:clamp(10px,2dvh,20px) 0;border-top:1px dashed #dadada;`;
const ErrorMessage = styled.p`margin:7px 2px 0;color:#d84a4a;font-size:12px;text-align:left;line-height:1.35;`;
const HelpText = styled.p`margin:7px 2px 0;color:#858585;font-size:12px;text-align:left;line-height:1.35;`;
export { Card, CardHeading, CodeSection, Content, Description, Divider, ErrorMessage, HelpText, ShareArea, Title };

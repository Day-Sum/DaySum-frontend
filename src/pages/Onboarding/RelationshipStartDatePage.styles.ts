import styled from '@emotion/styled';

const Content = styled.main`display:flex;flex-direction:column;align-items:center;width:100%;padding:0 20px;margin-top:clamp(14px,4dvh,48px);min-height:0;`;
const Title = styled.h1`margin:0;text-align:center;white-space:pre-line;color:#111;font-size:clamp(27px,min(8vw,5dvh),40px);line-height:1.4;font-weight:600;`;
const Description = styled.p`margin:clamp(10px,2dvh,20px) 0 0;color:#555;font-size:clamp(16px,2.3dvh,19px);font-weight:300;`;
const PickerArea = styled.div`margin-top:clamp(20px,6dvh,64px);`;
const Bottom = styled.footer`width:100%;padding:0 20px max(18px,env(safe-area-inset-bottom));margin-top:auto;flex:0 0 auto;`;
export { Bottom, Content, Description, PickerArea, Title };

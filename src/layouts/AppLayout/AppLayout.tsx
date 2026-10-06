import { Outlet } from 'react-router-dom';

import * as S from './AppLayout.styles';
import DesktopDecor from './DesktopDecor';

const AppLayout = () => {
    return (
        <S.LayoutContainer>
            <DesktopDecor />
            <S.AppContainer>
                <Outlet />
            </S.AppContainer>
        </S.LayoutContainer>
    );
};

export default AppLayout;

import { Outlet } from 'react-router-dom';

import * as S from './AppLayout.styles';

const AppLayout = () => {
    return (
        <S.LayoutContainer>
            <S.AppContainer>
                <Outlet />
            </S.AppContainer>
        </S.LayoutContainer>
    );
};

export default AppLayout;
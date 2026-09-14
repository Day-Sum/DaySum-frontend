import * as S from './LoginPage.styles';
import { KAKAO_LOGIN } from '../../constants/endPoint';

import heartLine from '../../assets/login/heart-line.png';

const LoginPage = () => {
    const BASE_URL =
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

    const searchParams = new URLSearchParams(window.location.search);
    const isLoginError = searchParams.get('error') === 'true';

    const navigateToKakao = () => {
        window.location.href = BASE_URL + KAKAO_LOGIN;
    };

    return (
        <S.LoginPageContainer>
            <S.HeartLineImage
                src={heartLine}
                alt=""
            />

            <S.LoginContent>
                <S.LogoText>𝑫𝒂𝒚𝑺𝒖𝒎</S.LogoText>
            </S.LoginContent>

            <S.LoginBottom>
                {isLoginError && (
                    <S.ErrorMessage>
                        로그인에 실패했습니다. 다시 시도해주세요.
                    </S.ErrorMessage>
                )}

                <S.KakaoLoginButton
                    type="button"
                    onClick={navigateToKakao}
                >
                    <S.KakaoIcon />
                    카카오톡으로 계속하기
                </S.KakaoLoginButton>
            </S.LoginBottom>
        </S.LoginPageContainer>
    );
};

export default LoginPage;
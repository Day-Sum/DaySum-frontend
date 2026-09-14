import * as S from './OnboardingLayout.styles';
import type { OnboardingLayoutProps } from './OnboardingLayout.types';

const OnboardingLayout = ({
    children,
    onBack,
    onClose,
}: OnboardingLayoutProps) => {
    return (
        <S.Container>
            <S.Header>
                {onBack && (
                    <S.HeaderButton
                        type="button"
                        position="left"
                        aria-label="이전 화면"
                        onClick={onBack}
                    >
                        <S.BackIcon />
                    </S.HeaderButton>
                )}

                <S.Brand>𝑫𝒂𝒚𝑺𝒖𝒎</S.Brand>

                {onClose && (
                    <S.HeaderButton
                        type="button"
                        position="right"
                        aria-label="온보딩 닫기"
                        onClick={onClose}
                    >
                        <S.CloseIcon />
                    </S.HeaderButton>
                )}
            </S.Header>

            <S.Body>{children}</S.Body>
        </S.Container>
    );
};

export default OnboardingLayout;

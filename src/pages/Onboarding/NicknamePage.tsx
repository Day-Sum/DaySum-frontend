import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from '../../apis/auth/auth';
import { useApiMutation } from '../../apis/config/builder/ApiBuilder';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import OnboardingLayout from '../../components/OnboardingLayout/OnboardingLayout';
import * as S from './NicknamePage.styles';

const NicknamePage = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');

    const signupMutation = useApiMutation(signup(), {
        onSuccess: (response) => {
            const { accessToken, refreshToken } =
                response.data.tokenResponseDto;

            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);

            navigate('/onboarding/start-date', { replace: true });
        },
    });

    const trimmedNickname = nickname.trim();
    const isDisabled =
        !trimmedNickname || signupMutation.isPending;

    const handleSubmit = () => {
        if (isDisabled) return;

        signupMutation.mutate({
            nickname: trimmedNickname,
        });
    };

    return (
        <OnboardingLayout>
            <S.Content>
                <S.Title>
                    {'서로에게 보일\n이름을 적어주세요'}
                </S.Title>

                <S.Description>
                    나중에 언제든 바꿀 수 있어요
                </S.Description>

                <S.InputArea>
                    <Input
                        value={nickname}
                        onChange={(event) =>
                            setNickname(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                        placeholder="닉네임"
                        align="center"
                        autoFocus
                        status={
                            signupMutation.isError
                                ? 'error'
                                : 'default'
                        }
                        message={
                            signupMutation.isError
                                ? '닉네임을 저장하지 못했어요.'
                                : undefined
                        }
                    />
                </S.InputArea>
            </S.Content>

            <S.Bottom>
                <Button
                    onClick={handleSubmit}
                    disabled={isDisabled}
                >
                    {signupMutation.isPending
                        ? '저장 중...'
                        : '다음'}
                </Button>
            </S.Bottom>
        </OnboardingLayout>
    );
};

export default NicknamePage;

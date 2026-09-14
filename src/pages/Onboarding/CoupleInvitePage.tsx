import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    connectCouple,
    getConnectCode,
    reissueConnectCode,
} from '../../apis/couple/couple';
import {
    useApiMutation,
    useApiQuery,
} from '../../apis/config/builder/ApiBuilder';
import Button from '../../components/Button/Button';
import CodeInput from '../../components/CodeInput/CodeInput';
import OnboardingLayout from '../../components/OnboardingLayout/OnboardingLayout';
import { queryClient } from '../../QueryClient';
import * as S from './CoupleInvitePage.styles';

const CONNECT_CODE_QUERY_KEY = ['couple-connect-code'];

const CoupleInvitePage = () => {
    const navigate = useNavigate();
    const [partnerCode, setPartnerCode] = useState('');
    const [copied, setCopied] = useState(false);
    const hasRequestedCode = useRef(false);

    const relationshipStartedOn = sessionStorage.getItem(
        'onboardingRelationshipStartedOn',
    );

    const connectCodeQuery = useApiQuery(
        getConnectCode(),
        CONNECT_CODE_QUERY_KEY,
    );

    const reissueMutation = useApiMutation(reissueConnectCode(), {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: CONNECT_CODE_QUERY_KEY,
            });
        },
    });

    const connectMutation = useApiMutation(connectCouple(), {
        onSuccess: () => {
            sessionStorage.removeItem(
                'onboardingRelationshipStartedOn',
            );
            navigate('/home', { replace: true });
        },
    });

    const connectCode = connectCodeQuery.data?.data.connectCode ?? '';

    useEffect(() => {
        if (
            connectCodeQuery.isSuccess &&
            !connectCode &&
            !hasRequestedCode.current
        ) {
            hasRequestedCode.current = true;
            reissueMutation.mutate(undefined);
        }
    }, [
        connectCode,
        connectCodeQuery.isSuccess,
        reissueMutation.mutate,
    ]);

    const displayCode = useMemo(() => {
        if (connectCodeQuery.isLoading || reissueMutation.isPending) {
            return '코드를 만드는 중...';
        }

        return connectCode || '코드를 불러오지 못했어요';
    }, [
        connectCode,
        connectCodeQuery.isLoading,
        reissueMutation.isPending,
    ]);

    const handleClose = () => {
        sessionStorage.removeItem(
            'onboardingRelationshipStartedOn',
        );
        navigate('/home', { replace: true });
    };

    const handleCopy = async () => {
        if (!connectCode) return;

        await navigator.clipboard.writeText(connectCode);
        setCopied(true);

        window.setTimeout(() => setCopied(false), 1500);
    };

    const handleShare = async () => {
        if (!connectCode) return;

        const text = `DaySum에서 나와 연결해요! 커플 코드: ${connectCode}`;

        if (navigator.share) {
            await navigator.share({
                title: 'DaySum 커플 초대',
                text,
            });
            return;
        }

        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    };

    const handleConnect = () => {
        const trimmedCode = partnerCode.trim().toUpperCase();

        if (
            !trimmedCode ||
            !relationshipStartedOn ||
            connectMutation.isPending
        ) {
            return;
        }

        connectMutation.mutate({
            connectCode: trimmedCode,
            relationshipStartedOn,
        });
    };

    return (
        <OnboardingLayout onClose={handleClose}>
            <S.Content>
                <S.Title>연인과 연결하세요!</S.Title>
                <S.Description>
                    서로의 코드를 입력해주세요
                </S.Description>

                <S.Card>
                    <S.CodeSection>
                        <S.CardHeading>나의 커플 코드</S.CardHeading>

                        <CodeInput
                            value={displayCode}
                            readOnly
                            actionType="copy"
                            onAction={handleCopy}
                            disabled={!connectCode}
                        />

                        {copied && (
                            <S.HelpText>
                                커플 코드를 복사했어요.
                            </S.HelpText>
                        )}

                        <S.ShareArea>
                            <Button
                                type="button"
                                onClick={handleShare}
                                disabled={!connectCode}
                            >
                                내 코드 보내기
                            </Button>
                        </S.ShareArea>
                    </S.CodeSection>

                    <S.Divider />

                    <S.CodeSection>
                        <S.CardHeading>
                            연인의 코드
                        </S.CardHeading>

                        <CodeInput
                            value={partnerCode}
                            onChange={(event) =>
                                setPartnerCode(
                                    event.target.value.toUpperCase(),
                                )
                            }
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleConnect();
                                }
                            }}
                            maxLength={8}
                            placeholder="상대방 코드 입력"
                            actionType="submit"
                            onAction={handleConnect}
                            disabled={connectMutation.isPending}
                        />

                        {connectMutation.isError && (
                            <S.ErrorMessage>
                                코드를 확인하고 다시 시도해주세요.
                            </S.ErrorMessage>
                        )}

                        {!relationshipStartedOn && (
                            <S.ErrorMessage>
                                먼저 연애 시작일을 선택해주세요.
                            </S.ErrorMessage>
                        )}
                    </S.CodeSection>
                </S.Card>
            </S.Content>
        </OnboardingLayout>
    );
};

export default CoupleInvitePage;

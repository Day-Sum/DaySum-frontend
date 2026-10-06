import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    clearCurrentActivity,
    saveCurrentActivity,
} from '../../apis/activity/activity';
import {
    getCoupleProfile,
    getCoupleStatus,
} from '../../apis/couple/couple';
import {
    useApiMutation,
    useApiQuery,
} from '../../apis/config/builder/ApiBuilder';
import { getHome } from '../../apis/home/home';
import { updateTodayMood } from '../../apis/mood/mood';
import { getPartnerToday } from '../../apis/partner/partner';
import badge from '../../assets/home/reference/web/together-badge.webp';
import daysumLogo from '../../assets/home/reference/web/daysum-logo.webp';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import type { HomeTimePeriod } from '../../components/BottomNavigation/BottomNavigation.types';
import CurrentActivity from '../../components/CurrentActivity/CurrentActivity';
import HomeAsset from '../../components/HomeAsset';
import TodayMusic from '../../components/TodayMusic/TodayMusic';
import { queryClient } from '../../QueryClient';
import * as S from './HomePage.styles';

const HOME_QUERY_KEY = ['home'];
const COUPLE_STATUS_QUERY_KEY = ['couple-status'];
const COUPLE_PROFILE_QUERY_KEY = ['couple-profile'];
const PARTNER_TODAY_QUERY_KEY = ['partner-today'];

const getTimePeriod = (hour: number): HomeTimePeriod => {
    if (hour < 6) return 'dawn';
    if (hour < 11) return 'morning';
    if (hour < 17) return 'daytime';
    if (hour < 20) return 'evening';

    return 'night';
};

const formatKoreanDate = (date: Date) => {
    const weekday = new Intl.DateTimeFormat('ko-KR', {
        weekday: 'long',
    }).format(date);

    return `${date.getMonth() + 1}월 ${date.getDate()}일 ${weekday}`;
};

const HomePage = () => {
    const navigate = useNavigate();
    const [now, setNow] = useState(() => new Date());

    const homeQuery = useApiQuery(getHome(), HOME_QUERY_KEY, {
        retry: 1,
        refetchInterval: 60000,
    });

    const coupleStatusQuery = useApiQuery(
        getCoupleStatus(),
        COUPLE_STATUS_QUERY_KEY,
        {
            refetchOnMount: 'always',
            retry: 1,
        },
    );

    const isCoupleConnected =
        coupleStatusQuery.data?.data.connected ?? false;

    const coupleProfileQuery = useApiQuery(
        getCoupleProfile(),
        COUPLE_PROFILE_QUERY_KEY,
        {
            enabled: isCoupleConnected,
            refetchOnMount: 'always',
            retry: 1,
            refetchInterval: 60000,
        },
    );

    const partnerTodayQuery = useApiQuery(
        getPartnerToday(),
        PARTNER_TODAY_QUERY_KEY,
        {
            enabled: isCoupleConnected,
            refetchOnMount: 'always',
            retry: 1,
            refetchInterval: 60000,
        },
    );

    const saveActivityMutation = useApiMutation(saveCurrentActivity(), {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: HOME_QUERY_KEY,
            });
        },
    });

    const moodMutation = useApiMutation(updateTodayMood(), {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: HOME_QUERY_KEY,
            });
        },
    });

    const clearActivityMutation = useApiMutation(clearCurrentActivity(), {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: HOME_QUERY_KEY,
            });
        },
    });

    useEffect(() => {
        const timer = window.setInterval(() => {
            setNow(new Date());
        }, 60_000);

        return () => window.clearInterval(timer);
    }, []);

    const timePeriod = getTimePeriod(now.getHours());
    const currentActivity =
        homeQuery.data?.data.currentActivity?.activity ?? '';
    const currentActivityStartedAt =
        homeQuery.data?.data.currentActivity?.startedAt ?? null;
    const currentMood = homeQuery.data?.data.mood ?? null;
    const partnerToday = partnerTodayQuery.data?.data;
    const partnerName = coupleProfileQuery.data?.data.partnerNickname ?? null;
    const relationshipDay = coupleProfileQuery.data?.data.dayCount ?? null;

    const handleMoodSave = async (nextMood: string) => {
        await moodMutation.mutateAsync({ mood: nextMood });
    };

    const handleActivitySave = async (activity: string) => {
        if (activity === currentActivity) return;

        if (!activity) {
            await clearActivityMutation.mutateAsync(undefined);
            return;
        }

        await saveActivityMutation.mutateAsync({ activity });
    };

    const retry = () => {
        void homeQuery.refetch();
        void coupleStatusQuery.refetch();

        if (isCoupleConnected) {
            void coupleProfileQuery.refetch();
            void partnerTodayQuery.refetch();
        }
    };

    const isLoading = homeQuery.isPending || coupleStatusQuery.isPending;
    const failed = homeQuery.isError || coupleStatusQuery.isError;

    if (isLoading) {
        return (
            <S.HomePageContainer $timePeriod={timePeriod}>
                <S.Loading role="status">
                    우리의 오늘을 불러오고 있어요…
                </S.Loading>
            </S.HomePageContainer>
        );
    }

    if (failed) {
        return (
            <S.HomePageContainer $timePeriod={timePeriod}>
                <S.HomeHeader $timePeriod={timePeriod}>
                    <HomeAsset
                        src={daysumLogo}
                        frame="logo"
                        alt="DaySum"
                        style={{ width: 160 }}
                    />
                </S.HomeHeader>
                <S.Notice role="alert">
                    오늘의 소식을 불러오지 못했어요.
                    <br />
                    연결을 확인한 뒤 다시 시도해 주세요.
                    <br />
                    <button type="button" onClick={retry}>
                        다시 불러오기
                    </button>
                </S.Notice>
            </S.HomePageContainer>
        );
    }

    return (
        <S.HomePageContainer $timePeriod={timePeriod}>
            <S.HomeHeader $timePeriod={timePeriod} $overlay>
                <S.HeaderTopRow>
                    <S.BrandBlock>
                        <HomeAsset
                            src={daysumLogo}
                            frame="logo"
                            alt="DaySum"
                            style={{ width: '100%', maxWidth: 178 }}
                        />
                        <S.DateLine $timePeriod={timePeriod}>
                            {formatKoreanDate(now)}
                        </S.DateLine>
                    </S.BrandBlock>

                    {isCoupleConnected && relationshipDay != null ? (
                        <S.TogetherBadge
                            aria-label={`함께한 지 ${relationshipDay}일`}
                        >
                            <HomeAsset
                                src={badge}
                                frame="badge"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    transform: 'scale(1.18)',
                                }}
                            />
                            <S.TogetherLabel>함께한 지</S.TogetherLabel>
                            <S.TogetherDays>
                                {relationshipDay}일
                            </S.TogetherDays>
                        </S.TogetherBadge>
                    ) : !isCoupleConnected ? (
                        <S.RelationshipButton
                            type="button"
                            $timePeriod={timePeriod}
                            onClick={() => navigate('/onboarding/invite')}
                            $clickable
                        >
                            함께 시작하기
                        </S.RelationshipButton>
                    ) : (
                        <S.TogetherLabel>함께하는 우리</S.TogetherLabel>
                    )}
                </S.HeaderTopRow>
            </S.HomeHeader>

            {(coupleProfileQuery.isError || partnerTodayQuery.isError) && (
                <S.Notice role="alert">
                    연인의 소식을 불러오지 못했어요.{' '}
                    <button type="button" onClick={retry}>
                        다시 불러오기
                    </button>
                </S.Notice>
            )}

            <CurrentActivity
                value={currentActivity}
                startedAt={currentActivityStartedAt}
                mood={currentMood}
                onSave={handleActivitySave}
                onSaveMood={handleMoodSave}
                timePeriod={timePeriod}
                isMoodSaving={moodMutation.isPending}
                isActivitySaving={
                    saveActivityMutation.isPending ||
                    clearActivityMutation.isPending
                }
                isCoupleConnected={isCoupleConnected}
                partnerName={partnerName}
                partnerActivity={partnerToday?.currentActivity?.activity ?? null}
                partnerStartedAt={
                    partnerToday?.currentActivity?.startedAt ?? null
                }
                partnerMood={partnerToday?.mood ?? null}
                musicSlot={
                    <TodayMusic
                        music={homeQuery.data?.data.music ?? null}
                        timePeriod={timePeriod}
                    />
                }
            />

            {!coupleStatusQuery.isLoading && !isCoupleConnected && (
                <S.LowerSection $timePeriod={timePeriod}>
                    <S.InviteBanner
                        type="button"
                        $timePeriod={timePeriod}
                        onClick={() => navigate('/onboarding/invite')}
                    >
                        <span>동행자를 연결하고 서로의 오늘을 봐요</span>
                        <strong aria-hidden="true">→</strong>
                    </S.InviteBanner>
                </S.LowerSection>
            )}

            <BottomNavigation timePeriod={timePeriod} />
        </S.HomePageContainer>
    );
};

export default HomePage;

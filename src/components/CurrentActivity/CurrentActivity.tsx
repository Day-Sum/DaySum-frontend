import { useRef, useState, type ReactNode } from 'react';
import bubble from '../../assets/home/reference/web/status-bubble.webp';
import dog from '../../assets/home/reference/web/partner-dog.webp';
import heart from '../../assets/home/reference/web/heart.webp';
import me from '../../assets/home/reference/web/me-cloud.webp';
import scene from '../../assets/home/reference/web/home-scene.webp';
import HomeAsset from '../HomeAsset';
import HomeSheet, { SheetError } from '../HomeSheet';
import type { HomeTimePeriod } from '../BottomNavigation/BottomNavigation.types';
import {
    getMoodCharacter,
    isMoodId,
    MOOD_CHARACTERS,
} from './moodCharacters';
import * as S from './CurrentActivity.styles';

type Props = {
    value: string;
    startedAt?: string | null;
    onSave: (value: string) => Promise<void>;
    mood: string | null;
    onSaveMood: (mood: string) => Promise<void>;
    timePeriod: HomeTimePeriod;
    isMoodSaving?: boolean;
    isActivitySaving?: boolean;
    isCoupleConnected?: boolean;
    partnerName?: string | null;
    partnerActivity?: string | null;
    partnerStartedAt?: string | null;
    partnerMood?: string | null;
    musicSlot?: ReactNode;
};

const stale = (date?: string | null) =>
    Boolean(date && Date.now() - new Date(date).getTime() > 12 * 3_600_000);

const quick = ['일하는 중', '이동 중', '밥 먹는 중', '쉬는 중'];

export default function CurrentActivity({
    value,
    startedAt,
    onSave,
    mood,
    onSaveMood,
    isCoupleConnected = false,
    partnerName,
    partnerActivity,
    partnerStartedAt,
    partnerMood,
    musicSlot,
}: Props) {
    const [sheet, setSheet] = useState<
        'activity' | 'mood' | 'partner' | null
    >(null);
    const [draft, setDraft] = useState(value);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const submitting = useRef(false);
    const selectedMood = isMoodId(mood) ? getMoodCharacter(mood) : null;
    const theirMood = isMoodId(partnerMood)
        ? getMoodCharacter(partnerMood)
        : null;
    const name = isCoupleConnected ? partnerName || '연인' : '동행자';

    const open = (next: typeof sheet) => {
        setError('');
        setDraft(value);
        setSheet(next);
    };

    const close = () => {
        if (!submitting.current) {
            setSheet(null);
        }
    };

    const submit = async (kind: 'activity' | 'mood', next: string) => {
        if (submitting.current) return;

        submitting.current = true;
        setSaving(true);
        setError('');

        try {
            if (kind === 'activity') {
                await onSave(next.trim().slice(0, 30));
            } else {
                await onSaveMood(next);
            }

            setSheet(null);
        } catch {
            setError(
                '저장하지 못했어요. 연결을 확인하고 다시 시도해 주세요.',
            );
        } finally {
            submitting.current = false;
            setSaving(false);
        }
    };

    return (
        <S.ActivityScene aria-label="오늘의 서로 상태">
            <S.SceneBackground src={scene} alt="" aria-hidden="true" />

            <S.LandscapeStage>
                <S.PresenceGrid>
                    <S.PresenceBlock>
                        <S.StatusBubble
                            type="button"
                            onClick={() => open('activity')}
                            aria-label="내 현재 상태 바꾸기"
                        >
                            <HomeAsset
                                src={bubble}
                                frame="bubble"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                            <S.StatusBubbleContent>
                                <S.StatusMain>
                                    {value || '지금 뭐 하고 있어?'}{' '}
                                    <span aria-hidden="true">✎</span>
                                </S.StatusMain>
                                {value && stale(startedAt) && (
                                    <S.StatusMeta>
                                        이전에 남긴 상태
                                    </S.StatusMeta>
                                )}
                            </S.StatusBubbleContent>
                        </S.StatusBubble>

                        <S.CharacterButton
                            type="button"
                            onClick={() => open('mood')}
                            aria-label={
                                selectedMood
                                    ? `현재 기분 ${selectedMood.label}. 기분 바꾸기`
                                    : '오늘 기분 남기기'
                            }
                        >
                            <S.CharacterImage src={me} alt="" />
                        </S.CharacterButton>

                        <S.PersonName>나</S.PersonName>
                    </S.PresenceBlock>

                    <S.PresenceBlock>
                        <S.StatusBubble
                            type="button"
                            onClick={() => open('partner')}
                            aria-label={`${name}의 현재 상태 자세히 보기`}
                            style={{ left: '12px' }}
                        >
                            <HomeAsset
                                src={bubble}
                                frame="bubble"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                            <S.StatusBubbleContent>
                                <S.StatusMain>
                                    {isCoupleConnected
                                        ? partnerActivity ||
                                          '아직 남긴 상태가 없어요'
                                        : '우리, 함께 시작할까요?'}
                                </S.StatusMain>
                                {isCoupleConnected &&
                                    partnerActivity &&
                                    stale(partnerStartedAt) && (
                                        <S.StatusMeta>
                                            이전에 남긴 상태
                                        </S.StatusMeta>
                                    )}
                            </S.StatusBubbleContent>
                        </S.StatusBubble>

                        <S.CharacterButton
                            type="button"
                            onClick={() => open('partner')}
                            aria-label={`${name}의 오늘 기분 보기`}
                        >
                            <S.CharacterImage src={dog} alt="" />
                        </S.CharacterButton>

                        <S.PersonName title={name}>{name}</S.PersonName>
                    </S.PresenceBlock>

                    <S.SceneHeart src={heart} alt="" />
                </S.PresenceGrid>
            </S.LandscapeStage>

            {musicSlot && <S.MusicDock>{musicSlot}</S.MusicDock>}

            {sheet === 'activity' && (
                <HomeSheet
                    title="지금 뭐 하고 있어요?"
                    onClose={close}
                    busy={saving}
                >
                    <S.EditorDescription>
                        오늘의 작은 순간을 연인에게 전해요.
                    </S.EditorDescription>

                    <form
                        onSubmit={event => {
                            event.preventDefault();
                            void submit('activity', draft);
                        }}
                    >
                        <S.QuickActivityRow>
                            {quick.map(item => (
                                <S.QuickActivityButton
                                    key={item}
                                    type="button"
                                    $selected={draft === item}
                                    disabled={saving}
                                    onClick={() => setDraft(item)}
                                >
                                    {item}
                                </S.QuickActivityButton>
                            ))}
                        </S.QuickActivityRow>

                        <S.ActivityInput
                            data-initial-focus
                            value={draft}
                            onChange={event => setDraft(event.target.value)}
                            maxLength={30}
                            disabled={saving}
                            placeholder="예: 퇴근하고 커피 마시는 중"
                            aria-label="현재 하고 있는 일"
                            onKeyDown={event => {
                                if (
                                    event.key === 'Enter' &&
                                    event.nativeEvent.isComposing
                                ) {
                                    event.preventDefault();
                                }
                            }}
                        />

                        <S.EditorHint>
                            {draft.length}/30 · 저장하면 지금 상태가 바뀌어요.
                        </S.EditorHint>

                        {error && (
                            <SheetError role="alert">{error}</SheetError>
                        )}

                        <S.EditorActions>
                            <S.SecondaryButton
                                type="button"
                                disabled={saving || !value}
                                onClick={() => void submit('activity', '')}
                            >
                                상태 지우기
                            </S.SecondaryButton>
                            <S.PrimaryButton
                                type="submit"
                                disabled={saving || !draft.trim()}
                            >
                                {saving ? '저장 중…' : '상태 저장'}
                            </S.PrimaryButton>
                        </S.EditorActions>
                    </form>
                </HomeSheet>
            )}

            {sheet === 'mood' && (
                <HomeSheet
                    title="오늘, 어떤 기분이에요?"
                    onClose={close}
                    busy={saving}
                >
                    <S.EditorDescription>
                        지금의 마음과 닮은 표정을 골라요.
                    </S.EditorDescription>

                    {error && <SheetError role="alert">{error}</SheetError>}

                    <S.MoodGrid>
                        {MOOD_CHARACTERS.map(item => (
                            <S.MoodOption
                                key={item.id}
                                type="button"
                                $selected={item.id === mood}
                                aria-label={item.label}
                                aria-pressed={item.id === mood}
                                disabled={saving}
                                onClick={() => void submit('mood', item.id)}
                            >
                                <S.MoodOptionImage
                                    src={item.image}
                                    alt=""
                                />
                                <span>{item.label}</span>
                            </S.MoodOption>
                        ))}
                    </S.MoodGrid>

                    {saving && (
                        <S.EditorHint role="status">
                            기분을 저장하고 있어요…
                        </S.EditorHint>
                    )}
                </HomeSheet>
            )}

            {sheet === 'partner' && (
                <HomeSheet title={`${name}의 오늘`} onClose={close}>
                    <S.PartnerCopy>
                        {isCoupleConnected
                            ? partnerActivity || '아직 상태를 남기지 않았어요.'
                            : '동행자를 연결하면 서로의 현재 상태와 기분을 볼 수 있어요.'}
                    </S.PartnerCopy>

                    {isCoupleConnected && (
                        <S.PartnerCopy>
                            오늘 기분 ·{' '}
                            {theirMood?.label ?? '아직 남기지 않았어요'}
                        </S.PartnerCopy>
                    )}

                    {isCoupleConnected && theirMood && (
                        <S.PartnerMood
                            src={theirMood.image}
                            alt={theirMood.label}
                        />
                    )}

                    {stale(partnerStartedAt) && (
                        <S.EditorHint>
                            12시간 이전에 남긴 상태예요.
                        </S.EditorHint>
                    )}
                </HomeSheet>
            )}
        </S.ActivityScene>
    );
}

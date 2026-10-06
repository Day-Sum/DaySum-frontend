import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
    deleteTodayMusic,
    searchMusic,
    updateTodayMusic,
} from '../../apis/music/music';
import type { MusicInfo } from '../../apis/music/music.types';
import {
    useApiMutation,
    useApiQuery,
} from '../../apis/config/builder/ApiBuilder';
import { queryClient } from '../../QueryClient';
import musicAdd from '../../assets/home/reference/web/music-add.webp';
import musicAlbum from '../../assets/home/reference/web/music-album.webp';
import HomeAsset from '../HomeAsset';
import HomeSheet, { SheetError } from '../HomeSheet';
import type { HomeTimePeriod } from '../BottomNavigation/BottomNavigation.types';
import * as S from './TodayMusic.styles';

type Props = {
    music: MusicInfo | null;
    timePeriod: HomeTimePeriod;
};

export default function TodayMusic({ music }: Props) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [playing, setPlaying] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const sequence = useRef(0);
    const lock = useRef(false);

    const search = useApiQuery(
        searchMusic(submitted),
        ['music-search', submitted],
        {
            enabled: open && !!submitted,
            staleTime: 300000,
            retry: 1,
        },
    );

    const save = useApiMutation(updateTodayMusic());
    const remove = useApiMutation(deleteTodayMusic());

    const stop = () => {
        sequence.current += 1;

        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.onended = null;
            audio.onerror = null;
            audio.removeAttribute('src');
            audio.load();
        }

        setPlaying(null);
    };

    const close = () => {
        if (lock.current) return;

        stop();
        setOpen(false);
        setError('');
    };

    const show = () => {
        stop();
        setError('');
        setOpen(true);
    };

    useEffect(() => {
        return () => {
            sequence.current += 1;

            const audio = audioRef.current;
            if (!audio) return;

            audio.onended = null;
            audio.onerror = null;
            audio.pause();
            audio.removeAttribute('src');
            audio.load();
        };
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) stop();
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            );
        };
    }, []);

    const mutate = async (selected: MusicInfo | null) => {
        if (lock.current) return;

        lock.current = true;
        setBusy(true);
        setError('');
        stop();

        try {
            if (selected) {
                await save.mutateAsync(selected);
            } else {
                await remove.mutateAsync(undefined);
            }

            await queryClient.invalidateQueries({ queryKey: ['home'] });

            setOpen(false);
            setQuery('');
            setSubmitted('');
        } catch {
            setError(
                selected
                    ? '음악을 저장하지 못했어요. 다시 선택해 주세요.'
                    : '음악을 지우지 못했어요. 다시 시도해 주세요.',
            );
        } finally {
            lock.current = false;
            setBusy(false);
        }
    };

    const preview = async (track: MusicInfo) => {
        if (!track.previewUrl || lock.current) return;

        if (playing === track.trackId) {
            stop();
            return;
        }

        stop();
        setError('');

        const token = sequence.current;
        const audio = audioRef.current ?? new Audio();

        audioRef.current = audio;
        audio.preload = 'none';
        audio.src = track.previewUrl;

        audio.onended = () => {
            if (sequence.current === token) {
                setPlaying(null);
            }
        };

        audio.onerror = () => {
            if (sequence.current === token) {
                setPlaying(null);
                setError(
                    '미리듣기를 재생하지 못했어요. 잠시 후 다시 눌러 주세요.',
                );
            }
        };

        try {
            await audio.play();

            if (sequence.current === token) {
                setPlaying(track.trackId);
            }
        } catch {
            if (sequence.current === token) {
                setPlaying(null);
                setError(
                    '미리듣기를 재생하지 못했어요. 잠시 후 다시 눌러 주세요.',
                );
            }
        }
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        const term = query.trim();
        if (!term) return;

        stop();
        setError('');

        if (term === submitted) {
            void search.refetch();
        } else {
            setSubmitted(term);
        }
    };

    return (
        <>
            <S.MusicCard aria-label="오늘의 음악">
                <S.CardMainButton
                    type="button"
                    disabled={busy}
                    onClick={show}
                    aria-label={
                        music
                            ? `${music.title}, ${music.artist}. 오늘의 음악 변경`
                            : '오늘의 음악 선택'
                    }
                >
                    <S.AlbumSlot>
                        {music?.artworkUrl ? (
                            <S.Artwork
                                src={music.artworkUrl}
                                alt=""
                                onError={event => {
                                    event.currentTarget.style.display = 'none';
                                }}
                            />
                        ) : null}
                        <S.AlbumIllustration src={musicAlbum} alt="" />
                    </S.AlbumSlot>

                    <S.MusicText>
                        {music && <S.Eyebrow>오늘의 음악</S.Eyebrow>}
                        <S.Title title={music?.title}>
                            {music?.title ?? '오늘의 음악'}
                        </S.Title>
                        <S.Artist title={music?.artist}>
                            {music?.artist ?? '노래 고르기'}
                        </S.Artist>
                    </S.MusicText>

                    <S.AddSlot>
                        <HomeAsset
                            src={musicAdd}
                            frame="add"
                            style={{ width: '100%' }}
                        />
                    </S.AddSlot>
                </S.CardMainButton>

                {music && (
                    <S.MusicControls>
                        {music.previewUrl ? (
                            <S.ControlButton
                                type="button"
                                disabled={busy}
                                onClick={() => void preview(music)}
                                aria-label={
                                    playing === music.trackId
                                        ? '미리듣기 일시정지'
                                        : '30초 미리듣기 재생'
                                }
                            >
                                {playing === music.trackId ? 'Ⅱ' : '▷'}
                                <span>
                                    {playing === music.trackId
                                        ? '일시정지'
                                        : '30초 미리듣기'}
                                </span>
                            </S.ControlButton>
                        ) : (
                            <S.Unavailable>미리듣기 없는 곡</S.Unavailable>
                        )}

                        <S.ControlButton
                            type="button"
                            disabled={busy}
                            onClick={() => void mutate(null)}
                            aria-label="오늘의 음악 지우기"
                        >
                            지우기
                        </S.ControlButton>
                    </S.MusicControls>
                )}
            </S.MusicCard>

            {error && !open && (
                <SheetError role="alert">{error}</SheetError>
            )}

            {open && (
                <HomeSheet title="오늘의 음악" onClose={close} busy={busy}>
                    <S.Description>
                        우리의 오늘을 닮은 노래 한 곡.
                    </S.Description>

                    <S.SearchForm onSubmit={submit}>
                        <S.SearchInput
                            data-initial-focus
                            value={query}
                            disabled={busy}
                            onChange={event => setQuery(event.target.value)}
                            placeholder="노래 제목이나 가수 검색"
                            aria-label="음악 검색어"
                        />
                        <S.SearchButton
                            disabled={busy || !query.trim()}
                            type="submit"
                        >
                            검색
                        </S.SearchButton>
                    </S.SearchForm>

                    {error && <SheetError role="alert">{error}</SheetError>}

                    <S.Results aria-busy={search.isFetching}>
                        {!submitted && (
                            <S.EmptyMessage>
                                좋아하는 노래를 찾아봐요.
                                <br />
                                미리듣기로 먼저 들어볼 수도 있어요.
                            </S.EmptyMessage>
                        )}

                        {search.isFetching && (
                            <S.EmptyMessage role="status">
                                음악을 찾고 있어요…
                            </S.EmptyMessage>
                        )}

                        {search.isError && !search.isFetching && (
                            <S.EmptyMessage role="alert">
                                검색하지 못했어요.
                                <br />
                                <S.SearchButton
                                    type="button"
                                    onClick={() => void search.refetch()}
                                >
                                    다시 검색
                                </S.SearchButton>
                            </S.EmptyMessage>
                        )}

                        {!search.isFetching &&
                            !search.isError &&
                            submitted &&
                            search.data?.data.musics.length === 0 && (
                                <S.EmptyMessage>
                                    검색 결과가 없어요.
                                    <br />
                                    다른 제목이나 가수 이름으로 찾아봐요.
                                </S.EmptyMessage>
                            )}

                        {!search.isFetching &&
                            !search.isError &&
                            search.data?.data.musics.map(item => (
                                <S.ResultRow key={item.trackId}>
                                    <S.ResultSelectButton
                                        type="button"
                                        disabled={busy}
                                        onClick={() => void mutate(item)}
                                        aria-label={`${item.title}, ${item.artist} 선택`}
                                    >
                                        <S.ResultArtwork
                                            src={item.artworkUrl || musicAlbum}
                                            alt=""
                                            onError={event => {
                                                event.currentTarget.onerror =
                                                    null;
                                                event.currentTarget.src =
                                                    musicAlbum;
                                            }}
                                        />
                                        <S.ResultText>
                                            <S.ResultTitle>
                                                {item.title}
                                            </S.ResultTitle>
                                            <S.ResultArtist>
                                                {item.artist}
                                            </S.ResultArtist>
                                        </S.ResultText>
                                        <S.SelectLabel>선택</S.SelectLabel>
                                    </S.ResultSelectButton>

                                    {item.previewUrl && (
                                        <S.ResultPreviewButton
                                            type="button"
                                            disabled={busy}
                                            aria-label={`${item.title} ${
                                                playing === item.trackId
                                                    ? '일시정지'
                                                    : '미리듣기'
                                            }`}
                                            onClick={() => void preview(item)}
                                        >
                                            {playing === item.trackId
                                                ? 'Ⅱ'
                                                : '▷'}
                                        </S.ResultPreviewButton>
                                    )}
                                </S.ResultRow>
                            ))}
                    </S.Results>

                    {busy && (
                        <S.Description role="status">
                            음악을 저장하고 있어요…
                        </S.Description>
                    )}

                    {music && (
                        <S.RemoveButton
                            type="button"
                            disabled={busy}
                            onClick={() => void mutate(null)}
                        >
                            오늘의 음악 지우기
                        </S.RemoveButton>
                    )}
                </HomeSheet>
            )}
        </>
    );
}

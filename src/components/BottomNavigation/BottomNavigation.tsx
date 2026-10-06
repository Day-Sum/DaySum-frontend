import { useState } from 'react';
import calendar from '../../assets/home/reference/web/nav-calendar.webp';
import home from '../../assets/home/reference/web/nav-home.webp';
import more from '../../assets/home/reference/web/nav-more.webp';
import record from '../../assets/home/reference/web/nav-record.webp';
import us from '../../assets/home/reference/web/nav-us.webp';
import HomeAsset from '../HomeAsset';
import HomeSheet from '../HomeSheet';
import * as S from './BottomNavigation.styles';
import type { BottomNavigationProps } from './BottomNavigation.types';

const items = [
    { label: '홈', frame: 'home', src: home },
    { label: '기록', frame: 'record', src: record },
    { label: '우리', frame: 'us', src: us },
    { label: '캘린더', frame: 'calendar', src: calendar },
    { label: '더보기', frame: 'more', src: more },
] as const;

export default function BottomNavigation(_: BottomNavigationProps) {
    const [notice, setNotice] = useState<string | null>(null);

    const handleItemClick = (index: number, label: string) => {
        if (index === 0) {
            const behavior = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches
                ? 'instant'
                : 'smooth';

            window.scrollTo({
                top: 0,
                behavior,
            });
            return;
        }

        setNotice(label);
    };

    return (
        <>
            <S.BottomNavigation aria-label="하단 메뉴">
                {items.map((item, index) => (
                    <S.NavigationItem
                        key={item.frame}
                        type="button"
                        $active={index === 0}
                        aria-current={index === 0 ? 'page' : undefined}
                        aria-label={item.label}
                        onClick={() => handleItemClick(index, item.label)}
                    >
                        <S.IconSlot>
                            <HomeAsset
                                src={item.src}
                                frame={item.frame}
                                style={{ width: '100%' }}
                            />
                        </S.IconSlot>
                        <S.NavigationLabel>{item.label}</S.NavigationLabel>
                    </S.NavigationItem>
                ))}
            </S.BottomNavigation>

            {notice && (
                <HomeSheet title={notice} onClose={() => setNotice(null)}>
                    <p
                        style={{
                            fontSize: 14,
                            lineHeight: 1.8,
                            color: '#796754',
                        }}
                    >
                        아직 준비 중인 공간이에요.
                        <br />
                        지금은 홈에서 서로의 지금과 기분, 오늘의 음악을 나눠
                        보세요.
                    </p>
                </HomeSheet>
            )}
        </>
    );
}

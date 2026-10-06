import type { HomeTimePeriod } from '../components/BottomNavigation/BottomNavigation.types';

type HomeVisualTheme = {
    page: string;
    header: string;
    lower: string;
    foreground: string;
    muted: string;
    accent: string;
    line: string;
    glass: string;
    glassStrong: string;
    bubble: string;
    bubbleText: string;
    bubbleMuted: string;
    shadow: string;
};

const HOME_VISUAL_THEME: Record<HomeTimePeriod, HomeVisualTheme> = {
    dawn: {
        page: '#26384f',
        header: '#24354c',
        lower: '#2a3c51',
        foreground: '#fffaf0',
        muted: 'rgba(255, 250, 240, 0.70)',
        accent: '#f1cf9d',
        line: 'rgba(255, 247, 229, 0.25)',
        glass: 'rgba(31, 48, 70, 0.72)',
        glassStrong: 'rgba(28, 43, 63, 0.88)',
        bubble: 'rgba(250, 247, 236, 0.90)',
        bubbleText: '#344255',
        bubbleMuted: 'rgba(52, 66, 85, 0.62)',
        shadow: '0 18px 46px rgba(8, 16, 30, 0.22)',
    },
    morning: {
        page: '#eee4c9',
        header: '#f2e8cf',
        lower: '#e8dfc4',
        foreground: '#473a30',
        muted: 'rgba(71, 58, 48, 0.66)',
        accent: '#9b7552',
        line: 'rgba(76, 60, 46, 0.18)',
        glass: 'rgba(255, 249, 233, 0.74)',
        glassStrong: 'rgba(255, 249, 233, 0.91)',
        bubble: 'rgba(255, 253, 245, 0.92)',
        bubbleText: '#4b3b31',
        bubbleMuted: 'rgba(75, 59, 49, 0.58)',
        shadow: '0 18px 42px rgba(89, 65, 39, 0.12)',
    },
    daytime: {
        page: '#dce4c3',
        header: '#dfe7cc',
        lower: '#d6dfba',
        foreground: '#35402f',
        muted: 'rgba(53, 64, 47, 0.66)',
        accent: '#6f7f50',
        line: 'rgba(55, 66, 47, 0.18)',
        glass: 'rgba(248, 247, 220, 0.73)',
        glassStrong: 'rgba(247, 246, 220, 0.91)',
        bubble: 'rgba(255, 253, 241, 0.92)',
        bubbleText: '#3f4635',
        bubbleMuted: 'rgba(63, 70, 53, 0.58)',
        shadow: '0 18px 42px rgba(49, 63, 38, 0.12)',
    },
    evening: {
        page: '#66514a',
        header: '#694d47',
        lower: '#5c5048',
        foreground: '#fff7ed',
        muted: 'rgba(255, 247, 237, 0.70)',
        accent: '#ffc68f',
        line: 'rgba(255, 231, 207, 0.24)',
        glass: 'rgba(104, 72, 59, 0.70)',
        glassStrong: 'rgba(87, 62, 54, 0.89)',
        bubble: 'rgba(255, 246, 232, 0.91)',
        bubbleText: '#5b4238',
        bubbleMuted: 'rgba(91, 66, 56, 0.60)',
        shadow: '0 18px 46px rgba(73, 34, 24, 0.20)',
    },
    night: {
        page: '#182941',
        header: '#17263d',
        lower: '#1d2f48',
        foreground: '#fffdf6',
        muted: 'rgba(255, 253, 246, 0.69)',
        accent: '#e8dda8',
        line: 'rgba(244, 241, 227, 0.22)',
        glass: 'rgba(20, 37, 61, 0.74)',
        glassStrong: 'rgba(18, 32, 53, 0.90)',
        bubble: 'rgba(248, 246, 237, 0.91)',
        bubbleText: '#334058',
        bubbleMuted: 'rgba(51, 64, 88, 0.60)',
        shadow: '0 18px 48px rgba(5, 12, 28, 0.25)',
    },
};

export { HOME_VISUAL_THEME };
export type { HomeVisualTheme };

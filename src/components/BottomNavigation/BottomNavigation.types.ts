export type HomeTimePeriod =
    | 'dawn'
    | 'morning'
    | 'daytime'
    | 'evening'
    | 'night';

export type BottomNavigationProps = {
    timePeriod: HomeTimePeriod;
};

import mood213 from '../../assets/home/mood/mood-213.png';
import mood214 from '../../assets/home/mood/mood-214.png';
import mood215 from '../../assets/home/mood/mood-215.png';
import mood216 from '../../assets/home/mood/mood-216.png';
import mood217 from '../../assets/home/mood/mood-217.png';
import mood218 from '../../assets/home/mood/mood-218.png';
import mood219 from '../../assets/home/mood/mood-219.png';
import mood220 from '../../assets/home/mood/mood-220.png';
import mood221 from '../../assets/home/mood/mood-221.png';
import mood222 from '../../assets/home/mood/mood-222.png';
import mood223 from '../../assets/home/mood/mood-223.png';
import mood224 from '../../assets/home/mood/mood-224.png';
import mood225 from '../../assets/home/mood/mood-225.png';
import mood226 from '../../assets/home/mood/mood-226.png';
import mood227 from '../../assets/home/mood/mood-227.png';
import mood228 from '../../assets/home/mood/mood-228.png';
import mood229 from '../../assets/home/mood/mood-229.png';

const MOOD_CHARACTERS = [
    { id: 'mood-213', image: mood213, label: '초롱초롱' },
    { id: 'mood-214', image: mood214, label: '엉엉 울음' },
    { id: 'mood-215', image: mood215, label: '화남' },
    { id: 'mood-216', image: mood216, label: '궁금함' },
    { id: 'mood-217', image: mood217, label: '신남' },
    { id: 'mood-218', image: mood218, label: '졸림' },
    { id: 'mood-219', image: mood219, label: '지침' },
    { id: 'mood-220', image: mood220, label: '깜짝 놀람' },
    { id: 'mood-221', image: mood221, label: '시큰둥' },
    { id: 'mood-222', image: mood222, label: '설렘' },
    { id: 'mood-223', image: mood223, label: '울적함' },
    { id: 'mood-224', image: mood224, label: '어지러움' },
    { id: 'mood-225', image: mood225, label: '멋짐' },
    { id: 'mood-226', image: mood226, label: '답답함' },
    { id: 'mood-227', image: mood227, label: '기쁨' },
    { id: 'mood-228', image: mood228, label: '평온함' },
    { id: 'mood-229', image: mood229, label: '사랑에 빠짐' },
] as const;

const DEFAULT_MOOD_ID = 'mood-228';

type MoodId = (typeof MOOD_CHARACTERS)[number]['id'];

const isMoodId = (value: string | null | undefined): value is MoodId => {
    return MOOD_CHARACTERS.some((mood) => mood.id === value);
};

const getMoodCharacter = (mood: string | null | undefined) => {
    const moodId = isMoodId(mood) ? mood : DEFAULT_MOOD_ID;

    return MOOD_CHARACTERS.find((item) => item.id === moodId) ?? MOOD_CHARACTERS[15];
};

export {
    DEFAULT_MOOD_ID,
    getMoodCharacter,
    isMoodId,
    MOOD_CHARACTERS,
};
export type { MoodId };

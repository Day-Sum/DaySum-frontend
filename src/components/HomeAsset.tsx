import type { CSSProperties } from 'react';

// Crop transparent padding in CSS: the source PNG pixels stay unchanged.
const frames = {
    logo: [2048, 682, 67, 69, 1995, 635],
    cloud: [1536, 1024, 77, 92, 1438, 951],
    dog: [1536, 1024, 94, 143, 1501, 954],
    bubble: [2048, 682, 218, 42, 1920, 638],
    badge: [1683, 935, 63, 114, 1620, 840],
    album: [1254, 1254, 97, 245, 1180, 1038],
    add: [1254, 1254, 273, 200, 1079, 1066],
    home: [1254, 1254, 143, 150, 1111, 1101],
    record: [1254, 1254, 248, 257, 1006, 1003],
    us: [1254, 1254, 195, 199, 1059, 1058],
    calendar: [1254, 1254, 161, 194, 1093, 1097],
    more: [1254, 1254, 275, 296, 978, 972],
} as const;

export default function HomeAsset({ src, frame, alt = '', style, className }: {
    src: string; frame: keyof typeof frames; alt?: string; style?: CSSProperties; className?: string;
}) {
    const [w, h, x, y, right, bottom] = frames[frame];
    const width = right - x, height = bottom - y;
    return <span className={className} style={{ display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: `${width} / ${height}`, ...style }}>
        <img src={src} alt={alt} draggable={false} style={{ position: 'absolute', maxWidth: 'none', width: `${w / width * 100}%`, height: `${h / height * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%`, pointerEvents: 'none' }} />
    </span>;
}

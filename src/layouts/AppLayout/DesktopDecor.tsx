import styled from '@emotion/styled';
import leftIllustration from '../../assets/desktop/desktop-left.png';
import rightIllustration from '../../assets/desktop/desktop-right.png';

// Background URLs only apply at desktop widths, so mobile does not fetch them.
const Decor = styled.div`
    display: none;

    @media (min-width: 1024px) {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        user-select: none;
        overflow: hidden;

        .side {
            position: absolute;
            top: 0;
            bottom: 0;
            width: calc((100% - var(--mobile-max-width)) / 2);
            text-align: center;
            color: #99836c;
        }
        .left { left: 0; }
        .right { right: 0; }
        .brand {
            position: absolute;
            top: 32vh;
            left: 8%;
            width: 84%;
        }
        .logo {
            margin: 0 auto 16px;
            color: #6f5b49;
            font-size: clamp(30px, 3vw, 44px);
            font-weight: 800;
            line-height: 1;
            letter-spacing: -.06em;
            opacity: .9;
        }
        p { margin: 0; font-size: clamp(13px, 1.05vw, 16px); line-height: 1.95; font-weight: 400; letter-spacing: -.03em; }
        .right-copy { position: absolute; top: 32vh; left: 8%; width: 84%; }
        .right-copy span { display: block; margin-bottom: 13px; color: #daa195; font-size: 18px; }
        .art {
            position: absolute;
            left: 50%;
            bottom: 13vh;
            width: min(84%, 330px);
            aspect-ratio: 1.14;
            transform: translateX(-50%);
            background-repeat: no-repeat;
            background-position: center bottom;
            background-size: 100% auto;
            opacity: .86;
        }
        .left-art { background-image: url(${leftIllustration}); }
        .right-art { background-image: url(${rightIllustration}); bottom: 16vh; }
    }

    @media (min-width: 1024px) and (max-height: 650px) {
        .brand { top: 60px; }
        .logo { margin-bottom: 6px; font-size: 30px; }
        .right-copy { top: 60px; }
        .art { bottom: 25px; width: min(78%, 250px); }
    }
`;

export default function DesktopDecor() {
    return (
        <Decor aria-hidden="true" data-testid="desktop-decor">
            <div className="side left">
                <div className="brand">
                    <p>우리의 하루가<br />더 특별해지는 곳</p>
                </div>
                <div className="art left-art" />
            </div>
            <div className="side right">
                <div className="right-copy"><p>서로의 지금을 나누는,<br />우리의 오늘</p></div>
                <div className="art right-art" />
            </div>
        </Decor>
    );
}

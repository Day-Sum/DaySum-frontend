import styled from '@emotion/styled';

export const ActivityScene = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: calc(
        100dvh - var(--bottom-nav-height, 100px) -
            env(safe-area-inset-bottom, 0px)
    );
    margin: 0;
    overflow: visible;
    container-type: inline-size;
`;

export const LandscapeStage = styled.div`
    position: relative;
    width: 100%;
    height: max(
        0px,
        calc(
            100dvh - var(--bottom-nav-height, 100px) -
                env(safe-area-inset-bottom, 0px) - 132px
        )
    );
    min-height: 0;
    flex: 0 0 auto;
    overflow: hidden;
`;

export const SceneBackground = styled.img`
    position: absolute;
    z-index: 0;
    inset: 0;

    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center 20%;

    pointer-events: none;
    user-select: none;
`;

export const PresenceGrid = styled.div`
    position: absolute;
    top: 38.5%;
    left: 5%;
    right: 5%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1%;
    align-items: end;
`;

export const PresenceBlock = styled.div`
    position: relative;
    display: flex;
    min-width: 0;
    flex-direction: column;
    align-items: center;
`;

export const StatusBubble = styled.button`
    position: relative;
    display: grid;
    place-items: center;
    width: 100%;
    height: 20cqw;
    padding: 0;
    background: transparent;
    color: #39332d;
    cursor: pointer;

    &:active {
        transform: translateY(1px);
    }
`;

export const StatusBubbleContent = styled.span`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 86%;
    height: 76%;
    padding: 4% 7% 8%;
    text-align: center;
    transform: translateY(4px);
`;

export const StatusMain = styled.span`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: clamp(11px, 3.2cqw, 15px);
    line-height: 1.45;
    font-weight: 600;
    overflow-wrap: anywhere;

    span {
        color: #9b7136;
    }
`;

export const StatusMeta = styled.span`
    margin-top: 2px;
    color: #817365;
    font-size: 10px;
`;

export const CharacterButton = styled.button`
    position: relative;
    display: grid;
    place-items: end center;
    width: 88%;
    height: auto;
    aspect-ratio: 1;
    padding: 0;
    background: transparent;
    cursor: pointer;
    transition: transform 0.18s ease;

    &:hover {
        transform: translateY(-3px);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const CharacterImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center bottom;
    pointer-events: none;
    user-select: none;
`;

export const PersonName = styled.strong`
    display: block;
    max-width: 90%;
    min-height: 29px;
    margin-top: 5px;
    padding: 5px 16px;
    overflow: hidden;
    background: #ffe6a77d;
    color: #42372c;
    border-radius: 47% 53% 50% 44%;
    font-size: 13px;
    line-height: 1.4;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const MoodLabel = styled.span`
    max-width: 95%;
    margin-top: 5px;
    color: #776653;
    font-size: 11px;
    line-height: 1.5;
    text-align: center;
`;

export const SceneHeart = styled.img`
    position: absolute;
    top: 22%;
    left: 44.5%;
    width: 11%;
    pointer-events: none;
`;

export const MoodHint = styled.p`
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 15px 10px;
    color: #89745b;
    font-size: 12px;
    letter-spacing: -0.02em;
    text-align: center;
`;

export const MusicDock = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    flex-shrink: 0;
    margin-top: -36px;
    padding: 0px 20px;
`;

export const EditorDescription = styled.p`
    margin: -8px 0 20px;
    color: #817363;
    font-size: 13px;
    line-height: 1.6;
`;

export const QuickActivityRow = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin-bottom: 16px;
`;

export const QuickActivityButton = styled.button<{ $selected: boolean }>`
    min-height: 44px;
    border: 1px solid ${p => (p.$selected ? '#cb8e60' : '#e4d9c5')};
    border-radius: 13px 16px 12px 17px;
    background: ${p => (p.$selected ? '#ffe9bf' : '#fffdf7')};
    color: #574937;
    font-size: 13px;
    cursor: pointer;
`;

export const ActivityInput = styled.input`
    width: 100%;
    height: 52px;
    padding: 0 14px;
    border: 1.5px solid #cfbea5;
    border-radius: 14px;
    background: #fffefa;
    color: #3f342b;
    font-size: 16px;
`;

export const EditorHint = styled.p`
    margin: 8px 0 20px;
    color: #817365;
    font-size: 11px;
    line-height: 1.6;
`;

export const EditorActions = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 10px;
`;

export const PrimaryButton = styled.button`
    min-height: 48px;
    padding: 10px 16px;
    background: #5a4637;
    color: #fff8e9;
    border-radius: 14px 17px 14px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;

export const SecondaryButton = styled(PrimaryButton)`
    background: #f2e8d9;
    color: #625142;
`;

export const MoodGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 9px;
`;

export const MoodOption = styled.button<{ $selected: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    min-height: 106px;
    padding: 10px 3px;
    gap: 5px;
    background: ${p => (p.$selected ? '#ffe9bf' : '#fffdf7')};
    border: 1.5px solid ${p => (p.$selected ? '#cd975c' : '#e9dfd1')};
    border-radius: 16px 19px 14px 18px;
    color: #554536;
    font-size: 11px;
    cursor: pointer;
`;

export const MoodOptionImage = styled.img`
    width: 66px;
    height: 63px;
    object-fit: contain;
`;

export const PartnerCopy = styled.p`
    font-size: 15px;
    line-height: 1.8;
    overflow-wrap: anywhere;
`;

export const PartnerMood = styled.img`
    display: block;
    width: 130px;
    height: 130px;
    margin: 18px auto;
    object-fit: contain;
`;

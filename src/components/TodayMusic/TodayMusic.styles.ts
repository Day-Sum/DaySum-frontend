import styled from '@emotion/styled';
import shell from '../../assets/home/reference/web/music-card-shell.webp';

export const MusicCard = styled.div`
    position: relative;
    width: 100%;
    isolation: isolate;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background: url(${shell}) 50% 51% / 107.05% 136.38% no-repeat;
        pointer-events: none;
    }
`;

export const CardMainButton = styled.button`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;

    min-height: 100px;
    padding: 8px 18px;

    background: transparent;
    color: #3d332b;
    text-align: left;
    cursor: pointer;
`;

export const AlbumSlot = styled.span`
    position: relative;
    display: grid;
    place-items: center;
    width: 23%;
    max-width: 86px;
    flex-shrink: 0;
    aspect-ratio: 1192 / 973;
`;

export const AlbumIllustration = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    pointer-events: none;
    user-select: none;
`;

export const Artwork = styled.img`
    position: absolute;
    z-index: 1;
    top: 16%;
    left: 10%;
    width: 57%;
    aspect-ratio: 1;
    object-fit: contain;
    transform: rotate(-8deg);
    border: 2px solid #fff8e9;
    border-radius: 2px;
    background: #fff8e9;
`;

export const MusicText = styled.span`
    display: block;
    min-width: 0;
    flex: 1;
`;

export const Eyebrow = styled.span`
    display: block;
    margin-bottom: 5px;
    color: #9b7960;
    font-size: 10px;
`;

export const Title = styled.span`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: clamp(15px, 4.4cqw, 20px);
    line-height: 1.45;
    font-weight: 600;
    letter-spacing: -0.05em;
    overflow-wrap: anywhere;
`;

export const Artist = styled.span`
    display: block;
    margin-top: 7px;
    overflow: hidden;
    color: #8c7c69;
    font-size: 12px;
    line-height: 1.4;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const AddSlot = styled.span`
    display: block;
    width: 40px;
    flex-shrink: 0;
`;

export const MusicControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin: 0 18px;
    padding: 2px 0 4px;
    border-top: 1px dashed #d8cbb4;
`;

export const ControlButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;   
    min-height: 34px;
    padding: 12px 6px;
    background: transparent;
    color: #786049;
    border-radius: 10px;
    font-size: 12px;
    cursor: pointer;
`;

export const Unavailable = styled.span`
    color: #9b8976;
    font-size: 11px;
`;

export const Description = styled.p`
    margin: -8px 0 20px;
    color: #887460;
    font-size: 13px;
    line-height: 1.6;
`;

export const SearchForm = styled.form`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
`;

export const SearchInput = styled.input`
    min-width: 0;
    flex: 1;
    height: 48px;
    padding: 0 12px;
    border: 1.5px solid #cfbea5;
    border-radius: 14px;
    background: #fffefa;
    color: #46382c;
    font-size: 16px;
`;

export const SearchButton = styled.button`
    min-height: 48px;
    flex-shrink: 0;
    padding: 8px 15px;
    background: #5a4637;
    color: #fff8e9;
    border-radius: 14px;
    font-size: 13px;
    cursor: pointer;
`;

export const Results = styled.div`
    min-height: 140px;
`;

export const EmptyMessage = styled.p`
    margin: 40px 0;
    color: #8a7660;
    font-size: 13px;
    line-height: 1.8;
    text-align: center;

    button {
        margin-top: 16px;
    }
`;

export const ResultRow = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 0;
    border-bottom: 1px solid #e8dfd0;
`;

export const ResultSelectButton = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    min-height: 64px;
    flex: 1;
    padding: 5px;
    background: transparent;
    color: #43392f;
    text-align: left;
    cursor: pointer;
`;

export const ResultArtwork = styled.img`
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    object-fit: contain;
    border-radius: 8px;
    background: #fffaf0;
`;

export const ResultText = styled.span`
    display: block;
    min-width: 0;
    flex: 1;
`;

export const ResultTitle = styled.span`
    display: block;
    font-size: 13px;
    line-height: 1.5;
    font-weight: 600;
    overflow-wrap: anywhere;
`;

export const ResultArtist = styled.span`
    display: block;
    margin-top: 4px;
    color: #907f6c;
    font-size: 11px;
    line-height: 1.5;
    overflow-wrap: anywhere;
`;

export const SelectLabel = styled.span`
    flex-shrink: 0;
    color: #a17853;
    font-size: 11px;
`;

export const ResultPreviewButton = styled.button`
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    background: #f5e7c7;
    color: #634e36;
    border-radius: 50%;
    font-size: 22px;
    cursor: pointer;
`;

export const RemoveButton = styled.button`
    width: 100%;
    min-height: 48px;
    margin-top: 16px;
    background: #f0e6d7;
    color: #765b44;
    border-radius: 14px;
    font-size: 13px;
    cursor: pointer;
`;

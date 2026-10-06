import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const Backdrop = styled.div`
    position: fixed; inset: 0; z-index: 1000; display: flex; align-items: flex-end;
    justify-content: center; background: rgb(52 43 33 / 30%); backdrop-filter: blur(3px);
`;
const Panel = styled.section`
    width: min(100%, 480px); max-height: 90%; overflow: auto; overscroll-behavior: contain;
    padding: 10px 22px calc(24px + env(safe-area-inset-bottom, 0px));
    background: #fffaf0; color: #39322d; border: 1px solid #d5c7b1;
    border-radius: 28px 28px 0 0; box-shadow: 0 -12px 60px #33251415;
    outline: none;
    &::before { content: ''; display: block; width: 36px; height: 4px; border-radius: 9px; background: #d9cebc; margin: 0 auto 12px; }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
    h2 { font-size: 22px; letter-spacing: -.04em; margin: 0; }
    header button { width: 44px; height: 44px; border-radius: 50%; background: #efe6d7; color: #4a3d33; font-size: 25px; cursor: pointer; flex-shrink: 0; }
`;
export const SheetError = styled.p`
    margin: 12px 0; padding: 12px; background: #ffece5; border-radius: 12px;
    color: #9b352b; font-size: 13px; line-height: 1.6;
`;

export default function HomeSheet({ title, onClose, children, busy = false }: {
    title: string; onClose: () => void; children: ReactNode; busy?: boolean;
}) {
    const panel = useRef<HTMLElement>(null);
    const backdrop = useRef<HTMLDivElement>(null);
    const latest = useRef({ onClose, busy });
    latest.current = { onClose, busy };
    useEffect(() => {
        const previous = document.activeElement as HTMLElement | null;
        const root = document.getElementById('root');
        const wasInert = root?.inert;
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        if (root) root.inert = true;
        const focusables = () => Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), [href], [tabindex="0"]') ?? []).filter(el => el.getClientRects().length > 0);
        (panel.current?.querySelector<HTMLElement>('[data-initial-focus]') ?? focusables()[0] ?? panel.current)?.focus();
        const keydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { e.preventDefault(); if (!latest.current.busy) latest.current.onClose(); }
            if (e.key === 'Tab') {
                const items = focusables(), first = items[0], last = items[items.length - 1];
                if (!first) { e.preventDefault(); panel.current?.focus(); }
                else if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        const viewport = window.visualViewport;
        const resize = () => {
            if (backdrop.current && viewport) {
                backdrop.current.style.height = `${viewport.height}px`;
                backdrop.current.style.top = `${viewport.offsetTop}px`;
                backdrop.current.style.bottom = 'auto';
            }
        };
        resize(); viewport?.addEventListener('resize', resize); viewport?.addEventListener('scroll', resize);
        document.addEventListener('keydown', keydown);
        return () => {
            document.body.style.overflow = overflow;
            if (root) root.inert = wasInert ?? false;
            document.removeEventListener('keydown', keydown);
            viewport?.removeEventListener('resize', resize); viewport?.removeEventListener('scroll', resize);
            if (previous?.isConnected) previous.focus();
        };
    }, []);
    return createPortal(<Backdrop ref={backdrop} onClick={e => {
        if (e.target === e.currentTarget && !busy) onClose();
    }}><Panel ref={panel} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}>
        <header><h2>{title}</h2><button type="button" aria-label="닫기" onClick={onClose} disabled={busy}>×</button></header>
        {children}
    </Panel></Backdrop>, document.body);
}

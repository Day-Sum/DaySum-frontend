// Separate development-only entry. Never imported by main.tsx or the production build.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import apiClient from '../apis/config/apiClient';
import { queryClient } from '../QueryClient';
import HomePage from '../pages/Home/HomePage';
import AppLayout from '../layouts/AppLayout/AppLayout';
import type { MusicInfo } from '../apis/music/music.types';
import '../index.css';

if (!import.meta.env.DEV) throw new Error('Preview is available only on the development server.');
const key = 'daysum-home-preview-v1';
const initial = { mood: 'mood-222', currentActivity: { activity: '커피 마시는 중', startedAt: new Date().toISOString() }, music: null as MusicInfo | null };
let state = initial;
try { const saved = localStorage.getItem(key); if (saved) state = { ...initial, ...JSON.parse(saved) }; } catch { /* A fresh preview also works when storage is unavailable. */ }
const connected = new URLSearchParams(location.search).get('connected') !== 'false';
const tracks: MusicInfo[] = [{ provider: 'preview', trackId: 'sample-1', title: '너와 걷는 오후', artist: 'DaySum · 미리보기 음악', artworkUrl: null, storeUrl: null, previewUrl: null }, { provider: 'preview', trackId: 'sample-2', title: '작은 하루', artist: 'DaySum · 미리보기 음악', artworkUrl: null, storeUrl: null, previewUrl: null }];
apiClient.defaults.adapter = async config => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const method = config.method?.toUpperCase(), path = config.url;
    const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
    let data: unknown = {};
    if (path === '/home') data = state;
    else if (path === '/couples/status') data = { connected, coupleId: connected ? 1 : null };
    else if (path === '/couples') data = { partnerNickname: '연인', dayCount: 328, coupleId: 1 };
    else if (path === '/partner/today') data = { mood: 'mood-228', currentActivity: { activity: '잠깐 쉬는 중', startedAt: new Date().toISOString() } };
    else if (path === '/activities') state.currentActivity = { activity: body.activity, startedAt: new Date().toISOString() };
    else if (path === '/activities/current') state.currentActivity = { activity: '', startedAt: new Date().toISOString() };
    else if (path === '/daily-records/today/mood') state.mood = body.mood;
    else if (path === '/music/search') data = { musics: tracks.filter(track => !config.params.query || (track.title + track.artist).includes(config.params.query)) };
    else if (path === '/daily-records/today/music') state.music = method === 'DELETE' ? null : body;
    else throw new Error('Unsupported preview endpoint');
    try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* Session-only preview. */ }
    return { data: { status: 200, code: 'OK', data }, status: 200, statusText: 'OK', headers: {}, config };
};
createRoot(document.getElementById('root')!).render(<StrictMode><QueryClientProvider client={queryClient}><MemoryRouter initialEntries={['/home']}><Routes><Route element={<AppLayout />}><Route path="/home" element={<HomePage />} /><Route path="/onboarding/invite" element={<div style={{ padding: 30, lineHeight: 1.8 }}>이 화면은 샘플 데이터로 동작하는 로컬 미리보기입니다. 실제 동행자 연결은 서비스에서 진행해 주세요.<br/><Link to="/home">홈으로 돌아가기</Link></div>} /></Route></Routes></MemoryRouter></QueryClientProvider></StrictMode>);

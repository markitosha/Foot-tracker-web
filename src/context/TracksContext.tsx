import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import jsonData from '../assets/tracks_and_candidates_v4.json';
import prepareTrack from '../utils/prepareTrack.ts';

type BBox = {
    timestamp: string;
    x: number;
    y: number;
    w: number;
    h: number;
};

export type Track = {
    timestamp: number;
    x: number;
    y: number;
    w: number;
    h: number;
}

export type JsonData = {
    box_info: BBox[];
    candidates_list: number[];
}

export const TracksContext = createContext<{
    allTracks: Record<number, JsonData>;
    mainTrack: Track[];
    mainTrackId: number;
    candidateList: number[];
    candidateId: number;
    candidateTrack: Track[];
    currentTrack: Track[];
    color: 'red' | 'yellow';
    onTrackFinished: () => void;
    trackList: number[];
    setMainTrackId: (id: number) => void;
}>({
    allTracks: {},
    mainTrack: [],
    mainTrackId: 0,
    candidateList: [],
    candidateId: 0,
    candidateTrack: [],
    currentTrack: [],
    color: 'red',
    onTrackFinished: () => {},
    trackList: [],
    setMainTrackId: () => {},
});

export default function TracksProvider({ children }: { children: ReactNode }) {
    const [allTracks] = useState<Record<number, JsonData>>(jsonData as any);
    const trackList = useMemo(() => Object.keys(allTracks).map(value => +value), [allTracks]);
    const [mainTrackId, setMainTrackId] = useState<number>(trackList[0] || 1);
    const [candidateId] = useState<number>(allTracks[mainTrackId]?.candidates_list?.[0]);

    const mainTrack = useMemo(
        () => prepareTrack(allTracks[mainTrackId]),
        [mainTrackId],
    );
    const candidateList = useMemo(
        () => allTracks[mainTrackId].candidates_list,
        [mainTrackId],
    );
    const candidateTrack = useMemo(
        () => prepareTrack(allTracks[candidateId]),
        [candidateId],
    );
    const [currentTrack, setCurrentTrack] = useState<Track[]>(mainTrack);

    const onTrackFinished = useCallback(() => {
        setCurrentTrack(candidateTrack);
    }, [candidateTrack]);

    return <TracksContext.Provider value={{
        allTracks,
        mainTrack,
        mainTrackId,
        setMainTrackId,
        candidateList,
        candidateId,
        candidateTrack,
        currentTrack,
        onTrackFinished,
        trackList,
        color: currentTrack === mainTrack ? 'red' : 'yellow',
    }}>
        {children}
    </TracksContext.Provider>
}

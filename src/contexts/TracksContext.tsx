import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
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
    trackList: number[];
    setMainTrackId: (id: number) => void;
    setCandidateId: (id: number) => void;
}>({
    allTracks: {},
    mainTrack: [],
    mainTrackId: 0,
    candidateList: [],
    candidateId: 0,
    candidateTrack: [],
    trackList: [],
    setMainTrackId: () => {},
    setCandidateId: () => {},
});

export default function TracksProvider({ children }: { children: ReactNode }) {
    const [allTracks] = useState<Record<number, JsonData>>(jsonData as any);
    const trackList = useMemo(() => Object.keys(allTracks).map(value => +value), [allTracks]);
    const [mainTrackId, setMainTrackId] = useState<number>(trackList[0] || 1);
    const [candidateId, setCandidateId] = useState<number>(allTracks[mainTrackId]?.candidates_list?.[0]);

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

    useEffect(() => {
        setCandidateId(candidateList[0]);
    }, [candidateList]);

    return <TracksContext.Provider value={{
        allTracks,
        mainTrack,
        mainTrackId,
        setMainTrackId,
        candidateList,
        candidateId,
        setCandidateId,
        candidateTrack,
        trackList,
    }}>
        {children}
    </TracksContext.Provider>
}

import { createContext, useState } from 'react';
import jsonData from '../assets/tracks_and_candidates_v4.json';

type BBox = {
    timestamp: string;
    x: number;
    y: number;
    w: number;
    h: number;
};

type Track = {
    timestamp: number;
    x: number;
    y: number;
    w: number;
    h: number;
}

type JsonData = {
    box_info: BBox[];
    candidates_list: number[];
}

export const TracksContext = createContext<{
    allTracks: Record<number, JsonData>;
    currentTrack: Track[];
}>({
    allTracks: {},
    currentTrack: []
});

const parseTimestamp = (timestamp: string) => {
    const [hour, minute, second] = timestamp.split(':');

    return ((+hour * 60 * 60) + (+minute * 60) + +second) * 1000;
}

export default function TracksProvider({ children }: { children: React.ReactNode }) {
    const [allTracks] = useState<Record<number, JsonData>>(jsonData as any);
    const [currentTrackIndex] = useState<number>(1);

    const currentTrack = allTracks[currentTrackIndex]?.box_info.map(item => ({
        ...item,
        timestamp: parseTimestamp(item.timestamp)
    })) || [];

    return <TracksContext.Provider value={{
        allTracks,
        currentTrack
    }}>
        {children}
    </TracksContext.Provider>
}

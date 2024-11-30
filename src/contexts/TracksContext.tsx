import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import prepareTrack from '../utils/prepareTrack.ts';
import { JsonContext } from './JsonContext.tsx';

export type Track = {
    timestamp: number;
    x: number;
    y: number;
    w: number;
    h: number;
}

export const TracksContext = createContext<{
    mainTrack: Track[];
    mainTrackId: number;
    candidateList: number[];
    candidateId: number;
    candidateTrack: Track[];
    trackList: number[];
    setMainTrackId: (id: number) => void;
    setCandidateId: (id: number) => void;
    pickNextCandidate: () => void;
    removeCandidate: () => void;
    joinTracks: () => void;
}>({
    mainTrack: [],
    mainTrackId: 0,
    candidateList: [],
    candidateId: 0,
    candidateTrack: [],
    trackList: [],
    setMainTrackId: () => {},
    setCandidateId: () => {},
    pickNextCandidate: () => {},
    removeCandidate: () => {},
    joinTracks: () => {}
});

export default function TracksProvider({ children }: { children: ReactNode }) {
    const { allTracks, dispatch } = useContext(JsonContext);
    // all track ids
    const trackList = useMemo(() => Object.keys(allTracks).map(value => +value), [allTracks]);

    // track id, picked for rendering
    const [mainTrackId, setMainTrackId] = useState<number>(trackList[0] || 1);
    // candidate id, picked for rendering
    const [candidateId, setCandidateId] = useState<number>(allTracks[mainTrackId]?.candidates_list?.[0]);

    // track for the main bbox
    const mainTrack = useMemo(
        () => prepareTrack(allTracks[mainTrackId]),
        [mainTrackId, allTracks],
    );
    // list of candidates for picked main track
    const candidateList = useMemo(
        () => allTracks[mainTrackId].candidates_list,
        [mainTrackId, allTracks],
    );
    // track for the candidate bbox
    const candidateTrack = useMemo(
        () => prepareTrack(allTracks[candidateId]),
        [candidateId, allTracks],
    );

    const pickNextCandidate = useCallback(() => {
        const index = candidateList.findIndex(value => value === candidateId);

        setCandidateId(candidateList[index + 1]);
    }, [candidateList, candidateId, setCandidateId]);

    // setMainTrackId is not enough, because we also need to update candidateId
    const updateMainTrackId = useCallback((id: number) => {
        setMainTrackId(id);
        setCandidateId(allTracks[id].candidates_list?.[0]);
    }, [allTracks, setMainTrackId, setMainTrackId]);

    useEffect(() => {
        const index = candidateList.findIndex(value => value === candidateId);

        if (index === -1) {
            setCandidateId(candidateList[0]);
        }
    }, [candidateList, candidateId]);

    /**
     * Actions for JSON Context
     */
    const removeCandidate = () => dispatch({
        type: 'removeCandidate',
        candidateId: candidateId,
        mainId: mainTrackId
    });
    const joinTracks = () => dispatch({
        type: 'joinTracks',
        candidateId: candidateId,
        mainId: mainTrackId
    })

    return <TracksContext.Provider value={{
        mainTrack,
        mainTrackId,
        setMainTrackId: updateMainTrackId,
        candidateList,
        candidateId,
        setCandidateId,
        candidateTrack,
        trackList,
        pickNextCandidate,
        removeCandidate,
        joinTracks
    }}>
        {children}
    </TracksContext.Provider>
}

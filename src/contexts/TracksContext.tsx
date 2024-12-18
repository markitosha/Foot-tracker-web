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

export type TrackStatusType = ''
    | 'Пауза внутри трека'
    | 'Трек закончился'
    | 'Трек еще не начался'
    | 'Трек активен'
    | 'Последний фрейм'
    | 'Пустой фрейм';

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
    setCandidateTrackStatus: (s: TrackStatusType) => void;
    setMainTrackStatus: (s: TrackStatusType) => void;
    mainTrackStatus: TrackStatusType;
    candidateTrackStatus: TrackStatusType;
    removeTrackById: (id: number) => void;
    trackTimeShift: number;
    setTrackTimeShift: (n: number) => void;
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
    joinTracks: () => {},
    setCandidateTrackStatus: () => {},
    setMainTrackStatus: () => {},
    mainTrackStatus: '',
    candidateTrackStatus: '',
    removeTrackById: () => {},
    setTrackTimeShift: () => {},
    trackTimeShift: 0
});

export default function TracksProvider({ children }: { children: ReactNode }) {
    const { allTracks, dispatch } = useContext(JsonContext);
    const [trackTimeShift, setTrackTimeShift] = useState(0);
    // all track ids
    const trackList = useMemo(() => Object.keys(allTracks).map(value => +value), [allTracks]);

    // track id, picked for rendering
    const [mainTrackId, setMainTrackId] = useState<number>(trackList[0] || 1);
    // candidate id, picked for rendering
    const [candidateId, setCandidateId] = useState<number>(allTracks[mainTrackId]?.candidates_list?.[0]);

    const [mainTrackStatus, setMainTrackStatus] = useState<TrackStatusType>('');
    const [candidateTrackStatus, setCandidateTrackStatus] = useState<TrackStatusType>('');

    // track for the main bbox
    const mainTrack = useMemo(
        () => prepareTrack(allTracks[mainTrackId]),
        [mainTrackId, allTracks],
    );
    // list of candidates for picked main track
    const candidateList = useMemo(
        () => allTracks[mainTrackId]?.candidates_list || [],
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

    useEffect(() => {
        const index = trackList.findIndex(value => value === mainTrackId);

        if (index === -1) {
            setMainTrackId(trackList[0]);
        }
    }, [trackList, mainTrackId]);

    useEffect(() => {
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
            && navigator.userAgent.toLowerCase().indexOf('seamonkey') === -1;

        setTrackTimeShift(isFirefox ? 0 : 1);
    }, []);

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
    });
    const removeTrackById = (id: number) => dispatch({
        type: 'removeId',
        id
    });

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
        joinTracks,
        setMainTrackStatus,
        setCandidateTrackStatus,
        mainTrackStatus,
        candidateTrackStatus,
        removeTrackById,
        trackTimeShift,
        setTrackTimeShift
    }}>
        {children}
    </TracksContext.Provider>
}

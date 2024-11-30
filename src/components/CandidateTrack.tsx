import { useContext } from 'react';
import { TracksContext } from '../contexts/TracksContext.tsx';
import ActiveTrack from './ActiveTrack.tsx';

export default function CandidateTrack() {
    const { candidateId, candidateList, setCandidateId, candidateTrackStatus } = useContext(TracksContext);

    return (
        <ActiveTrack
            trackList={candidateList}
            trackId={candidateId}
            setMainTrackId={setCandidateId}
            label={`Кандидат (${candidateList.length})`}
            color={'secondary'}
            trackStatus={candidateTrackStatus}
        />
    )
}
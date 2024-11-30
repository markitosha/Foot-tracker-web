import { useContext } from 'react';
import { TracksContext } from '../context/TracksContext.tsx';
import ActiveTrack from './ActiveTrack.tsx';

export default function CandidateTrack() {
    const { candidateId, candidateList, setCandidateId } = useContext(TracksContext);

    return (
        <ActiveTrack
            trackList={candidateList}
            trackId={candidateId}
            setMainTrackId={setCandidateId}
            label={`Кандидат (${candidateList.length})`}
            color={'secondary'}
        />
    )
}
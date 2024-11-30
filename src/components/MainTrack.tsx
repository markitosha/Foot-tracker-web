import { useContext } from 'react';
import { TracksContext } from '../contexts/TracksContext.tsx';
import ActiveTrack from './ActiveTrack.tsx';

export default function MainTrack() {
    const { mainTrackId, setMainTrackId, trackList, mainTrackStatus } = useContext(TracksContext);

    return (
        <ActiveTrack
            trackList={trackList}
            trackId={mainTrackId}
            setMainTrackId={setMainTrackId}
            label={`Трек (${trackList.length})`}
            color={'primary'}
            trackStatus={mainTrackStatus}
        />
    )
}
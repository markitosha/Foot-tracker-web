import { useContext } from 'react';
import { TracksContext } from '../context/TracksContext.tsx';
import ActiveTrack from './ActiveTrack.tsx';

export default function MainTrack() {
    const { mainTrackId, setMainTrackId, trackList } = useContext(TracksContext);

    return (
        <ActiveTrack
            trackList={trackList}
            trackId={mainTrackId}
            setMainTrackId={setMainTrackId}
            label={'Трек'}
            color={'primary'}
        />
    )
}
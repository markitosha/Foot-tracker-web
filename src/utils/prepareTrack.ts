import { JsonData, Track } from '../context/TracksContext.tsx';

const parseTimestamp = (timestamp: string) => {
    const [hour, minute, second] = timestamp.split(':');

    return ((+hour * 60 * 60) + (+minute * 60) + +second) * 1000;
}

export default function prepareTrack(track?: JsonData): Track[] {
    return track?.box_info.map(item => ({
        ...item,
        timestamp: parseTimestamp(item.timestamp),
    })) || []
}
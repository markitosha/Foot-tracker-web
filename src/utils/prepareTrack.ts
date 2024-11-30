import { JsonData } from '../contexts/JsonContext.tsx';
import { Track } from '../contexts/TracksContext.tsx';

const parseTimestamp = (timestamp: string) => {
    const [hour, minute, second] = timestamp.split(':');

    return ((+hour * 60 * 60) + (+minute * 60) + +second) * 1000;
}

export default function prepareTrack(track?: JsonData): Track[] {
    const mapped =  track?.box_info.map(item => ({
        ...item,
        timestamp: parseTimestamp(item.timestamp),
    })) || []

    mapped.sort((a, b) => a.timestamp - b.timestamp);

    return mapped;
}

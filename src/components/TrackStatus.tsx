import clsx from 'clsx';
import { TrackStatusType } from '../contexts/TracksContext.tsx';

type Props = {
    trackStatus: TrackStatusType;
};

export default function TrackStatus({ trackStatus }: Props) {
    return (
        <div className={clsx(
            'text-xs bg-opacity-10 border rounded-full px-2 py-1',
            {
                'bg-green-700 border-green-700 text-green-700': trackStatus === 'Трек активен',
                'bg-blue-700 border-blue-700 text-blue-700': trackStatus === 'Пауза внутри трека',
                'bg-gray-700 border-gray-700 text-gray-700': trackStatus !== 'Трек активен' && trackStatus !== 'Пауза внутри трека',
            })
        }>
            ◉ {trackStatus}
        </div>
    );
}

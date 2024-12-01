import { Slider } from '@mui/material';
import { useContext } from 'react';
import { TracksContext } from '../contexts/TracksContext.tsx';

export default function TrackShiftSlider() {
    const { trackTimeShift, setTrackTimeShift } = useContext(TracksContext);

    return (
        <div className={'mt-10 flex flex-col justify-center items-center'}>
            <span className={'text-center text-gray-600 text-xs'}>
                Иногда треки не совпадают со значениями currentTime плеера, что вызывает "сдвиг" в отображении трека.
                Этот слайдер позволяет вручную корректировать сдвиг.
            </span>
            <div className={'w-1/2'}>
                <Slider
                    size={'small'}
                    min={-2}
                    max={2}
                    step={0.1}
                    valueLabelDisplay="auto"
                    defaultValue={trackTimeShift}
                    value={trackTimeShift}
                    color={'info'}
                    onChange={(_, value) => {
                        setTrackTimeShift(value as number);
                    }}
                />
            </div>
        </div>
    )
}
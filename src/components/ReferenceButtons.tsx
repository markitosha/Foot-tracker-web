import { Button, ButtonGroup } from '@mui/material';
import { useContext } from 'react';
import { TracksContext } from '../contexts/TracksContext.tsx';
import { VideoContext } from '../contexts/VideoContext.tsx';

const TIME_BEFORE_END = 3;

export default function ReferenceButtons() {
    const { videoRef } = useContext(VideoContext);
    const { mainTrack } = useContext(TracksContext);

    const handleStart = () => {
        if (!videoRef.current) {
            return;
        }

        videoRef.current.currentTime = mainTrack[0]?.timestamp / 1000;
        videoRef.current.play();
    };

    const handleEnd = () => {
        if (!videoRef.current) {
            return;
        }

        // 3 seconds before the end
        videoRef.current.currentTime = (mainTrack[mainTrack.length - 1]?.timestamp / 1000) - TIME_BEFORE_END;
        videoRef.current.play();
    };

    return (
        <div className={'flex flex-col justify-center items-center my-4 gap-1'}>
            <ButtonGroup size={'small'}>
                <Button onClick={handleStart}>⬅️&nbsp;Начало трека</Button>
                <Button onClick={handleEnd}>Конец трека&nbsp;➡️</Button>
            </ButtonGroup>
        </div>
    );
}

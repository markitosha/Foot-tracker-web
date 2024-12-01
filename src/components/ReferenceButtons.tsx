import { Button, ButtonGroup } from '@mui/material';
import { useContext } from 'react';
import { VideoContext } from '../contexts/VideoContext.tsx';

export default function ReferenceButtons() {
    const { rewindToEnd, rewindToStart } = useContext(VideoContext);

    return (
        <div className={'flex flex-col justify-center items-center gap-2'}>
            <ButtonGroup size={'small'}>
                <Button onClick={rewindToStart}>⬅️&nbsp;Начало трека</Button>
                <Button onClick={rewindToEnd}>Конец трека&nbsp;➡️</Button>
            </ButtonGroup>
        </div>
    );
}

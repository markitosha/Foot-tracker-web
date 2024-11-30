import { Button, ButtonGroup } from '@mui/material';
import { useContext } from 'react';
import { TracksContext } from '../contexts/TracksContext.tsx';
import { VideoContext } from '../contexts/VideoContext.tsx';

export default function ChoiceButtons() {
    const { rewindToEnd } = useContext(VideoContext);
    const { removeCandidate, pickNextCandidate, joinTracks } = useContext(TracksContext);

    const handleYes = () => {
        joinTracks();
        rewindToEnd();
    };

    const handleNo = () => {
        removeCandidate();
        pickNextCandidate();
        rewindToEnd();
    };

    const handleIdk = () => {
        pickNextCandidate();
        rewindToEnd();
    };

    return (
        <div className={'flex flex-col justify-center items-center my-4 gap-1'}>
            <ButtonGroup>
                <Button color={'success'} onClick={handleYes}>
                    Да
                </Button>
                <Button color={'error'} onClick={handleNo}>
                    Нет
                </Button>
                <Button color={'warning'} onClick={handleIdk}>
                    Не знаю
                </Button>
            </ButtonGroup>
        </div>
    );
};
import { Button, ButtonGroup } from '@mui/material';
import { useContext } from 'react';
import { TracksContext } from '../contexts/TracksContext.tsx';
import { VideoContext } from '../contexts/VideoContext.tsx';

export default function ChoiceButtons() {
    const { rewindToEnd } = useContext(VideoContext);
    const {
        removeCandidate,
        pickNextCandidate,
        joinTracks,
        candidateId,
        mainTrackId,
        removeTrackById
    } = useContext(TracksContext);

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

    const handleRemoveCandidate = () => {
        removeTrackById(candidateId);
        pickNextCandidate();
        rewindToEnd();
    }

    return (
        <div className={'flex flex-col justify-center items-center gap-2'}>
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
            <ButtonGroup>
                <Button color={'error'} onClick={handleRemoveCandidate}>
                    Удалить [{candidateId}] везде
                </Button>
                <Button color={'error'} onClick={() => removeTrackById(mainTrackId)}>
                    Удалить [{mainTrackId}] везде
                </Button>
            </ButtonGroup>
        </div>
    );
};

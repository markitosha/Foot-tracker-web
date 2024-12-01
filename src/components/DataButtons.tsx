import { Button, ButtonGroup, styled } from '@mui/material';
import { ChangeEvent, useContext, useRef } from 'react';
import { JsonContext } from '../contexts/JsonContext.tsx';
import { VideoContext } from '../contexts/VideoContext.tsx';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function DataButtons() {
    const { allTracks, dispatch } = useContext(JsonContext);
    const { setVideoSrc } = useContext(VideoContext);
    const linkRef = useRef(null);

    const handleClick = () => {
        const result = JSON.stringify(allTracks, null, 2);
        const blob = new Blob([result], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'results.json';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleUploadVideo = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target?.files?.[0]) {
            return;
        }

        setVideoSrc(URL.createObjectURL(event.target.files[0]));
    };

    const handleUploadJSON = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const jsonData = JSON.parse(e.target?.result as string);

            dispatch({
                type: 'uploadJson',
                data: jsonData,
            })
        };

        reader.readAsText(file);
    };

    return (
        <ButtonGroup className={'text-center mt-4'} size={'small'}>
            <Button variant={'outlined'} ref={linkRef} component="label">
                Загрузить видео ⬆︎
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleUploadVideo}
                    accept="video/*"
                />
            </Button>
            <Button variant={'outlined'} ref={linkRef} component="label">
                Загрузить JSON ⬆︎
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleUploadJSON}
                    accept=".json"
                />
            </Button>
            <Button variant={'outlined'} onClick={handleClick} ref={linkRef}>
                Скачать результат ⬇︎
            </Button>
        </ButtonGroup>
    );
}
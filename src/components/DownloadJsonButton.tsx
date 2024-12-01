import { Button } from '@mui/material';
import { useContext, useRef } from 'react';
import { JsonContext } from '../contexts/JsonContext.tsx';

export default function DownloadJsonButton() {
    const { allTracks } = useContext(JsonContext);
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

    return (
        <Button variant={'outlined'} onClick={handleClick} ref={linkRef}>
            Загрузить результат
        </Button>
    );
}
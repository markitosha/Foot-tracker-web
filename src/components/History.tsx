import { Link } from '@mui/material';
import clsx from 'clsx';
import { useContext } from 'react';
import { Action, JsonContext } from '../contexts/JsonContext.tsx';

function HistoryItem({ item }: { item: Action }) {
    if (item.type === 'uploadJson') {
        return <span>Файл загружен</span>;
    }

    if (item.type === 'removeId') {
        return <span>Удален трек {item.id}</span>;
    }

    if (item.type === 'joinTracks') {
        return <span>Трек {item.candidateId} объединен с треком {item.mainId}</span>;
    }

    if (item.type === 'removeCandidate') {
        return <span>Трек {item.candidateId} удален из кандидатов трека {item.mainId}</span>;
    }

    return null;
}

export default function History() {
    const { history, restoreTheHistory } = useContext(JsonContext);

    return (
        <>
            <span className={'text-m font-semibold'}>История</span>
            <div
                className={clsx(
                    'flex flex-col gap-1 justify-center items-center text-xs max-h-60 overflow-scroll p-4',
                    'w-full border border-gray-300'
                )}
            >
                {history.map((item, index) => (
                    <Link color={'info'} key={index} onClick={() => {
                        restoreTheHistory(index);
                    }} className={'cursor-pointer'}>
                        <HistoryItem item={item}/>
                    </Link>
                ))}
            </div>
        </>
    );
}
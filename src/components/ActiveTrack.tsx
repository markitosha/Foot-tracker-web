import { Pagination, PaginationItem } from '@mui/material';
import { useContext } from 'react';
import { TracksContext } from '../context/TracksContext.tsx';

export default function ActiveTrack() {
    const { mainTrackId, setMainTrackId, trackList } = useContext(TracksContext);
    const page = trackList.findIndex((id) => id === mainTrackId);

    return (
        <div className={'flex flex-col justify-center items-center my-4'}>
            <span className={'text-m font-semibold'}>Трек</span>
            <Pagination
                count={trackList.length}
                page={page + 1}
                siblingCount={0}
                boundaryCount={0}
                showFirstButton
                showLastButton
                color={'secondary'}
                variant={'outlined'}
                onChange={(_, page) => {
                    setMainTrackId(trackList[page - 1]);
                }}
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        page={trackList[(item.page || 0) - 1]}
                    />
                )}
            />
        </div>
    )
}
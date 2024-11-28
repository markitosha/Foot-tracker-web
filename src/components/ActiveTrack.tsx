import { Pagination, PaginationItem } from '@mui/material';

type Props = {
    trackList: number[];
    trackId: number;
    setMainTrackId: (id: number) => void;
    label: string;
    color: 'primary' | 'secondary';
}

export default function ActiveTrack({ trackList = [], trackId, setMainTrackId, label, color }: Props) {
    const page = trackList.findIndex((id) => id === trackId);

    return (
        <div className={'flex flex-col justify-center items-center my-4'}>
            <span className={'text-m font-semibold'}>{label}</span>
            <Pagination
                count={trackList.length}
                page={page + 1}
                showFirstButton
                showLastButton
                color={color}
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
import { createTheme, Pagination, PaginationItem, ThemeProvider } from '@mui/material';
import { red, yellow } from '@mui/material/colors';
import { TrackStatusType } from '../contexts/TracksContext.tsx';
import TrackStatus from './TrackStatus.tsx';

type Props = {
    trackList: number[];
    trackId: number;
    setMainTrackId: (id: number) => void;
    label: string;
    color: 'primary' | 'secondary';
    trackStatus: TrackStatusType;
}

const theme = createTheme({
    palette: {
        primary: red,
        secondary: yellow,
    },
});

export default function ActiveTrack({ trackList = [], trackId, setMainTrackId, label, color, trackStatus }: Props) {
    const page = trackList.findIndex((id) => id === trackId);

    return (
        <ThemeProvider theme={theme}>
            <div className={'flex flex-col justify-center items-center my-4 gap-1'}>
                <div className={'flex gap-2'}>
                    <span className={'text-m font-semibold'}>{label}</span>
                    <TrackStatus trackStatus={trackStatus}/>
                </div>
                <div className={'flex gap-2 justify-center items-center'}>
                    <Pagination
                        count={trackList.length}
                        page={page + 1}
                        showFirstButton
                        showLastButton
                        color={color}
                        variant={'text'}
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
            </div>
        </ThemeProvider>
    )
}

import CandidateTrack from './components/CandidateTrack.tsx';
import ChoiceButtons from './components/ChoiceButtons.tsx';
import DataButtons from './components/DataButtons.tsx';
import History from './components/History.tsx';
import MainTrack from './components/MainTrack.tsx';
import Player from './components/Player.tsx';
import ReferenceButtons from './components/ReferenceButtons.tsx';
import TrackShiftSlider from './components/TrackShiftSlider.tsx';
import JsonProvider from './contexts/JsonContext.tsx';
import TracksProvider from './contexts/TracksContext.tsx';
import VideoProvider from './contexts/VideoContext.tsx';
import Divider from '@mui/material/Divider';


function App() {
    return (
        <JsonProvider>
            <TracksProvider>
                <VideoProvider>
                    <div className={'flex flex-col md:flex-row gap-4 items-start p-4'}>
                        <div className={'flex flex-col gap-2'}>
                            <div className={'md:hidden'}>
                                <MainTrack/>
                            </div>
                            <div className={'md:hidden'}>
                                <CandidateTrack/>
                            </div>
                            <Player/>
                            <ReferenceButtons/>
                            <ChoiceButtons/>
                        </div>
                        <div className={'flex flex-col gap-4 w-full justify-center items-center h-full'}>
                            <div className={'hidden md:block'}>
                                <MainTrack/>
                            </div>
                            <div className={'hidden md:block'}>
                                <CandidateTrack />
                            </div>
                            <Divider flexItem />
                            <DataButtons/>
                            <TrackShiftSlider/>
                            <History/>
                        </div>
                    </div>
                </VideoProvider>
            </TracksProvider>
        </JsonProvider>
    )
}

export default App

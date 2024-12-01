import CandidateTrack from './components/CandidateTrack.tsx';
import ChoiceButtons from './components/ChoiceButtons.tsx';
import DownloadJson from './components/DataButtons.tsx';
import History from './components/History.tsx';
import MainTrack from './components/MainTrack.tsx';
import Player from './components/Player.tsx';
import ReferenceButtons from './components/ReferenceButtons.tsx';
import TrackShiftSlider from './components/TrackShiftSlider.tsx';
import JsonProvider from './contexts/JsonContext.tsx';
import TracksProvider from './contexts/TracksContext.tsx';
import VideoProvider from './contexts/VideoContext.tsx';

function App() {
    return (
        <JsonProvider>
            <TracksProvider>
                <VideoProvider>
                    <div className={'flex gap-2 items-start'}>
                        <div>
                            <Player/>
                            <History/>
                        </div>
                        <div className={'flex flex-col gap-2 w-full justify-center items-center'}>
                            <MainTrack/>
                            <CandidateTrack/>
                            <ReferenceButtons/>
                            <ChoiceButtons/>
                            <DownloadJson/>
                            <TrackShiftSlider/>
                        </div>
                    </div>
                </VideoProvider>
            </TracksProvider>
        </JsonProvider>
    )
}

export default App

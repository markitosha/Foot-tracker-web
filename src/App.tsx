import CandidateTrack from './components/CandidateTrack.tsx';
import ChoiceButtons from './components/ChoiceButtons.tsx';
import DownloadJson from './components/DownloadJsonButton.tsx';
import MainTrack from './components/MainTrack.tsx';
import Player from './components/Player.tsx';
import ReferenceButtons from './components/ReferenceButtons.tsx';
import JsonProvider from './contexts/JsonContext.tsx';
import TracksProvider from './contexts/TracksContext.tsx';
import VideoProvider from './contexts/VideoContext.tsx';

function App() {
    return (
        <JsonProvider>
            <TracksProvider>
                <VideoProvider>
                    <div className={'flex gap-2'}>
                        <Player/>
                        <div className={'flex flex-col gap-2 w-full'}>
                            <MainTrack/>
                            <CandidateTrack/>
                            <ReferenceButtons/>
                            <ChoiceButtons/>
                            <DownloadJson />
                        </div>
                    </div>
                </VideoProvider>
            </TracksProvider>
        </JsonProvider>
    )
}

export default App

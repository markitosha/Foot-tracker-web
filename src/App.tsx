import CandidateTrack from './components/CandidateTrack.tsx';
import Player from './components/Player.tsx';
import ChoiceButtons from './components/ChoiceButtons.tsx';
import MainTrack from './components/MainTrack.tsx';
import ReferenceButtons from './components/ReferenceButtons.tsx';
import JsonProvider from './contexts/JsonContext.tsx';
import TracksProvider from './contexts/TracksContext.tsx';
import VideoProvider from './contexts/VideoContext.tsx';

function App() {
    return (
        <JsonProvider>
            <TracksProvider>
                <VideoProvider>
                    <MainTrack/>
                    <CandidateTrack/>
                    <ReferenceButtons/>
                    <ChoiceButtons/>
                    <Player/>
                </VideoProvider>
            </TracksProvider>
        </JsonProvider>
    )
}

export default App

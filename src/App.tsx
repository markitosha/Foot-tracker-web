import CandidateTrack from './components/CandidateTrack.tsx';
import Canvas from './components/Canvas.tsx';
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
                    <Canvas/>
                </VideoProvider>
            </TracksProvider>
        </JsonProvider>
    )
}

export default App

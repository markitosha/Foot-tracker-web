import CandidateTrack from './components/CandidateTrack.tsx';
import Canvas from './components/Canvas.tsx';
import MainTrack from './components/MainTrack.tsx';
import TracksProvider from './context/TracksContext.tsx';
import VideoProvider from './context/VideoContext.tsx';

function App() {
    return (
        <VideoProvider>
            <TracksProvider>
                <MainTrack />
                <CandidateTrack />
                <Canvas />
            </TracksProvider>
        </VideoProvider>
    )
}

export default App

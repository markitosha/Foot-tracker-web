import CandidateTrack from './components/CandidateTrack.tsx';
import Canvas from './components/Canvas.tsx';
import MainTrack from './components/MainTrack.tsx';
import TracksProvider from './contexts/TracksContext.tsx';
import VideoProvider from './contexts/VideoContext.tsx';

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

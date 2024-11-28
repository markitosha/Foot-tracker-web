import CandidateTrack from './components/CandidateTrack.tsx';
import Canvas from './components/Canvas.tsx';
import MainTrack from './components/MainTrack.tsx';
import TracksProvider from './context/TracksContext.tsx';

function App() {
    return (
        <TracksProvider>
            <MainTrack />
            <CandidateTrack />
            <Canvas />
        </TracksProvider>
    )
}

export default App

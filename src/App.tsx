import ActiveTrack from './components/ActiveTrack.tsx';
import Canvas from './components/Canvas.tsx';
import TracksProvider from './context/TracksContext.tsx';

function App() {
    return (
        <TracksProvider>
            <ActiveTrack />
            <Canvas />
        </TracksProvider>
    )
}

export default App

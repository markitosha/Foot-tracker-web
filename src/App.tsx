import Canvas from './components/Canvas.tsx';
import TracksProvider from './context/TracksContext.tsx';

function App() {
    return (
        <TracksProvider>
            <Canvas/>
        </TracksProvider>
    )
}

export default App

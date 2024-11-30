import useCanvasSizes from './hooks/useCanvasSizes.ts';
import useDrawBbox from './hooks/useDrawBbox.ts';

import 'video.js/dist/video-js.css';
import Video from './Video.tsx';

export default function Player() {
    const { sizes, updateCanvas } = useCanvasSizes();
    const { canvasRef } = useDrawBbox();

    return <div className={'flex items-center'}>
        <div className={'relative'}>
            <Video
                options={{
                    sources: 'https://firebasestorage.googleapis.com/v0/b/pleaz-player-staging.appspot.com/o/282406_half_2_10min.mp4?alt=media&token=a47d6f04-cbaf-4521-a623-9724f5f45738',
                    controls: true,
                    width: window.innerWidth,
                    playbackRates: [0.5, 1, 1.5, 2, 2.5, 3, 10]
                }}
                canvasRef={canvasRef}
                updateCanvas={updateCanvas}
            />
            <canvas
                width={sizes.videoWidth}
                height={sizes.videoHeight}
                className={'absolute top-0 left-0'}
                style={{
                    width: sizes.width,
                    height: sizes.height,
                }}
                ref={canvasRef}
            />
        </div>
    </div>
};
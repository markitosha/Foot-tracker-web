import { useContext } from 'react';
import { VideoContext } from '../contexts/VideoContext.tsx';
import useCanvasSizes from './hooks/useCanvasSizes.ts';
import useDrawBbox from './hooks/useDrawBbox.ts';

import 'video.js/dist/video-js.css';
import Video from './Video.tsx';

export default function Player() {
    const { videoSrc } = useContext(VideoContext);
    const { sizes, updateCanvas } = useCanvasSizes();
    const { canvasRef } = useDrawBbox();

    return <div className={'flex items-center'}>
        <div className={'relative'}>
            <Video
                options={{
                    sources: videoSrc,
                    controls: true,
                    width: window.innerWidth / 2,
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

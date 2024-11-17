import video from '../assets/video.mp4';
import useCanvasSizes from './hooks/useCanvasSizes.ts';
import useDrawBbox from './hooks/useDrawBbox.ts';

export default function Canvas() {
    const { sizes, videoRef } = useCanvasSizes();
    const { start, canvasRef, stop } = useDrawBbox(videoRef);

    return <div className={'flex items-center'}>
        <div className={'relative'}>
            <video src={video} controls className={'w-2/3'} ref={videoRef}/>
            <canvas width={sizes.videoWidth} height={sizes.videoHeight} className={'absolute top-0 left-0'} style={{
                width: sizes.width,
                height: sizes.height,
            }} ref={canvasRef}/>
        </div>
        <button onClick={() => {
            if (!videoRef.current) return;

            videoRef.current.currentTime = 0;
            videoRef.current.play();
            start();
        }}>Start drawing</button>
        <button onClick={() => {
            videoRef.current?.pause();
            stop();
        }}>Stop drawing</button>
        <button onClick={() => videoRef.current!.playbackRate = 0.5}>0.5x speed</button>
        <button onClick={() => videoRef.current!.playbackRate = 1}>1x speed</button>
        <button onClick={() => videoRef.current!.playbackRate = 2}>2x speed</button>
    </div>
};

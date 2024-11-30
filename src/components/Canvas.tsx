import useCanvasSizes from './hooks/useCanvasSizes.ts';
import useDrawBbox from './hooks/useDrawBbox.ts';

export default function Canvas() {
    const { sizes, videoRef } = useCanvasSizes();
    const { canvasRef } = useDrawBbox();

    return <div className={'flex items-center'}>
        <div className={'relative'}>
            <video
                src={'https://firebasestorage.googleapis.com/v0/b/pleaz-player-staging.appspot.com/o/282406_half_2_10min.mp4?alt=media&token=a47d6f04-cbaf-4521-a623-9724f5f45738'}
                className={'w-full'}
                ref={videoRef}
                controls
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

import { MutableRefObject, useContext, useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from 'video.js/dist/types/player';
import { VideoContext } from '../contexts/VideoContext.tsx';

export const VideoJS = ({ options, canvasRef, updateCanvas }: {
    options: any;
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
    updateCanvas: (n?: any) => void;
}) => {
    const { videoRef } = useContext(VideoContext);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<Player | null>(null);

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");

            containerRef.current?.appendChild(videoElement);
            // FIXME: write video player from scratch to allow manage video under canvas without hacks
            playerRef.current = videojs(videoElement, options, () => {
                videoRef.current = document.querySelector('video');

                // dirty HACK
                if (canvasRef.current) {
                    videoRef.current?.after(canvasRef.current);
                    updateCanvas();
                }
            });
        } else {
            playerRef.current.width(window.innerWidth / 2);

            // set video directly to video component, because video.js throws error
            // also HACK
            if (options.sources && options.sources !== videoRef.current?.src) {
                videoRef.current!.src = options.sources;
                videoRef.current!.load();
            }
        }
    }, [options, containerRef]);

    // Dispose the Video.js player when the functional component unmounts
    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={containerRef} />
        </div>
    );
}

export default VideoJS;

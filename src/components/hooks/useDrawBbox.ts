import { RefObject, useContext, useEffect, useRef } from 'react';
import { TracksContext } from '../../context/TracksContext.tsx';

export default function useDrawBbox(
    videoRef: RefObject<HTMLVideoElement>,
) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);
    const frameRef = useRef<number | null>(null);
    const frame = useRef(0);

    const { currentTrack, color, onTrackFinished } = useContext(TracksContext);

    console.log('currentTrack', currentTrack.length);

    useEffect(() => {
        ctx.current = canvasRef.current?.getContext('2d');
    }, []);

    useEffect(() => {
        console.log('change of track');
        // TODO change to some kind of "reload" method
        stop();
        start();
    }, [currentTrack]);

    const draw = () => {
        if (!ctx.current) {
            return;
        }

        const rect = currentTrack[frame.current];

        if (!rect) {
            stop();
            return;
        }

        // In this track for some reason time difference is a second
        const timeDiff = (videoRef.current?.currentTime || 0) * 1000 - 1000;
        let nextRect = rect;

        // Find next coordinates to draw
        // Sometimes we need to skip some frames because of high speed
        while (nextRect && timeDiff >= nextRect.timestamp) {
            frame.current++;
            nextRect = currentTrack[frame.current];
        }

        // Draw last frame if we don't have next
        if (!nextRect) {
            frame.current--;
            nextRect = currentTrack[frame.current];
        }

        ctx.current.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
        ctx.current.strokeStyle = color;
        ctx.current.lineWidth = 5;

        ctx.current.strokeRect(nextRect.x, nextRect.y, nextRect.w, nextRect.h);

        frameRef.current = requestAnimationFrame(draw);

        // check the end of the track
        if (currentTrack[frame.current + 1]) {
        //     frameRef.current = requestAnimationFrame(draw);
        } else {
            onTrackFinished();
        }
    };

    const start = async () => {
        // TODO сбрасывать не до 0, а до текущего фрейма видео
        frame.current = 0;
        draw();
    };

    const stop = () => {
        console.log('stop');
        cancelAnimationFrame(frameRef.current || 0);
        // videoRef.current?.pause();
        // onTrackFinished();
    };

    return {
        start,
        stop,
        canvasRef
    };
}

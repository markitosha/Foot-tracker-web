import { RefObject, useContext, useEffect, useRef } from 'react';
import { TracksContext } from '../../context/TracksContext.tsx';

export default function useDrawBbox(videoRef: RefObject<HTMLVideoElement>) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);

    const frameRef = useRef<number | null>(null);

    const frame = useRef(0);

    const { currentTrack } = useContext(TracksContext);

    useEffect(() => {
        ctx.current = canvasRef.current?.getContext('2d');
    }, []);

    const draw = () => {
        if (!ctx.current) {
            return;
        }

        const rect = currentTrack[frame.current];

        if (!rect) {
            stop();
            return;
        }

        let nextRect = currentTrack[frame.current + 1];

        // TODO: think about this
        if (!nextRect) {
            stop();
            return;
        }

        // In this track for some reason time difference is a second
        const timeDiff = (videoRef.current?.currentTime || 0) * 1000 - 1000;

        // TODO make it jump through several frames
        while (nextRect && timeDiff >= nextRect.timestamp) {
            frame.current++;
            nextRect = currentTrack[frame.current];
        }

        if (!nextRect) {
            frame.current--;
        }

        ctx.current.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
        ctx.current.strokeStyle = 'red';
        ctx.current.lineWidth = 5;

        const pickedFrame = currentTrack[frame.current];
        ctx.current.strokeRect(pickedFrame.x, pickedFrame.y, pickedFrame.w, pickedFrame.h);

        // console.log('currentTime', timeDiff);
        // console.log('currentFrame', pickedFrame.timestamp, frame.current);

        frameRef.current = requestAnimationFrame(draw);
    }

    const start = () => {
        stop();
        frame.current = 0;
        draw();
    };

    const stop = () => {
        cancelAnimationFrame(frameRef.current || 0);
    };

    return {
        start,
        stop,
        canvasRef
    };
}

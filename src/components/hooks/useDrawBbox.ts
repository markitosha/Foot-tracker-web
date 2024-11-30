import { MutableRefObject, RefObject, useContext, useEffect, useRef } from 'react';
import { Track, TracksContext } from '../../context/TracksContext.tsx';

const TIME_SHIFT = 1000;

export default function useDrawBbox(
    videoRef: RefObject<HTMLVideoElement>,
) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);
    const frameTimerRef = useRef<number | null>(null);

    const frameMain = useRef(0);
    const frameCandidate = useRef(0);

    const { mainTrack, candidateTrack } = useContext(TracksContext);

    useEffect(() => {
        ctx.current = canvasRef.current?.getContext('2d');
    }, []);

    useEffect(() => {
        stop();
        start();
    }, [mainTrack, candidateTrack, videoRef.current]);

    useEffect(() => {
        videoRef.current?.addEventListener('pause', stop);
        videoRef.current?.addEventListener('play', start);

        return () => {
            videoRef.current?.removeEventListener('pause', stop);
            videoRef.current?.removeEventListener('play', start);
        }
    }, [videoRef.current])

    const drawBbox = (track: Track[], color: string, frame: MutableRefObject<number>) => {
        if (!ctx.current) {
            return;
        }

        // In this track for some reason time difference is a second (explanation for "- 1000")
        const timeDiff = (videoRef.current?.currentTime || 0) * 1000 - TIME_SHIFT;
        let nextRect = track[frame.current];

        if (!nextRect) {
            return;
        }

        // Find next coordinates to draw
        // Sometimes we need to skip some frames because of high speed
        while (nextRect && timeDiff >= nextRect.timestamp) {
            frame.current++;
            nextRect = track[frame.current];
        }

        // Draw last frame if we don't have next
        if (!nextRect) {
            frame.current--;
            nextRect = track[frame.current];
        }

        // Draw rectangle only if it's not too far from current time
        if (Math.abs((nextRect.timestamp - timeDiff)) < (500 + TIME_SHIFT)) {
            ctx.current.strokeStyle = color;
            ctx.current.lineWidth = 5;

            ctx.current.strokeRect(nextRect.x, nextRect.y, nextRect.w, nextRect.h);
        }
    }

    const draw = () => {
        if (!ctx.current) {
            return;
        }

        ctx.current.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);

        drawBbox(mainTrack, 'red', frameMain);
        drawBbox(candidateTrack, 'yellow', frameCandidate);

        if (!videoRef.current?.paused) {
            frameTimerRef.current = requestAnimationFrame(draw);
        }
    };

    const start = async () => {
        draw();
    };

    const stop = () => {
        cancelAnimationFrame(frameTimerRef.current || 0);
        frameMain.current = 0;
        frameCandidate.current = 0;
    };

    return {
        start,
        stop,
        canvasRef
    };
}

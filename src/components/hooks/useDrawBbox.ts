import { MutableRefObject, useContext, useEffect, useRef } from 'react';
import { Track, TracksContext, TrackStatusType } from '../../contexts/TracksContext.tsx';
import { VideoContext } from '../../contexts/VideoContext.tsx';

export default function useDrawBbox() {
    const { videoRef } = useContext(VideoContext);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);
    const frameTimerRef = useRef<number | null>(null);

    const frameMain = useRef(0);
    const frameCandidate = useRef(0);
    const lastCurrentTime = useRef(0);

    const {
        mainTrack,
        candidateTrack,
        setCandidateTrackStatus,
        setMainTrackStatus,
        trackTimeShift
    } = useContext(TracksContext);

    useEffect(() => {
        ctx.current = canvasRef.current?.getContext('2d');
    }, []);

    useEffect(() => {
        restart();

        const timeUpdate = (e: any) => {
            const currentTime = e.target.currentTime;

            if (videoRef.current?.paused || currentTime < lastCurrentTime.current) {
                restart();
            }

            lastCurrentTime.current = currentTime;
        }

        videoRef.current?.addEventListener('pause', stop);
        videoRef.current?.addEventListener('play', start);
        videoRef.current?.addEventListener('timeupdate', timeUpdate);

        return () => {
            videoRef.current?.removeEventListener('pause', stop);
            videoRef.current?.removeEventListener('play', start);
            videoRef.current?.removeEventListener('timeupdate', timeUpdate);
        }
    }, [mainTrack, candidateTrack, trackTimeShift, videoRef.current]);

    const drawBbox = (
        track: Track[],
        color: string,
        frame: MutableRefObject<number>,
        setStatus: (status: TrackStatusType) => void
    ) => {
        if (!ctx.current) {
            return;
        }

        // In this track for some reason time difference is a second (explanation for "- 1000")
        const timeDiff = (videoRef.current?.currentTime || 0) * 1000 - trackTimeShift * 1000;
        let nextRect = track[frame.current];

        if (!nextRect) {
            setStatus('Пустой фрейм');
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

            setStatus('Последний фрейм');
        }

        // Draw rectangle only if it's not too far from current time
        if (Math.abs((nextRect.timestamp - timeDiff)) < 100) {
            ctx.current.strokeStyle = color;
            ctx.current.lineWidth = 5;

            ctx.current.strokeRect(nextRect.x, nextRect.y, nextRect.w, nextRect.h);

            setStatus('Трек активен');
        } else {
            if (frame.current === 0) {
                setStatus('Трек еще не начался');
                return;
            }

            if (frame.current >= track.length - 1) {
                setStatus('Трек закончился');
                return;
            }

            setStatus('Пауза внутри трека');
        }
    }

    const draw = () => {
        if (!ctx.current) {
            return;
        }

        ctx.current.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);

        drawBbox(mainTrack, 'red', frameMain, setMainTrackStatus);
        drawBbox(candidateTrack, 'yellow', frameCandidate, setCandidateTrackStatus);

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

    const restart = () => {
        stop();
        start();
    }

    return {
        start,
        stop,
        canvasRef
    };
}

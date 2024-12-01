import { createContext, MutableRefObject, ReactNode, useCallback, useContext, useRef, useState } from 'react';
import { TIME_BEFORE_END } from '../constants.ts';
import { TracksContext } from './TracksContext.tsx';

export const VideoContext = createContext<{
    videoRef: MutableRefObject<HTMLVideoElement | null>;
    rewindToEnd: () => void;
    rewindToStart: () => void;
    setVideoSrc: (data: string) => void;
    videoSrc: string | null;
}>({
    videoRef: { current: null },
    rewindToEnd: () => {},
    rewindToStart: () => {},
    setVideoSrc: () => {},
    videoSrc: null
});


export default function VideoProvider({ children }: { children: ReactNode }) {
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const { mainTrack } = useContext(TracksContext);

    const rewindToStart = useCallback(() => {
        if (!videoRef.current) {
            return;
        }

        videoRef.current.currentTime = mainTrack[0]?.timestamp / 1000;
        videoRef.current.play();
    }, [mainTrack]);

    const rewindToEnd = useCallback(() => {
        if (!videoRef.current) {
            return;
        }

        // 3 seconds before the end
        videoRef.current.currentTime = (mainTrack[mainTrack.length - 1]?.timestamp / 1000) - TIME_BEFORE_END;
        videoRef.current.play();
    }, [mainTrack]);

    return (
        <VideoContext.Provider value={{
            videoRef,
            rewindToStart,
            rewindToEnd,
            setVideoSrc,
            videoSrc
        }}>
            {children}
        </VideoContext.Provider>
    );
}

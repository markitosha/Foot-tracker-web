import { createContext, MutableRefObject, ReactNode, useRef } from 'react';

export const VideoContext = createContext<{
    videoRef: MutableRefObject<HTMLVideoElement | null>;
}>({
    videoRef: { current: null }
});


export default function VideoProvider({ children }: { children: ReactNode }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    return (
        <VideoContext.Provider value={{
            videoRef
        }}>
            {children}
        </VideoContext.Provider>
    );
}

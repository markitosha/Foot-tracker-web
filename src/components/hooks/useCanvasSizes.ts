import { useEffect, useRef, useState } from 'react';

export default function useCanvasSizes() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [sizes, setSizes] = useState({ width: 0, height: 0, videoWidth: 0, videoHeight: 0 });

    useEffect(() => {
        const handler = () => {
            const rect = videoRef.current?.getBoundingClientRect();

            setSizes({
                width: rect?.width || 0,
                height: rect?.height || 0,
                videoWidth: videoRef.current?.videoWidth || 0,
                videoHeight: videoRef.current?.videoHeight || 0,
            });
        };

        videoRef.current?.addEventListener('loadedmetadata', handler);

        return () => {
            videoRef.current?.removeEventListener('loadedmetadata', handler);
        }
    }, []);

    return {
        sizes,
        videoRef
    }
}
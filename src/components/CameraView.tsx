import { useEffect, useRef } from "react";

type CameraViewProps = {
  onStream?: (stream: MediaStream | null) => void;
  paused?: boolean;
  facingMode?: "user" | "environment";
  videoRef?: React.RefObject<HTMLVideoElement>;
  className?: string;
};

export default function CameraView({
  onStream,
  paused = false,
  facingMode = "environment",
  videoRef,
  className,
}: CameraViewProps) {
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const ref = videoRef ?? internalVideoRef;
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let isMounted = true;
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });
        if (!isMounted) {
          // If unmounted before stream is ready, stop tracks immediately
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (ref.current) {
          ref.current.srcObject = stream;
        }
        onStream?.(stream);
      } catch {
        onStream?.(null);
      }
    };
    void startCamera();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (ref.current) {
        ref.current.srcObject = null;
      }
      onStream?.(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, facingMode]);

  return <video ref={ref} autoPlay playsInline className={className} />;
}

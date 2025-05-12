import { useEffect, useRef } from "react";

interface CameraViewProps {
  onStream?: (stream: MediaStream | null) => void;
  paused?: boolean;
  facingMode?: "user" | "environment";
  videoRef?: React.RefObject<HTMLVideoElement>;
}

export default function CameraView({
  onStream,
  paused = false,
  facingMode = "environment",
  videoRef,
}: CameraViewProps) {
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const ref = videoRef || internalVideoRef;

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });
        if (ref.current) {
          ref.current.srcObject = stream;
        }
        onStream?.(stream);
      } catch {
        onStream?.(null);
      }
    };
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      onStream?.(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, facingMode]);

  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 12,
        display: paused ? "none" : "block",
        aspectRatio: 1,
      }}
    />
  );
}

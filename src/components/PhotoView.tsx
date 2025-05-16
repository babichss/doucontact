import { useRef } from "react";
import CameraView from "./CameraView";

type PhotoViewProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

export default function PhotoView({ videoRef }: PhotoViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <CameraView
        facingMode="environment"
        videoRef={videoRef}
        className="photo-view"
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
}

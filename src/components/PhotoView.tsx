import { useRef } from "react";
import CameraView from "./CameraView";

type PhotoViewProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

export default function PhotoView({ videoRef }: PhotoViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div>
      <CameraView facingMode="environment" videoRef={videoRef} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import type { Contact } from "../types";
import CameraView from "./CameraView";
import { base64Decode } from "../utils/storage";

type QRScannerProps = {
  onScan: (contact: Contact) => void;
};

export default function QRScanner({ onScan }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let animationId: number;
    const scanQR = () => {
      if (!videoRef.current || !canvasRef.current) return;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;
      const squareSize = 300;
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = squareSize;
        canvas.height = squareSize;
        const minDim = Math.min(video.videoWidth, video.videoHeight);
        const sx = (video.videoWidth - minDim) / 2;
        const sy = (video.videoHeight - minDim) / 2;
        context.drawImage(
          video,
          sx,
          sy,
          minDim,
          minDim,
          0,
          0,
          squareSize,
          squareSize
        );
        const imageData = context.getImageData(0, 0, squareSize, squareSize);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "attemptBoth",
        });
        if (code) {
          try {
            let base64Contact = null;
            const urlMatch = /[?&]contact=([^&]+)/.exec(code.data);
            if (urlMatch) {
              base64Contact = urlMatch[1];
            } else {
              // fallback: treat as raw base64 (legacy QR)
              base64Contact = code.data;
            }
            const decodedData: Contact = JSON.parse(
              decodeURIComponent(base64Decode(base64Contact))
            ) as Contact;

            onScan(decodedData);
          } catch {
            // handle error
          }
        }
      }
      animationId = requestAnimationFrame(scanQR);
    };
    animationId = requestAnimationFrame(scanQR);
    return () => cancelAnimationFrame(animationId);
  }, [onScan, stream]);

  return (
    <div>
      <CameraView
        onStream={setStream}
        facingMode="environment"
        videoRef={videoRef as React.RefObject<HTMLVideoElement>}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

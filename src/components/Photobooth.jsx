import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoStripTemplate from "./PhotoStripTemplate";

const CAPTURE_DELAY = 3;
const TOTAL_PHOTOS = 3;

function Photobooth({ onBack }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showStrip, setShowStrip] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setCameraReady(true);
        };
      }
    } catch (err) {
      console.error("Camera error:", err);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setCameraError("Camera access needed for the photobooth! Please enable it in your browser settings.");
      } else {
        setCameraError("Could not access camera. Please check your device settings.");
      }
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [startCamera]);

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL("image/jpeg", 0.9);
  };

  const startCaptureSequence = async () => {
    if (isCapturing || !cameraReady) return;

    setIsCapturing(true);
    setCapturedPhotos([]);

    for (let i = 0; i < TOTAL_PHOTOS; i++) {
      // Countdown
      for (let j = CAPTURE_DELAY; j > 0; j--) {
        setCountdown(j);
        await new Promise((r) => setTimeout(r, 1000));
      }
      setCountdown(null);

      // Capture
      const frame = captureFrame();
      if (frame) {
        setCapturedPhotos((prev) => [...prev, frame]);
      }

      // Brief pause between captures
      if (i < TOTAL_PHOTOS - 1) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    setIsCapturing(false);
    setShowStrip(true);
  };

  const handleRetake = () => {
    setCapturedPhotos([]);
    setShowStrip(false);
  };

  const handleDownloadComplete = () => {
    // Clean up camera when done
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  if (showStrip && capturedPhotos.length === TOTAL_PHOTOS) {
    return (
      <PhotoStripTemplate
        photos={capturedPhotos}
        onRetake={handleRetake}
        onBack={onBack}
        onDownloadComplete={handleDownloadComplete}
      />
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-charcoal relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center px-4 py-4 max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-sans text-sm">Back</span>
          </button>
          <h1 className="flex-1 text-center font-serif text-xl text-white pr-7">
            Photobooth
          </h1>
        </div>
      </div>

      {/* Camera error */}
      <AnimatePresence>
        {cameraError && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-8 z-30 bg-charcoal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-20 h-20 mb-6 rounded-full bg-lilac/20 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-lilac"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
            </div>
            <p className="text-white/80 font-sans text-center mb-6 max-w-sm leading-relaxed">
              {cameraError}
            </p>
            <motion.button
              onClick={startCamera}
              className="px-6 py-3 bg-purple text-white font-sans font-medium rounded-full hover:bg-purple-dark transition-colors"
              whileTap={{ scale: 0.96 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video feed */}
      <div className="relative w-full h-screen flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover md:max-w-2xl lg:max-w-3xl md:rounded-2xl"
        />

        {/* Countdown overlay */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-serif text-[120px] sm:text-[160px] text-white drop-shadow-2xl font-bold">
                {countdown}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Capture progress dots */}
        {isCapturing && (
          <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-3 z-10">
            {Array.from({ length: TOTAL_PHOTOS }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  i < capturedPhotos.length
                    ? "bg-purple"
                    : i === capturedPhotos.length
                    ? "bg-white animate-pulse"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Capture button */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <motion.button
          onClick={startCaptureSequence}
          disabled={isCapturing || !cameraReady}
          className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
            isCapturing || !cameraReady
              ? "border-white/30 bg-white/10 cursor-not-allowed"
              : "border-white bg-white/20 hover:bg-white/30 active:scale-95"
          }`}
          whileTap={!isCapturing && cameraReady ? { scale: 0.9 } : {}}
        >
          <div
            className={`w-16 h-16 rounded-full transition-colors ${
              isCapturing ? "bg-purple" : "bg-white"
            }`}
          />
        </motion.button>
      </div>

      {/* Ready indicator */}
      {cameraReady && !isCapturing && (
        <motion.p
          className="absolute bottom-24 left-0 right-0 text-center text-white/60 font-sans text-sm z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Tap to capture {TOTAL_PHOTOS} photos
        </motion.p>
      )}
    </motion.div>
  );
}

export default Photobooth;

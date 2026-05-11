import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Download,
  RotateCcw,
  Cpu,
  BarChart3,
  Moon,
  Maximize2,
  X,
} from "lucide-react";

const API_URL = import.meta.env.VITE_HF_API_URL;

const processingSteps = [
  "Uploading lunar image",
  "Waking up model server",
  "Running Multi-Task U-Net",
  "Generating segmentation masks",
  "Preparing final visualization",
];

function RoverMarker({ isMoving }) {
  return (
    <motion.div
      initial={false}
      animate={{}}
      transition={{
        duration: 0.8,
        repeat: isMoving ? Infinity : 0,
        ease: "easeInOut",
      }}
      className="relative h-10 w-14 rounded-xl border border-white/30 bg-white/5 shadow-[0_0_12px_rgba(255,255,255,0.06)]"
    >
      <div className="absolute left-3 top-3 h-2 w-8 rounded-full bg-slate-200/90" />
      <div className="absolute -top-3 left-8 h-4 w-px bg-slate-200/60" />
      <div className="absolute -top-4 left-[29px] h-2.5 w-2.5 rounded-full bg-slate-200 shadow-[0_0_8px_rgba(255,255,255,0.12)]" />
      <div className="absolute -bottom-1 left-2 h-2.5 w-2.5 rounded-full bg-slate-950 ring-2 ring-white/60" />
      <div className="absolute -bottom-1 right-2 h-2.5 w-2.5 rounded-full bg-slate-950 ring-2 ring-white/60" />
    </motion.div>
  );
}

function Demo() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [error, setError] = useState("");
  const [isOutputOpen, setIsOutputOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const processSelectedFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid JPG or PNG image.");
      return;
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setError("");
    setActiveStep(-1);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    processSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    processSelectedFile(file);
  };

  const runSegmentation = async () => {
    if (!selectedImage) {
      setError("Please upload a lunar image first.");
      return;
    }

    try {
      setIsProcessing(true);
      setError("");
      setResult(null);
      setActiveStep(0);

      const stepTimer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= processingSteps.length - 1) return prev;
          return prev + 1;
        });
      }, 1800);

      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 120000,
      });

      clearInterval(stepTimer);

      if (response.data?.status !== "success") {
        throw new Error("Model server returned an unsuccessful response.");
      }

      setActiveStep(processingSteps.length - 1);
      setResult(response.data);
    } catch (err) {
      console.error(err);

      if (err.code === "ECONNABORTED") {
        setError(
          "Request timed out. Hugging Face Space may be waking up. Please try again."
        );
      } else {
        setError(
          "Unable to process the image. Check internet connection or try again after a few seconds."
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const resetDemo = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    setResult(null);
    setError("");
    setActiveStep(-1);
    setIsOutputOpen(false);
    setIsDragging(false);
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setIsPanning(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const direction = e.deltaY > 0 ? -1 : 1;
    setZoom((prev) => Math.max(1, Math.min(5, prev + direction * zoomSpeed)));
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      e.preventDefault();
      setIsPanning(true);
      setStartX(e.clientX - panX);
      setStartY(e.clientY - panY);
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      setPanX(e.clientX - startX);
      setPanY(e.clientY - startY);
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const downloadOutput = () => {
    if (!result?.visualization) return;

    const link = document.createElement("a");
    link.href = result.visualization;
    link.download = "lunar-vision-output.png";
    link.click();
  };

  const rockStats = result?.stats?.rock_segmentation;
  const craterStats = result?.stats?.crater_detection;

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-6 lg:px-8">
      <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
            Live Model Demo
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Upload lunar image
          </h2>
        </div>

        <div className="glass-panel rounded-3xl px-5 py-4">
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-slate-200" />
            <div>
              <p className="text-sm font-medium text-white">Model Endpoint</p>
              <p className="text-xs text-slate-400">Hugging Face Space API</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-panel rounded-[1.7rem] p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Input Image</h3>
              <p className="mt-1 text-sm text-slate-400">
                JPG or PNG lunar surface image
              </p>
            </div>

            <Moon className="h-6 w-6 text-slate-200" />
          </div>

          <label
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`group flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed p-5 text-center transition ${
              isDragging
                ? "border-white/30 bg-white/5 shadow-[0_8px_24px_rgba(0,0,0,0.48)]"
                : "border-white/30 bg-black/60 hover:border-white/30 hover:bg-white/5"
            }`}
          >
            <UploadCloud className="mb-3 h-9 w-9 text-slate-400 transition group-hover:text-slate-200" />

            <p className="text-base font-semibold text-white">
              Drag & drop lunar image
            </p>

            <p className="mt-2 text-sm text-slate-500">
              or click to browse JPG / PNG file
            </p>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <div className="mt-4 overflow-hidden rounded-3xl border border-white/30 bg-black/50">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Uploaded lunar image preview"
                className="h-[235px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[235px] items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-10 w-10 text-slate-600" />
                  <p className="mt-3 text-sm text-slate-500">
                    Image preview will appear here
                  </p>
                </div>
              </div>
            )}
          </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              onClick={runSegmentation}
              disabled={!selectedImage || isProcessing}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/90 px-5 py-3 font-semibold text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-slate-900" />
                  Processing
                </>
              ) : (
                "Run Segmentation"
              )}
            </button>

            <button
              onClick={resetDemo}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/5 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>

          {error && (
            <div className="mt-4 flex gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="glass-panel rounded-[1.7rem] p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Processing Pipeline
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                First request may take 30 seconds if the model server is idle.
              </p>
            </div>

            {result ? (
              <CheckCircle2 className="h-6 w-6 text-white" />
            ) : null}
          </div>

          <div className="relative">
  <div className="absolute left-[27px] top-5 h-[calc(100%-40px)] w-px bg-white/10" />

  <motion.div
    initial={false}
    animate={{
      top: `${(result ? processingSteps.length - 1 : Math.max(activeStep, 0)) * 72 + 10}px`,
    }}
    transition={{
      duration: result ? 0.45 : 0.65,
      ease: "easeInOut",
    }}
    className="absolute left-0 z-20"
  >
    <RoverMarker isMoving={isProcessing} />
  </motion.div>

  <div className="grid gap-2 pl-20">
      {processingSteps.map((step, index) => {
        const completed = result || activeStep > index;
        const active = activeStep === index && isProcessing;

        return (
          <div
            key={step}
            className={`flex min-h-[64px] items-center justify-between rounded-2xl border px-4 py-2.5 text-sm transition-all duration-300 ${
                completed
                  ? "border-white/20 bg-white/5 text-white"
                  : active
                  ? "border-white/40 bg-white/10 text-white"
                  : "border-white/30 bg-white/[0.03] text-slate-400"
              }`}
          >
            <div>
              <p className="font-medium">{step}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {completed ? "Completed" : active ? "In progress" : "Waiting"}
              </p>
            </div>

            {completed ? (
              <CheckCircle2 className="h-5 w-5 text-white" />
              ) : active ? (
              <span className="h-2.5 w-2.5 animate-ping rounded-full bg-white" />
            ) : (
              <span className="text-slate-600">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
          </div>
        );
      })}
    </div>
  </div>

          <div className="mt-4 rounded-3xl border border-white/30 bg-white/[0.03] p-3">
            <p className="text-sm font-medium text-white">Current Status</p>
            <p className="mt-1 text-sm text-slate-400">
              {isProcessing
                ? "Model is processing the uploaded lunar image."
                : result
                ? "Segmentation completed successfully."
                : "Upload an image and start segmentation."}
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-5 glass-panel rounded-[2rem] p-5"
      >
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              Segmentation Output
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              The model returns a 4-panel visualization containing original image,
              rock segmentation, crater detection, and combined overlay.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsOutputOpen(true)}
              disabled={!result?.visualization}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Maximize2 className="h-4 w-4" />
              Full Screen
            </button>

            <button
              onClick={downloadOutput}
              disabled={!result?.visualization}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/30 bg-black/70">
          {result?.visualization ? (
            <img
              src={result.visualization}
              alt="Lunar Vision segmentation output"
              className="w-full cursor-zoom-in object-contain"
              onClick={() => setIsOutputOpen(true)}
            />
          ) : (
            <div className="flex min-h-[360px] items-center justify-center">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-slate-600" />
                <p className="mt-3 text-sm text-slate-500">
                  Final output will appear here after segmentation
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-5 grid gap-6 xl:grid-cols-[1fr_0.85fr]"
        >
          <div className="glass-panel rounded-[2rem] p-6">
            <div className="mb-5 flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-slate-200" />
              <h3 className="text-xl font-semibold text-white">
                Rock Segmentation Stats
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {rockStats &&
                Object.entries(rockStats).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-3xl border border-white/30 bg-white/[0.03] p-5"
                  >
                    <p className="text-sm capitalize text-slate-400">{key}</p>
                    <p className="mt-2 text-3xl font-semibold text-white">
                      {Number(value).toFixed(1)}%
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6">
            <div className="mb-5 flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-orange-300" />
              <h3 className="text-xl font-semibold text-white">
                Crater Detection Stats
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/30 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-400">Crater Count</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {craterStats?.crater_count ?? "-"}
                </p>
              </div>

              <div className="rounded-3xl border border-white/30 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-400">Coverage</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {craterStats?.crater_coverage_percent ?? "-"}%
                </p>
              </div>

              <div className="rounded-3xl border border-white/30 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-400">Device</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {result?.device_used ?? "-"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {isOutputOpen && result?.visualization && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-xl overflow-auto"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <button
            onClick={() => {
              setIsOutputOpen(false);
              setPanX(0);
              setPanY(0);
            }}
            className="absolute right-6 top-6 rounded-full border border-white/30 bg-white/10 p-3 text-white transition hover:bg-white/30 z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <img
            src={result.visualization}
            alt="Full screen segmentation output"
            className={`rounded-2xl object-contain transition-transform duration-200 ${
              isPanning ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              maxHeight: zoom === 1 ? "92vh" : "auto",
              maxWidth: zoom === 1 ? "96vw" : "auto",
              transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
            }}
          />
        </div>
      )}
    </section>
  );
}

export default Demo;
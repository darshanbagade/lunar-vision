import { motion } from "framer-motion";
import {
  UploadCloud,
  ScanLine,
  Cpu,
  Layers3,
  ImagePlus,
  ArrowRight,
  Database,
  GitBranch,
  ShieldCheck,
} from "lucide-react";

const workflowSteps = [
  {
    icon: UploadCloud,
    title: "Input Lunar Image",
    text: "User uploads a lunar surface image in JPG or PNG format through the web interface.",
  },
  {
    icon: ScanLine,
    title: "Preprocessing",
    text: "The image is resized and normalized before being passed to the deployed model API.",
  },
  {
    icon: Cpu,
    title: "Shared Encoder",
    text: "MobileNetV2 extracts common visual features such as texture, edges, shadows, and terrain patterns.",
  },
  {
    icon: Layers3,
    title: "Task-Specific Decoders",
    text: "Separate decoder heads generate rock segmentation and crater detection outputs.",
  },
  {
    icon: ImagePlus,
    title: "Combined Output",
    text: "The model returns a 4-panel visualization showing original image, rock mask, crater mask, and combined overlay.",
  },
];

const architecturePoints = [
  {
    title: "Shared Feature Extraction",
    text: "A single encoder is used instead of running separate feature extractors for each task.",
  },
  {
    title: "Rock Segmentation Head",
    text: "Predicts four classes: sky, rock, boulder, and ground.",
  },
  {
    title: "Crater Detection Head",
    text: "Produces a binary crater mask from the same input image.",
  },
  {
    title: "Single Inference Flow",
    text: "One uploaded image produces both task outputs and final combined visualization.",
  },
];

function Methodology() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
          Methodology
        </p>

        <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-3xl">
          How Lunar Vision processes a lunar image
        </h2>

        
      </div>

      <div className="glass-panel rounded-[2rem] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              Inference Workflow
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              End-to-end flow used during evaluator demo.
            </p>
          </div>

          <GitBranch className="h-6 w-6 text-slate-200" />
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative rounded-3xl border border-white/30 bg-white/[0.03] p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/30 bg-white/5">
                    <Icon className="h-5 w-5 text-slate-200" />
                  </div>

                  <span className="text-sm text-slate-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h4 className="text-lg font-semibold text-white">
                  {step.title}
                </h4>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {step.text}
                </p>

                {index !== workflowSteps.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-200/60 lg:block" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-[2rem] p-6">
          <div className="mb-6 flex items-center gap-3">
            <Database className="h-6 w-6 text-slate-200" />
            <div>
              <h3 className="text-2xl font-semibold text-white">
                Model Input and Output
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                What the web interface sends and receives.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/30 bg-white/[0.03] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Input
              </p>
              <h4 className="mt-3 text-lg font-semibold text-white">
                One lunar surface image
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                The frontend sends the uploaded image to the Hugging Face API
                using multipart/form-data.
              </p>
            </div>

            <div className="rounded-3xl border border-white/30 bg-white/[0.03] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Output
              </p>
              <h4 className="mt-3 text-lg font-semibold text-white">
                4-panel segmentation visualization
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                The API returns original image, rock segmentation, crater
                detection, and combined overlay as a base64 image.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6">
          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-300" />
            <div>
              <h3 className="text-2xl font-semibold text-white">
                Architecture Summary
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Core components used in Lunar Vision.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {architecturePoints.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/30 bg-white/[0.03] p-5"
              >
                <h4 className="text-lg font-semibold text-white">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[2rem] border border-white/30 bg-white/5 p-6">
        <h3 className="text-xl font-semibold text-slate-200">
          Important Technical Note
        </h3>
        <p className="mt-3 max-w-5xl text-sm leading-7 text-slate-200/80">
          SAM is not executed during website inference. It was used during the
          preprocessing stage to convert crater bounding boxes into segmentation
          masks for training. The deployed demo directly runs the trained
          Multi-Task U-Net model through the Hugging Face API.
        </p>
      </div>
    </section>
  );
}

export default Methodology;
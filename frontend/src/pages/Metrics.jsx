import { motion } from "framer-motion";
import { BarChart3, Cpu, Gauge, Info, Layers3 } from "lucide-react";

const validationMetrics = [
  {
    label: "Rock mIoU",
    value: "72.9%",
    description: "Mean IoU for rock segmentation task",
  },
  {
    label: "Crater mIoU",
    value: "69.6%",
    description: "Mean IoU for crater detection task",
  },
  {
    label: "Rock Dice",
    value: "84.5%",
    description: "Dice score for rock segmentation",
  },
  {
    label: "Crater Dice",
    value: "82.7%",
    description: "Dice score for crater detection",
  },
];

const modelDetails = [
  {
    icon: Layers3,
    label: "Architecture",
    value: "Multi-Task U-Net",
  },
  {
    icon: Cpu,
    label: "Encoder",
    value: "MobileNetV2",
  },
  {
    icon: Gauge,
    label: "Inference Output",
    value: "4-Panel Visualization",
  },
];

function Metrics() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-8 lg:px-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
          Validation Metrics
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Model performance
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          These metrics represent validation performance on the evaluation
          dataset. They are not calculated separately for every uploaded image.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {validationMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="glass-panel rounded-[1.7rem] p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <BarChart3 className="h-5 w-5 text-slate-200" />
              <span className="text-xs text-slate-600">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <p className="text-sm text-slate-400">{metric.label}</p>
            <p className="mt-2 text-4xl font-semibold text-white">
              {metric.value}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {metric.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-[1.7rem] p-6">
          <div className="mb-5 flex items-center gap-3">
            <Info className="h-5 w-5 text-slate-200" />
            <h3 className="text-xl font-semibold text-white">
              Important Note
            </h3>
          </div>

          <p className="text-sm leading-7 text-slate-400">
            Accuracy, precision, recall, Dice score, and mIoU require ground
            truth masks for comparison. Therefore, the website shows validation
            metrics from the evaluated dataset, while the Demo page shows
            per-image prediction statistics returned by the deployed API.
          </p>
        </div>

        <div className="glass-panel rounded-[1.7rem] p-6">
          <h3 className="mb-5 text-xl font-semibold text-white">
            Model Summary
          </h3>

          <div className="grid gap-4 sm:grid-cols-3">
            {modelDetails.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/30 bg-white/[0.03] p-5"
                >
                  <Icon className="h-5 w-5 text-slate-200" />
                  <p className="mt-4 text-sm text-slate-400">{item.label}</p>
                  <p className="mt-2 font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Metrics;
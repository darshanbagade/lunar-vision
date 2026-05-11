import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Layers3,
  Activity,
  ImagePlus,
  ShieldCheck,
  Map,
  Telescope,
  Gauge,
} from "lucide-react";

const metrics = [
  { label: "Rock mIoU", value: "72.9%" },
  { label: "Crater mIoU", value: "69.6%" },
  { label: "Model", value: "Multi-Task U-Net" },
  { label: "Encoder", value: "MobileNetV2" },
];

const flow = [
  {
    icon: ImagePlus,
    title: "Input",
    text: "Lunar surface image",
  },
  {
    icon: Cpu,
    title: "Model",
    text: "Shared encoder with task heads",
  },
  {
    icon: Layers3,
    title: "Output",
    text: "Rock, crater and combined mask",
  },
];

const applications = [
  {
    icon: ShieldCheck,
    title: "Hazard Identification Support",
    text: "Helps identify rocks, boulders and craters that may affect lunar surface mobility analysis.",
  },
  {
    icon: Map,
    title: "Surface Feature Mapping",
    text: "Generates structured segmentation outputs useful for understanding lunar terrain features.",
  },
  {
    icon: Gauge,
    title: "Efficient Perception Pipeline",
    text: "Uses one multi-task model pipeline instead of running multiple separate segmentation systems.",
  },
  {
    icon: Telescope,
    title: "Planetary Research Assistance",
    text: "Can support visual analysis of lunar imagery for research, exploration and mission planning studies.",
  },
];

function Home() {
  return (
    <>
      <section className="mx-auto flex min-h-[calc(100vh-88px)] max-w-[1450px] items-center px-5 py-8 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <Activity className="h-4 w-4 text-slate-200" />
              Lunar surface segmentation system
            </div>

            <h2 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-7xl">
              Lunar Vision
            </h2>

            <p className="mt-5 max-w-3xl text-xl font-medium text-slate-200 md:text-2xl">
              Rock and crater segmentation from a single lunar image.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
           
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 font-semibold text-slate-900 transition hover:bg-white"
              >
                Run Demo
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/methodology"
                className="rounded-full border border-white/30 bg-white/5 px-6 py-3 font-medium text-slate-200 transition hover:bg-white/10"
              >
                View Methodology
              </Link>
            </div>

            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
              {metrics.map((item) => (
                <div key={item.label} className="glass-panel rounded-3xl p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="glass-panel rounded-[2rem] p-6"
          >
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                System Flow
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                From image upload to segmentation output
              </h3>
            </div>

            <div className="space-y-4">
              {flow.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-3xl border border-white/30 bg-white/[0.03] p-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/5">
                      <Icon className="h-5 w-5 text-slate-200" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white">
                          {item.title}
                        </h4>
                        <span className="text-sm text-slate-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-400">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-3xl border border-white/30 bg-white/5 p-5">
              <p className="text-sm leading-6 text-slate-200">
                The website does not automate rover navigation. It provides
                surface perception outputs that can support higher-level analysis
                or navigation systems.
              </p>
            </div>
          </motion.div> */}
        </div>
      </section>

      <section className="mx-auto max-w-[1450px] px-5 pb-16 lg:px-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Applications
          </p>
          <h3 className="mt-3 text-3xl font-semibold text-white">
            Where Lunar Vision can be useful
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            The system provides segmentation-based perception outputs that can
            support lunar surface analysis, hazard study and mission planning
            workflows.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {applications.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="glass-panel rounded-[1.7rem] p-5"
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
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Home;
import { Link } from "react-router-dom";
import { Satellite } from "lucide-react";

function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto max-w-[1450px] px-5 py-8 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/5">
                <Satellite className="h-5 w-5 text-white/80" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Lunar Vision
                </h3>
                <p className="text-sm text-slate-400">
                  Unified lunar surface rock and crater segmentation system.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>
            <Link to="/demo" className="transition hover:text-white">
              Demo
            </Link>
            <Link to="/methodology" className="transition hover:text-white">
              Methodology
            </Link>
            <Link to="/metrics" className="transition hover:text-white">
              Metrics
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-white/10 pt-5 text-sm text-slate-500 md:flex-row md:items-center">
          <p>
            © 2026 Lunar Vision. Final Year Project — Department of Computer Technology.
          </p>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span>React · Tailwind · Hugging Face API</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
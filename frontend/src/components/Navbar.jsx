import { NavLink } from "react-router-dom";
import { Satellite } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Demo", path: "/demo" },
  { name: "Methodology", path: "/methodology" },
  { name: "Metrics", path: "/metrics" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-black/40 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/30 bg-white/5">
            <Satellite className="h-5 w-5 text-slate-200" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-wide text-white">
              Lunar Vision
            </h1>
            <p className="text-xs text-slate-400">
              Lunar segmentation system
            </p>
          </div>
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
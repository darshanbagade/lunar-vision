import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Satellite } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Demo", path: "/demo" },
  { name: "Methodology", path: "/methodology" },
  { name: "Metrics", path: "/metrics" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-[999] w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1450px] items-center justify-between px-4 py-3 lg:px-8">
        <NavLink to="/" onClick={closeMenu} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04]">
            <Satellite className="h-5 w-5 text-white/85" />
          </div>

          <div>
            <h1 className="text-base font-semibold tracking-wide text-white md:text-lg">
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

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-white md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-black/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="mx-auto grid max-w-[1450px] gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm transition ${
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
        </div>
      )}
    </header>
  );
}

export default Navbar;
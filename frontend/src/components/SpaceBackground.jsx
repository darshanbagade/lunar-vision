import { motion } from "framer-motion";

const stars = [
  { left: "5%", top: "12%", size: 4, delay: 0.1 },
  { left: "11%", top: "34%", size: 3.5, delay: 0.6 },
  { left: "18%", top: "20%", size: 4.5, delay: 1.1 },
  { left: "24%", top: "48%", size: 3.5, delay: 0.4 },
  { left: "31%", top: "16%", size: 4, delay: 1.3 },
  { left: "38%", top: "60%", size: 5, delay: 0.7 },
  { left: "46%", top: "26%", size: 4, delay: 1.0 },
  { left: "53%", top: "11%", size: 3.5, delay: 1.5 },
  { left: "61%", top: "41%", size: 4.5, delay: 0.5 },
  { left: "69%", top: "18%", size: 4, delay: 1.2 },
  { left: "76%", top: "31%", size: 3.5, delay: 0.8 },
  { left: "84%", top: "54%", size: 5, delay: 1.6 },
  { left: "20%", top: "76%", size: 3.5, delay: 0.9 },
  { left: "36%", top: "82%", size: 4.5, delay: 1.4 },
  { left: "55%", top: "72%", size: 3.5, delay: 0.3 },
  { left: "73%", top: "79%", size: 4, delay: 1.1 },
];

function StarField() {
  return (
    <div className="absolute inset-0">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.45, 1, 0.55],
            scale: [0.8, 1.55, 0.85],
            x: [0, 18, -10,-5,18, 0],
            y: [0, -10, 8, 20,,-10, 0],
          }}
          transition={{
            duration: 5+ index * 0.18,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Moon() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute right-[-50px] top-100 h-[680px] w-[680px] -translate-y-1/2 rounded-full"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_36%,#ffffff_0%,#f8fafc_24%,#e5e7eb_48%,#cbd5e1_72%,#94a3b8_100%)] shadow-[0_0_140px_rgba(255,255,255,0.34)]" />

      <div className="absolute inset-0 rounded-full border border-white/30" />

      <div className="absolute left-[135px] top-[120px] h-20 w-20 rounded-full bg-slate-500/14 blur-[1px]" />
      <div className="absolute left-[235px] top-[210px] h-14 w-14 rounded-full bg-slate-600/14 blur-[1px]" />
      <div className="absolute left-[145px] top-[345px] h-28 w-28 rounded-full bg-slate-600/12 blur-[2px]" />
      <div className="absolute left-[305px] top-[455px] h-16 w-16 rounded-full bg-slate-600/12 blur-[2px]" />
      <div className="absolute left-[340px] top-[145px] h-10 w-10 rounded-full bg-slate-700/12 blur-[1px]" />
      <div className="absolute left-[405px] top-[285px] h-12 w-12 rounded-full bg-slate-700/12 blur-[1px]" />
    </motion.div>
  );
}

function MoonLightRays() {
  return (
    <>
      <motion.div
        animate={{
          opacity: [0.1, 0.4, 1, 0.6, 0.4, 0.1],
          x: [10, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-0 h-full w-[78vw] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.015)_20%,rgba(255,255,255,0.05)_38%,rgba(255,255,255,0.10)_55%,rgba(255,255,255,0.18)_72%,rgba(255,255,255,0.30)_88%,rgba(255,255,255,0.42)_100%)] blur-2xl"
      />

      <motion.div
        animate={{
          opacity: [0.14, 0.26, 0.18],
          x: [10, 22, 10],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-40px] top-20 h-full w-[62vw] bg-[radial-gradient(circle_at_100%_50%,rgba(255,255,255,0.62),rgba(255,255,255,0.24)_20%,rgba(255,255,255,0.08)_42%,transparent_74%)]"
      />

      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.12],
          x: [0, -40, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-100 top-[50%] h-[80%] w-[85vw] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.01)_18%,rgba(255,255,255,0.03)_34%,rgba(255,255,255,0.07)_52%,rgba(255,255,255,0.13)_70%,rgba(255,255,255,0.22)_86%,rgba(255,255,255,0.34)_100%)] blur-3xl"
      />
    </>
  );
}


function MiniRover() {
  return (
    <motion.div
      initial={{
        x: "-92vw",
        y: "60vh",
        opacity: 1,
        scale: 2.4,
        rotate: 0,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: [1],
        scale: [2.4, 2.85],
        rotate: [0, -47.5],
      }}
      transition={{
        duration: 5,
        delay: 0.3,
        ease: "easeInOut",
      }}
      className="absolute left-[71px] top-[120px] z-20"
    >
      <div className="relative h-8 w-14 rounded-xl border border-white bg-white/[0.08] shadow-[0_0_16px_rgba(255,255,255,0.18)]">
        <div className="absolute left-3 top-3 h-1.5 w-8 rounded-full bg-white/75" />
        <div className="absolute left-8 -top-3 h-4 w-px bg-white/60" />
        <div className="absolute left-[29px] -top-4 h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.75)]" />
        <div className="absolute -bottom-1 left-2 h-2.5 w-2.5 rounded-full bg-black ring-2 ring-white/70" />
        <div className="absolute -bottom-1 right-2 h-2.5 w-2.5 rounded-full bg-black ring-2 ring-white/70" />
      </div>
    </motion.div>
  );
}


function MoonScene() {
  return (
    <div className="absolute right-[-220px] top-1/2 h-[680px] w-[680px] -translate-y-1/2 rounded-full">
      <Moon />
      <MiniRover />
    </div>
  );
}

function SpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.04),transparent_28%),radial-gradient(circle_at_52%_84%,rgba(255,255,255,0.03),transparent_34%)]" />

      <StarField />

      <div className="hidden md:block">
        <MoonLightRays />
        <MoonScene />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.10)_52%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}

export default SpaceBackground;
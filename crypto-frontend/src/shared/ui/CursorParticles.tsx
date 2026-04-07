import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ====== SVG ИКОНКИ ======
const ICONS = [
  `<svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 118 0v4"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="4"/><path d="M10.5 10.5L20 20M17 17l3 3"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round"><path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6z"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-5.096-8 0-8-5.097 0-5.097 8 0 8"/></svg>`,
];

interface CursorParticle {
  id: number;
  startX: number;
  startY: number;
  iconIndex: number;
  angle: number;
  distance: number;
}

export const CursorParticles = () => {
  const [particles, setParticles] = useState<CursorParticle[]>([]);
  let counter = 0;

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let movedEnough = false;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Если сдвинулся достаточно далеко
      if (dist > 80) {
        movedEnough = true;
        lastX = e.clientX;
        lastY = e.clientY;
      }

      // С шансом 15% если сдвинулся — выпустить частицу
      if (movedEnough && Math.random() > 0.85) {
        spawn(e.clientX, e.clientY);
        movedEnough = false;
      }
    };

    const spawn = (x: number, y: number) => {
      const p: CursorParticle = {
        id: ++counter,
        startX: x,
        startY: y,
        iconIndex: Math.floor(Math.random() * ICONS.length),
        angle: Math.random() * 360,
        distance: 100 + Math.random() * 150, // 100-250px
      };
      setParticles((prev) => [...prev.slice(-8), p]);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Удаляем старые
  useEffect(() => {
    if (!particles.length) return;
    const t = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 1200);
    return () => clearTimeout(t);
  }, [particles]);

  return (
    <div className="cursor-particles">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="cp-item"
            initial={{
              opacity: 1,
              scale: 0.5,
              x: p.startX,
              y: p.startY,
              rotate: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0.5, 1, 0.4],
              x: p.startX + Math.cos((p.angle * Math.PI) / 180) * p.distance,
              y: p.startY + Math.sin((p.angle * Math.PI) / 180) * p.distance,
              rotate: (Math.random() > 0.5 ? 180 : -180),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div
              className="cp-icon"
              dangerouslySetInnerHTML={{ __html: ICONS[p.iconIndex] }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

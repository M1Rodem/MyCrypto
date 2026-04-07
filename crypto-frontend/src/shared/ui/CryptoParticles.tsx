import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ====== SVG ЧАСТИЦЫ КРИПТО-ТЕМАТИКИ ======
const PARTICLE_SVGS = [
  // Замок
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 118 0v4"/></svg>`,
  
  // Ключ
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="4"/><path d="M10.5 10.5L20 20M17 17l3 3M14 14l2 2"/></svg>`,
  
  // Щит
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6L12 2z"/><path d="M9 12l2 2 4-4"/></svg>`,
  
  // Хеш/решётка
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9h16M4 15h16M10 3v18M14 3v18"/></svg>`,
  
  // Шестерёнка
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
  
  // Бесконечность
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-5.096-8 0-8-5.097 0-5.097 8 0 8"/></svg>`,
  
  // Волнa
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0c2 3 4 3 6 0"/></svg>`,
  
  // Молния
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
];

interface Particle {
  id: number;
  x: number;
  y: number;
  svgIndex: number;
  size: number;
  rotation: number;
  driftX: number;
  driftY: number;
}

export const CryptoParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const spawnParticle = useCallback(() => {
    const size = Math.random() * 16 + 12; // 12-28px
    
    const particle: Particle = {
      id: Date.now() + Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      svgIndex: Math.floor(Math.random() * PARTICLE_SVGS.length),
      size,
      rotation: Math.random() * 360,
      driftX: (Math.random() - 0.5) * 200, // -100 до +100
      driftY: (Math.random() - 0.5) * 200 - 50, // чуть вверх
    };

    setParticles((prev) => [...prev.slice(-12), particle]);
  }, []);

  useEffect(() => {
    // Случайный интервал между 2 и 5 секунд
    const scheduleNext = () => {
      const delay = Math.random() * 3000 + 2000; // 2000-5000ms
      return setTimeout(() => {
        spawnParticle();
        scheduleNext();
      }, delay);
    };

    const timerId = scheduleNext();

    // Очистка старых частиц
    const cleanup = setInterval(() => {
      setParticles((prev) => prev.filter((_, i) => i > 0));
    }, 1500);

    return () => {
      clearTimeout(timerId);
      clearInterval(cleanup);
    };
  }, [spawnParticle]);

  return (
    <div className="crypto-particles-layer">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="cp-item"
            initial={{
              opacity: 0,
              scale: 0,
              x: p.x,
              y: p.y,
              rotate: p.rotation,
            }}
            animate={{
              opacity: [0, 0.7, 0.7, 0],
              scale: [0, p.size / 20, p.size / 20, 0.5],
              x: p.x + p.driftX,
              y: p.y + p.driftY,
              rotate: p.rotation + (Math.random() > 0.5 ? 180 : -180),
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 4,
              ease: "easeOut",
              times: [0, 0.2, 0.7, 1],
            }}
          >
            <div
              className="cp-svg"
              dangerouslySetInnerHTML={{ __html: PARTICLE_SVGS[p.svgIndex] }}
              style={{ width: p.size, height: p.size }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
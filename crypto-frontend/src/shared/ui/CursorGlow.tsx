import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const CursorGlow = () => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Плавное следование с лёгким запазыванием
  const glowX = useSpring(rawX, { stiffness: 80, damping: 24 });
  const glowY = useSpring(rawY, { stiffness: 80, damping: 24 });

  // Частицы
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    char: string;
  }>>([]);

  let idCounter = 0;

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      // Создаём частицу случайно
      if (Math.random() > 0.7) {
        const chars = ["0", "1", "{", "}", "#", "<", ">", "*", "x"];
        const particle = {
          id: ++idCounter,
          x: e.clientX,
          y: e.clientY,
          char: chars[Math.floor(Math.random() * chars.length)],
        };
        setParticles((prev) => [...prev.slice(-15), particle]);
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  // Удаляем старые частицы
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div className="crypto-glow">
      {/* Основное свечение - плавно следует */}
      <motion.div
        className="cg-main"
        style={{ left: glowX, top: glowY }}
      />

      {/* Яркий центр */}
      <motion.div
        className="cg-center"
        style={{ left: glowX, top: glowY }}
      />

      {/* Крипто-частицы */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="cg-particle"
          initial={{ 
            left: p.x, 
            top: p.y,
            opacity: 1,
            scale: 1,
          }}
          animate={{ 
            left: p.x + (Math.random() - 0.5) * 80,
            top: p.y + (Math.random() - 0.5) * 80 - 30,
            opacity: 0,
            scale: 0.3,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {p.char}
        </motion.span>
      ))}
    </div>
  );
};

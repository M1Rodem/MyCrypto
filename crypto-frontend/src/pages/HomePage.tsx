import "./HomePage.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  CryptoLogo, 
  AnimatedLock, 
  ShieldIcon, 
  RocketIcon, 
  CodeIcon, 
  SettingsIcon,
  CookieIcon,
  LockIcon,
  KeyIcon,
  CheckIcon,
  ArrowRightIcon
} from "../shared/ui/Icons";

// ====== АНИМИРОВАННЫЙ ОРБ АЛГОРИТМА ======
const AlgorithmOrb = ({ name, delay, position }: { 
  name: string; 
  delay: number;
  position: { x: number; y: number };
}) => (
  <motion.div
    className="algo-orb"
    initial={{ opacity: 0, scale: 0, x: -50, y: 50 }}
    animate={{ 
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.08, 1],
      y: [position.y, position.y - 25, position.y]
    }}
    transition={{
      duration: 5 + delay,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{ left: `${position.x}%`, top: `${position.y}%` }}
  >
    <div className="orb-inner">
      <div className="orb-icon">
        {name === 'PBKDF2' && <ShieldIcon size={16} />}
        {name === 'ChaCha20' && <LockIcon size={16} />}
        {name === 'HMAC' && <KeyIcon size={16} />}
        {name === 'SALT' && <SettingsIcon size={16} />}
      </div>
      <span>{name}</span>
    </div>
  </motion.div>
);

// ====== КАРТОЧКА ФИЧИ С МИКРО-АНИМАЦИЯМИ ======
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className={`feature-card ${isHovered ? 'hovered' : ''}`}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.12, 
        duration: 0.7, 
        type: "spring",
        stiffness: 100
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        transition: { type: "spring", stiffness: 300 }
      }}
    >
      {/* Градиентный border эффект */}
      <div className="feature-border-glow" style={{ background: gradient }} />
      
      {/* Контент */}
      <motion.div 
        className="feature-icon-wrapper"
        animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>
      
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
      
      {/* Hover линия */}
      <motion.div 
        className="feature-line"
        initial={{ scaleX: 0 }}
        animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: gradient }}
      />

      {/* Частицы при hover */}
      {isHovered && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="feature-particle"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [1, 0], 
            scale: [0, 1.5],
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50
          }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          style={{ background: gradient }}
        />
      ))}
    </motion.div>
  );
};

// ====== ЭТАП ПАЙПЛАЙНА ======
interface PipelineStepProps {
  step: number;
  label: string;
  description: string;
  index: number;
  isLast: boolean;
}

const PipelineStep: React.FC<PipelineStepProps> = ({ step, label, description, index, isLast }) => (
  <motion.div
    className="pipeline-step-container"
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
  >
    <motion.div 
      className="pipeline-step-number"
      whileHover={{ 
        rotate: 360, 
        scale: 1.2,
        boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)'
      }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <span>{step}</span>
    </motion.div>
    
    <div className="pipeline-step-content">
      <motion.h4 
        className="pipeline-step-label"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 + 0.1 }}
      >
        {label}
      </motion.h4>
      <motion.p 
        className="pipeline-step-desc"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 + 0.2 }}
      >
        {description}
      </motion.p>
    </div>
    
    {!isLast && (
      <motion.div 
        className="pipeline-connector"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
      >
        <div className="connector-line" />
        <motion.div 
          className="connector-dot"
          animate={{ x: [0, 200], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
        />
      </motion.div>
    )}
  </motion.div>
);

// ====== СТАТИСТИКА ======
interface StatItemProps {
  value: string;
  label: string;
  suffix?: string;
  index: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, suffix, index }) => (
  <motion.div
    className="stat-item"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15, duration: 0.6 }}
    whileHover={{ scale: 1.05 }}
  >
    <motion.div 
      className="stat-value"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
    >
      {value}
      {suffix && <span className="stat-suffix">{suffix}</span>}
    </motion.div>
    <div className="stat-label">{label}</div>
  </motion.div>
);

// ====== ГЛАВНЫЙ КОМПОНЕНТ ======
export const HomePage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // Параллакс эффекты
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orb1X = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orb2X = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Mouse parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Variants для stagger анимаций
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
  };

  // Данные фич
  const features = [
    {
      icon: <ShieldIcon size={40} />,
      title: "PBKDF2 SHA-512",
      description: "1 миллион итераций хеширования для максимальной защиты от brute-force атак",
      gradient: "linear-gradient(135deg, #22c55e, #16a34a)"
    },
    {
      icon: <LockIcon size={40} />,
      title: "ChaCha20 Stream Cipher",
      description: "Высокоскоростное потоковое шифрование с 256-битным ключом",
      gradient: "linear-gradient(135deg, #3b82f6, #2563eb)"
    },
    {
      icon: <KeyIcon size={40} />,
      title: "HMAC Integrity",
      description: "Цифровые подписи для контроля целостности каждого сообщения",
      gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)"
    },
    {
      icon: <SettingsIcon size={40} />,
      title: "Dynamic Salt Generation",
      description: "Уникальная случайная соль для каждой операции шифрования",
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)"
    },
    {
      icon: <CodeIcon size={40} />,
      title: "Custom Obfuscation Layer",
      description: "Дополнительный слой обфускации для усложнения анализа",
      gradient: "linear-gradient(135deg, #ec4899, #db2777)"
    },
    {
      icon: <CookieIcon size={40} />,
      title: "Cookie-based Key Management",
      description: "Автоматическое сохранение и управление ключами через secure cookies",
      gradient: "linear-gradient(135deg, #06b6d4, #0891b2)"
    }
  ];

  // Данные пайплайна
  const pipelineSteps = [
    { step: 1, label: "Ввод текста", description: "Введите сообщение для защиты" },
    { step: 2, label: "Generate Key", description: "Генерация криптографического ключа" },
    { step: 3, label: "PBKDF2 Derivation", description: "Производная функция ключа" },
    { step: 4, label: "ChaCha20 Encrypt", description: "Потоковое шифрование данных" },
    { step: 5, label: "HMAC Sign → Result", description: "Подписание и вывод результата" }
  ];

  return (
    <div ref={containerRef} className="home-page">
      {/* ====== АНИМИРОВАННЫЙ ФОН ====== */}
      <motion.div className="bg-grid" style={{ y: bgY }} />
      
      {/* Gradient orbs with scroll parallax */}
      <motion.div 
        className="gradient-orb orb-1" 
        style={{ x: orb1X, y: mousePos.y }}
      />
      <motion.div 
        className="gradient-orb orb-2" 
        style={{ x: orb2X, y: mousePos.y * -1 }}
      />
      
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Floating algorithm orbs */}
      <AlgorithmOrb name="PBKDF2" delay={0} position={{ x: 12, y: 18 }} />
      <AlgorithmOrb name="ChaCha20" delay={1} position={{ x: 82, y: 28 }} />
      <AlgorithmOrb name="HMAC" delay={2} position={{ x: 72, y: 72 }} />
      <AlgorithmOrb name="SALT" delay={3} position={{ x: 18, y: 78 }} />

      {/* ====== HERO SECTION ====== */}
      <section className="hero-section">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="hero-badge">
            <motion.span 
              className="badge-dot"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>Next-Generation Encryption System</span>
            <motion.span 
              className="badge-pulse"
              animate={{ opacity: [0, 1, 0], x: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1 variants={itemVariants} className="hero-title">
            Композитное
            <br />
            <span className="gradient-text">шифрование</span>
            <br />
            нового поколения
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="hero-subtitle">
            Многослойная криптографическая система на базе{' '}
            <strong>PBKDF2</strong> (1M итераций) +{' '}
            <strong>ChaCha20</strong> +{' '}
            <strong>HMAC</strong>. 
            <br />
            Ключи автоматически управляются через защищённые cookies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="hero-actions">
            <motion.button
              className="cta-primary-button"
              onClick={() => navigate("/crypto")}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 25px 50px rgba(34, 197, 94, 0.45)',
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <RocketIcon size={20} color="#000" />
              <span>Попробовать сейчас</span>
              <motion.span 
                className="button-arrow"
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRightIcon size={18} color="#000" />
              </motion.span>
            </motion.button>

            <motion.button
              className="cta-secondary-button"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                borderColor: 'rgba(34, 197, 94, 0.35)',
                background: 'rgba(34, 197, 94, 0.06)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Узнать больше</span>
              <ArrowRightIcon size={14} color="#64748b" />
            </motion.button>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className="hero-stats-row">
            <StatItem value="1" suffix="M+" label="Итераций PBKDF2" index={0} />
            <StatItem value="256" suffix="-bit" label="Ключ ChaCha20" index={1} />
            <StatItem value="∞" label="Сессий ключей" index={2} />
          </motion.div>
        </motion.div>

        {/* Right Side - Animated Visual */}
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring", damping: 20 }}
        >
          <div className="visual-container">
            {/* Main lock animation - ПУЛЬСАЦИЯ */}
            <motion.div
              className="visual-lock"
              animate={{
                scale: [1, 1.04, 1],
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <AnimatedLock size={200} />
            </motion.div>

            {/* Orbiting rings */}
            {[280, 360, 440].map((size, i) => (
              <motion.div
                key={i}
                className="orbit-ring"
                style={{ 
                  width: size, 
                  height: size,
                  '--rotation-duration': `${4 + i * 2}s`,
                  '--start-delay': `${i * 0.8}s`
                } as React.CSSProperties}
              >
                <motion.div 
                  className="orbit-dot"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 4 + i * 2, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: i * 0.8
                  }}
                  style={{ 
                    background: i === 0 ? '#22c55e' : i === 1 ? '#3b82f6' : '#8b5cf6'
                  }}
                />
              </motion.div>
            ))}

            {/* Floating code preview */}
            <motion.div 
              className="code-preview-card"
              initial={{ opacity: 0, y: 30, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="code-header">
                <div className="code-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="code-filename">encryption.ts</span>
              </div>
              <pre className="code-content">
                <code>
                  <span className="code-keyword">await</span>{' '}
                  <span className="code-function">encrypt</span>
                  <span className="code-bracket">(</span>
                  <br />
                  {'  '}<span className="code-string">"Hello World"</span>
                  <span className="code-bracket">)</span>
                  <br />
                  <span className="code-comment">// → "x7f$kL2m@n9..."</span>
                </code>
              </pre>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ====== FEATURES SECTION ====== */}
      <section id="features" className="features-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Почему эта система{' '}
            <span className="gradient-accent">уникальна?</span>
          </motion.h2>
          
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Многослойная защита с промышленной стойкостью
          </motion.p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </section>

      {/* ====== PIPELINE SECTION ====== */}
      <section className="pipeline-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Как это{' '}
            <span className="gradient-accent">работает?</span>
          </h2>
        </motion.div>

        <div className="pipeline-container">
          {pipelineSteps.map((step, index) => (
            <PipelineStep 
              key={index} 
              {...step} 
              index={index} 
              isLast={index === pipelineSteps.length - 1}
            />
          ))}
        </div>
      </section>

      {/* ====== FINAL CTA SECTION ====== */}
      <section className="final-cta-section">
        <motion.div
          className="cta-box"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Background decoration */}
          <div className="cta-bg-decoration">
            <motion.div 
              className="cta-circle cta-circle-1"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="cta-circle cta-circle-2"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>

          <motion.div
            className="cta-logo"
            animate={{ 
              scale: [1, 1.08, 1],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <CryptoLogo size={70} />
          </motion.div>

          <h2 className="cta-title">
            Готов зашифровать первое сообщение?
          </h2>
          
          <p className="cta-subtitle">
            Никакой регистрации • Мгновенный результат • Полная безопасность данных
          </p>

          <motion.button
            className="cta-primary-button"
            onClick={() => navigate("/crypto")}
            whileHover={{ 
              scale: 1.03,
              y: -3,
              boxShadow: '0 20px 45px rgba(34, 197, 94, 0.4)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="btn-icon-wrap">
              <RocketIcon size={18} color="#000" />
            </div>
            <span>Попробовать сейчас</span>
            <ArrowRightIcon size={16} color="#000" />
          </motion.button>

          <div className="cta-features">
            <div className="cta-feature-item">
              <CheckIcon size={16} color="#22c55e" />
              <span>Безопасно</span>
            </div>
            <div className="cta-feature-item">
              <CheckIcon size={16} color="#22c55e" />
              <span>Быстро</span>
            </div>
            <div className="cta-feature-item">
              <CheckIcon size={16} color="#22c55e" />
              <span>Бесплатно</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="home-footer">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="footer-logo">
            <CryptoLogo size={32} />
          </div>
          <p className="footer-text">
            Built with precision using{' '}
            <strong>React</strong> +{' '}
            <strong>Framer Motion</strong> +{' '}
            <strong>ASP.NET Core</strong>
          </p>
          <div className="footer-divider" />
          <p className="footer-copyright">
            © 2024 CryptoShield. Enterprise-grade encryption.
          </p>
        </motion.div>
      </footer>
    </div>
  );
};
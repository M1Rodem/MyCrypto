import React from 'react';

// ====== БАЗОВЫЙ КОМПОНЕНТ ИКОНКИ ======
interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const IconWrapper: React.FC<IconProps & { children: React.ReactNode }> = ({ 
  size = 24, 
  color = '#22c55e', 
  children,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    style={{ color }}
  >
    {children}
  </svg>
);

// ====== ИКОНКА ЗАМОК (Lock) ======
export const LockIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
  </IconWrapper>
);

// ====== ИКОНКА КЛЮЧ (Key) ======
export const KeyIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M10.5 10.5L20 20M17 17l3 3M14 14l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </IconWrapper>
);

// ====== ИКОНКА ЩИТ (Shield) ======
export const ShieldIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </IconWrapper>
);

// ====== ИКОНКА РАКЕТА (Rocket) ======
export const RocketIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <path d="M12 2C8 6 6 10 6 14c0 2 .5 4 1.5 5.5L4 23h4l1.5-3c.8.3 1.7.5 2.5.5s1.7-.2 2.5-.5l1.5 3h4l-3.5-3.5C17.5 18 18 16 18 14c0-4-2-8-6-12z" 
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M8 22v-4M16 22v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </IconWrapper>
);

// ====== ИКОНКА ШИФРОВАНИЕ (Encrypt) ======
export const EncryptIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 15v2M10.5 16.5l1.5-1.5 1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </IconWrapper>
);

// ====== ИКОНКА РАСШИФРОВКА (Decrypt) ======
export const DecryptIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="16" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </IconWrapper>
);

// ====== ИКОНКА НАСТРОЙКИ (Settings/Gear) ======
export const SettingsIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </IconWrapper>
);

// ====== ИКОНКА КОДИРОВАНИЕ (Code) ======
export const CodeIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <path d="M8 9l-4 4 4 4M16 9l4 4-4 4M13 5l-2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </IconWrapper>
);

// ====== ИКОНКА КУКИ (Cookie) ======
export const CookieIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8" cy="10" r="1" fill="currentColor"/>
    <circle cx="15" cy="9" r="1" fill="currentColor"/>
    <circle cx="10" cy="15" r="1" fill="currentColor"/>
    <circle cx="16" cy="14" r="1" fill="currentColor"/>
  </IconWrapper>
);

// ====== ИКОНКА СТРЕЛКА ВЛЕВО (Back Arrow) ======
export const ArrowLeftIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </IconWrapper>
);

// ====== ИКОНКА СТРЕЛКА ВПРАВО (Forward) ======
export const ArrowRightIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </IconWrapper>
);

// ====== ИКОНКА КОПИРОВАТЬ (Copy) ======
export const CopyIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
  </IconWrapper>
);

// ====== ИКОНКА ПРОВЕРКА (Check) ======
export const CheckIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </IconWrapper>
);

// ====== ИКОНКА СПИННЕР (Loading) ======
export const SpinnerIcon: React.FC<IconProps & { spinning?: boolean }> = ({ 
  size, 
  color,
  spinning = true 
}) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    style={{ animation: spinning ? 'spin 1s linear infinite' : undefined }}
  >
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    <circle cx="12" cy="12" r="10" stroke={color || '#22c55e'} strokeWidth="2" strokeDasharray="32" strokeDashoffset="32" opacity="0.25"/>
    <circle cx="12" cy="12" r="10" stroke={color || '#22c55e'} strokeWidth="2" strokeDasharray="32" strokeDashoffset="32" strokeLinecap="round"/>
  </svg>
);

// ====== ИКОНКА ПРЕДУПРЕЖДЕНИЕ (Warning) ======
export const WarningIcon: React.FC<IconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </IconWrapper>
);

// ====== АНИМИРОВАННЫЙ ЛОГОТИП (Crypto Logo) ======
export const CryptoLogo: React.FC<{ size?: number; animated?: boolean }> = ({ 
  size = 80, 
  animated = true 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 80 80" 
    fill="none"
    style={{ filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))' }}
  >
    {/* Фон */}
    <rect width="80" height="80" rx="20" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5"/>
    
    {/* Внешнее кольцо */}
    <circle 
      cx="40" 
      cy="40" 
      r="28" 
      stroke="#22c55e" 
      strokeWidth="2" 
      strokeDasharray="176" 
      strokeDashoffset="44"
      style={{ 
        transformOrigin: 'center',
        animation: animated ? 'rotate-slow 20s linear infinite' : undefined,
        opacity: 0.6
      }}
    />
    
    {/* Замок */}
    <rect x="28" y="38" width="24" height="18" rx="3" fill="#22c55e" opacity="0.2" stroke="#22c55e" strokeWidth="2"/>
    <path d="M33 38v-6a7 7 0 0114 0v6" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
    
    {/* Ключ в центре */}
    <g style={{ 
      transformOrigin: 'center',
      animation: animated ? 'pulse-glow 2s ease-in-out infinite' : undefined
    }}>
      <circle cx="40" cy="47" r="3" fill="#22c55e"/>
      <line x1="43" y1="47" x2="48" y2="42" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
    </g>

    <style>{`
      @keyframes rotate-slow {
        to { transform: rotate(360deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `}</style>
  </svg>
);

// ====== АНИМИРОВАННЫЙ 3D ЗАМОК (Hero Visual) ======
export const AnimatedLock: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <svg 
    width={size} 
    height={size * 1.2} 
    viewBox="0 0 200 240" 
    fill="none"
    style={{ perspective: '1000px' }}
  >
    <defs>
      <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e293b"/>
        <stop offset="100%" stopColor="#0f172a"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Тело замка */}
    <rect 
      x="30" 
      y="90" 
      width="140" 
      height="120" 
      rx="16" 
      fill="url(#lockGrad)" 
      stroke="#22c55e" 
      strokeWidth="2.5"
      filter="url(#glow)"
      style={{
        transformOrigin: 'center',
        animation: 'float-lock 4s ease-in-out infinite'
      }}
    />

    {/* Дужка замка */}
    <path 
      d="M60 90V60a40 40 0 0180 0v30" 
      stroke="#22c55e" 
      strokeWidth="8" 
      strokeLinecap="round"
      fill="none"
      filter="url(#glow)"
      style={{
        transformOrigin: 'center',
        animation: 'shackle-bounce 3s ease-in-out infinite'
      }}
    />

    {/* Ключевая скважина */}
    <g style={{ animation: 'keyhole-pulse 2s ease-in-out infinite' }}>
      <circle cx="100" cy="150" r="12" fill="#020617" stroke="#22c55e" strokeWidth="2"/>
      <path d="M96 155l4 8 4-8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </g>

    {/* Orbiting particles */}
    {[0, 90, 180, 270].map((_, i) => (
      <circle
        key={i}
        cx={100}
        cy={60}
        r="4"
        fill="#22c55e"
        opacity="0.6"
        style={{
          transformOrigin: '0 140px',
          animation: `orbit ${3 + i}s linear infinite`,
          animationDelay: `${i * 0.75}s`
        }}
      />
    ))}

    <style>{`
      @keyframes float-lock {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      @keyframes shackle-bounce {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(1.05); }
      }
      @keyframes keyhole-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
      @keyframes orbit {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </svg>
);
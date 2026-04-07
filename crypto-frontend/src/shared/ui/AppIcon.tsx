export const AppIcon = ({ size = 64 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
    >
      <rect width="64" height="64" rx="16" fill="#020617" />

      <circle cx="32" cy="32" r="18" stroke="#22c55e" strokeWidth="2" />

      <path
        d="M24 32h16M32 24v16"
        stroke="#22c55e"
        strokeWidth="2"
      />
    </svg>
  );
};
'use client';

interface IslamicOrnamentProps {
  variant?: 'divider' | 'corner' | 'star' | 'border-top' | 'mosque-silhouette' | 'kaaba' | 'crescent-star' | 'lantern';
  className?: string;
  color?: string;
}

export default function IslamicOrnament({
  variant = 'divider',
  className = '',
  color = 'var(--gold)',
}: IslamicOrnamentProps) {
  if (variant === 'mosque-silhouette') {
    return (
      <svg
        className={className}
        viewBox="0 0 400 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Left minaret */}
        <rect x="45" y="30" width="12" height="90" fill={color} opacity="0.7" />
        <rect x="43" y="24" width="16" height="8" rx="2" fill={color} opacity="0.8" />
        <polygon points="51,6 43,24 59,24" fill={color} opacity="0.9" />
        <circle cx="51" cy="14" r="2" fill={color} opacity="0.5" />
        {/* Right minaret */}
        <rect x="343" y="30" width="12" height="90" fill={color} opacity="0.7" />
        <rect x="341" y="24" width="16" height="8" rx="2" fill={color} opacity="0.8" />
        <polygon points="349,6 341,24 357,24" fill={color} opacity="0.9" />
        <circle cx="349" cy="14" r="2" fill={color} opacity="0.5" />
        {/* Main dome */}
        <path
          d="M120 120 L120 65 Q200 -10 280 65 L280 120 Z"
          fill={color}
          opacity="0.6"
        />
        {/* Inner dome detail */}
        <path
          d="M150 120 L150 75 Q200 20 250 75 L250 120 Z"
          fill={color}
          opacity="0.3"
        />
        {/* Dome finial */}
        <line x1="200" y1="5" x2="200" y2="25" stroke={color} strokeWidth="2" opacity="0.9" />
        <circle cx="200" cy="4" r="3" fill={color} opacity="0.9" />
        {/* Side domes */}
        <path
          d="M80 120 L80 80 Q100 50 120 80 L120 120 Z"
          fill={color}
          opacity="0.5"
        />
        <path
          d="M280 120 L280 80 Q300 50 320 80 L320 120 Z"
          fill={color}
          opacity="0.5"
        />
        {/* Base line */}
        <rect x="40" y="118" width="320" height="2" fill={color} opacity="0.4" />
        {/* Windows */}
        <ellipse cx="200" cy="90" rx="10" ry="15" fill={color} opacity="0.2" />
        <ellipse cx="170" cy="95" rx="6" ry="10" fill={color} opacity="0.2" />
        <ellipse cx="230" cy="95" rx="6" ry="10" fill={color} opacity="0.2" />
      </svg>
    );
  }

  if (variant === 'kaaba') {
    return (
      <svg
        className={className}
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Kaaba body - black kiswah */}
        <rect x="15" y="20" width="50" height="50" rx="2" fill="#1a1a1a" />
        {/* Kiswah gold band */}
        <rect x="15" y="38" width="50" height="8" fill="#d4af37" />
        <rect x="15" y="38" width="50" height="1" fill="#e6c65c" opacity="0.6" />
        {/* Kiswah pattern - diamond shapes on the band */}
        <polygon points="28,42 32,39 36,42 32,45" fill="#e6c65c" opacity="0.7" />
        <polygon points="44,42 48,39 52,42 48,45" fill="#e6c65c" opacity="0.7" />
        {/* Door - gold */}
        <rect x="32" y="48" width="16" height="22" rx="8" fill="#d4af37" opacity="0.8" />
        <rect x="34" y="50" width="12" height="20" rx="6" fill="#b8960c" opacity="0.5" />
        {/* Top cloth edge */}
        <path d="M15 20 Q40 15 65 20" stroke="#d4af37" strokeWidth="1" fill="none" opacity="0.6" />
        {/* Hajr Ismail suggestion */}
        <path d="M65 55 Q75 40 65 30" stroke="#888888" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="3 2" />
      </svg>
    );
  }

  if (variant === 'crescent-star') {
    return (
      <svg
        className={className}
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="crescent-mask">
            <rect width="60" height="60" fill="white" />
            <circle cx="33" cy="23" r="14" fill="black" />
          </mask>
        </defs>
        {/* Crescent moon via mask */}
        <circle cx="26" cy="28" r="18" fill={color} opacity="0.8" mask="url(#crescent-mask)" />
        {/* Star */}
        <polygon
          points="48,18 50,24 56,24 51,28 53,34 48,30 43,34 45,28 40,24 46,24"
          fill={color}
          opacity="0.9"
        />
      </svg>
    );
  }

  if (variant === 'lantern') {
    return (
      <svg
        className={className}
        width="36"
        height="70"
        viewBox="0 0 36 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hanging chain */}
        <line x1="18" y1="0" x2="18" y2="14" stroke={color} strokeWidth="1" opacity="0.5" />
        {/* Top cap */}
        <polygon points="12,14 24,14 22,18 14,18" fill={color} opacity="0.8" />
        {/* Lantern body */}
        <path
          d="M10 18 Q8 35 10 50 L12 52 L24 52 L26 50 Q28 35 26 18 Z"
          fill={color}
          opacity="0.3"
        />
        {/* Glass panels */}
        <path
          d="M12 20 Q10 35 12 48 L18 48 L18 20 Z"
          fill={color}
          opacity="0.15"
        />
        <path
          d="M24 20 Q26 35 24 48 L18 48 L18 20 Z"
          fill={color}
          opacity="0.15"
        />
        {/* Decorative bands */}
        <rect x="10" y="28" width="16" height="1.5" rx="0.5" fill={color} opacity="0.6" />
        <rect x="10" y="38" width="16" height="1.5" rx="0.5" fill={color} opacity="0.6" />
        {/* Inner glow */}
        <ellipse cx="18" cy="35" rx="4" ry="8" fill={color} opacity="0.4" />
        {/* Bottom finial */}
        <polygon points="14,52 22,52 20,56 16,56" fill={color} opacity="0.7" />
        <circle cx="18" cy="58" r="2" fill={color} opacity="0.6" />
      </svg>
    );
  }

  if (variant === 'star') {
    return (
      <svg
        className={className}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 0L23.5 14.5L38 10L26 20L38 30L23.5 25.5L20 40L16.5 25.5L2 30L14 20L2 10L16.5 14.5L20 0Z"
          fill={color}
          opacity="0.8"
        />
        <circle cx="20" cy="20" r="5" fill={color} />
      </svg>
    );
  }

  if (variant === 'corner') {
    return (
      <svg
        className={className}
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0C0 0 20 0 40 20C60 40 80 20 80 20"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M0 10C0 10 20 10 35 25C50 40 70 25 70 25"
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <circle cx="40" cy="20" r="3" fill={color} opacity="0.6" />
        <circle cx="20" cy="5" r="2" fill={color} opacity="0.4" />
        <circle cx="60" cy="22" r="2" fill={color} opacity="0.4" />
      </svg>
    );
  }

  if (variant === 'border-top') {
    return (
      <div className={`w-full flex justify-center ${className}`}>
        <svg
          width="200"
          height="20"
          viewBox="0 0 200 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 10Q25 0 50 10T100 10T150 10T200 10"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <circle cx="100" cy="10" r="3" fill={color} opacity="0.8" />
          <circle cx="50" cy="10" r="2" fill={color} opacity="0.5" />
          <circle cx="150" cy="10" r="2" fill={color} opacity="0.5" />
        </svg>
      </div>
    );
  }

  // Default: divider
  return (
    <div className={`ornament-divider ${className}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L14.5 8.5L21 6L16 12L21 18L14.5 15.5L12 22L9.5 15.5L3 18L8 12L3 6L9.5 8.5L12 2Z"
          fill={color}
          opacity="0.8"
        />
        <circle cx="12" cy="12" r="3" fill={color} />
      </svg>
    </div>
  );
}

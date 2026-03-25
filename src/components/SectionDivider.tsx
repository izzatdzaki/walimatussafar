'use client';

interface SectionDividerProps {
  topColor?: string;
  bottomColor?: string;
  className?: string;
}

export default function SectionDivider({
  topColor = 'var(--navy)',
  bottomColor = 'var(--cream)',
  className = '',
}: SectionDividerProps) {
  return (
    <div className={`relative w-full h-12 md:h-16 ${className}`} style={{ marginTop: -1, marginBottom: -1 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top fill */}
        <rect x="0" y="0" width="400" height="30" fill={topColor} />
        {/* Bottom fill */}
        <rect x="0" y="30" width="400" height="30" fill={bottomColor} />
        {/* Arch wave from top color into bottom area */}
        <path
          d="M0 30 Q100 10 200 30 Q300 50 400 30 L400 0 L0 0 Z"
          fill={topColor}
        />
        {/* Gold ornament star in center */}
        <g transform="translate(200,28)">
          <circle r="6" fill="var(--gold)" opacity="0.8" />
          <polygon
            points="0,-10 2.5,-3 10,-3 4,2 6,9 0,5 -6,9 -4,2 -10,-3 -2.5,-3"
            fill="var(--gold)"
            opacity="0.6"
          />
        </g>
        {/* Side accent dots */}
        <circle cx="160" cy="26" r="2" fill="var(--gold)" opacity="0.4" />
        <circle cx="240" cy="26" r="2" fill="var(--gold)" opacity="0.4" />
      </svg>
    </div>
  );
}

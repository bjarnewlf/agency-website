interface GravitationalFieldProps {
  size?: number
  className?: string
}

export function GravitationalField({
  size = 480,
  className,
}: GravitationalFieldProps) {
  return (
    <svg
      id="gravitational-field"
      viewBox="-320 -320 640 640"
      width={size}
      height={size}
      aria-hidden="true"
      role="presentation"
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      <defs>
        <radialGradient id="field-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
        </radialGradient>
        <filter id="lensing-distort" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves={2}
            seed={42}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={3}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* Hintergrund-Waerme */}
      <circle cx="0" cy="0" r="320" fill="url(#field-glow)" />

      {/* Lensing-Ellipsen */}
      <g id="lensing-ellipses" transform="rotate(15)" opacity="0.6">
        <ellipse
          cx="0" cy="0" rx="110" ry="90"
          stroke="#4F46E5" strokeWidth="1" fill="none" opacity="0.32"
        />
        <ellipse
          cx="0" cy="0" rx="202" ry="166"
          stroke="#4F46E5" strokeWidth="0.7" fill="none" opacity="0.17"
        />
      </g>

      {/* Konzentrische Ringe */}
      <g id="orbital-rings" filter="url(#lensing-distort)">
        <circle cx="0" cy="0" r="40"  stroke="#4F46E5" strokeWidth="1.5" fill="none" opacity="0.55" />
        <circle cx="0" cy="0" r="72"  stroke="#4F46E5" strokeWidth="1.2" fill="none" opacity="0.42" />
        <circle cx="0" cy="0" r="110" stroke="#4F46E5" strokeWidth="1"   fill="none" opacity="0.32" />
        <circle cx="0" cy="0" r="154" stroke="#4F46E5" strokeWidth="0.8" fill="none" opacity="0.24" />
        <circle cx="0" cy="0" r="202" stroke="#4F46E5" strokeWidth="0.7" fill="none" opacity="0.17" />
        <circle cx="0" cy="0" r="254" stroke="#4F46E5" strokeWidth="0.6" fill="none" opacity="0.11" />
        <circle cx="0" cy="0" r="310" stroke="#4F46E5" strokeWidth="0.5" fill="none" opacity="0.07" />
      </g>

      {/* Ereignishorizont-Kern */}
      <circle cx="0" cy="0" r="16" fill="#0A0A0F" />
      <circle cx="0" cy="0" r="20" stroke="#4F46E5" strokeWidth="2" fill="none" opacity="0.8" />
    </svg>
  )
}

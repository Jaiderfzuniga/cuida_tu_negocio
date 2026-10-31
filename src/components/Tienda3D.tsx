/** Ilustración 3D de la pantalla de inicio: tienda protegida por cúpula y escudo. */
export function Tienda3D() {
  return (
    <svg viewBox="0 0 300 274" role="img" aria-label="Tienda protegida por una cúpula y un escudo" className="flotar w-full max-w-[320px]"
      style={{ filter: 'drop-shadow(0 0 24px rgb(43 234 122 / calc(var(--brillo) * 0.8)))' }}>
      <defs>
        <radialGradient id="tPlat" cx="50%" cy="40%" r="60%"><stop offset="0" stopColor="#2BEA7A" stopOpacity="0.75" /><stop offset="1" stopColor="#0B2A1E" stopOpacity="0.2" /></radialGradient>
        <radialGradient id="tDome" cx="40%" cy="30%" r="75%"><stop offset="0" stopColor="#8CFFB9" stopOpacity="0.22" /><stop offset="1" stopColor="#2BEA7A" stopOpacity="0.03" /></radialGradient>
        <linearGradient id="tFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1E4A66" /><stop offset="1" stopColor="#102A3C" /></linearGradient>
        <linearGradient id="tSide" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#143247" /><stop offset="1" stopColor="#0A1C29" /></linearGradient>
        <linearGradient id="tShield" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8CFFB9" /><stop offset="1" stopColor="#0E9F4F" /></linearGradient>
      </defs>
      <ellipse cx="150" cy="244" rx="128" ry="26" fill="#06231A" stroke="#2BEA7A" strokeOpacity="0.5" />
      <ellipse cx="150" cy="236" rx="128" ry="26" fill="url(#tPlat)" stroke="#2BEA7A" strokeWidth="2" />
      <ellipse cx="150" cy="236" rx="96" ry="18" fill="none" stroke="#8CFFB9" strokeOpacity="0.6" strokeDasharray="4 6" />
      <path d="M95 150 L165 175 V228 L95 203 Z" fill="url(#tFront)" stroke="#3BA7FF" strokeWidth="1.5" />
      <path d="M165 175 L215 150 V203 L165 228 Z" fill="url(#tSide)" stroke="#3BA7FF" strokeWidth="1.5" />
      <path d="M95 150 L145 125 L215 150 L165 175 Z" fill="#24597A" />
      <path d="M86 144 L171 175 V191 L86 160 Z" fill="#FF9F43" />
      <path d="M100 149 v16 M128 159 v16 M156 169 v16" stroke="#FFFFFF" strokeWidth="9" opacity="0.9" />
      <path d="M171 175 L222 149 V165 L171 191 Z" fill="#E07D22" />
      <path d="M105 176 L125 183 V216 L105 209 Z" fill="#06141E" stroke="#3BA7FF" />
      <path d="M134 186 L157 194 V210 L134 202 Z" fill="#2BEA7A" opacity="0.9" />
      <path d="M176 186 L206 171 V188 L176 203 Z" fill="#3BA7FF" opacity="0.55" />
      <path d="M26 236 C26 120 80 40 150 40 C220 40 274 120 274 236" fill="url(#tDome)" stroke="#2BEA7A" strokeWidth="2" strokeOpacity="0.8" />
      <path d="M58 170 C66 116 96 74 132 60" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="5" strokeLinecap="round" />
      <g transform="translate(150 98)">
        <path d="M-22 -26 L24 -18 V2 C24 17 12 26 0 32 C-12 26 -22 17 -22 2 Z" transform="translate(4 5)" fill="#04140B" opacity="0.7" />
        <path d="M0 -30 L24 -22 V0 C24 16 12 26 0 32 C-12 26 -24 16 -24 0 V-22 Z" fill="url(#tShield)" stroke="#E8FFF2" strokeWidth="2.5" />
        <path d="M0 -30 L-24 -22 V0 C-24 16 -12 26 0 32 Z" fill="#FFFFFF" opacity="0.18" />
        <path d="M-10 0 l7 7 13-14" fill="none" stroke="#04140B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(44 104)"><rect y="10" width="26" height="22" rx="5" fill="#0E2C46" stroke="#3BA7FF" strokeWidth="2" /><path d="M6 10 v-5 a7 7 0 0 1 14 0 v5" fill="none" stroke="#3BA7FF" strokeWidth="2.5" /><circle cx="13" cy="21" r="3" fill="#3BA7FF" /></g>
      <g transform="translate(228 100)"><path d="M6 24 a9 9 0 0 1 2-17 a11 11 0 0 1 21 3 a7 7 0 0 1 0 14 Z" fill="#2A1408" stroke="#FF6B3D" strokeWidth="2" /><path d="M18 12 v10 M14 18 l4 4 4-4" fill="none" stroke="#FF9C7A" strokeWidth="2" strokeLinecap="round" /></g>
      <g transform="translate(70 60)"><circle r="12" fill="#0B2A1E" stroke="#2BEA7A" strokeWidth="2" /><circle r="5" fill="none" stroke="#2BEA7A" strokeWidth="2" /><path d="M4 4 l5 5" stroke="#2BEA7A" strokeWidth="2" strokeLinecap="round" /></g>
    </svg>
  );
}

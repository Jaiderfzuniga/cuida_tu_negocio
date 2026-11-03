export function Marca({ sub = 'Digital' }: { sub?: string }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="32" viewBox="0 0 34 38" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 8px rgb(43 234 122 / var(--brillo)))' }}>
        <path d="M17 2 L31 7 V18 C31 27 25 33 17 36 C9 33 3 27 3 18 V7 Z" fill="#0B2A1E" stroke="var(--verde)" strokeWidth="2.4" />
        <path d="M11 18.5 l4.5 4.5 8-9" fill="none" stroke="var(--verde)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="leading-none">
        <div className="text-[15px] font-black tracking-wide">ESCUDO</div>
        <div className="text-xs font-semibold text-verde-texto">{sub}</div>
      </div>
    </div>
  );
}

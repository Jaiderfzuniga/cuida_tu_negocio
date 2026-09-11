import { useState, useEffect, useRef, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */
type Screen  = 'landing' | 'quiz' | 'results' | 'tools'
type PilarID = 'identificar' | 'proteger' | 'recuperar'
type Filter  = 'all' | PilarID

interface Option   { label: string; score: number }
interface Question { id: number; pilar: PilarID; text: string; hint?: string; options: Option[] }
interface Scores   { identificar: number; proteger: number; recuperar: number }
interface Tool {
  pilar: PilarID; name: string; desc: string; emoji: string;
  color: string; cost: 'free' | 'paid'; device: 'mobile' | 'pc' | 'both'; url?: string;
}

/* ═══════════════════════════════════════════════════════
   PILAR CONFIGURATION
═══════════════════════════════════════════════════════ */
const PILARS: Record<PilarID, { label: string; icon: string; code: string; color: string; bg: string; bd: string }> = {
  identificar: { label: 'Identificar', icon: '🔍', code: 'ID', color: '#10B981', bg: 'rgba(16,185,129,0.09)', bd: 'rgba(16,185,129,0.22)' },
  proteger:    { label: 'Proteger',    icon: '🛡️', code: 'PR', color: '#3B82F6', bg: 'rgba(59,130,246,0.09)',  bd: 'rgba(59,130,246,0.22)'  },
  recuperar:   { label: 'Recuperar',   icon: '🔄', code: 'RC', color: '#8B5CF6', bg: 'rgba(139,92,246,0.09)', bd: 'rgba(139,92,246,0.22)'  },
}

/* ═══════════════════════════════════════════════════════
   QUESTIONS  (7 preguntas, cobertura equilibrada)
═══════════════════════════════════════════════════════ */
const QUESTIONS: Question[] = [
  {
    id: 1, pilar: 'identificar',
    text: '¿Sabes exactamente qué dispositivos usa tu negocio a diario?',
    hint: 'Computadores, celulares, tablets, terminales de pago, cámaras…',
    options: [
      { label: 'Sí, tengo un listado actualizado', score: 3 },
      { label: 'Lo sé de memoria, sin documento formal', score: 1 },
      { label: 'No tengo claridad sobre eso', score: 0 },
    ],
  },
  {
    id: 2, pilar: 'identificar',
    text: '¿Conoces qué información de tus clientes almacenas y dónde está guardada?',
    hint: 'Nombres, teléfonos, datos de pago, historial de compras…',
    options: [
      { label: 'Sí, sé exactamente qué datos tengo y dónde están', score: 3 },
      { label: 'Tengo una idea general, sin precisión', score: 1 },
      { label: 'No, no lo he revisado', score: 0 },
    ],
  },
  {
    id: 3, pilar: 'proteger',
    text: '¿Usas contraseñas únicas y seguras para cada cuenta de tu negocio?',
    hint: 'Redes sociales, correo electrónico, banca en línea, plataformas de venta…',
    options: [
      { label: 'Sí, uso un gestor de contraseñas', score: 3 },
      { label: 'Uso contraseñas distintas, pero las memorizo yo', score: 1 },
      { label: 'Reúso la misma contraseña en varias cuentas', score: 0 },
    ],
  },
  {
    id: 4, pilar: 'proteger',
    text: '¿Tienes activa la verificación en dos pasos (2FA) en tus cuentas clave?',
    hint: 'Correo, WhatsApp Business, Instagram, banca digital…',
    options: [
      { label: 'Sí, en todas mis cuentas importantes', score: 3 },
      { label: 'Solo en algunas', score: 1 },
      { label: 'No la uso o no sé cómo activarla', score: 0 },
    ],
  },
  {
    id: 5, pilar: 'proteger',
    text: '¿Con qué frecuencia actualizas el software y las aplicaciones de tus dispositivos de trabajo?',
    options: [
      { label: 'Apenas aparece una actualización disponible', score: 3 },
      { label: 'Cuando me acuerdo, cada cierto tiempo', score: 1 },
      { label: 'Rara vez o nunca los actualizo', score: 0 },
    ],
  },
  {
    id: 6, pilar: 'recuperar',
    text: '¿Haces copias de seguridad de la información crítica de tu negocio?',
    hint: 'Listas de clientes, contabilidad, catálogo de productos, pedidos…',
    options: [
      { label: 'Sí, copias automáticas en la nube y también locales', score: 3 },
      { label: 'Hago copias, pero de forma manual y esporádica', score: 1 },
      { label: 'No tengo ninguna copia de seguridad', score: 0 },
    ],
  },
  {
    id: 7, pilar: 'recuperar',
    text: 'Si perdieras tu celular o computador hoy, ¿podrías recuperar los datos de tu negocio?',
    options: [
      { label: 'Sí, tengo todo respaldado y sé cómo restaurarlo', score: 3 },
      { label: 'Recuperaría algo, pero perdería información valiosa', score: 1 },
      { label: 'No, perdería casi todo', score: 0 },
    ],
  },
]

/* ═══════════════════════════════════════════════════════
   TOOLS CATALOG
═══════════════════════════════════════════════════════ */
const TOOLS: Tool[] = [
  { pilar: 'identificar', name: 'Have I Been Pwned', emoji: '🕵️', color: '#10B981', cost: 'free', device: 'both',
    desc: 'Verifica si tu correo o contraseñas han aparecido en filtraciones de datos conocidas.', url: 'https://haveibeenpwned.com' },
  { pilar: 'identificar', name: 'Google My Business', emoji: '🗺️', color: '#4285F4', cost: 'free', device: 'both',
    desc: 'Administra qué información de tu negocio está pública en Google y Maps.' },
  { pilar: 'identificar', name: 'Qualys SSL Labs', emoji: '🔒', color: '#10B981', cost: 'free', device: 'pc',
    desc: 'Analiza la seguridad de tu sitio web y detecta configuraciones vulnerables.' },
  { pilar: 'proteger', name: 'Bitwarden', emoji: '🔑', color: '#175DDC', cost: 'free', device: 'both',
    desc: 'Gestor de contraseñas de código abierto. Genera y almacena claves únicas y seguras.' },
  { pilar: 'proteger', name: 'Google Authenticator', emoji: '📲', color: '#4285F4', cost: 'free', device: 'mobile',
    desc: 'Genera códigos de verificación en dos pasos (2FA) para todas tus cuentas.' },
  { pilar: 'proteger', name: 'Malwarebytes', emoji: '🛡️', color: '#1D70B8', cost: 'paid', device: 'both',
    desc: 'Detecta y elimina malware, ransomware y amenazas en tu equipo o celular.' },
  { pilar: 'proteger', name: 'WhatsApp Business', emoji: '💬', color: '#25D366', cost: 'free', device: 'both',
    desc: 'Canal cifrado con clientes. Activa la verificación en dos pasos para proteger tu cuenta.' },
  { pilar: 'recuperar', name: 'Google Drive', emoji: '☁️', color: '#4285F4', cost: 'free', device: 'both',
    desc: 'Almacena y sincroniza automáticamente los archivos clave de tu negocio. 15 GB gratis.' },
  { pilar: 'recuperar', name: 'Google Fotos', emoji: '📷', color: '#EA4335', cost: 'free', device: 'mobile',
    desc: 'Respaldo automático de imágenes y documentos fotográficos de tu negocio.' },
  { pilar: 'recuperar', name: 'Backblaze', emoji: '💾', color: '#E13209', cost: 'paid', device: 'pc',
    desc: 'Copia de seguridad continua de todo tu equipo. Restaura desde cualquier punto en el tiempo.' },
]

/* ═══════════════════════════════════════════════════════
   SHIELD ISOTIPO
═══════════════════════════════════════════════════════ */
function ShieldIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size} height={size * 1.14} viewBox="0 0 28 32" fill="none"
      className="anim-shield" style={{ flexShrink: 0 }}
    >
      {/* Outer shell */}
      <path d="M14 1.5L2 7V17.5C2 24.8 7.4 31.2 14 30.5C20.6 31.2 26 24.8 26 17.5V7L14 1.5Z"
        stroke="var(--accent)" strokeWidth="1.4" fill="var(--accent-bg)" />
      {/* Inner frame */}
      <path d="M14 5.5L5.5 9.8V17.5C5.5 23 9.2 27.8 14 29.2C18.8 27.8 22.5 23 22.5 17.5V9.8L14 5.5Z"
        stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.45" fill="none" />
      {/* Grid lines */}
      <line x1="14" y1="5.5" x2="14" y2="29.2" stroke="var(--accent)" strokeWidth="0.35" strokeOpacity="0.3" />
      <line x1="5.5" y1="17.5" x2="22.5" y2="17.5" stroke="var(--accent)" strokeWidth="0.35" strokeOpacity="0.3" />
      {/* Check */}
      <path d="M9.5 17L12.8 20.5L18.5 13.5"
        stroke="var(--accent)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════ */
function Navbar({ dark, toggle, navigate }: { dark: boolean; toggle: () => void; navigate: (s: Screen) => void }) {
  return (
    <header
      className="navbar"
      style={{ background: dark ? 'rgba(10,10,10,0.80)' : 'rgba(255,255,255,0.86)' }}
    >
      {/* ── Brand ── */}
      <button
        onClick={() => navigate('landing')}
        style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        aria-label="Ir al inicio"
      >
        <ShieldIcon size={26} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontWeight: 800, fontSize: '0.92rem', letterSpacing: '-0.025em', color: 'var(--t1)', fontFamily: 'Inter, sans-serif' }}>
            ESCUDO.
          </span>
          {/* Ping indicator */}
          <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'var(--accent)', opacity: 0.7,
              animation: 'ping-dot 1.6s cubic-bezier(0,0,0.2,1) infinite',
            }} />
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'block',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
          </span>
        </div>
      </button>

      {/* ── Nav links ── */}
      <nav className="hide-sm" style={{ display: 'flex', gap: 28 }}>
        <button className="nav-link" onClick={() => {
          navigate('landing')
          setTimeout(() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' }), 80)
        }}>
          Cómo funciona
        </button>
        <button className="nav-link" onClick={() => navigate('tools')}>Herramientas</button>
      </nav>

      {/* ── Theme toggle ── */}
      <button
        className="theme-btn"
        onClick={toggle}
        aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}
      >
        {dark ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>
    </header>
  )
}

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      background: 'var(--surface)', borderTop: '1px solid var(--border)',
      padding: '22px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    }}>
      <ShieldIcon size={13} />
      <p className="mono" style={{ color: 'var(--t4)', fontSize: '0.6rem', lineHeight: 1.5 }}>
        Los datos ingresados se utilizan exclusivamente para fines de diagnóstico académico, garantizando total privacidad.
        &nbsp;© 2026 Escudo Digital — Cuida tu negocio.
      </p>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════
   RING CHART
═══════════════════════════════════════════════════════ */
function Ring({ pct, color, icon, label }: { pct: number; color: string; icon: string; label: string }) {
  const R = 40, C = 2 * Math.PI * R
  const [offset, setOffset] = useState(C)
  useEffect(() => { const t = setTimeout(() => setOffset(C - (pct / 100) * C), 150); return () => clearTimeout(t) }, [pct, C])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
      <div style={{ position: 'relative', width: 100, height: 100 }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r={R} fill="none" stroke="var(--border-2)" strokeWidth="5.5" />
          <circle
            cx="50" cy="50" r={R} fill="none"
            stroke={color} strokeWidth="5.5" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={offset}
            className="ring-track"
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>{icon}</span>
          <span style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.04em', color: 'var(--t1)', lineHeight: 1 }}>{pct}%</span>
        </div>
      </div>
      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--t2)' }}>{label}</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   ANIMATED BAR
═══════════════════════════════════════════════════════ */
function Bar({ pct, color }: { pct: number; color: string }) {
  const [w, setW] = useState(0)
  useEffect(() => { const t = setTimeout(() => setW(pct), 250); return () => clearTimeout(t) }, [pct])
  return (
    <div style={{ height: 6, borderRadius: 99, background: 'var(--border-2)', overflow: 'hidden' }}>
      <div className="bar-fill" style={{
        height: '100%', width: `${w}%`, borderRadius: 99,
        background: color, boxShadow: `0 0 8px ${color}70`,
      }} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   SCORE UTILITY
═══════════════════════════════════════════════════════ */
function computeScores(raw: Record<number, number>): Scores {
  const totals: Scores = { identificar: 0, proteger: 0, recuperar: 0 }
  const maxes:  Scores = { identificar: 0, proteger: 0, recuperar: 0 }
  QUESTIONS.forEach(q => {
    maxes[q.pilar]  += Math.max(...q.options.map(o => o.score))
    totals[q.pilar] += (raw[q.id] ?? 0)
  })
  return {
    identificar: Math.round((totals.identificar / maxes.identificar) * 100),
    proteger:    Math.round((totals.proteger    / maxes.proteger)    * 100),
    recuperar:   Math.round((totals.recuperar   / maxes.recuperar)   * 100),
  }
}

function riskLabel(n: number): { text: string; cls: string } {
  if (n >= 75) return { text: 'Buena protección', cls: 'green' }
  if (n >= 40) return { text: 'Protección básica', cls: 'amber' }
  return { text: 'Alto riesgo', cls: 'red' }
}

/* ═══════════════════════════════════════════════════════
   SCREEN 1 — LANDING
═══════════════════════════════════════════════════════ */
function Landing({
  name, setName, onStart,
}: { name: string; setName: (v: string) => void; onStart: () => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const go  = useCallback(() => { if (name.trim()) onStart(); else ref.current?.focus() }, [name, onStart])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '128px 24px 96px', flex: 1 }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
        {/* Radial glow */}
        <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(16,185,129,0.10) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
          {/* Eyebrow */}
          <div className="anim-fu" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 99, background: 'var(--accent-bg)', border: '1px solid var(--accent-bd)', marginBottom: 30 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span className="mono" style={{ color: 'var(--accent)' }}>Ciberseguridad para Pasto, Nariño</span>
          </div>

          {/* H1 */}
          <h1 className="anim-fu-1" style={{
            fontWeight: 900, fontSize: 'clamp(2.8rem, 7.5vw, 5.5rem)',
            lineHeight: 0.97, letterSpacing: '-0.045em',
            color: 'var(--t1)', margin: '0 0 24px',
          }}>
            Cuida lo que<br />
            <span style={{ color: 'var(--accent)', textShadow: '0 0 32px rgba(16,185,129,0.35)' }}>has construido.</span>
          </h1>

          {/* Subtext */}
          <p className="anim-fu-2" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--t2)', maxWidth: 540, margin: '0 auto 40px' }}>
            Evalúa el nivel de seguridad digital de tu microcomercio en menos de cinco minutos.
            Sin tecnicismos. Sin costo. Basado en el marco internacional&nbsp;
            <strong style={{ color: 'var(--t1)', fontWeight: 600 }}>NIST CSF</strong>.
          </p>

          {/* Input + CTA */}
          <div className="anim-fu-3" style={{ display: 'flex', gap: 10, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap' }}>
            <input
              ref={ref} type="text" className="input"
              placeholder="Nombre de tu negocio…"
              value={name} onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && go()}
              style={{ flex: 1, minWidth: 180 }}
              aria-label="Nombre de tu negocio"
            />
            <button className="btn btn-primary btn-shimmer" onClick={go}
              style={{ padding: '13px 26px', fontSize: '0.9rem' }}
              aria-label="Empezar diagnóstico"
            >
              Empezar →
            </button>
          </div>
          <p className="anim-fu-4 mono" style={{ color: 'var(--t4)', marginTop: 12 }}>
            Diagnóstico académico · Privacidad total garantizada
          </p>
        </div>
      </section>

      <div className="hr" />

      {/* ── CÓMO FUNCIONA ────────────────────────────────── */}
      <section id="como-funciona" style={{ background: 'var(--surface)', padding: '88px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'start' }}>
          {/* Left — text block */}
          <div>
            <span className="mono" style={{ color: 'var(--accent)' }}>Cómo funciona</span>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', letterSpacing: '-0.035em', color: 'var(--t1)', margin: '8px 0 16px', lineHeight: 1.1 }}>
              Un diagnóstico corto<br />y en palabras claras.
            </h2>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.7, color: 'var(--t2)', maxWidth: 420 }}>
              Escudo Digital se basa en una versión simplificada de un marco internacional de ciberseguridad, adaptada a la realidad de un microcomercio: solo tres áreas, sin tecnicismos y sin instalar nada.
            </p>
          </div>

          {/* Right — steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                n: '1',
                title: 'Escribes el nombre de tu negocio',
                body: 'Es el único dato que pedimos. No hay cuenta, ni contraseña, ni correo. Sirve para personalizar tu resultado.',
              },
              {
                n: '2',
                title: 'Respondes preguntas cortas',
                body: 'Un solo clic por pregunta y avanzas de inmediato. Si te equivocas, puedes volver a la anterior en cualquier momento.',
              },
              {
                n: '3',
                title: 'Recibes tu resultado y tus herramientas',
                body: 'Ves un porcentaje por cada área y una lista de herramientas gratuitas o de bajo costo para lo que más te hace falta.',
              },
            ].map((step, i, arr) => (
              <div key={step.n} style={{ display: 'flex', gap: 18 }}>
                {/* Timeline column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: 'var(--accent-bg)', border: '1px solid var(--accent-bd)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.78rem', color: 'var(--accent)' }}>
                      {step.n}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: 1, flex: 1, minHeight: 28, background: 'var(--border-2)', margin: '6px 0' }} />
                  )}
                </div>
                {/* Content */}
                <div style={{ paddingBottom: i < arr.length - 1 ? 28 : 0, paddingTop: 6 }}>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--t1)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                    {step.title}
                  </p>
                  <p style={{ fontSize: '0.84rem', lineHeight: 1.65, color: 'var(--t2)', margin: 0 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hr" />

      {/* ── NIST METHODOLOGY ─────────────────────────────── */}
      <section style={{ background: 'var(--surface)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ marginBottom: 48, maxWidth: 540 }}>
            <span className="mono" style={{ color: 'var(--accent)' }}>Marco NIST CSF</span>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', letterSpacing: '-0.035em', color: 'var(--t1)', margin: '8px 0 12px', lineHeight: 1.1 }}>
              Metodología internacional,<br />adaptada a tu realidad.
            </h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.93rem', lineHeight: 1.65 }}>
              El NIST Cybersecurity Framework es el estándar adoptado por gobiernos y empresas de más de 100 países para gestionar el riesgo digital de forma estructurada.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            {(['identificar', 'proteger', 'recuperar'] as PilarID[]).map(p => {
              const cfg = PILARS[p]
              return (
                <div key={p} className="card card-em card-lift scan-wrap noise" style={{ padding: '26px 24px', position: 'relative' }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: cfg.bg, border: `1px solid ${cfg.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                        {cfg.icon}
                      </div>
                      <div>
                        <span className="badge" style={{ background: cfg.bg, color: cfg.color }}>NIST · {cfg.code}</span>
                        <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--t1)', margin: '3px 0 0' }}>{cfg.label}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--t2)', margin: 0 }}>
                      {p === 'identificar' && 'Conoce qué activos y datos maneja tu negocio. Antes de proteger, hay que saber qué proteger.'}
                      {p === 'proteger'    && 'Implementa contraseñas seguras, actualizaciones y verificación en dos pasos para blindar tus cuentas y dispositivos.'}
                      {p === 'recuperar'  && 'Asegura copias de seguridad y un plan para que tu negocio continúe operando incluso después de un incidente.'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="hr" />

      {/* ── IMPACT METRICS ───────────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="mono" style={{ color: 'var(--accent)' }}>Por qué importa</span>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', letterSpacing: '-0.035em', color: 'var(--t1)', margin: '8px 0 0', lineHeight: 1.1 }}>
              Las pymes son el objetivo<br />más vulnerable.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(255px, 1fr))', gap: 16 }}>
            {[
              { kpi: '43%', text: 'de todos los ciberataques globales tienen como objetivo pequeñas y medianas empresas.', src: 'Verizon DBIR 2024' },
              { kpi: '60%', text: 'de los negocios afectados por un ciberataque cierra sus puertas en los seis meses siguientes.', src: 'NCSA Report 2023' },
              { kpi: '82%', text: 'de las brechas de datos se producen por contraseñas débiles, reutilizadas o robadas.', src: 'Google Security 2024' },
            ].map((m, i) => (
              <div key={i} className="card card-em noise" style={{ padding: '30px 26px', position: 'relative', borderTop: `2px solid var(--accent-bd)` }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: 'clamp(3.2rem, 6vw, 4rem)', lineHeight: 1, letterSpacing: '-0.06em', color: 'var(--accent)', marginBottom: 14, textShadow: '0 0 24px rgba(16,185,129,0.28)' }}>
                    {m.kpi}
                  </div>
                  <p style={{ fontSize: '0.86rem', lineHeight: 1.6, color: 'var(--t2)', margin: '0 0 16px' }}>{m.text}</p>
                  <span className="mono" style={{ color: 'var(--t4)' }}>— {m.src}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   SCREEN 2 — QUIZ
═══════════════════════════════════════════════════════ */
function Quiz({ onDone }: { onDone: (s: Scores) => void }) {
  const [idx,     setIdx]     = useState(0)
  const [chosen,  setChosen]  = useState<number | null>(null)
  const [raw,     setRaw]     = useState<Record<number, number>>({})
  const [locking, setLocking] = useState(false)

  const q    = QUESTIONS[idx]
  const cfg  = PILARS[q.pilar]
  const pct  = Math.round((idx / QUESTIONS.length) * 100)

  const select = useCallback((score: number, optIdx: number) => {
    if (locking || chosen !== null) return
    setChosen(optIdx)
    setLocking(true)
    const next = { ...raw, [q.id]: score }
    setRaw(next)
    setTimeout(() => {
      if (idx < QUESTIONS.length - 1) {
        setIdx(i => i + 1); setChosen(null); setLocking(false)
      } else {
        onDone(computeScores(next))
      }
    }, 380)
  }, [locking, chosen, raw, q.id, idx, onDone])

  const goBack = useCallback(() => {
    if (idx === 0 || locking) return
    const prev = idx - 1
    // Remove the previous question's answer so it's blank on re-entry
    const next = { ...raw }
    delete next[QUESTIONS[prev].id]
    setRaw(next)
    setIdx(prev)
    setChosen(null)
    setLocking(false)
  }, [idx, locking, raw])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Progress strip */}
      <div style={{ position: 'fixed', top: 60, left: 0, right: 0, height: 2, background: 'var(--border-2)', zIndex: 100 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)', transition: 'width 0.4s ease' }} />
      </div>

      {/* Centered container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '90px 24px 56px', minHeight: '75vh' }}>
        <div style={{ width: '100%', maxWidth: 560 }}>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <span className="badge" style={{ background: cfg.bg, color: cfg.color }}>
              {cfg.icon} {cfg.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {idx > 0 && (
                <button
                  onClick={goBack}
                  disabled={locking}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: 'none', border: 'none', cursor: locking ? 'default' : 'pointer',
                    fontSize: '0.78rem', fontWeight: 500, color: 'var(--t3)',
                    fontFamily: 'Inter, sans-serif', padding: '3px 0',
                    transition: 'color 0.15s',
                    opacity: locking ? 0.4 : 1,
                  }}
                  onMouseEnter={e => { if (!locking) (e.currentTarget as HTMLButtonElement).style.color = 'var(--t1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--t3)' }}
                  aria-label="Volver a la pregunta anterior"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2L4 6.5L8 11"/>
                  </svg>
                  Corregir respuesta anterior
                </button>
              )}
              <span className="mono" style={{ color: 'var(--t4)' }}>{idx + 1} / {QUESTIONS.length}</span>
            </div>
          </div>

          {/* Question */}
          <div key={idx} className="anim-fi">
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.2rem, 3.2vw, 1.65rem)', lineHeight: 1.22, letterSpacing: '-0.025em', color: 'var(--t1)', margin: '0 0 8px' }}>
              {q.text}
            </h2>
            {q.hint && (
              <p style={{ fontSize: '0.8rem', color: 'var(--t3)', margin: '0 0 26px', lineHeight: 1.5 }}>{q.hint}</p>
            )}
            {!q.hint && <div style={{ height: 24 }} />}

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  className={`opt ${chosen === i ? 'is-chosen' : ''} ${chosen !== null && chosen !== i ? 'is-dim' : ''}`}
                  onClick={() => select(opt.score, i)}
                >
                  {/* Radio circle */}
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                    border: `2px solid ${chosen === i ? cfg.color : 'var(--border-2)'}`,
                    background: chosen === i ? cfg.color : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.12s',
                  }}>
                    {chosen === i && (
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--t1)', lineHeight: 1.45 }}>{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Step dots */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 36 }}>
              {QUESTIONS.map((_, i) => (
                <div key={i} className="step-dot" style={{
                  height: 5,
                  width: i === idx ? 24 : 6,
                  background: i < idx ? 'var(--accent)' : i === idx ? 'var(--accent)' : 'var(--border-2)',
                  boxShadow: i === idx ? '0 0 8px var(--accent)' : 'none',
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   SCREEN 3 — RESULTS
═══════════════════════════════════════════════════════ */
function Results({
  scores, name, toTools, restart,
}: { scores: Scores; name: string; toTools: () => void; restart: () => void }) {
  const pilarList = (['identificar', 'proteger', 'recuperar'] as PilarID[])
  const overall   = Math.round((scores.identificar + scores.proteger + scores.recuperar) / 3)
  const minVal    = Math.min(scores.identificar, scores.proteger, scores.recuperar)
  const weakest   = pilarList.filter(p => scores[p] === minVal)
  const isTie     = weakest.length > 1
  const lvl       = riskLabel(overall)

  const riskStyle = (cls: string) => {
    if (cls === 'green') return { color: '#10B981', bg: 'rgba(16,185,129,0.1)', bd: 'rgba(16,185,129,0.22)' }
    if (cls === 'amber') return { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', bd: 'rgba(245,158,11,0.22)' }
    return { color: '#EF4444', bg: 'rgba(239,68,68,0.1)', bd: 'rgba(239,68,68,0.22)' }
  }
  const lvlStyle = riskStyle(lvl.cls)

  const toolsFor = (p: PilarID) => TOOLS.filter(t => t.pilar === p).slice(0, 3)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', padding: '90px 24px 64px', flex: 1 }}>

        {/* ── HEADER ─────────────────────────────────────── */}
        <div className="anim-fu" style={{ marginBottom: 32 }}>
          <span className="mono" style={{ color: 'var(--accent)' }}>Diagnóstico completado</span>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', letterSpacing: '-0.04em', color: 'var(--t1)', margin: '8px 0 6px', lineHeight: 1.05 }}>
            {name ? `Resultados para ${name}` : 'Tu diagnóstico NIST'}
          </h1>
          <p style={{ color: 'var(--t3)', fontSize: '0.84rem', fontFamily: 'JetBrains Mono, monospace' }}>
            {new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })} · NIST CSF — Identificar, Proteger, Recuperar
          </p>
        </div>

        {/* ── OVERVIEW CARD ──────────────────────────────── */}
        <div className="card anim-fu-1" style={{ padding: '28px 30px', marginBottom: 18, display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'center' }}>
          {/* Rings */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {pilarList.map(p => {
              const cfg = PILARS[p]
              return <Ring key={p} pct={scores[p]} color={cfg.color} icon={cfg.icon} label={cfg.label} />
            })}
          </div>
          {/* Global score */}
          <div style={{ flex: 1, minWidth: 160, borderLeft: '1px solid var(--border)', paddingLeft: 28 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
              <span style={{ fontWeight: 900, fontSize: '3.4rem', letterSpacing: '-0.06em', color: 'var(--t1)', lineHeight: 1 }}>
                {overall}%
              </span>
              <span className="badge" style={{ background: lvlStyle.bg, color: lvlStyle.color, border: `1px solid ${lvlStyle.bd}` }}>
                {lvl.text}
              </span>
            </div>
            <p style={{ color: 'var(--t3)', fontSize: '0.8rem', margin: '0 0 8px' }}>Puntaje global de protección</p>
            <p style={{ color: 'var(--t4)', fontSize: '0.77rem', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.5 }}>
              {overall < 40  ? 'Tu negocio requiere atención urgente en ciberseguridad.' :
               overall < 75  ? 'Tienes bases, pero hay áreas críticas por fortalecer.' :
               'Buen nivel de protección. Mantén y fortalece las buenas prácticas.'}
            </p>
          </div>
        </div>

        {/* ── BAR BREAKDOWN ──────────────────────────────── */}
        <div className="card anim-fu-2" style={{ padding: '24px 28px', marginBottom: 18 }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--t1)', margin: '0 0 22px', letterSpacing: '-0.01em' }}>
            Desglose por pilar NIST
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {pilarList.map(p => {
              const cfg    = PILARS[p]
              const isWeak = weakest.includes(p)
              return (
                <div key={p}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.95rem' }}>{cfg.icon}</span>
                      <span style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--t1)' }}>{cfg.label}</span>
                      {isWeak && (
                        <span className="badge" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.22)' }}>
                          ⚠ Mayor riesgo
                        </span>
                      )}
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: cfg.color }}>{scores[p]}%</span>
                  </div>
                  <Bar pct={scores[p]} color={cfg.color} />
                </div>
              )
            })}
          </div>
        </div>

        {/* ── TIE NOTICE ─────────────────────────────────── */}
        {isTie && (
          <div className="anim-fu-3" style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.22)', marginBottom: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1.5 }}>⚖️</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.84rem', color: '#F59E0B', margin: '0 0 3px' }}>
                Empate técnico — Plan prioritario combinado
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--t2)', margin: 0, lineHeight: 1.55 }}>
                Varios pilares presentan el mismo nivel de riesgo. A continuación encontrarás recomendaciones integradas para todos ellos, sin que ninguno bloquee la interfaz.
              </p>
            </div>
          </div>
        )}

        {/* ── RECOMMENDATIONS ────────────────────────────── */}
        {weakest.map(p => {
          const cfg = PILARS[p]
          return (
            <div key={p} className="card anim-fu-4" style={{ padding: '24px 26px', marginBottom: 16, borderColor: `${cfg.color}30` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <span style={{ fontSize: '1rem' }}>{cfg.icon}</span>
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--t1)' }}>
                  {isTie ? `Prioridad combinada: ${cfg.label}` : `Acción prioritaria: ${cfg.label}`}
                </span>
                <span className="badge" style={{ background: cfg.bg, color: cfg.color }}>Recomendado</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: 12 }}>
                {toolsFor(p).map((t, i) => (
                  <div key={i} style={{ padding: '14px 16px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{t.emoji}</div>
                    <p style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--t1)', margin: '0 0 4px' }}>{t.name}</p>
                    <p style={{ fontSize: '0.74rem', lineHeight: 1.5, color: 'var(--t2)', margin: '0 0 10px' }}>{t.desc}</p>
                    <span className="badge" style={{
                      background: t.cost === 'free' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                      color: t.cost === 'free' ? 'var(--accent)' : 'var(--amber)',
                    }}>
                      {t.cost === 'free' ? '✓ Gratuito' : '◎ Bajo costo'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* ── CTA ACTIONS ────────────────────────────────── */}
        <div className="anim-fu-5" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
          <button className="btn btn-primary btn-shimmer" onClick={toTools}
            style={{ padding: '13px 24px', fontSize: '0.88rem', flex: 1, minWidth: 220 }}>
            Ver catálogo completo de herramientas →
          </button>
          <button className="btn btn-ghost" onClick={restart}
            style={{ padding: '13px 20px', fontSize: '0.88rem' }}>
            Nuevo diagnóstico
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   SCREEN 4 — TOOLS CATALOG
═══════════════════════════════════════════════════════ */
function Tools() {
  const [filter, setFilter] = useState<Filter>('all')

  const pilarOrder: PilarID[] = ['identificar', 'proteger', 'recuperar']
  const visible = (p: PilarID) => filter === 'all' || filter === p
  const deviceStr = (d: string) => d === 'mobile' ? '📱 Móvil' : d === 'pc' ? '💻 PC' : '📱💻 Móvil & PC'

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', width: '100%', padding: '90px 24px 64px', flex: 1 }}>

        {/* ── HEADER ─────────────────────────────────────── */}
        <div className="anim-fu" style={{ marginBottom: 44 }}>
          <span className="mono" style={{ color: 'var(--accent)' }}>Soluciones Accesibles</span>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem, 5vw, 3.2rem)', letterSpacing: '-0.045em', color: 'var(--t1)', margin: '8px 0 12px', lineHeight: 1.02 }}>
            Herramientas de bajo costo<br />y gratuitas para tu negocio.
          </h1>
          <p style={{ color: 'var(--t2)', fontSize: '0.93rem', maxWidth: 520, lineHeight: 1.65 }}>
            Seleccionadas específicamente para microcomercios de Pasto. Sin instalaciones complejas, sin conocimientos técnicos avanzados.
          </p>
        </div>

        {/* ── FILTERS ────────────────────────────────────── */}
        <div className="anim-fu-1" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 44 }}>
          {[
            { v: 'all',         l: 'Todas' },
            { v: 'identificar', l: '🔍 Identificar' },
            { v: 'proteger',    l: '🛡️ Proteger' },
            { v: 'recuperar',   l: '🔄 Recuperar' },
          ].map(f => (
            <button key={f.v} className={`pill-filter ${filter === f.v ? 'is-active' : ''}`}
              onClick={() => setFilter(f.v as Filter)}>
              {f.l}
            </button>
          ))}
        </div>

        {/* ── PILAR SECTIONS ─────────────────────────────── */}
        {pilarOrder.filter(visible).map(p => {
          const cfg   = PILARS[p]
          const items = TOOLS.filter(t => t.pilar === p)
          return (
            <section key={p} style={{ marginBottom: 56 }}>
              {/* Section title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: cfg.bg, border: `1px solid ${cfg.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                  {cfg.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h2 style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: 'var(--t1)', margin: 0 }}>
                      {cfg.label}
                    </h2>
                    <span className="badge" style={{ background: cfg.bg, color: cfg.color }}>NIST · {cfg.code}</span>
                  </div>
                  <p style={{ fontSize: '0.77rem', color: 'var(--t3)', margin: '2px 0 0', fontFamily: 'JetBrains Mono, monospace' }}>
                    {p === 'identificar' && 'Conoce tu superficie digital y detecta vulnerabilidades.'}
                    {p === 'proteger'    && 'Blinda cuentas, dispositivos y comunicaciones.'}
                    {p === 'recuperar'  && 'Garantiza la continuidad ante cualquier incidente.'}
                  </p>
                </div>
              </div>

              {/* Cards grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))', gap: 14 }}>
                {items.map((t, i) => (
                  <div key={i} className="card card-em card-lift scan-wrap noise" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                      {/* Tool header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: `${t.color}15`, border: `1px solid ${t.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                          {t.emoji}
                        </div>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--t1)', margin: '0 0 3px' }}>{t.name}</p>
                          <span className="badge" style={{ background: cfg.bg, color: cfg.color }}>{cfg.code}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: '0.8rem', lineHeight: 1.58, color: 'var(--t2)', margin: 0, flex: 1 }}>
                        {t.desc}
                      </p>

                      {/* Badges */}
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <span className="badge" style={{
                          background: t.cost === 'free' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                          color: t.cost === 'free' ? 'var(--accent)' : '#F59E0B',
                        }}>
                          {t.cost === 'free' ? '✓ 100% Gratuito' : '◎ Plan de bajo costo'}
                        </span>
                        <span className="badge" style={{ background: 'var(--surface-3)', color: 'var(--t3)' }}>
                          {deviceStr(t.device)}
                        </span>
                      </div>

                      {/* Link */}
                      {t.url && (
                        <a href={t.url} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '0.77rem', fontWeight: 600, color: cfg.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                          Visitar sitio
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 8L8 2M8 2H4.5M8 2V5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════ */
export default function App() {
  const [dark,   setDark]   = useState(true)
  const [screen, setScreen] = useState<Screen>('landing')
  const [name,   setName]   = useState('')
  const [scores, setScores] = useState<Scores>({ identificar: 0, proteger: 0, recuperar: 0 })

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark)
  }, [dark])

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'var(--bg)', color: 'var(--t1)', minHeight: '100vh' }}>
      <Navbar dark={dark} toggle={() => setDark(d => !d)} navigate={setScreen} />

      {screen === 'landing' && (
        <Landing name={name} setName={setName} onStart={() => setScreen('quiz')} />
      )}
      {screen === 'quiz' && (
        <Quiz onDone={s => { setScores(s); setScreen('results') }} />
      )}
      {screen === 'results' && (
        <Results scores={scores} name={name} toTools={() => setScreen('tools')} restart={() => { setName(''); setScreen('landing') }} />
      )}
      {screen === 'tools' && <Tools />}
    </div>
  )
}

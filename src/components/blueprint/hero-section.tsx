"use client";

import { motion } from "framer-motion";

/* ── Hero SVG routing animation ─────────────────────────────
   All coordinates are in a 1360×700 viewBox.
   VISORA text is centered near (680, 330).
   ─────────────────────────────────────────────────────────── */

const ROUTES = [
  // A  right → up → right (exits far right)
  { id: "ra", d: "M 1052 322 L 1140 322 L 1140 238 L 1290 238", dur: 2.8 },
  // B  left → up → left (exits far left)
  { id: "rb", d: "M 308 322 L 220 322 L 220 238 L 70 238", dur: 3.5 },
  // C  top-center → up → right node
  { id: "rc", d: "M 680 295 L 680 175 L 850 175 L 850 110", dur: 2.4 },
  // D  top-center → up → left node  (shares vertical with C → junction)
  { id: "rd", d: "M 680 295 L 680 175 L 510 175 L 510 110", dur: 3.1 },
  // E  right → down (shares start with A → junction)
  { id: "re", d: "M 1052 322 L 1140 322 L 1140 415 L 1310 415", dur: 4.2 },
  // F  left → down → left (shares start with B → junction)
  { id: "rf", d: "M 308 322 L 220 322 L 220 408 L 50 408", dur: 3.8 },
];

const JUNCTIONS = [
  { x: 1140, y: 322 }, // A + E branch
  { x: 220,  y: 322 }, // B + F branch
  { x: 680,  y: 175 }, // C + D branch
];

// Small annotation node boxes rendered inside the SVG
const ANNOTATION_NODES = [
  { x: 852,  y:  88, w: 138, h: 40, label: "INPUT ROUTER",   sub: "token stream" },
  { x: 372,  y:  88, w: 138, h: 40, label: "MEMORY CORE",    sub: "episodic store" },
  { x: 1152, y: 216, w: 138, h: 40, label: "NEURAL ENGINE",  sub: "dispatch layer" },
];

const STATS = [
  { value: "57",  label: "system modules"     },
  { value: "9",   label: "orchestration layers" },
  { value: "75",  label: "routed edge flows"  },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background routing animation SVG ── */}
      <svg
        width="1360"
        height="700"
        viewBox="0 0 1360 700"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          overflow: "visible",
          maxWidth: "100%",
          opacity: 1,
        }}
        aria-hidden="true"
      >
        {/* Wire paths */}
        {ROUTES.map((r) => (
          <path
            key={`w-${r.id}`}
            d={r.d}
            stroke="rgba(70,132,205,0.32)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="square"
          />
        ))}

        {/* Animated pulse paths */}
        {ROUTES.map((r) => (
          <path
            key={`p-${r.id}`}
            d={r.d}
            stroke="rgba(120,190,255,0.80)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="3 28"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="31"
              to="0"
              dur={`${r.dur}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}

        {/* Junction dots */}
        {JUNCTIONS.map((j, i) => (
          <g key={`j-${i}`}>
            <circle
              cx={j.x} cy={j.y} r="4.5"
              fill="rgba(7,12,22,1)"
              stroke="rgba(100,175,255,0.70)"
              strokeWidth="1.5"
            />
            <circle cx={j.x} cy={j.y} r="2" fill="rgba(130,200,255,0.80)" />
          </g>
        ))}

        {/* Annotation node boxes */}
        {ANNOTATION_NODES.map((n) => (
          <g key={n.label}>
            <rect
              x={n.x} y={n.y} width={n.w} height={n.h}
              fill="rgba(9,15,26,0.90)"
              stroke="rgba(80,138,210,0.42)"
              strokeWidth="1"
              rx="2"
            />
            {/* port dots */}
            <circle cx={n.x + n.w / 2} cy={n.y} r="2.5" fill="rgba(70,135,215,0.52)" />
            <circle cx={n.x + n.w / 2} cy={n.y + n.h} r="2.5" fill="rgba(70,135,215,0.52)" />
            <text
              x={n.x + 10} y={n.y + 14}
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="7.5"
              letterSpacing="1.5"
              fill="rgba(90,155,228,0.85)"
            >
              ◆ {n.label}
            </text>
            <text
              x={n.x + 10} y={n.y + 28}
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="9"
              fill="rgba(105,158,210,0.75)"
            >
              {n.sub}
            </text>
          </g>
        ))}

        {/* Very faint vignette behind the title to help text legibility */}
        <defs>
          <radialGradient id="title-vignette" cx="50%" cy="48%" r="28%">
            <stop offset="0%" stopColor="rgba(6,10,15,0.55)" />
            <stop offset="100%" stopColor="rgba(6,10,15,0)" />
          </radialGradient>
        </defs>
        <ellipse cx="680" cy="335" rx="300" ry="130" fill="url(#title-vignette)" />
      </svg>

      {/* ── Text content (above SVG) ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 0.06, 0.25, 1] }}
          style={{
            fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
            fontSize: "14px",
            letterSpacing: "0.28em",
            color: "rgba(228, 246, 255, 0.95)",
            textTransform: "uppercase",
            marginBottom: "22px",
          }}
        >
          Welcome to
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.10, ease: [0.22, 0.06, 0.25, 1] }}
          style={{
            fontFamily: "'Space Grotesk', var(--font-sans), sans-serif",
            fontSize: "clamp(80px, 10.5vw, 132px)",
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 0.88,
            color: "rgba(228, 246, 255, 0.99)",
            marginBottom: "30px",
          }}
        >
          VISORA
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.60, delay: 0.22, ease: [0.22, 0.06, 0.25, 1] }}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "10.5px",
            letterSpacing: "0.07em",
            color: "rgba(110,165,225,0.82)",
            marginBottom: "44px",
            maxWidth: "440px",
          }}
        >
          AI orchestration infrastructure · semantic routing · visual synthesis
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.34 }}
          className="hero-stats-row"
          style={{ display: "flex", marginBottom: "90px" }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @media (max-width: 600px) {
              .hero-stats-row {
                flex-direction: column !important;
                margin-bottom: 48px !important;
                gap: 0 !important;
              }
              .hero-stats-row > div {
                border-left: 1px solid rgba(70,125,195,0.24) !important;
                border-top: none !important;
                border-bottom: 1px solid rgba(70,125,195,0.24) !important;
                padding: 12px 24px !important;
                width: 240px !important;
              }
            }
          `}} />
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "13px 30px",
                borderTop:    "1px solid rgba(70,125,195,0.24)",
                borderBottom: "1px solid rgba(70,125,195,0.24)",
                borderLeft:   i === 0 ? "1px solid rgba(70,125,195,0.24)" : "none",
                borderRight:  "1px solid rgba(70,125,195,0.24)",
                gap: "5px",
              }}
            >
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "24px",
                fontWeight: 600,
                color: "rgba(170,220,255,0.96)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}>
                {s.value}
              </span>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "8px",
                letterSpacing: "0.12em",
                color: "rgba(80,135,200,0.72)",
                textTransform: "uppercase",
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.50 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "12px",
            letterSpacing: "0.22em",
            color: "rgba(215, 235, 255, 0.90)",
            textTransform: "uppercase",
          }}>
            Check Out the Architecture
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path
                d="M1 1L7 8L13 1"
                stroke="rgba(140, 195, 255, 0.80)"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Fade to blueprint */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100px",
          background: "linear-gradient(to bottom, transparent, rgba(6,10,15,0.25))",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}

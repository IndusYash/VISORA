"use client";

import { CANVAS_W } from "@/data/architecture";
import { useState, useEffect } from "react";

// Interactive environment-variable style email link
function EmailLink({ label, email }: { label: string; email: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`mailto:${email}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
        fontSize: "12px",
        color: hovered ? "#ffffff" : "rgba(160, 205, 255, 0.85)",
        textDecoration: "none",
        transition: "color 0.15s ease",
      }}
    >
      <span style={{ color: "rgba(100, 160, 225, 0.50)", transition: "color 0.15s ease" }}>
        {label}
      </span>
      <span style={{ letterSpacing: "0.02em", fontWeight: 500 }}>
        {hovered ? `[ ${email} ]` : email}
      </span>
    </a>
  );
}

// Technical directory-style navigation link
function NavLink({ num, label, href }: { num: string; label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
        fontSize: "12.5px",
        letterSpacing: "0.08em",
        color: hovered ? "#ffffff" : "rgba(225, 240, 255, 0.88)",
        textDecoration: "none",
        transition: "color 0.15s ease, transform 0.15s ease",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
      }}
    >
      <span
        style={{
          color: hovered ? "rgba(91, 248, 255, 0.95)" : "rgba(100, 165, 240, 0.50)",
          fontSize: "10.5px",
          transition: "color 0.15s ease",
        }}
      >
        {num}
      </span>
      <span style={{ fontWeight: 500 }}>{label}</span>
    </a>
  );
}

export function Footer() {
  const [timeStr, setTimeStr] = useState("00:00:00 UTC");

  // Keep a live running UTC clock to represent continuous telemetry tracking
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const hrs = String(d.getUTCHours()).padStart(2, "0");
      const mins = String(d.getUTCMinutes()).padStart(2, "0");
      const secs = String(d.getUTCSeconds()).padStart(2, "0");
      setTimeStr(`${hrs}:${mins}:${secs} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const rulerWidth = CANVAS_W - 80; // 860 - 80 = 780px ruler space

  // Generate blueprint millimeter scale ticks
  const ticks = [];
  for (let i = 0; i <= rulerWidth; i += 10) {
    let h = 5;
    let color = "rgba(100, 165, 240, 0.35)"; // Brighter minor ticks
    let w = "1";
    if (i % 100 === 0) {
      h = 12;
      color = "rgba(110, 185, 255, 0.90)"; // High-contrast major ticks
      w = "1.5";
    } else if (i % 50 === 0) {
      h = 8;
      color = "rgba(100, 165, 240, 0.65)"; // Brighter medium ticks
      w = "1.2";
    }
    ticks.push(
      <line
        key={`tick-${i}`}
        x1={i}
        y1={12 - h / 2}
        x2={i}
        y2={12 + h / 2}
        stroke={color}
        strokeWidth={w}
      />
    );
  }

  // Generate millimeter scale coordinate labels
  const scaleLabels = [];
  for (let i = 0; i <= rulerWidth; i += 100) {
    scaleLabels.push(
      <text
        key={`lbl-${i}`}
        x={i}
        y={30}
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="8.5px" // Slightly larger for readability
        letterSpacing="0.06em"
        fill="rgba(140, 195, 255, 0.85)" // High-contrast, beautiful light blue
      >
        {String(i).padStart(3, "0")}
      </text>
    );
  }

  return (
    <footer
      id="contact-us"
      style={{
        width: "100%",
        borderTop: "1px solid rgba(80, 138, 205, 0.16)",
        background: "#030508", // Deep, solid separate matte background
        position: "relative",
        padding: "108px 0 64px",
        overflow: "hidden",
      }}
    >
      {/* Self-contained styling for responsive scaling, micro-animations, and blinking LEDs */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-led {
          0%, 100% { opacity: 0.35; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @media (max-width: 860px) {
          .manifesto-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .footer-columns-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .footer-col-divider {
            border-right: none !important;
            border-bottom: 1px solid rgba(80, 138, 205, 0.08) !important;
            padding-bottom: 32px !important;
            padding-right: 0 !important;
          }
        }
      `}} />

      {/* Background blueprint elements */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "visible",
        }}
        aria-hidden="true"
      >
        {/* Subtle schematic diagonal routing line */}
        <path
          d={`M ${CANVAS_W / 2} -40 L ${CANVAS_W / 2} 40 L 40 40`}
          stroke="rgba(80, 138, 205, 0.05)"
          strokeWidth="1"
          fill="none"
        />
        {/* Fine crosshair coordinate indicator */}
        <path
          d="M 28 28 M 24 28 L 32 28 M 28 24 L 28 32"
          stroke="rgba(80, 138, 205, 0.20)"
          strokeWidth="1"
        />
      </svg>

      <div
        style={{
          width: "100%",
          maxWidth: CANVAS_W,
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* ── 1. LARGE DOMINANT STATEMENT (Editorial Manifesto) ── */}
        <div
          className="manifesto-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.7fr 1fr",
            gap: "40px",
            alignItems: "flex-end",
            marginBottom: "72px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Asymmetrical bold manifesto statement */}
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', var(--font-sans), sans-serif",
                fontSize: "clamp(38px, 5.8vw, 72px)",
                fontWeight: 800,
                lineHeight: 0.82,
                letterSpacing: "-0.045em",
                color: "rgba(226, 241, 255, 0.98)",
                textTransform: "uppercase",
              }}
            >
              Orchestrating
              <br />
              Semantic Visual
              <br />
              Intelligence
            </h3>
          </div>

          {/* Technical document docket spec block */}
          <div
            style={{
              fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
              fontSize: "11px",
              lineHeight: "1.7",
              color: "rgba(160, 195, 235, 0.72)",
              borderLeft: "1px dashed rgba(80, 138, 205, 0.22)",
              paddingLeft: "24px",
            }}
          >
            <div style={{ color: "rgba(140, 200, 255, 0.90)", fontWeight: 600, marginBottom: "4px" }}>
              [ SPECIFICATION DOCKET ]
            </div>
            <div>DOCUMENT NO // VISORA-MS-08</div>
            <div>ROUTING BUS // VNGE-CORE-NET</div>
            <div>STATUS MODE // STEADY STATE</div>
            <div>RETRIEVAL // OK // 200</div>
          </div>
        </div>

        {/* ── 2. BLUEPRINT SCALE RULER (Millimeter Tick Separator) ── */}
        <div style={{ position: "relative", width: "100%", height: "36px", marginBottom: "48px" }}>
          <svg
            width="100%"
            height="36"
            style={{ overflow: "visible", width: "100%" }}
            aria-hidden="true"
          >
            {/* Base line */}
            <line
              x1="0"
              y1="12"
              x2={rulerWidth}
              y2="12"
              stroke="rgba(100, 165, 240, 0.42)" // Increased stroke color visibility
              strokeWidth="1.2"
            />
            {/* Render ticks */}
            {ticks}
            {/* Render coordinate labels */}
            {scaleLabels}

            {/* Slow animated semantic packet travelling along the ruler edge */}
            <circle
              cx="0"
              cy="12"
              r="3" // Increased size slightly
              fill="#5bf8ff" // High brightness cyan
              style={{ filter: "drop-shadow(0 0 3px rgba(91, 248, 255, 0.9))" }} // Added glow
            >
              <animate
                attributeName="cx"
                from="0"
                to={rulerWidth}
                dur="8s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* ── 3. ARCHIVAL THREE-COLUMN INFRASTRUCTURE GRID ── */}
        <div
          className="footer-columns-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.9fr 1.1fr",
            gap: "36px",
            alignItems: "flex-start",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Column 1: Archival Identity & Emails */}
          <div
            className="footer-col-divider"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              borderRight: "1px solid rgba(80, 138, 205, 0.08)",
              paddingRight: "28px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
                  fontSize: "10.5px",
                  letterSpacing: "0.15em",
                  color: "rgba(100, 165, 240, 0.60)",
                }}
              >
                {"// IDENT_BLOCK // ARCHIVE_01"}
              </span>
              <h4
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "18px",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  color: "rgba(245, 250, 255, 0.99)",
                  textTransform: "uppercase",
                }}
              >
                VISORA AI
              </h4>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
                  fontSize: "12px",
                  color: "rgba(160, 195, 235, 0.85)",
                  letterSpacing: "0.01em",
                }}
              >
                “From Ideas to Intelligent Visual Worlds”
              </span>
            </div>

            {/* Clickable Environment-Variable Email list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                marginTop: "4px",
              }}
            >
              <EmailLink label="ENV.MAIL_SYS" email="yashvardhanojha8217@gmail.com" />
              <EmailLink label="ENV.MAIL_OPS" email="divyanshrathorz@gmail.com" />
            </div>
          </div>

          {/* Column 2: Minimal Directory Links */}
          <div
            className="footer-col-divider"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              borderRight: "1px solid rgba(80, 138, 205, 0.08)",
              paddingRight: "28px",
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
                fontSize: "10.5px",
                letterSpacing: "0.15em",
                color: "rgba(100, 165, 240, 0.60)",
              }}
            >
              {"// SYSTEM_LINKS // DIR_02"}
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <NavLink num="01" label="ARCHITECTURE" href="#hero" />
              <NavLink num="02" label="ENGINE_VNGE" href="#what-is-vnge" />
              <NavLink num="03" label="ABOUT_US" href="#about-us" />
              <NavLink num="04" label="RESEARCH" href="#what-is-visora" />
            </div>
          </div>

          {/* Column 3: Live Telemetry & Engineering Metadata */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
                fontSize: "10.5px",
                letterSpacing: "0.15em",
                color: "rgba(100, 165, 240, 0.60)",
              }}
            >
              {"// HOST_DIAG // STACK_03"}
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "7px",
                fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
                fontSize: "11px",
                color: "rgba(175, 205, 235, 0.82)",
                lineHeight: "1.6",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>VNGE BUILD STATE // ACTIVE</span>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "#5bf8ff",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px rgba(91, 248, 255, 0.8)",
                    display: "inline-block",
                    animation: "pulse-led 2s infinite ease-in-out",
                  }}
                />
              </div>
              <div>SEMANTIC ROUTING // NOMINAL</div>
              <div>ORCHESTRATION STATUS // STABLE</div>
              <div>TELEMETRY CLOCK // <span style={{ color: "#ffffff", fontWeight: 600 }}>{timeStr}</span></div>
              <div style={{ color: "rgba(110, 195, 255, 0.90)", marginTop: "6px", fontSize: "11.5px", fontWeight: 600 }}>
                VISORA AI ENGINE v3.4.12
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


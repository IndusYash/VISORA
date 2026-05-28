"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CANVAS_W } from "@/data/architecture";

export function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -100px 0px" });

  const founders = [
    {
      name: "Yashvardhan Ojha",
      role: "CSE ’27",
      org: "MMMUT",
      photo: "https://res.cloudinary.com/doch9ibf6/image/upload/v1770057514/2A6A8115_pqnt3u.jpg",
      id: "yo",
      objectPosition: "center 20%"
    },
    {
      name: "Divyansh Singh Rathore",
      role: "ECE ’27",
      org: "MMMUT",
      photo: "https://res.cloudinary.com/doch9ibf6/image/upload/v1775834029/WhatsApp_Image_2026-04-09_at_3.21.28_AM_cy9mfd.jpg",
      id: "ds",
      objectPosition: "center top"
    }
  ];

  return (
    <section
      ref={containerRef}
      id="about-us"
      className="about-us-section"
      style={{
        width: "100%",
        maxWidth: CANVAS_W,
        margin: "0 auto",
        padding: "48px 60px 80px",
        borderTop: "1px solid rgba(70,118,185,0.15)",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 860px) {
          .about-us-section {
            padding: 32px 24px 48px !important;
          }
          .founders-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}} />

      {/* ── Technical Section separator tag ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <div style={{ width: "32px", height: "1px", background: "rgba(80,135,205,0.50)" }} />
        <span
          style={{
            fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
            fontSize: "8px",
            letterSpacing: "0.20em",
            color: "rgba(90,148,220,0.60)",
            textTransform: "uppercase",
          }}
        >
          11 // ADMINISTRATIVE // ABOUT_US
        </span>
        <div style={{ flex: 1, height: "1px", background: "rgba(68,115,180,0.12)" }} />
      </div>

      {/* ── Center Header Area ── */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        
        {/* Startup under construction label */}
        <p
          style={{
            fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
            fontSize: "9px",
            letterSpacing: "0.14em",
            color: "rgba(100, 160, 225, 0.70)",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          ◆ SaaS Startup — Under Construction
        </p>

        <h2
          style={{
            fontFamily: "'Space Grotesk', var(--font-sans), sans-serif",
            fontSize: "44px",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            color: "rgba(240, 250, 255, 0.99)",
            marginBottom: "24px",
          }}
        >
          About Us
        </h2>

        {/* Technical Description Blocks */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "16px",
            lineHeight: 1.68,
            color: "rgba(215, 235, 255, 0.95)",
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "16px" }}>
            Here at Visora, we are building an AI-native visual intelligence platform focused on transforming prompts,
            equations, and research contexts into semantic simulations, orchestration systems, and interactive visual
            understanding.
          </p>
          <p
            style={{
              color: "rgba(195, 220, 245, 0.88)",
              fontSize: "16px",
              lineHeight: 1.68,
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            At the core of Visora is VNGE (Visora Narrative Graph Engine™), our in-house semantic orchestration framework
            designed to convert human intent into structured visual intelligence pipelines.
          </p>
        </div>
      </div>

      {/* ── Meet the Founders Subsection ── */}
      <div style={{ marginTop: "64px" }}>
        
        {/* Subsection Separator */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
          <div style={{ width: "24px", height: "1px", background: "rgba(80,135,205,0.22)" }} />
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "22px",
              fontWeight: 600,
              color: "rgba(228, 246, 255, 0.95)",
              letterSpacing: "-0.02em",
            }}
          >
            Meet the Founders
          </h3>
          <div style={{ width: "24px", height: "1px", background: "rgba(80,135,205,0.22)" }} />
        </div>

        {/* Founders side-by-side grid */}
        <div
          className="founders-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            maxWidth: "820px",
            margin: "0 auto",
          }}
        >
          {founders.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* Technical framed desaturated portrait */}
              <div
                style={{
                  width: "240px",
                  height: "280px",
                  position: "relative",
                  border: "1px solid rgba(80, 138, 205, 0.32)",
                  background: "rgba(8, 14, 22, 0.40)",
                  padding: "12px",
                  borderRadius: "2px",
                  marginBottom: "20px",
                }}
              >
                {/* Blueprint framing corner notches */}
                <div style={{ position: "absolute", top: "4px", left: "4px", width: "6px", height: "6px", borderTop: "1px solid rgba(100,165,240,0.50)", borderLeft: "1px solid rgba(100,165,240,0.50)" }} />
                <div style={{ position: "absolute", top: "4px", right: "4px", width: "6px", height: "6px", borderTop: "1px solid rgba(100,165,240,0.50)", borderRight: "1px solid rgba(100,165,240,0.50)" }} />
                <div style={{ position: "absolute", bottom: "4px", left: "4px", width: "6px", height: "6px", borderBottom: "1px solid rgba(100,165,240,0.50)", borderLeft: "1px solid rgba(100,165,240,0.50)" }} />
                <div style={{ position: "absolute", bottom: "4px", right: "4px", width: "6px", height: "6px", borderBottom: "1px solid rgba(100,165,240,0.50)", borderRight: "1px solid rgba(100,165,240,0.50)" }} />

                {/* CAD style viewport center crosshair */}
                <div style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  right: "12px",
                  bottom: "12px",
                  border: "1px solid rgba(80,138,205,0.08)",
                  pointerEvents: "none"
                }} />

                {/* Desaturated Image */}
                <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: "1px", position: "relative" }}>
                  <img
                    src={f.photo}
                    alt={f.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: f.objectPosition || "center",
                      filter: "grayscale(100%) contrast(1.08) opacity(0.88)",
                      transition: "filter 0.25s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "grayscale(60%) contrast(1.04) opacity(0.96)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "grayscale(100%) contrast(1.08) opacity(0.88)";
                    }}
                  />
                </div>
              </div>

              {/* Founder Meta Text */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <h4
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "rgba(228, 246, 255, 0.98)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {f.name}
                </h4>
                
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "12.5px",
                    fontWeight: 500,
                    color: "rgba(180, 215, 255, 0.90)",
                  }}
                >
                  {f.role}
                </span>

                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    color: "rgba(100, 155, 215, 0.60)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {f.org}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

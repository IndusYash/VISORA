"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CANVAS_W } from "@/data/architecture";

const SPECS = [
  {
    id: "ORCH_DEPTH",
    label: "Orchestration Depth",
    value: "9 semantic layers",
  },
  {
    id: "SYS_MODULES",
    label: "System Modules",
    value: "57 active nodes",
  },
  {
    id: "EDGE_FLOWS",
    label: "Routed Connections",
    value: "75 edge flows",
  },
  {
    id: "AGENT_TYPES",
    label: "Agent Types",
    value: "Planner · Executor · Critic · Memory · Tool",
  },
  {
    id: "RENDER_OPS",
    label: "Render Outputs",
    value: "NeRF · Diffusion · Raster · Frame Cache",
  },
  {
    id: "COMPUTE_INFRA",
    label: "Compute Backend",
    value: "A100 × 128 · HBM3 8 TB · 400G InfiniBand",
  },
];

const PRINCIPLES = [
  "Not a model. Not a platform. A systems architecture.",
  "Every token processed is deterministic and traceable.",
  "Intelligence emerges from orchestration, not scale alone.",
];

export function WhatIsVisora() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <section
      ref={ref}
      id="what-is-visora"
      className="what-is-visora-section"
      style={{
        width: "100%",
        maxWidth: CANVAS_W,
        margin: "0 auto",
        padding: "48px 60px 50px",
        borderTop: "1px solid rgba(70,118,185,0.15)",
        boxSizing: "border-box",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 860px) {
          .what-is-visora-section {
            padding: 32px 24px 40px !important;
          }
          .what-is-visora-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}} />

      {/* Section tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "56px",
        }}
      >
        <div style={{ width: "32px", height: "1px", background: "rgba(80,135,205,0.50)" }} />
        <span style={{
          fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
          fontSize: "8px",
          letterSpacing: "0.20em",
          color: "rgba(90,148,220,0.70)",
          textTransform: "uppercase",
        }}>
          09 — System Overview
        </span>
        <div style={{ flex: 1, height: "1px", background: "rgba(68,115,180,0.12)" }} />
      </motion.div>

      {/* Two-column layout */}
      <div className="what-is-visora-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>

        {/* ── Left: manifesto text ── */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.10 }}
            style={{
              fontFamily: "'Space Grotesk', var(--font-sans), sans-serif",
              fontSize: "44px",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              color: "rgba(240, 250, 255, 0.99)",
              marginBottom: "28px",
            }}
          >
            What is<br />VISORA?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18 }}
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            <p style={{
              fontFamily: "'Space Grotesk', var(--font-sans), sans-serif",
              fontSize: "16px",
              lineHeight: 1.68,
              color: "rgba(215, 235, 255, 0.95)",
              letterSpacing: "0.005em",
            }}>
              VISORA is an AI orchestration infrastructure designed for semantic
              processing, multi-agent coordination, and high-fidelity visual
              synthesis. Built on the Visual Neural Graph Engine (VNGE), it operates
              as a continuous computational environment — not a model, not a
              platform, but a systems architecture.
            </p>

            <p style={{
              fontFamily: "'Space Grotesk', var(--font-sans), sans-serif",
              fontSize: "16px",
              lineHeight: 1.68,
              color: "rgba(195, 220, 245, 0.88)",
              letterSpacing: "0.005em",
            }}>
              Every interaction moves through nine deterministic orchestration
              layers — from raw natural language input through semantic
              decomposition, agent routing, physics simulation, and
              GPU-accelerated rendering — culminating in feedback loops that
              continuously refine the system.
            </p>

            <p style={{
              fontFamily: "'Space Grotesk', var(--font-sans), sans-serif",
              fontSize: "16px",
              lineHeight: 1.68,
              color: "rgba(180, 205, 235, 0.85)",
              letterSpacing: "0.005em",
            }}>
              Infrastructure-grade. Traceable. Observable.
            </p>
          </motion.div>

          {/* Principles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.30 }}
            style={{
              marginTop: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {PRINCIPLES.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  paddingLeft: "16px",
                  borderLeft: "1px solid rgba(70,125,195,0.30)",
                }}
              >
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "12.5px",
                  lineHeight: 1.6,
                  color: "rgba(195, 220, 255, 0.90)",
                  letterSpacing: "0.02em",
                }}>
                  {p}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: spec nodes ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.12 }}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "8px",
              letterSpacing: "0.18em",
              color: "rgba(80,138,210,0.60)",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            System Specifications
          </motion.p>

          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, x: 12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.18 + i * 0.06 }}
              className="bp-node bp-node--infra"
              style={{
                position: "static",
                width: "100%",
                padding: "14px 18px",
                gap: "6px",
              }}
            >
              <div className="bp-node-id">◆ {spec.id}</div>
              <div style={{
                fontFamily: "'Space Grotesk', var(--font-sans), sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "rgba(175,215,245,0.95)",
                lineHeight: 1.2,
              }}>
                {spec.value}
              </div>
              <div className="bp-node-sub">{spec.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CANVAS_W } from "@/data/architecture";

/* ============================================================
   VNGE SEMANTIC ORCHESTRATION TOPOLOGY — 860 × 560 px
   ============================================================ */

const VW = 860;
const VH = 560;

interface VNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  variant: "hub" | "input" | "compute" | "output" | "infra" | "feedback";
}

const VNGE_NODES: VNode[] = [
  // ── 1. INPUT SYSTEM (Compact / Sharp shape, 0px border-radius) ──
  {
    id: "vn-input",
    x: 330,
    y: 20,
    w: 200,
    h: 40,
    label: "INPUT_CONTEXT",
    sub: "Contextual Embedding",
    variant: "input",
  },

  // ── 2. SEMANTIC SYSTEMS (Clustered vertical spine) ──
  {
    id: "vn-parse",
    x: 330,
    y: 90,
    w: 200,
    h: 40,
    label: "SEMANTIC_PARSING",
    sub: "Semantic Dependency Mapping",
    variant: "compute",
  },
  {
    id: "vn-concept",
    x: 330,
    y: 160,
    w: 200,
    h: 40,
    label: "CONCEPT_GRAPH_ENGINE",
    sub: "Cognitive Routing",
    variant: "compute",
  },

  // ── 3. CENTRAL CONVERGENCE HUB (VNGE Core / Orchestration Kernel) ──
  {
    id: "vn-hub",
    x: 280,
    y: 235,
    w: 300,
    h: 65,
    label: "VNGE_CORE_ORCHESTRATOR",
    sub: "Orchestration Kernel & Dispatch",
    variant: "hub",
  },

  // ── 4. OUTPUT PIPELINES (Distributed branches) ──
  {
    id: "vn-sim",
    x: 20,
    y: 370,
    w: 180,
    h: 40,
    label: "SIMULATION_PIPELINE",
    sub: "Execution Dispatch // Kinematics",
    variant: "infra",
  },
  {
    id: "vn-viz",
    x: 230,
    y: 370,
    w: 180,
    h: 40,
    label: "VISUALIZATION_PIPELINE",
    sub: "Interactive Rendering // NeRF",
    variant: "output",
  },
  {
    id: "vn-narr",
    x: 440,
    y: 370,
    w: 180,
    h: 40,
    label: "NARRATIVE_PIPELINE",
    sub: "Narrative Structures // Synthesizer",
    variant: "compute",
  },
  {
    id: "vn-dash",
    x: 650,
    y: 370,
    w: 180,
    h: 40,
    label: "DASHBOARD_PIPELINE",
    sub: "State Logger // Diagnostics",
    variant: "output",
  },

  // ── 5. FINAL VISUAL INTELLIGENCE OUTPUT (Convergence boundary) ──
  {
    id: "vn-output",
    x: 330,
    y: 490,
    w: 200,
    h: 40,
    label: "VISUAL_INTELLIGENCE_OUTPUT",
    sub: "Structured Orchestrated Flow",
    variant: "feedback",
  },
];

/* ── Path Edges ── */
interface VEdge {
  id: string;
  d: string;
  dur: string;
}

const VNGE_EDGES: VEdge[] = [
  // Upper Spine
  { id: "ve-in",    d: "M 430 60 L 430 90",   dur: "2.0s" },
  { id: "ve-sem",   d: "M 430 130 L 430 160", dur: "1.8s" },
  { id: "ve-ont",   d: "M 430 200 L 430 235", dur: "1.8s" },

  // Outward dispatch branches (split at y = 335 from VNGE bottom center 430, 300)
  { id: "ve-core-sim",  d: "M 430 300 L 430 335 L 110 335 L 110 370", dur: "2.6s" },
  { id: "ve-core-viz",  d: "M 430 300 L 430 335 L 320 335 L 320 370", dur: "2.4s" },
  { id: "ve-core-narr", d: "M 430 300 L 430 335 L 530 335 L 530 370", dur: "2.4s" },
  { id: "ve-core-dash", d: "M 430 300 L 430 335 L 740 335 L 740 370", dur: "2.6s" },

  // Convergence routes (meet at horizontal bus split y = 455 to Output top 430, 490)
  { id: "ve-sim-out",  d: "M 110 410 L 110 455 L 430 455 L 430 490", dur: "2.6s" },
  { id: "ve-viz-out",  d: "M 320 410 L 320 455 L 430 455 L 430 490", dur: "2.4s" },
  { id: "ve-narr-out", d: "M 530 410 L 530 455 L 430 455 L 430 490", dur: "2.4s" },
  { id: "ve-dash-out", d: "M 740 410 L 740 455 L 430 455 L 430 490", dur: "2.6s" },
];

const VNGE_JUNCTIONS = [
  { x: 430, y: 335 }, // top fan-out bus split
  { x: 430, y: 455 }, // bottom convergence merge
];

const variantClass: Record<VNode["variant"], string> = {
  hub:      "bp-node bp-node--hub",
  input:    "bp-node bp-node--input",
  compute:  "bp-node bp-node--compute",
  output:   "bp-node bp-node--output",
  infra:    "bp-node bp-node--infra",
  feedback: "bp-node bp-node--feedback",
};

export function VngeDeep() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -100px 0px" });

  const nodeVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.50,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="what-is-vnge"
      className="vnge-deep-section"
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
          .vnge-deep-section {
            padding: 32px 24px 48px !important;
          }
        }
      `}} />
      {/* ── Center Header Area (Clean, technical copy) ── */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p
          style={{
            fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
            fontSize: "9px",
            letterSpacing: "0.14em",
            color: "rgba(100, 155, 215, 0.60)",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          ◆ ORCHESTRATION_FRAMEWORK // VNGE
        </p>

        <h2
          style={{
            fontFamily: "'Space Grotesk', var(--font-sans), sans-serif",
            fontSize: "44px",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            color: "rgba(240, 250, 255, 0.99)",
            marginBottom: "8px",
          }}
        >
          What is VNGE?
        </h2>

        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "13.5px",
            letterSpacing: "0.06em",
            color: "rgba(180, 215, 255, 0.95)",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: "24px",
          }}
        >
          Visora Narrative Graph Engine™
        </p>

        {/* Concise and deeply research-oriented explanation block */}
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
            VNGE is the multimodal semantic orchestration framework powering Visora AI. It transforms natural language
            prompts, equations, and research contexts into dynamically expandable narrative graphs, semantic dependency
            lattices, and execution-aware orchestration pathways that route across simulation, visualization, narrative,
            and interactive rendering systems.
          </p>
          <p style={{ color: "rgba(195, 220, 245, 0.88)", fontSize: "16px", marginBottom: "24px" }}>
            Rather than generating outputs directly from raw prompts, VNGE performs semantic decomposition, ontological
            expansion, contextual relationship mapping, temporal execution routing, and multi-agent dispatch synchronization.
          </p>
          <blockquote
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "13px",
              color: "rgba(228, 246, 255, 0.98)",
              borderLeft: "2px solid rgba(80, 138, 205, 0.40)",
              padding: "10px 24px",
              background: "rgba(8, 16, 28, 0.45)",
              display: "inline-block",
              textAlign: "left",
              margin: "0 auto",
              maxWidth: "680px",
              borderRadius: "2px",
              lineHeight: 1.5,
            }}
          >
            In essence, VNGE functions as the cognitive orchestration layer that compiles human intent into structured visual
            intelligence and simulation-aware computational pipelines.
          </blockquote>
        </div>
      </div>

      {/* ── High-fidelity centered blueprint canvas ── */}
      <div className="bp-canvas-outer" style={{ width: "100%", overflowX: "auto", paddingBottom: "12px" }}>
        <div
          style={{
            position: "relative",
            width: VW,
            height: VH,
            border: "1px solid rgba(68,118,180,0.14)",
            borderRadius: "3px",
            background: "rgba(8, 14, 22, 0.40)",
            overflow: "hidden",
            margin: "0 auto",
          }}
          aria-label="VNGE semantic routing diagram"
        >
        {/* Subtle grid pattern background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(100, 148, 205, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100, 148, 205, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            pointerEvents: "none",
          }}
        />

        {/* SVG Elements for Wires & Semantic packets */}
        <svg
          width={VW}
          height={VH}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}
          aria-hidden="true"
        >
          {/* 1. Underlying system wire paths */}
          {VNGE_EDGES.map((e) => (
            <path
              key={`vw-${e.id}`}
              d={e.d}
              stroke="rgba(75, 145, 218, 0.40)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="square"
            />
          ))}

          {/* 2. Slow continuous crawling semantic flow packets */}
          {VNGE_EDGES.map((e) => (
            <circle key={`vp-${e.id}`} r="2" fill="rgba(115, 195, 255, 0.90)">
              <animateMotion path={e.d} dur={e.dur} repeatCount="indefinite" />
            </circle>
          ))}

          {/* 3. Junction Dots */}
          {VNGE_JUNCTIONS.map((j, i) => (
            <g key={`vj-${i}`}>
              <circle cx={j.x} cy={j.y} r="4" fill="rgba(7, 12, 22, 1)" stroke="rgba(100, 175, 255, 0.65)" strokeWidth="1.5" />
              <circle cx={j.x} cy={j.y} r="2" fill="rgba(120, 195, 255, 0.85)" />
            </g>
          ))}
        </svg>

        {/* 4. Differentiated Node Elements (Staggered load-in on-view) */}
        {VNGE_NODES.map((node, i) => {
          let customStyle: React.CSSProperties = {
            position: "absolute",
            left: node.x,
            top: node.y,
            width: node.w,
            minHeight: node.h,
          };

          // Visually differentiate nodes by spacing, shape, routing style, hierarchy
          if (node.variant === "input") {
            // Input node (Sharp/Compact, 0px border-radius)
            customStyle = {
              ...customStyle,
              borderRadius: "0px",
              border: "1px solid rgba(80, 138, 205, 0.60)",
              background: "rgba(8, 14, 22, 0.96)",
            };
          } else if (node.variant === "hub") {
            // VNGE Hub convergence Core (Large spatial dominance)
            customStyle = {
              ...customStyle,
              border: "2px solid rgba(100, 185, 255, 0.60)",
              background: "rgba(5, 9, 16, 0.99)",
              borderRadius: "3px",
              clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)",
            };
          } else if (node.variant === "feedback") {
            // Convergence boundary output node
            customStyle = {
              ...customStyle,
              border: "1px solid rgba(100, 165, 240, 0.50)",
              background: "rgba(8, 15, 26, 0.96)",
              borderRadius: "2px",
            };
          } else {
            // standard modular compute/output branches
            customStyle = {
              ...customStyle,
              border: "1px solid rgba(80, 138, 205, 0.45)",
              background: "rgba(8, 13, 22, 0.98)",
              clipPath: "polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 0 100%)",
            };
          }

          return (
            <motion.div
              key={node.id}
              id={node.id}
              className={variantClass[node.variant]}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={nodeVariants}
              style={customStyle}
            >
              {/* Notched port dots on standard nodes */}
              <div className="bp-port bp-port--top" aria-hidden="true" />
              <div className="bp-port bp-port--bottom" aria-hidden="true" />
              <div className="bp-port bp-port--left" aria-hidden="true" />
              <div className="bp-port bp-port--right" aria-hidden="true" />

              {/* Node ID indicator */}
              <div className="bp-node-id" aria-hidden="true">
                ◆ {node.id.replace("vn-", "").toUpperCase()}
              </div>

              {/* Node Label */}
              <div
                className="bp-node-label"
                style={{ fontSize: node.variant === "hub" ? "13.5px" : "12px" }}
              >
                {node.label}
              </div>

              {/* Node subtext details */}
              {node.sub && <div className="bp-node-sub">{node.sub}</div>}
            </motion.div>
          );
        })}
      </div>
      </div>

      {/* Systems diagram label */}
      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "8px",
          letterSpacing: "0.14em",
          color: "rgba(72,122,185,0.48)",
          textTransform: "uppercase",
          textAlign: "right",
          marginTop: "28px",
          width: VW,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        VNGE Semantic Orchestration Topology · v3.4 // static route packet trace
      </p>
    </section>
  );
}

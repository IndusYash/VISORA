"use client";

import { useEffect, useState } from "react";
import { NavBar }         from "./nav-bar";
import { HeroSection }    from "./hero-section";
import { SystemNode }     from "./system-node";
import { WhatIsVisora }   from "./what-is-visora";
import { VngeDeep }       from "./vnge-deep";
import { AboutUs }         from "./about-us";
import { Footer }          from "./footer";
import {
  nodes,
  edgeDefs,
  computeEdgePath,
  CANVAS_W,
  CANVAS_H,
  LAYER_LABELS,
  LAYER_NAMES,
  JUNCTIONS,
} from "@/data/architecture";
import type { NodeDef, Port } from "@/data/architecture";

/* ── Pre-compute edge paths at module scope ── */
const nodeMap = new Map<string, NodeDef>(nodes.map((n) => [n.id, n]));

interface ResolvedEdge { id: string; d: string; dur: number; }

const resolvedEdges: ResolvedEdge[] = edgeDefs
  .map(([fromId, fromPort, toId, toPort, dur], i) => {
    const fromNode = nodeMap.get(fromId);
    const toNode   = nodeMap.get(toId);
    if (!fromNode || !toNode) return null;
    const d = computeEdgePath(fromNode, fromPort as Port, toNode, toPort as Port);
    return { id: `e${i}`, d, dur } satisfies ResolvedEdge;
  })
  .filter((e): e is ResolvedEdge => e !== null);

/* ── Base layer thresholds (relative to blueprint canvas top) ── */
const BASE_THRESHOLDS = [0, 260, 502, 730, 1012, 1258, 1478, 1704, 1926];

export function BlueprintCanvas() {
  const [activeLayer,    setActiveLayer]    = useState(0);
  const [progress,       setProgress]       = useState(0);
  const [showIndicator,  setShowIndicator]  = useState(false);
  const [showMobileAlert, setShowMobileAlert] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 860) {
      const showTimer = setTimeout(() => {
        setShowMobileAlert(true);
      }, 50);
      const hideTimer = setTimeout(() => {
        setShowMobileAlert(false);
      }, 5050);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY   = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      setProgress(maxScroll > 0 ? scrollY / maxScroll : 0);

      // Hero is exactly 100vh; blueprint canvas starts after that
      const heroH      = window.innerHeight;
      const canvasTop  = heroH + 24; // +24px top breathing room

      // Only show layer indicator once past halfway through hero
      setShowIndicator(scrollY > heroH * 0.5);

      // Compute absolute thresholds
      const thresholds = BASE_THRESHOLDS.map((t) => t + canvasTop);

      let layer = 0;
      for (let i = thresholds.length - 1; i >= 0; i--) {
        if (scrollY >= thresholds[i]) { layer = i; break; }
      }
      setActiveLayer(layer);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <NavBar />

      <main style={{ paddingTop: "48px" }}>

        {/* ── 1. Hero intro ── */}
        <HeroSection />

        {/* ── 2. Blueprint canvas (unchanged) ── */}
        <div className="bp-canvas-outer">
          <div style={{ position: "relative", width: CANVAS_W, margin: "0 auto" }}>

            {/* Top breathing room */}
            <div style={{ height: 24 }} />

            {/* Canvas area */}
            <div style={{ position: "relative", width: CANVAS_W, height: CANVAS_H }}>

              {/* SVG: layer lines + edges + junctions */}
              <svg
                width={CANVAS_W}
                height={CANVAS_H}
                style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}
                aria-hidden="true"
              >
                {/* Layer separator lines + labels */}
                {LAYER_LABELS.map((ll, i) => (
                  <g key={i}>
                    <line
                      x1={0} y1={ll.y} x2={CANVAS_W} y2={ll.y}
                      stroke="rgba(80,135,210,0.20)" strokeWidth="1"
                    />
                    <text
                      x={CANVAS_W - 6} y={ll.y - 7}
                      textAnchor="end"
                      fontFamily="var(--font-mono),'JetBrains Mono',monospace"
                      fontSize="7.5" letterSpacing="2.2"
                      fill="rgba(100,165,240,0.72)"
                    >
                      {ll.label}
                    </text>
                  </g>
                ))}

                {/* Wire paths */}
                {resolvedEdges.map((ep) => (
                  <path
                    key={`wire-${ep.id}`}
                    d={ep.d}
                    stroke="rgba(75,145,218,0.40)"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="square"
                  />
                ))}

                {/* Animated pulse paths */}
                {resolvedEdges.map((ep) => (
                  <path
                    key={`pulse-${ep.id}`}
                    d={ep.d}
                    stroke="rgba(115,195,255,0.92)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="3 21"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="24" to="0"
                      dur={`${ep.dur}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                ))}

                {/* Junction dots */}
                {JUNCTIONS.map((j, i) => (
                  <g key={i}>
                    <circle cx={j.x} cy={j.y} r="4"   fill="rgba(8,14,24,0.99)" stroke="rgba(100,175,255,0.72)" strokeWidth="1.5" />
                    <circle cx={j.x} cy={j.y} r="2"   fill="rgba(110,185,255,0.80)" />
                  </g>
                ))}

                {/* VNGE horizontal bus accent */}
                <line
                  x1={168} y1={814} x2={1148} y2={814}
                  stroke="rgba(80,148,225,0.18)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />
              </svg>

              {/* Node divs */}
              {nodes.map((node, i) => (
                <SystemNode key={node.id} node={node} delay={(i % 9) * 0.045} />
              ))}
            </div>

            {/* Bottom breathing room */}
            <div style={{ height: 40 }} />
          </div>
        </div>

        {/* ── 3. What is VISORA? ── */}
        <WhatIsVisora />

        {/* ── 4. What is VNGE? ── */}
        <VngeDeep />

        {/* ── 5. About Us ── */}
        <AboutUs />

        {/* ── Footer ── */}
        <Footer />
      </main>

      {/* ── Layer indicator (visible only in blueprint area) ── */}
      {showIndicator && (
        <div className="bp-layer-indicator" aria-live="polite" aria-atomic="true">
          <div className="bp-layer-num">
            LAYER&nbsp;{String(activeLayer).padStart(2, "0")} / 08
          </div>
          <div className="bp-layer-name">{LAYER_NAMES[activeLayer]}</div>
        </div>
      )}

      {/* ── Scroll progress rail ── */}
      <div className="bp-progress-rail" aria-hidden="true">
        <div
          className="bp-progress-fill"
          style={{ height: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {showMobileAlert && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 48px)",
            maxWidth: "380px",
            background: "rgba(6, 10, 15, 0.96)",
            border: "1px solid rgba(100, 175, 255, 0.6)",
            borderRadius: "2px",
            padding: "16px",
            zIndex: 1000,
            boxShadow: "0 8px 32px rgba(3, 5, 8, 0.8)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            fontFamily: "'IBM Plex Mono', var(--font-mono), monospace",
            animation: "fade-in-up 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes fade-in-up {
              from { opacity: 0; transform: translate(-50%, 16px); }
              to { opacity: 1; transform: translate(-50%, 0); }
            }
            @keyframes shrink-bar {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}} />

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", fontWeight: 700, color: "#5bf8ff", letterSpacing: "0.1em" }}>
              <span>◆ SYSTEM NOTIFICATION</span>
            </div>
            <p style={{ fontSize: "11px", lineHeight: "1.5", color: "rgba(220, 240, 255, 0.9)", letterSpacing: "0.01em" }}>
              Please consider switching to laptop or try turning on the desktop view
            </p>
            {/* Progression shrink bar */}
            <div style={{ width: "100%", height: "2px", background: "rgba(100, 175, 255, 0.15)", marginTop: "4px", position: "relative" }}>
              <div
                style={{
                  height: "100%",
                  background: "rgba(91, 248, 255, 0.8)",
                  animation: "shrink-bar 5s linear forwards",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

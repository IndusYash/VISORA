"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { NodeDef } from "@/data/architecture";

interface SystemNodeProps {
  node: NodeDef;
  delay?: number;
}

export function SystemNode({ node, delay = 0 }: SystemNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <motion.div
      ref={ref}
      id={`node-${node.id}`}
      className={`bp-node bp-node--${node.variant}`}
      style={{
        left: node.x,
        top: node.y,
        width: node.w,
        minHeight: node.h,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{
        duration: 0.40,
        delay,
        ease: [0.22, 0.06, 0.25, 1.0],
      }}
      aria-label={`${node.label}${node.sub ? ": " + node.sub : ""}`}
    >
      {/* Connection port indicators */}
      <div className="bp-port bp-port--top"    aria-hidden="true" />
      <div className="bp-port bp-port--bottom" aria-hidden="true" />
      <div className="bp-port bp-port--left"   aria-hidden="true" />
      <div className="bp-port bp-port--right"  aria-hidden="true" />

      {/* Content */}
      <div className="bp-node-id" aria-hidden="true">◆ {node.id}</div>
      <div className="bp-node-label">{node.label}</div>
      {node.sub && (
        <div className="bp-node-sub" aria-hidden="true">{node.sub}</div>
      )}
    </motion.div>
  );
}

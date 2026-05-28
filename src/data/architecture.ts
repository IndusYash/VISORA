import type { Port } from "./types";

export type { Port };
export type NodeVariant = "default" | "hub" | "input" | "compute" | "output" | "infra" | "feedback";

export interface NodeDef {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  variant: NodeVariant;
  layer: number;
}

export const CANVAS_W = 1360;
export const CANVAS_H = 2080;

/* ============================================================
   PORT GEOMETRY HELPERS
   ============================================================ */

export function getPortPoint(
  node: NodeDef,
  port: Port
): { x: number; y: number } {
  switch (port) {
    case "top":    return { x: node.x + node.w / 2,        y: node.y };
    case "bottom": return { x: node.x + node.w / 2,        y: node.y + node.h };
    case "left":   return { x: node.x,                     y: node.y + node.h / 2 };
    case "right":  return { x: node.x + node.w,            y: node.y + node.h / 2 };
  }
}

export function computeEdgePath(
  fromNode: NodeDef, fromPort: Port,
  toNode: NodeDef,   toPort: Port
): string {
  const f = getPortPoint(fromNode, fromPort);
  const t = getPortPoint(toNode, toPort);

  /* Straight vertical */
  if (fromPort === "bottom" && toPort === "top") {
    if (Math.abs(f.x - t.x) < 1) {
      return `M ${f.x} ${f.y} L ${t.x} ${t.y}`;
    }
    const midY = Math.round((f.y + t.y) / 2);
    return `M ${f.x} ${f.y} L ${f.x} ${midY} L ${t.x} ${midY} L ${t.x} ${t.y}`;
  }

  /* Horizontal right→left */
  if (fromPort === "right" && toPort === "left") {
    if (Math.abs(f.y - t.y) < 1) {
      return `M ${f.x} ${f.y} L ${t.x} ${t.y}`;
    }
    const midX = Math.round((f.x + t.x) / 2);
    return `M ${f.x} ${f.y} L ${midX} ${f.y} L ${midX} ${t.y} L ${t.x} ${t.y}`;
  }

  /* Horizontal left→right */
  if (fromPort === "left" && toPort === "right") {
    const midX = Math.round((f.x + t.x) / 2);
    return `M ${f.x} ${f.y} L ${midX} ${f.y} L ${midX} ${t.y} L ${t.x} ${t.y}`;
  }

  /* Generic orthogonal fallback */
  const midY = Math.round((f.y + t.y) / 2);
  return `M ${f.x} ${f.y} L ${f.x} ${midY} L ${t.x} ${midY} L ${t.x} ${t.y}`;
}

/* ============================================================
   LAYER METADATA
   ============================================================ */

export const LAYER_LABELS: Array<{ y: number; label: string }> = [
  { y:   36, label: "00 — SIGNAL ORIGIN" },
  { y:  206, label: "01 — INPUT PROCESSING" },
  { y:  432, label: "02 — SEMANTIC PARSING" },
  { y:  666, label: "03 — VNGE ORCHESTRATION" },
  { y:  942, label: "04 — AGENT ROUTING" },
  { y: 1170, label: "05 — SIMULATION SYSTEMS" },
  { y: 1394, label: "06 — RENDER PIPELINE" },
  { y: 1620, label: "07 — INFRASTRUCTURE" },
  { y: 1848, label: "08 — FEEDBACK LOOPS" },
];

export const LAYER_NAMES = [
  "Signal Origin",
  "Input Processing",
  "Semantic Parsing",
  "VNGE Orchestration",
  "Agent Routing",
  "Simulation Systems",
  "Render Pipeline",
  "Infrastructure",
  "Feedback Loops",
];

/** Junction dots — where multiple paths converge or branch */
export const JUNCTIONS: Array<{ x: number; y: number }> = [
  { x: 680, y: 814 },   // VNGE fan-out horizontal bus
  { x: 560, y: 1501 },  // render-ctrl convergence
  { x: 868, y: 1501 },  // disp-out convergence
  { x: 420, y: 1842 },  // load-bal fan-out
  { x: 740, y: 1842 },  // infra-orch fan-out
];

/* ============================================================
   NODES
   ============================================================ */

export const nodes: NodeDef[] = [

  // ── LAYER 0 — Signal Origin ──────────────────────────────
  { id: "visora",       x: 568, y:   60, w: 224, h: 84, label: "VISORA",         sub: "v2.4.1 — orchestration core",  variant: "hub",     layer: 0 },

  // ── LAYER 1 — Input Processing ───────────────────────────
  { id: "user-query",   x: 196, y:  230, w: 168, h: 56, label: "User Query",     sub: "natural language input",       variant: "input",   layer: 1 },
  { id: "sys-context",  x: 596, y:  230, w: 168, h: 56, label: "Sys Context",    sub: "session + env state",          variant: "input",   layer: 1 },
  { id: "api-gateway",  x: 996, y:  230, w: 168, h: 56, label: "API Gateway",    sub: "REST / WS / gRPC",             variant: "input",   layer: 1 },
  { id: "ctx-window",   x: 392, y:  336, w: 168, h: 56, label: "Context Window", sub: "128k tokens",                  variant: "compute", layer: 1 },
  { id: "token-stream", x: 800, y:  336, w: 168, h: 56, label: "Token Stream",   sub: "BPE encoding",                 variant: "compute", layer: 1 },

  // ── LAYER 2 — Semantic Parsing ───────────────────────────
  { id: "intent-cls",   x:  56, y:  458, w: 168, h: 56, label: "Intent Classify",sub: "confidence: 0.97",            variant: "compute", layer: 2 },
  { id: "nlp-parse",    x: 252, y:  458, w: 168, h: 56, label: "NLP Parser",     sub: "dependency tree",             variant: "compute", layer: 2 },
  { id: "entity-ext",   x: 448, y:  458, w: 168, h: 56, label: "Entity Extract", sub: "NER + coreref",               variant: "compute", layer: 2 },
  { id: "relation-map", x: 644, y:  458, w: 168, h: 56, label: "Relation Map",   sub: "knowledge graph",             variant: "compute", layer: 2 },
  { id: "ambig-res",    x: 840, y:  458, w: 168, h: 56, label: "Ambiguity Res",  sub: "context-aware",               variant: "compute", layer: 2 },
  { id: "ctx-fuse",     x:1064, y:  458, w: 168, h: 56, label: "Context Fusion", sub: "multi-modal merge",           variant: "compute", layer: 2 },
  { id: "sem-tree",     x: 448, y:  564, w: 168, h: 56, label: "Semantic Tree",  sub: "AST → intent graph",          variant: "compute", layer: 2 },
  { id: "dep-graph",    x: 672, y:  564, w: 168, h: 56, label: "Dep Graph",      sub: "structural parse",            variant: "compute", layer: 2 },

  // ── LAYER 3 — VNGE Orchestration ─────────────────────────
  { id: "vnge",         x: 568, y:  692, w: 224, h: 84, label: "VNGE",           sub: "Visual Neural Graph Engine",  variant: "hub",     layer: 3 },
  { id: "temporal",     x:  84, y:  848, w: 168, h: 56, label: "Temporal Layer", sub: "sequence reasoning",          variant: "compute", layer: 3 },
  { id: "spatial",      x: 280, y:  848, w: 168, h: 56, label: "Spatial Map",    sub: "3D scene model",              variant: "compute", layer: 3 },
  { id: "causal",       x: 476, y:  848, w: 168, h: 56, label: "Causal Engine",  sub: "cause → effect",              variant: "compute", layer: 3 },
  { id: "scene-graph",  x: 672, y:  848, w: 168, h: 56, label: "Scene Graph",    sub: "object relations",            variant: "compute", layer: 3 },
  { id: "world-state",  x: 868, y:  848, w: 168, h: 56, label: "World State",    sub: "persistent model",            variant: "compute", layer: 3 },
  { id: "infer-ctrl",   x:1064, y:  848, w: 168, h: 56, label: "Inference Ctrl", sub: "dispatch + route",            variant: "compute", layer: 3 },

  // ── LAYER 4 — Agent Routing ───────────────────────────────
  { id: "planner",      x: 140, y:  968, w: 168, h: 56, label: "Planner Agent",  sub: "goal decompose",              variant: "compute", layer: 4 },
  { id: "executor",     x: 336, y:  968, w: 168, h: 56, label: "Executor Agent", sub: "action dispatch",             variant: "compute", layer: 4 },
  { id: "critic",       x: 532, y:  968, w: 168, h: 56, label: "Critic Agent",   sub: "quality score",               variant: "compute", layer: 4 },
  { id: "memory",       x: 728, y:  968, w: 168, h: 56, label: "Memory Agent",   sub: "episodic store",              variant: "compute", layer: 4 },
  { id: "tool-proxy",   x: 924, y:  968, w: 168, h: 56, label: "Tool Proxy",     sub: "external APIs",               variant: "compute", layer: 4 },
  { id: "task-queue",   x: 252, y: 1076, w: 168, h: 56, label: "Task Queue",     sub: "priority FIFO",               variant: "infra",   layer: 4 },
  { id: "sched",        x: 560, y: 1076, w: 168, h: 56, label: "Scheduler",      sub: "resource alloc",              variant: "infra",   layer: 4 },
  { id: "result-buf",   x: 868, y: 1076, w: 168, h: 56, label: "Result Buffer",  sub: "async store",                 variant: "infra",   layer: 4 },

  // ── LAYER 5 — Simulation Systems ─────────────────────────
  { id: "phys-sim",     x: 140, y: 1196, w: 168, h: 56, label: "Physics Sim",    sub: "rigid body + fluid",          variant: "compute", layer: 5 },
  { id: "temp-sim",     x: 336, y: 1196, w: 168, h: 56, label: "Temporal Sim",   sub: "time-series model",           variant: "compute", layer: 5 },
  { id: "agent-sim",    x: 532, y: 1196, w: 168, h: 56, label: "Agent Sim",      sub: "behavior engine",             variant: "compute", layer: 5 },
  { id: "world-sim",    x: 728, y: 1196, w: 168, h: 56, label: "World Sim",      sub: "state propagation",           variant: "compute", layer: 5 },
  { id: "fb-sim",       x: 924, y: 1196, w: 168, h: 56, label: "Feedback Sim",   sub: "loop controller",             variant: "compute", layer: 5 },
  { id: "sim-ctrl",     x: 420, y: 1304, w: 168, h: 56, label: "Sim Controller", sub: "step: 0.016s",                variant: "infra",   layer: 5 },
  { id: "state-buf",    x: 728, y: 1304, w: 168, h: 56, label: "State Buffer",   sub: "delta compress",              variant: "infra",   layer: 5 },

  // ── LAYER 6 — Render Pipeline ─────────────────────────────
  { id: "nerf",         x:  56, y: 1420, w: 168, h: 56, label: "NeRF Engine",    sub: "radiance field",              variant: "output",  layer: 6 },
  { id: "diffusion",    x: 252, y: 1420, w: 168, h: 56, label: "Diffusion Mod",  sub: "DDPM / DDIM",                 variant: "output",  layer: 6 },
  { id: "compositor",   x: 448, y: 1420, w: 168, h: 56, label: "Compositor",     sub: "scene blend",                 variant: "output",  layer: 6 },
  { id: "rasterizer",   x: 644, y: 1420, w: 168, h: 56, label: "Rasterizer",     sub: "GPU raster",                  variant: "output",  layer: 6 },
  { id: "out-buf",      x: 840, y: 1420, w: 168, h: 56, label: "Output Buffer",  sub: "frame queue",                 variant: "output",  layer: 6 },
  { id: "frame-cache",  x:1092, y: 1420, w: 168, h: 56, label: "Frame Cache",    sub: "LRU 4 GB",                    variant: "infra",   layer: 6 },
  { id: "render-ctrl",  x: 476, y: 1526, w: 168, h: 56, label: "Render Ctrl",    sub: "pipeline mgr",                variant: "infra",   layer: 6 },
  { id: "disp-out",     x: 784, y: 1526, w: 168, h: 56, label: "Display Out",    sub: "4K / 8K output",              variant: "output",  layer: 6 },

  // ── LAYER 7 — Infrastructure ──────────────────────────────
  { id: "gpu-cluster",  x: 140, y: 1646, w: 168, h: 56, label: "GPU Cluster",    sub: "A100 × 128",                  variant: "infra",   layer: 7 },
  { id: "cpu-pool",     x: 336, y: 1646, w: 168, h: 56, label: "CPU Pool",       sub: "96-core nodes",               variant: "infra",   layer: 7 },
  { id: "mem-bank",     x: 532, y: 1646, w: 168, h: 56, label: "Memory Bank",    sub: "HBM3 8 TB",                   variant: "infra",   layer: 7 },
  { id: "storage",      x: 728, y: 1646, w: 168, h: 56, label: "Storage Grid",   sub: "NVMe RAID",                   variant: "infra",   layer: 7 },
  { id: "net-fabric",   x: 924, y: 1646, w: 168, h: 56, label: "Net Fabric",     sub: "400G InfiniBand",             variant: "infra",   layer: 7 },
  { id: "load-bal",     x: 252, y: 1754, w: 168, h: 56, label: "Load Balancer",  sub: "consistent hash",             variant: "infra",   layer: 7 },
  { id: "infra-orch",   x: 588, y: 1754, w: 224, h: 56, label: "Infra Orchestrator", sub: "Kubernetes + Nomad",      variant: "infra",   layer: 7 },
  { id: "monitor",      x: 980, y: 1754, w: 168, h: 56, label: "Monitor Sys",    sub: "Prometheus + Grafana",        variant: "infra",   layer: 7 },

  // ── LAYER 8 — Feedback Loops ──────────────────────────────
  { id: "telemetry",    x: 140, y: 1874, w: 168, h: 56, label: "Telemetry",      sub: "latency + throughput",        variant: "feedback",layer: 8 },
  { id: "evaluator",    x: 336, y: 1874, w: 168, h: 56, label: "Evaluator",      sub: "reward scoring",              variant: "feedback",layer: 8 },
  { id: "reward-mod",   x: 532, y: 1874, w: 168, h: 56, label: "Reward Model",   sub: "RLHF signal",                 variant: "feedback",layer: 8 },
  { id: "rlhf",         x: 728, y: 1874, w: 168, h: 56, label: "RLHF Loop",      sub: "PPO trainer",                 variant: "feedback",layer: 8 },
  { id: "distill",      x: 924, y: 1874, w: 168, h: 56, label: "Distillation",   sub: "knowledge compress",          variant: "feedback",layer: 8 },
  { id: "retrain",      x: 392, y: 1982, w: 168, h: 56, label: "Retraining",     sub: "continual learning",          variant: "feedback",layer: 8 },
  { id: "checkpoint",   x: 756, y: 1982, w: 168, h: 56, label: "Checkpoint",     sub: "model versioning",            variant: "feedback",layer: 8 },
];

/* ============================================================
   EDGES
   [fromId, fromPort, toId, toPort, animDurationSeconds]
   ============================================================ */

export const edgeDefs: Array<[string, Port, string, Port, number]> = [

  // 0 → 1  (Signal Origin → Input)
  ["visora",       "bottom", "user-query",   "top",    1.8],
  ["visora",       "bottom", "sys-context",  "top",    2.2],
  ["visora",       "bottom", "api-gateway",  "top",    2.6],

  // 1 internal
  ["sys-context",  "bottom", "ctx-window",   "top",    2.0],
  ["api-gateway",  "bottom", "token-stream", "top",    1.6],

  // 1 → 2  (Input → Semantic)
  ["user-query",   "bottom", "intent-cls",   "top",    2.2],
  ["user-query",   "bottom", "nlp-parse",    "top",    1.8],
  ["ctx-window",   "bottom", "entity-ext",   "top",    2.4],
  ["ctx-window",   "bottom", "relation-map", "top",    2.8],
  ["token-stream", "bottom", "ambig-res",    "top",    2.0],
  ["token-stream", "bottom", "ctx-fuse",     "top",    2.4],

  // 2 internal
  ["nlp-parse",    "bottom", "sem-tree",     "top",    1.9],
  ["entity-ext",   "bottom", "sem-tree",     "top",    2.3],
  ["relation-map", "bottom", "dep-graph",    "top",    1.7],
  ["ambig-res",    "bottom", "dep-graph",    "top",    2.1],

  // 2 → 3  (Semantic → VNGE)
  ["sem-tree",     "bottom", "vnge",         "top",    2.0],
  ["dep-graph",    "bottom", "vnge",         "top",    2.4],

  // 3 fan-out  (VNGE → branches)
  ["vnge",         "bottom", "temporal",     "top",    1.6],
  ["vnge",         "bottom", "spatial",      "top",    2.0],
  ["vnge",         "bottom", "causal",       "top",    2.4],
  ["vnge",         "bottom", "scene-graph",  "top",    1.8],
  ["vnge",         "bottom", "world-state",  "top",    2.2],
  ["vnge",         "bottom", "infer-ctrl",   "top",    2.8],

  // 3 → 4  (VNGE branches → Agents)
  ["temporal",     "bottom", "planner",      "top",    2.0],
  ["spatial",      "bottom", "planner",      "top",    2.4],
  ["causal",       "bottom", "executor",     "top",    1.8],
  ["scene-graph",  "bottom", "critic",       "top",    2.2],
  ["world-state",  "bottom", "memory",       "top",    2.6],
  ["infer-ctrl",   "bottom", "tool-proxy",   "top",    2.0],

  // 4 internal
  ["planner",      "bottom", "task-queue",   "top",    1.9],
  ["executor",     "bottom", "task-queue",   "top",    2.3],
  ["critic",       "bottom", "sched",        "top",    1.7],
  ["memory",       "bottom", "result-buf",   "top",    2.1],
  ["tool-proxy",   "bottom", "result-buf",   "top",    2.5],

  // 4 → 5  (Agents → Simulation)
  ["task-queue",   "bottom", "phys-sim",     "top",    2.0],
  ["task-queue",   "bottom", "temp-sim",     "top",    2.4],
  ["sched",        "bottom", "agent-sim",    "top",    1.8],
  ["sched",        "bottom", "world-sim",    "top",    2.2],
  ["result-buf",   "bottom", "fb-sim",       "top",    2.6],

  // 5 internal
  ["phys-sim",     "bottom", "sim-ctrl",     "top",    2.0],
  ["temp-sim",     "bottom", "sim-ctrl",     "top",    2.4],
  ["agent-sim",    "bottom", "sim-ctrl",     "top",    1.8],
  ["world-sim",    "bottom", "state-buf",    "top",    2.2],
  ["fb-sim",       "bottom", "state-buf",    "top",    2.6],

  // 5 → 6  (Sim → Render)
  ["sim-ctrl",     "bottom", "nerf",         "top",    2.0],
  ["sim-ctrl",     "bottom", "diffusion",    "top",    2.4],
  ["sim-ctrl",     "bottom", "compositor",   "top",    1.8],
  ["state-buf",    "bottom", "rasterizer",   "top",    2.2],
  ["state-buf",    "bottom", "out-buf",      "top",    2.8],

  // 6 internal
  ["nerf",         "right",  "compositor",   "left",   2.0],
  ["diffusion",    "right",  "compositor",   "left",   2.4],
  ["compositor",   "bottom", "render-ctrl",  "top",    1.8],
  ["rasterizer",   "bottom", "render-ctrl",  "top",    2.2],
  ["out-buf",      "bottom", "disp-out",     "top",    2.6],
  ["frame-cache",  "bottom", "disp-out",     "top",    2.0],
  ["render-ctrl",  "right",  "disp-out",     "left",   2.4],

  // 6 → 7  (Render → Infra)
  ["render-ctrl",  "bottom", "gpu-cluster",  "top",    2.0],
  ["render-ctrl",  "bottom", "cpu-pool",     "top",    2.4],
  ["disp-out",     "bottom", "mem-bank",     "top",    1.8],
  ["disp-out",     "bottom", "storage",      "top",    2.2],

  // 7 internal
  ["gpu-cluster",  "bottom", "load-bal",     "top",    2.0],
  ["cpu-pool",     "bottom", "load-bal",     "top",    2.4],
  ["mem-bank",     "bottom", "infra-orch",   "top",    1.8],
  ["storage",      "bottom", "infra-orch",   "top",    2.2],
  ["net-fabric",   "bottom", "monitor",      "top",    2.6],

  // 7 → 8  (Infra → Feedback)
  ["load-bal",     "bottom", "telemetry",    "top",    2.0],
  ["load-bal",     "bottom", "evaluator",    "top",    2.4],
  ["infra-orch",   "bottom", "reward-mod",   "top",    1.8],
  ["infra-orch",   "bottom", "rlhf",         "top",    2.2],
  ["monitor",      "bottom", "distill",      "top",    2.6],

  // 8 internal
  ["telemetry",    "bottom", "retrain",      "top",    2.0],
  ["evaluator",    "bottom", "retrain",      "top",    2.4],
  ["reward-mod",   "bottom", "retrain",      "top",    1.8],
  ["rlhf",         "bottom", "checkpoint",   "top",    2.2],
  ["distill",      "bottom", "checkpoint",   "top",    2.6],
];

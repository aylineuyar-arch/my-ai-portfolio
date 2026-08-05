import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import {
  Briefcase,
  UtensilsCrossed,
  Inbox,
  Network,
  Send,
  BarChart3,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AylinOS — Personal AI Operating System" },
      { name: "description", content: "An AI-native home screen for orchestrating personal agents." },
    ],
  }),
  component: Home,
});

type App = {
  id: string;
  name: string;
  tag: string;
  gradient: string;
  accent: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
};

const IS_LOCAL = typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const APPS: App[] = [
  { id: "job-search", name: "Job Search",       tag: "pipeline",       gradient: "linear-gradient(155deg,#1e1b4b 0%,#4338ca 100%)", accent: "#818cf8", Icon: Briefcase },
  { id: "networking", name: "Networking",        tag: "contact scan",   gradient: "linear-gradient(155deg,#0c1a3a 0%,#1e40af 100%)", accent: "#60a5fa", Icon: Network },
  { id: "research",   name: "Research",          tag: "company intel",  gradient: "linear-gradient(155deg,#500724 0%,#be185d 100%)", accent: "#f472b6", Icon: BookOpen },
  { id: "restaurant", name: "Restaurant Agent",  tag: "8-node graph",   gradient: "linear-gradient(155deg,#064e3b 0%,#047857 100%)", accent: "#34d399", Icon: UtensilsCrossed },
  { id: "cs-triage",  name: "CS Triage",         tag: "sub-1s route",   gradient: "linear-gradient(155deg,#14532d 0%,#15803d 100%)", accent: "#4ade80", Icon: Inbox },
  { id: "evals",      name: "Evals",             tag: "routing evals",  gradient: "linear-gradient(155deg,#1a0530 0%,#7e22ce 100%)", accent: "#c084fc", Icon: BarChart3 },
  { id: "outreach",   name: "Outreach",          tag: "human-gated",    gradient: "linear-gradient(155deg,#2e1065 0%,#6d28d9 100%)", accent: "#a78bfa", Icon: Send },
];



const OS_BASE = "https://aylinos.onrender.com";
const BACKEND_BASE = typeof window !== "undefined" && window.location.hostname === "localhost"
  ? "http://localhost:8000"
  : OS_BASE;

const AGENT_LINKS = [
  {
    name: "Job Pipeline",
    desc: "Scored roles from Greenhouse, Lever, Ashby, JSearch",
    cta: "VIEW PIPELINE →",
    url: `${OS_BASE}/job-search`,
    gradient: "linear-gradient(155deg,#1e1b4b 0%,#4338ca 100%)",
    accent: "#818cf8",
    Icon: Briefcase,
  },
  {
    name: "Networking",
    desc: "IC-level contacts at target companies · LinkedIn drafts",
    cta: "VIEW CONTACTS →",
    url: `${BACKEND_BASE}/networking`,
    gradient: "linear-gradient(155deg,#0c1a3a 0%,#1e40af 100%)",
    accent: "#60a5fa",
    Icon: Network,
  },
  {
    name: "Company Research",
    desc: "Live intel · funding · AI angle · leadership · hiring signal",
    cta: "ASK ANYTHING →",
    url: "__research__",
    gradient: "linear-gradient(155deg,#500724 0%,#be185d 100%)",
    accent: "#f472b6",
    Icon: BookOpen,
  },
];

const SUGGESTIONS = [
  { q: "find me roles I should apply to", agent: "Job Scanner", accent: "#ec4899" },
  { q: "should I apply to Clay", agent: "Career Advisor", accent: "#6366f1" },
  { q: "prep me for Metaview interview", agent: "Interview Prep", accent: "#6366f1" },
  { q: "research Hebbia's GTM motion", agent: "Research", accent: "#db2777" },
  { q: "book dinner in Soho tomorrow at 8", agent: "Restaurant Agent", accent: "#059669" },
  { q: "triage today's support inbox", agent: "CS Triage", accent: "#16a34a" },
];

function useClock() {
  const [t, setT] = useState(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  });
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setT(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    }, 15_000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useGreeting() {
  const h = new Date().getHours();
  if (h < 5) return "Burning the midnight oil";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function useTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % LIVE_TICKER.length), 3800);
    return () => clearInterval(id);
  }, []);
  return LIVE_TICKER[i];
}

// Rotate a 3-item window through SUGGESTIONS every ~5s
function useRotatingSuggestions(windowSize = 3, intervalMs = 5000) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset((x) => (x + 1) % SUGGESTIONS.length), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return Array.from({ length: windowSize }, (_, i) => SUGGESTIONS[(offset + i) % SUGGESTIONS.length]);
}

// Type out a list of phrases as a live placeholder
function useTypingPlaceholder(phrases: string[], { typeMs = 55, holdMs = 1600, eraseMs = 28 } = {}) {
  const [text, setText] = useState("");
  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let mode: "type" | "hold" | "erase" = "type";
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const phrase = phrases[phraseIdx];
      if (mode === "type") {
        charIdx++;
        setText(phrase.slice(0, charIdx));
        if (charIdx >= phrase.length) { mode = "hold"; timer = setTimeout(tick, holdMs); return; }
        timer = setTimeout(tick, typeMs);
      } else if (mode === "hold") {
        mode = "erase"; timer = setTimeout(tick, eraseMs);
      } else {
        charIdx--;
        setText(phrase.slice(0, Math.max(0, charIdx)));
        if (charIdx <= 0) { mode = "type"; phraseIdx = (phraseIdx + 1) % phrases.length; timer = setTimeout(tick, 280); return; }
        timer = setTimeout(tick, eraseMs);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [phrases, typeMs, holdMs, eraseMs]);
  return text;
}
const TYPING_PHRASES = [
  "Ask anything, or route a task to an agent…",
  "Type a goal — AylinOS picks the agent.",
  "Press ⌘K to route. ⇧⏎ to chain agents.",
  "Describe the outcome, not the steps.",
  "Try: \"close the loop on every open thread\"",
];

const API_BASE = typeof window !== "undefined" && window.location.hostname === "localhost"
  ? "http://localhost:8000"
  : "https://aylinos.onrender.com";

// ── Output rendering helpers ─────────────────────────────────────────────────

const SECTION_DEFS: Record<string, string> = {
  "FIT SCORE":  "#6366f1",
  "STRATEGY":   "#f97316",
  "AI ANGLE":   "#6366f1",
  "ROLE FIT":   "#10b981",
  "VERDICT":    "#64748b",
  "LIVE ROLES": "#3b82f6",
};

type ParsedSection = { label: string; content: string; color: string };

function parseSections(text: string): ParsedSection[] {
  const labels = Object.keys(SECTION_DEFS);
  const sections: ParsedSection[] = [];
  let current: ParsedSection | null = null;
  for (const rawLine of text.split("\n")) {
    const line = rawLine.replace(/\*\*/g, "").trim();
    const matched = labels.find(l => line === l + ":" || line === l);
    if (matched) {
      if (current) sections.push(current);
      current = { label: matched, content: "", color: SECTION_DEFS[matched] };
    } else if (current) {
      current.content += (current.content ? "\n" : "") + rawLine;
    }
  }
  if (current) sections.push(current);
  return sections;
}

function fitLabel(score: number): string {
  if (score >= 75) return "Strong fit";
  if (score >= 60) return "Worth a look";
  if (score >= 45) return "Neutral";
  return "Skip";
}

type RoleRow = { title: string; location: string; score: string; reason: string; url: string };

function parseRoleRows(text: string): RoleRow[] {
  return text.trim().split("\n")
    .filter(l => l.trim().startsWith("-"))
    .map(line => {
      const parts = line.replace(/^[-•]\s*/, "").split("|").map(p => p.trim());
      return { title: parts[0] || "", location: parts[1] || "", score: parts[2] || "", reason: parts[3] || "", url: parts[4] || "" };
    })
    .filter(r => r.title);
}

function renderContent(text: string): React.ReactNode[] {
  return text.trim().split("\n").filter(l => l.trim()).map((line, i) => {
    const t = line.trim();
    const bullet = /^[-•]\s/.test(t);
    const body = bullet ? t.slice(2) : t;
    const parts = body.split(/\*\*([^*]+)\*\*/g);
    const nodes = parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : <span key={j}>{p}</span>);
    return bullet
      ? <div key={i} className="sc-bullet">{nodes}</div>
      : <div key={i} className="sc-line">{nodes}</div>;
  });
}

function Home() {
  const clock = useClock();
  const greeting = useGreeting();
  const rotating = useRotatingSuggestions(3, 5000);

  const typed = useTypingPlaceholder(TYPING_PHRASES);
  const [helpOpen, setHelpOpen] = useState(false);
  const [query, setQuery] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("q") || "";
    }
    return "";
  });
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [output, setOutput] = useState("");
  const [scanLog, setScanLog] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [thinkingLabel, setThinkingLabel] = useState("");
  const [lastCompany, setLastCompany] = useState<string | null>(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [fitScore, setFitScore] = useState<number | null>(null);
  const [nextStepsData, setNextStepsData] = useState<{
    pipeline_steps: string[];
    items: Array<{ label: string; url: string }>;
    color: string;
  } | null>(null);
  const [earlyPipelineSteps, setEarlyPipelineSteps] = useState<string[]>([]);
  const [networkingLog, setNetworkingLog] = useState<string[]>([]);
  const [networkingDone, setNetworkingDone] = useState(false);

  // Auto-run query from ?q= URL param (e.g. "Rerun Analysis" from pipeline page)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) {
      window.history.replaceState({}, "", window.location.pathname);
      runQuery(q);
    }
  }, []);

  async function runContactScan() {
    if (scanLoading) return;
    setScanLoading(true);
    setNetworkingDone(false);

    const steps = [
      "Reading pipeline DB — pulling active target companies...",
      "Querying LinkedIn for IC-level peers at each company — EM, Solutions Consultant, Deployment...",
      "Cross-referencing backgrounds: Tuck · Deloitte · consulting · AI startup overlap...",
      "Scoring warmth — shared network, alma mater, career path similarity...",
      "Scoring role fit — seniority match, team proximity, deployment angle...",
      "Generating personalized outreach drafts based on overlap...",
      "6 contacts saved · sorted by warmth + fit",
    ];
    setNetworkingLog([]);
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 750));
      setNetworkingLog(prev => [...prev, steps[i]]);
    }

    setScanLoading(false);
    setNetworkingDone(true);
  }

  const AGENT_THINKING: Record<string, string[]> = {
    job_scan:        ["Connecting to job boards...", "Querying JSearch (LinkedIn · Indeed · Glassdoor)...", "Scraping ATS boards (Greenhouse · Lever · Ashby)...", "Filtering by location and fit..."],
    job_scan_single: ["Hitting ATS board...", "Filtering to NYC · London · SF...", "Scoring roles with Haiku...", "Saving to pipeline DB..."],
    advisor:         ["Reading pipeline DB...", "Scoring fit against your profile...", "Generating career brief..."],
    interview_prep: ["Loading company context...", "Building STAR stories...", "Drafting likely questions..."],
    job_search:     ["Querying your pipeline DB...", "Computing conversion metrics..."],
    research:       ["Searching live sources...", "Synthesizing company brief..."],
    restaurant:     ["Searching venues...", "Checking availability..."],
    general:        ["Processing query...", "Generating response..."],
  };

  async function runQuery(q: string) {
    if (!q.trim() || streaming) return;
    setStreaming(true);
    setOutput("");
    setScanLog("");
    setActiveAgent(null);
    setLastCompany(null);
    setScanLoading(false);
    setFitScore(null);
    setNextStepsData(null);
    setEarlyPipelineSteps([]);
    setNetworkingLog([]);
    setNetworkingDone(false);
    setHelpOpen(false);
    setThinkingLabel("Routing query...");

    let thinkingInterval: ReturnType<typeof setInterval> | null = null;

    try {
      const resp = await fetch(`${API_BASE}/api/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      if (!resp.body) throw new Error("No stream");
      const reader = resp.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          try {
            const evt = JSON.parse(line.slice(5).trim());
            if (evt.type === "route") {
              setActiveAgent(evt.agent);
              if (evt.extract) setLastCompany(evt.extract);
              if (evt.pipeline_steps?.length) setEarlyPipelineSteps(evt.pipeline_steps);
              // Cycle through agent-specific thinking labels until first token
              const steps = AGENT_THINKING[evt.agent] ?? AGENT_THINKING.general;
              let idx = 0;
              setThinkingLabel(steps[0]);
              thinkingInterval = setInterval(() => {
                idx = (idx + 1) % steps.length;
                setThinkingLabel(steps[idx]);
              }, 1800);
            } else if (evt.type === "section") {
              // Transition between agents — save scan log, reset output for advisor
              setOutput((current) => { setScanLog((prev) => prev || current); return ""; });
              setActiveAgent(evt.label ?? evt.agent ?? null);
              if (thinkingInterval) { clearInterval(thinkingInterval); thinkingInterval = null; }
            } else if (evt.type === "token") {
              if (thinkingInterval) { clearInterval(thinkingInterval); thinkingInterval = null; }
              setThinkingLabel("");
              setOutput((s) => s + evt.text);
            } else if (evt.type === "fit_score") {
              setFitScore(evt.score);
            } else if (evt.type === "next_steps") {
              setNextStepsData({
                pipeline_steps: evt.pipeline_steps ?? evt.steps ?? [],
                items: evt.items ?? [],
                color: evt.color ?? "#6366f1",
              });
            }
          } catch {}
        }
      }
    } catch (e) {
      setThinkingLabel("");
      setOutput("Connection error — is the local server running? (python3 -m uvicorn api.server:app --port 8000)");
    } finally {
      if (thinkingInterval) clearInterval(thinkingInterval);
      setThinkingLabel("");
      setStreaming(false);
    }
  }

  const parsedSections = parseSections(output);
  // Extract fit score from parsed text so the card shows during streaming,
  // before the fit_score SSE event arrives at stream end.
  const parsedFitScore = (() => {
    const s = parsedSections.find(x => x.label === "FIT SCORE");
    if (!s) return null;
    const m = s.content.trim().match(/\d+/);
    return m ? parseInt(m[0], 10) : null;
  })();
  const displayFitScore = fitScore ?? parsedFitScore;
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  return (
    <>
      <style>{CSS}</style>
      <div id="screen">
        <div className="grain" aria-hidden />

        {/* Status bar */}
        <div id="sb">
          <div className="sb-left">
            <span className="sb-brand">
              <span className="sb-glyph">◇</span>Aylin<span className="sb-brand-os">OS</span>
            </span>
            <span className="sb-byline">designed &amp; shipped by Aylin</span>
            <span className="sb-divider" />
            <span className="sb-ver">v2.4.1 — "midnight oil"</span>
          </div>
          <div className="sb-right">
            {IS_LOCAL && (
              <div className="sb-pill test-badge">
                <span className="sb-dot" style={{ background: "#f59e0b" }} />
                <span>TEST — localhost:8000</span>
              </div>
            )}
            <div className="sb-pill">
              <span className="sb-dot pulse" style={{ background: "#6366f1" }} />
              <span>Claude</span>
            </div>
            <div className="sb-pill">
              <span className="sb-dot pulse" style={{ background: "#10b981", animationDelay: ".4s" }} />
              <span>SQLite</span>
            </div>
            <span className="sb-divider" />
            <div className="sb-pill">
              <span className="sb-dot" style={{ background: "#10b981" }} />
              <span><b>{APPS.length}</b> agents</span>
            </div>
            <span id="sb-clock">{clock}</span>
          </div>
        </div>

        {/* Search zone */}
        <section id="search-zone">
          <div className="prompt-row">
            <h1 className="prompt-h1">
              <span className="bracket">[</span>
              {greeting}, <span className="prompt-name">Aylin</span>
              <span className="bracket">]</span>
            </h1>
            <p className="prompt-sub">Route a task to an agent, or just ask.</p>

          </div>

          <div className="search-wrap">
            <span className="search-status" title="awaiting prompt">
              <span className="ss-dot" />
            </span>
            <input
              id="search-bar"
              type="text"
              placeholder={typed || " "}
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") runQuery(query); }}
            />

            <span className="search-cursor" aria-hidden />
            <button
              type="button"
              className={`help-toggle ${helpOpen ? "is-open" : ""}`}
              onClick={() => setHelpOpen((v) => !v)}
              aria-expanded={helpOpen}
              aria-controls="help-panel"
            >
              <span className="help-chev">{helpOpen ? "▾" : "▸"}</span>
              <span>Help me decide</span>
            </button>
          </div>

          {helpOpen && (
            <div id="help-panel" className="dd-card">
              <div className="dd-section dd-rec">
                <div className="dd-label">
                  <span>Recommended</span>
                  <span className="dd-meta">awaiting prompt<span className="term-cursor" /></span>
                </div>
                <ul className="suggest-list">
                  {rotating.map((s) => (
                    <li key={s.q} className="suggest-row">
                      <span className="suggest-arrow">→</span>
                      <span className="suggest-q">{s.q}</span>
                      <span className="suggest-agent">{s.agent}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        {(streaming || output || nextStepsData) && (
          <section id="output-zone">
            <div id="agent-label">
              <span className="sb-dot pulse" style={{ background: "#6366f1" }} />
              {activeAgent
                ? `→ ${activeAgent}${streaming && !output ? "" : streaming ? " · streaming…" : " · done"}`
                : "→ routing…"}
              {thinkingLabel && <span className="thinking-label">{thinkingLabel}</span>}
            </div>

            {/* Thinking placeholder before first token */}
            {streaming && !output && thinkingLabel && (
              <div className="thinking-card">
                <span className="thinking-steps">{thinkingLabel}<span className="term-cursor" /></span>
              </div>
            )}

            {/* Scan log — live progress, styled as checklist */}
            {scanLog && (
              <div className="scan-log">
                {scanLog.trim().split("\n").filter(l => l.trim()).map((line, i) => {
                  const clean = line
                    .replace(/^\[\d{2}:\d{2}\]\s*/, "")
                    .replace(/^discovery:\s*single:\s*/i, "")
                    .replace(/^discovery:\s*/i, "")
                    .replace(/^[✓→·]\s*/, "")
                    .trim();
                  return clean ? (
                    <div key={i} className="scan-line">
                      <span className="scan-check">✓</span>
                      <span>{clean}</span>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {/* Structured output (advisor) */}
            {output && parsedSections.length > 0 ? (
              <>
                {displayFitScore !== null && (
                  <div className="fit-card">
                    <div className="fit-left">
                      <span className="fit-num">{displayFitScore}</span>
                      <span className="fit-denom">/100</span>
                    </div>
                    <div className="fit-right">
                      <div className="fit-lbl">{fitLabel(displayFitScore)}</div>
                      <div className="fit-bar-wrap">
                        <div className="fit-bar-fill" style={{ width: `${displayFitScore}%` }} />
                      </div>
                      <div className="fit-sub">scored by advisor · full breakdown below</div>
                    </div>
                  </div>
                )}
                {parsedSections.filter(s => s.label !== "FIT SCORE").map(section => {
                  if (section.label === "LIVE ROLES") {
                    const rows = parseRoleRows(section.content);
                    return (
                      <div key="LIVE ROLES" className="section-card" style={{ borderLeftColor: section.color }}>
                        <div className="sc-label" style={{ color: section.color }}>LIVE ROLES</div>
                        {rows.length > 0 ? (
                          <table className="roles-table">
                            <thead>
                              <tr>
                                <th>Role</th>
                                <th>Location</th>
                                <th>Fit</th>
                                <th>Why</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((r, i) => (
                                <tr key={i}>
                                  <td className="rt-title">{r.title}</td>
                                  <td className="rt-loc">{r.location}</td>
                                  <td className="rt-score">{r.score}</td>
                                  <td className="rt-reason">{r.reason}</td>
                                  <td className="rt-apply">
                                    {r.url ? (
                                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="apply-link">Apply →</a>
                                    ) : null}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div className="sc-body">{renderContent(section.content)}</div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div key={section.label} className="section-card" style={{ borderLeftColor: section.color }}>
                      <div className="sc-label" style={{ color: section.color }}>{section.label}</div>
                      <div className="sc-body">{renderContent(section.content)}</div>
                    </div>
                  );
                })}
                {streaming && <span className="term-cursor" style={{ display: "inline-block", margin: "4px 0 0 4px" }} />}
              </>
            ) : output ? (
              /* Raw terminal output rendered as ✓ lines (no timestamps) */
              <div className="scan-log">
                {output.trim().split("\n").filter(l => l.trim()).map((line, i) => {
                  const clean = line
                    .replace(/^\[\d{2}:\d{2}\]\s*/, "")
                    .replace(/^discovery:\s*single:\s*/i, "")
                    .replace(/^discovery:\s*/i, "")
                    .replace(/^[✓→·]\s*/, "")
                    .trim();
                  return clean ? (
                    <div key={i} className="scan-line">
                      <span className="scan-check">✓</span>
                      <span>{clean}</span>
                    </div>
                  ) : null;
                })}
                {streaming && <span className="term-cursor" style={{ marginLeft: 4 }} />}
              </div>
            ) : null}

            {/* Where to go next */}
            {nextStepsData && nextStepsData.items.length > 0 && (
              <div className="out-next">
                <div className="out-next-hdr">WHERE TO GO NEXT</div>
                <div className="out-next-grid">
                  {nextStepsData.items.map(item => (
                    <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="out-next-card">
                      <span className="onc-label">{item.label}</span>
                      <span className="onc-cta">OPEN →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}




        {/* Agent shortcuts — always visible */}
        <section id="next-zone">
          <div className="next-header">
            <span className="next-star">✦</span>
            <span className="next-title">{output ? "WHERE TO GO NEXT" : "AGENT SHORTCUTS"}</span>
            <span className="next-sub">Each agent's output is live — pick one to take over.</span>
          </div>
          <div className="next-grid">
            {AGENT_LINKS.map((a) => {
              const handleClick = (e: React.MouseEvent) => {
                if (a.url === "__networking__") {
                  e.preventDefault();
                  runContactScan();
                } else if (a.url === "__research__") {
                  e.preventDefault();
                  const q = lastCompany ? `research ${lastCompany}` : "research this company";
                  setQuery(q);
                  runQuery(q);
                }
              };
              return (
                <a className="next-card" key={a.name}
                  href={a.url === "__networking__" || a.url === "__research__" ? "#" : a.url}
                  target={a.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  onClick={handleClick}>
                  <div className="next-icon" style={{ background: a.gradient }}>
                    <a.Icon size={24} strokeWidth={1.75} color="#fff" />
                  </div>
                  <div className="next-body">
                    <div className="next-name">{a.name}</div>
                    <div className="next-desc">{a.desc}</div>
                    <div className="next-cta" style={{ color: a.accent }}>{a.cta}</div>
                  </div>
                </a>
              );
            })}
          </div>
          {networkingLog.length > 0 && (
            <div className="scan-log" style={{ marginTop: 12 }}>
              {networkingLog.map((line, i) => (
                <div key={i} className="scan-line">
                  <span className="scan-check">✓</span>
                  <span>{line}</span>
                </div>
              ))}
              {scanLoading && (
                <div className="scan-line">
                  <span className="scan-check" style={{ color: "#6366f1", animation: "spin 1.2s linear infinite", display: "inline-block" }}>⟳</span>
                  <span style={{ color: "var(--ink-3)" }}><span className="term-cursor" /></span>
                </div>
              )}
              {networkingDone && (
                <div className="scan-line" style={{ marginTop: 4 }}>
                  <span className="scan-check">→</span>
                  <a href={`${API_BASE}/networking`} target="_blank" rel="noopener noreferrer"
                    style={{ color: "#6366f1", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>
                    View Contacts →
                  </a>
                </div>
              )}
            </div>
          )}
        </section>



        {/* Eval footer — single line */}
        <a id="telem" href="/evals" title="Click for full eval harness — 7-day routing metrics across all agents">
          <span className="tel-key">EVALS</span>
          <span className="tel-pair"><span className="tel-k">F1</span><span className="tel-v">0.87</span><span className="tel-delta">▲0.04</span></span>
          <span className="tel-sep">·</span>
          <span className="tel-pair"><span className="tel-k">precision</span><span className="tel-v">0.91</span></span>
          <span className="tel-sep">·</span>
          <span className="tel-pair"><span className="tel-k">recall</span><span className="tel-v">0.84</span></span>
          <span className="tel-sep">·</span>
          <span className="tel-pair"><span className="tel-k">p50</span><span className="tel-v">820ms</span></span>
          <span className="tel-sep">·</span>
          <span className="tel-pair"><span className="tel-k">prompt</span><span className="tel-v accent">v2</span><span className="tel-shadow">v3 shadow 10%</span></span>
        </a>

      </div>
    </>
  );
}

/*
 * EVAL FOOTER — TAKEAWAYS PLACEHOLDER
 * ------------------------------------
 * Replace these numbers with real values from your eval harness before interviews:
 *   - F1 / Precision / Recall: routing-decision metrics across the 7 agents.
 *     Current placeholders (0.87 / 0.91 / 0.84) imply a precision-favoring router
 *     — frame in interviews as "I'd rather refuse-to-route than misroute."
 *   - Δ on F1: week-over-week change. Tie to a specific prompt or model change.
 *   - Calls 24h: real LLM call volume. If low, swap to "Calls 7d" or "Tasks 7d".
 *   - p50: median end-to-end latency. Add p95 to the tooltip when you have it.
 *   - Prompt vN + shadow %: shows you do prompt versioning and shadow rollouts.
 *
 * Talking points each cell unlocks:
 *   F1          → "How I score routing quality across heterogeneous agents."
 *   Precision   → "Cost of a wrong route is higher than a missed one — here's why."
 *   Recall      → "Where I'd push next, and the failure mode I'd accept."
 *   Calls 24h   → "Token + dollar budget per agent, and how I throttle."
 *   p50         → "What dominates latency (model, tool calls, network) + caching."
 *   Prompt v2   → "How I version prompts, A/B them, and ship safely."
 */

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#FCF9F1;
  --bg-2:#F3F1EA;
  --ink:#2A2620;
  --ink-2:#454039;
  --ink-3:#8C8579;
  --ink-4:#A8A294;
  --b:#E5E1D5;
  --b-2:#D6D1C2;
  --surface:rgba(255,255,255,.7);
  --mono:'JetBrains Mono','SF Mono','Menlo',monospace;
  --sans:'Inter',system-ui,sans-serif;
  --accent:#EC4899;
  --accent-2:#DB2777;
}
html,body{height:100%;font-family:var(--sans);background:var(--bg);color:var(--ink);-webkit-font-smoothing:antialiased}

@keyframes dot-pulse{0%,100%{opacity:1}50%{opacity:.35}}

#screen{
  width:100vw;min-height:100vh;display:flex;flex-direction:column;position:relative;
  background-color:var(--bg);
  background-image:
    radial-gradient(ellipse 70% 45% at 50% -5%, rgba(236,72,153,.18) 0%, transparent 60%),
    radial-gradient(ellipse 45% 35% at 8% 92%, rgba(217,119,6,.08) 0%, transparent 55%),
    radial-gradient(ellipse 40% 30% at 95% 65%, rgba(180,83,9,.07) 0%, transparent 55%),
    radial-gradient(circle at 1px 1px, rgba(69,64,57,.07) 1px, transparent 0);
  background-size:auto,auto,auto,22px 22px;
}
/* Grain overlay — adds tactile film texture */
.grain{
  position:absolute;inset:0;pointer-events:none;z-index:1;mix-blend-mode:multiply;opacity:.5;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .35 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}
#sb,#search-zone,#recent-zone,#pipeline-band,#next-zone,#telem,#dock-row{position:relative;z-index:2}


/* Status bar */
#sb{
  height:34px;flex-shrink:0;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 22px;
  background:rgba(255,255,255,.65);
  backdrop-filter:blur(20px) saturate(1.4);
  border-bottom:1px solid var(--b);
}
.sb-left{display:flex;align-items:center;gap:12px}
.sb-brand{font-family:var(--mono);font-size:15px;font-weight:800;letter-spacing:-.005em;color:var(--ink);display:inline-flex;align-items:baseline;gap:1px}
.sb-brand-os{color:var(--accent);font-weight:800}
.sb-byline{font-family:var(--mono);font-size:10px;color:var(--ink-3);letter-spacing:.04em;font-style:italic}
.sb-ver{font-family:var(--mono);font-size:10px;color:var(--ink-3);letter-spacing:.02em}
.sb-divider{width:1px;height:14px;background:var(--b-2)}
.sb-right{display:flex;align-items:center;gap:14px}
.sb-pill{display:flex;align-items:center;gap:6px;font-family:var(--mono);font-size:10.5px;color:var(--ink-2);letter-spacing:.01em}
.sb-pill b{color:var(--ink);font-weight:600}
.sb-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;box-shadow:0 0 6px currentColor}
.sb-dot.pulse{animation:dot-pulse 2s ease-in-out infinite}
#sb-clock{font-family:var(--mono);font-size:12px;font-weight:600;color:var(--ink);letter-spacing:.04em;padding-left:4px}

/* Search zone */
#search-zone{
  flex-shrink:0;display:flex;flex-direction:column;align-items:center;
  padding:38px 24px 10px;
}
.prompt-row{text-align:center;margin-bottom:22px;display:flex;flex-direction:column;align-items:center;gap:6px}
.prompt-eyebrow{
  position:relative;
  display:inline-flex;align-items:center;gap:8px;
  font-family:var(--mono);font-size:10.5px;font-weight:700;color:var(--ink-2);
  letter-spacing:.2em;text-transform:uppercase;
  padding:5px 12px;border-radius:999px;
  background:rgba(255,255,255,.7);
  border:1px solid var(--b);
  backdrop-filter:blur(8px);
}
.eyebrow-dot{
  width:6px;height:6px;border-radius:50%;background:#10b981;
  box-shadow:0 0 8px #10b981;animation:dot-pulse 1.8s ease-in-out infinite;
}
.prompt-h1{
  font-size:30px;font-weight:600;letter-spacing:-.025em;line-height:1.15;
  color:var(--ink);margin-top:6px;
}
.bracket{
  font-family:var(--mono);font-weight:400;color:var(--ink-4);
  margin:0 6px;font-size:.85em;
}
.prompt-name{color:var(--accent);font-weight:700}
.prompt-sub{font-size:13px;color:var(--ink-3);margin-top:4px}
.kbd-inline{
  font-family:var(--mono);font-size:10.5px;font-weight:600;color:var(--ink);
  padding:1px 6px;border-radius:4px;
  background:rgba(255,255,255,.85);border:1px solid var(--b-2);
  box-shadow:0 1px 0 var(--b);
}

.sb-glyph{color:var(--accent);font-weight:400;margin-right:2px;display:inline-block;animation:spin 18s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}


.search-wrap{width:100%;max-width:860px;position:relative}
.search-status{
  position:absolute;left:18px;top:50%;transform:translateY(-50%);z-index:2;
  display:inline-flex;align-items:center;justify-content:center;
  width:14px;height:14px;
}
.ss-dot{
  width:8px;height:8px;border-radius:50%;background:var(--accent);
  box-shadow:0 0 10px rgba(236,72,153,.6);animation:dot-pulse 1.8s ease-in-out infinite;
}
.search-cursor{
  position:absolute;left:44px;top:50%;transform:translateY(-50%);z-index:2;
  width:2px;height:20px;background:var(--accent);opacity:.85;
  animation:blink 1.05s steps(2,end) infinite;pointer-events:none;
}
#search-bar:not(:placeholder-shown) ~ .search-cursor,
.search-wrap:focus-within .search-cursor{display:none}
#search-bar{
  position:relative;z-index:1;
  width:100%;
  background:#fdf2f8;
  border:2px solid var(--accent);
  border-radius:18px;
  padding:26px 172px 26px 56px;
  font-family:var(--sans);font-size:19px;color:var(--ink);outline:none;
  letter-spacing:-.005em;
  transition:border-color 160ms, box-shadow 200ms;
  box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 12px 32px rgba(236,72,153,.18);
}
#search-bar::placeholder{color:var(--ink-3);opacity:.9}
#search-bar:focus{
  border-color:var(--accent);
  background:#fff;
  box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 14px 36px rgba(236,72,153,.28), 0 0 0 5px rgba(236,72,153,.2);
}



/* Shared terminal cursor + ticker primitives */
.term-cursor{
  display:inline-block;width:5px;height:10px;background:var(--accent);
  margin-left:4px;vertical-align:-1px;animation:blink 1.05s steps(2,end) infinite;
}
@keyframes blink{50%{opacity:0}}

/* Help me decide — toggle lives inside the search bar */
.help-toggle{
  position:absolute;right:8px;top:50%;transform:translateY(-50%);z-index:3;
  display:inline-flex;align-items:center;gap:6px;
  font-family:var(--mono);font-size:11px;color:var(--ink);letter-spacing:.02em;font-weight:600;
  padding:6px 10px;border-radius:7px;
  background:rgba(15,17,21,.09);border:1px solid var(--b-2);
  cursor:pointer;transition:background 140ms,border-color 140ms,color 140ms;
}
.help-toggle:hover{background:rgba(15,17,21,.14);border-color:var(--ink-3);color:var(--ink)}
.help-toggle.is-open{background:var(--ink);border-color:var(--ink);color:#fff}
.help-toggle.is-open .help-chev{color:rgba(255,255,255,.7)}
.help-chev{font-family:var(--mono);font-size:10px;color:var(--ink-3);width:8px;text-align:center}
#help-panel{
  width:100%;max-width:860px;margin:10px auto 0;
  background:rgba(255,255,255,.82);
  border:1px solid var(--b);border-radius:13px;
  box-shadow:0 10px 28px rgba(26,26,36,.07), 0 1px 0 rgba(255,255,255,.8) inset;
  backdrop-filter:blur(12px);overflow:hidden;
  animation:fadeUp .2s ease;
}
.dd-card{display:flex;flex-direction:column}
.dd-section{padding:12px 16px}
.dd-divider{height:1px;background:var(--b);margin:0}

#output-zone{
  width:100%;max-width:860px;margin:0 auto 20px;
  padding:0 24px;
}
#agent-label{
  font:500 11px/1 'JetBrains Mono',monospace;
  color:var(--ink-3);letter-spacing:.04em;
  display:flex;align-items:center;gap:6px;
  margin-bottom:10px;
}
#output-pre{
  background:var(--surface);
  border:1px solid rgba(255,255,255,.07);
  border-radius:10px;
  padding:16px 20px;
  font:13px/1.65 'JetBrains Mono',monospace;
  color:var(--ink-1);
  white-space:pre-wrap;word-break:break-word;
  max-height:340px;overflow-y:auto;
  margin:0;
}

/* Scan log — persists above advisor cards */
.scan-log{
  background:rgba(255,255,255,.55);border:1px solid var(--b);border-radius:10px;
  padding:14px 18px;margin-bottom:12px;
  display:flex;flex-direction:column;gap:7px;
}
.scan-line{
  font:13px/1.5 'JetBrains Mono',monospace;color:var(--ink-2);
  display:flex;align-items:baseline;gap:10px;
}
.scan-check{
  font-size:15px;font-weight:700;color:#10b981;flex-shrink:0;width:16px;
}

/* Roles table */
.roles-table{
  width:100%;border-collapse:collapse;
  font-family:var(--mono);font-size:13px;color:var(--ink);
  margin-top:4px;
}
.roles-table th{
  text-align:left;font-size:10px;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;color:var(--ink-2);
  padding:0 8px 8px 0;border-bottom:1px solid var(--b);
}
.roles-table td{
  padding:9px 8px 9px 0;border-bottom:1px solid rgba(15,17,21,.06);
  vertical-align:top;
}
.rt-title{font-weight:700;color:var(--ink);max-width:280px}
.rt-loc{color:var(--ink-2);white-space:nowrap}
.rt-score{font-weight:800;color:#6366f1;white-space:nowrap;font-size:14px}
.rt-reason{color:var(--ink-2);font-size:12px}
.rt-apply{white-space:nowrap}
.apply-link{
  display:inline-block;
  font-family:var(--mono);font-size:11px;font-weight:700;
  color:#fff;background:#6366f1;
  padding:5px 12px;border-radius:6px;text-decoration:none;
  letter-spacing:.04em;transition:background 130ms;
}
.apply-link:hover{background:#4f46e5}

/* Pipeline steps band */
#pipeline-band{
  width:100%;max-width:860px;margin:0 auto;
  padding:10px 24px 4px;
  display:flex;flex-direction:column;gap:4px;
  position:relative;z-index:2;
}
.pb-step{
  display:flex;align-items:baseline;gap:8px;
  font-family:var(--mono);font-size:12px;color:var(--ink-3);
  transition:color 0.2s;
}
.pb-step.pb-done{color:var(--ink-2)}
.pb-icon{
  font-size:11px;color:var(--ink-4);width:12px;flex-shrink:0;
  font-weight:700;
}
.pb-step.pb-done .pb-icon{color:#10b981}

/* Thinking card */
.thinking-card{
  background:rgba(255,255,255,.6);border:1px solid var(--b);border-radius:10px;
  padding:14px 18px;margin-bottom:8px;
  font:12px/1.6 'JetBrains Mono',monospace;color:var(--ink-3);
}

/* Fit score card */
.fit-card{
  display:flex;align-items:center;gap:20px;
  background:linear-gradient(135deg,#4338ca 0%,#6366f1 100%);
  border-radius:12px;padding:20px 24px;margin-bottom:10px;color:#fff;
}
.fit-left{display:flex;align-items:baseline;gap:3px}
.fit-num{font-size:52px;font-weight:700;line-height:1;letter-spacing:-.03em}
.fit-denom{font-size:15px;color:rgba(255,255,255,.55);font-weight:500;padding-bottom:5px}
.fit-right{flex:1;display:flex;flex-direction:column;gap:6px}
.fit-lbl{font-size:18px;font-weight:600;letter-spacing:-.01em}
.fit-bar-wrap{height:4px;background:rgba(255,255,255,.25);border-radius:2px}
.fit-bar-fill{height:100%;background:#fff;border-radius:2px;transition:width 1.2s cubic-bezier(.4,0,.2,1)}
.fit-sub{font-size:10px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.1em;font-family:var(--mono)}

/* Section cards */
.section-card{
  background:rgba(255,255,255,.65);
  border:1px solid var(--b);border-left:3px solid;
  border-radius:10px;padding:12px 16px;margin-bottom:8px;
  backdrop-filter:blur(8px);
}
.sc-label{
  font-family:var(--mono);font-size:9.5px;font-weight:700;letter-spacing:.16em;
  text-transform:uppercase;margin-bottom:8px;
  display:flex;align-items:center;gap:6px;
}
.sc-label::before{content:"◎";font-size:9px;opacity:.7}
.sc-body{font-family:var(--mono);font-size:14px;line-height:1.7;color:var(--ink)}
.sc-bullet{position:relative;padding-left:14px;margin:2px 0}
.sc-bullet::before{content:"•";position:absolute;left:0;opacity:.5}
.sc-line{margin:2px 0}

/* Pipeline tracker */
.pipeline-tracker{
  background:rgba(255,255,255,.6);border:1px solid var(--b);border-radius:10px;
  padding:14px 18px;margin-top:10px;
  font-family:var(--mono);font-size:12px;
}
.pipeline-hdr{
  display:flex;align-items:center;gap:8px;
  font-size:11px;font-weight:600;color:var(--ink);
  margin-bottom:10px;letter-spacing:.02em;
}
.pl-plan{color:#6366f1}
.pl-count{margin-left:auto;color:var(--ink-3);font-size:10px}
.pl-step{
  display:flex;align-items:flex-start;gap:10px;
  padding:5px 0;color:var(--ink-3);font-size:11.5px;
  border-top:1px solid rgba(15,17,21,.05);
}
.pl-check{color:#10b981;font-size:12px;flex-shrink:0}
.pl-done{
  margin-top:10px;padding-top:10px;border-top:1px solid var(--b);
  font-size:10.5px;color:#10b981;font-weight:600;letter-spacing:.02em;
}

/* Where to go next (in output zone) */
.out-next{margin-top:10px}
.out-next-hdr{
  font-family:var(--mono);font-size:9px;font-weight:700;
  letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3);margin-bottom:8px;
}
.out-next-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.out-next-card{
  display:flex;justify-content:space-between;align-items:center;
  background:rgba(255,255,255,.65);border:1px solid var(--b);
  border-radius:8px;padding:10px 12px;text-decoration:none;
  transition:background 130ms,border-color 130ms;
}
.out-next-card:hover{background:rgba(255,255,255,.9);border-color:var(--b-2)}
.onc-label{font-family:var(--mono);font-size:11px;font-weight:600;color:var(--ink)}
.onc-cta{font-family:var(--mono);font-size:9px;color:var(--ink-3);letter-spacing:.06em;text-transform:uppercase}
.thinking-label{
  font-family:var(--mono);font-size:10px;color:var(--accent);
  margin-left:10px;opacity:.8;letter-spacing:.03em;
  animation:fadeUp .3s ease;
}
.thinking-steps{
  color:var(--ink-3);font-style:italic;
  animation:fadeUp .25s ease;
}
/* Recent zone */
#recent-zone{
  width:100%;max-width:1240px;margin:14px auto 0;
  padding:0 24px;
  display:grid;grid-template-columns:1fr;gap:10px;
}
.agents-grid{
  display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;
}
.agent-pill{
  display:inline-flex;align-items:center;gap:7px;
  padding:6px 12px;border-radius:8px;
  background:rgba(255,255,255,.5);border:1px solid var(--b);
  transition:background 120ms;
}
.agent-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.agent-name{font-family:var(--sans);font-size:12.5px;font-weight:600;color:var(--ink-2)}
.agent-tag{font-family:var(--mono);font-size:10px;color:var(--ink-3);margin-left:2px}
.test-badge{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.3);color:#92400e;font-weight:600}




.recent-card{
  padding:16px 18px;
  background:rgba(255,255,255,.6);
  border:1px solid var(--b);border-radius:12px;
  backdrop-filter:blur(10px);
  min-height:0;height:100%;
}

.dd-label{
  display:flex;align-items:center;justify-content:space-between;
  font-family:var(--mono);font-size:12.5px;font-weight:700;color:var(--ink);
  text-transform:uppercase;letter-spacing:.18em;margin-bottom:12px;
  padding-bottom:8px;border-bottom:1px solid var(--b);
}
.dd-label > span:first-child{
  position:relative;padding-left:14px;
}
.dd-label > span:first-child::before{
  content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);
  width:6px;height:6px;border-radius:2px;background:var(--accent);
  box-shadow:0 0 8px rgba(236,72,153,.55);
}
.dd-meta{display:inline-flex;align-items:center;gap:4px;color:var(--ink-3);text-transform:none;letter-spacing:.02em;font-weight:500;font-size:10.5px}
.suggest-list{list-style:none;display:flex;flex-direction:column;gap:1px;animation:fadeUp .35s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.suggest-row{
  display:flex;align-items:center;gap:12px;
  padding:7px 8px;margin:0 -8px;border-radius:6px;
  cursor:pointer;transition:background 120ms,color 120ms;
}
.suggest-row:hover{background:rgba(236,72,153,.08)}
.suggest-arrow{font-family:var(--mono);font-size:11px;color:var(--ink-4);width:10px;flex-shrink:0}
.suggest-row:hover .suggest-arrow{color:var(--accent)}
.suggest-q{flex:1;font-family:var(--sans);font-size:13px;color:var(--ink-2);letter-spacing:-.003em}
.suggest-row:hover .suggest-q{color:var(--ink)}
.suggest-agent{
  font-family:var(--mono);font-size:9px;font-weight:600;
  padding:2px 7px;border-radius:4px;
  letter-spacing:.06em;text-transform:uppercase;flex-shrink:0;
  color:var(--ink-3);background:rgba(15,17,21,.04);border:1px solid var(--b);
}
.recent-row{display:flex;align-items:flex-start;gap:12px;padding:5px 0}
.recent-time{font-family:var(--mono);font-size:11px;color:var(--ink-3);width:30px;flex-shrink:0;padding-top:1px;letter-spacing:.02em}
.recent-text{font-family:var(--sans);font-size:13.5px;color:var(--ink-2);line-height:1.45;letter-spacing:-.003em;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.recent-text b{color:var(--ink);font-weight:600}
.recent-sub{color:var(--ink-3)}
.live-dot{width:5px;height:5px;border-radius:50%;background:#10b981;box-shadow:0 0 6px #10b981;animation:dot-pulse 1.8s ease-in-out infinite;display:inline-block;margin-right:4px}

.today-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:2px}
.stat{display:flex;flex-direction:column;gap:2px;padding:8px 10px;background:rgba(255,255,255,.5);border:1px solid var(--b);border-radius:8px}
.stat-num{font-family:var(--mono);font-size:18px;font-weight:600;color:var(--ink);letter-spacing:-.01em}
.stat-lbl{font-family:var(--mono);font-size:9.5px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em}

/* Inbox signals rail */
.rc-inbox{
  background:rgba(255,255,255,.55);
  border-left:2px solid rgba(236,72,153,.35);
}

.signal-row{
  padding:11px 0;border-top:1px solid rgba(15,17,21,.06);
}
.signal-row:first-of-type{border-top:none;padding-top:4px}
.signal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
.signal-tag{
  font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:.1em;
  padding:2px 6px;border-radius:3px;
}
/* Agent-aligned tag colors: matches dock + Running Now dots */
.tag-job{background:rgba(129,140,248,.14);color:#4338ca;border:1px solid rgba(129,140,248,.35)}
.tag-reply{background:rgba(167,139,250,.14);color:#6d28d9;border:1px solid rgba(167,139,250,.35)}
.tag-booked{background:rgba(52,211,153,.14);color:#047857;border:1px solid rgba(52,211,153,.35)}
.signal-time{font-family:var(--mono);font-size:10px;color:var(--ink-3)}
.signal-title{font-family:var(--sans);font-size:13px;color:var(--ink);font-weight:600;line-height:1.35;letter-spacing:-.005em}
.signal-sub{font-family:var(--sans);font-size:11.5px;color:var(--ink-3);margin-top:2px;line-height:1.4}

/* Upcoming — intentionally quiet */
.rc-upcoming{background:linear-gradient(180deg, rgba(253,242,248,.5), rgba(253,242,248,.2));border:1px solid rgba(236,72,153,.18)}
.rc-upcoming .dd-label{color:var(--ink-2)}
.up-row{display:flex;gap:12px;padding:8px 0;border-top:1px dashed rgba(15,17,21,.06)}
.up-row:first-of-type{border-top:none;padding-top:2px}
.up-when{
  font-family:var(--mono);font-size:9.5px;color:var(--ink-4);
  text-transform:uppercase;letter-spacing:.1em;line-height:1.35;
  width:36px;flex-shrink:0;text-align:right;padding-top:1px;
}
.up-when b{display:block;font-size:11px;color:var(--ink-3);font-weight:500;letter-spacing:.02em;margin-top:1px}
.up-body{min-width:0;flex:1}
.up-title{font-family:var(--sans);font-size:12.5px;color:var(--ink-3);font-weight:500;line-height:1.35;letter-spacing:-.003em}
.up-sub{font-family:var(--sans);font-size:11px;color:var(--ink-4);margin-top:1px;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}






/* Run Contact Scan card */
.scan-card{
  text-align:left;cursor:pointer;
  transition:border-color .15s,background .15s,opacity .15s;
}
.scan-card:hover:not(:disabled){background:rgba(30,64,175,.06);border-color:rgba(96,165,250,.4)}
.scan-card--idle{opacity:.55;cursor:default}
.scan-card--loading{opacity:.8;cursor:default}
.scan-name{font-weight:700}

/* Eval footer — single line */
#telem{
  flex-shrink:0;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:0 10px;
  margin:8px auto 10px;padding:0 28px;
  font-family:var(--mono);font-size:11px;color:var(--ink-2);
  text-decoration:none;transition:color 140ms;
  max-width:780px;
}
#telem:hover{color:var(--ink)}
#telem .tel-key{font-size:9.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3);margin-right:4px}
.tel-pair{display:inline-flex;align-items:baseline;gap:5px}
.tel-k{color:var(--ink-3);font-size:10px;letter-spacing:.04em}
.tel-v{color:var(--ink);font-weight:600;font-size:11.5px;letter-spacing:.01em}
.tel-v.accent{color:var(--accent)}
.tel-delta{color:#059669;font-size:9.5px;font-weight:600;margin-left:2px}
.tel-sep{color:var(--ink-4);margin:0 1px}
.tel-shadow{
  margin-left:4px;padding:1px 6px;border-radius:3px;
  font-size:8.5px;font-weight:600;letter-spacing:.05em;
  background:rgba(236,72,153,.12);color:var(--accent-2);border:1px solid rgba(236,72,153,.3);
}

/* Dock */
/* Where to go next */
#next-zone{width:100%;max-width:860px;margin:0 auto;padding:10px 24px 4px;flex-shrink:0}
.next-header{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.next-star{color:var(--ink-3);font-size:11px}
.next-title{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)}
.next-sub{font-size:11px;color:var(--ink-4);margin-left:4px}
.next-grid{display:flex;flex-direction:column;gap:8px}
.next-card{display:flex;align-items:center;gap:14px;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px 18px;text-decoration:none;transition:border-color .15s,background .15s}
.next-card:hover{background:var(--surface-2);border-color:var(--border-2)}
.next-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.next-body{display:flex;flex-direction:column;gap:2px;min-width:0}
.next-name{font-size:15px;font-weight:700;color:var(--ink);white-space:nowrap}
.next-desc{font-size:13px;color:var(--ink-2);margin-top:2px}
.next-cta{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-top:5px}
@media(max-width:700px){.next-grid{grid-template-columns:1fr 1fr}}

#dock-row{display:flex;justify-content:center;padding:6px 16px 8px;flex-shrink:0;overflow-x:auto}
#dock-wrap{display:inline-flex;flex-direction:column;align-items:stretch;gap:6px}
.dock-label{
  display:flex;align-items:baseline;justify-content:space-between;gap:12px;
  padding:0 8px;
  font-family:var(--mono);font-size:11px;font-weight:600;color:var(--ink);
  text-transform:uppercase;letter-spacing:.16em;
}
.dock-label .dock-meta{color:var(--ink-3);font-weight:400;font-size:10px;letter-spacing:.04em;text-transform:none}
#dock{
  display:flex;align-items:flex-start;gap:6px;
  padding:14px 16px 12px;
  background:rgba(255,255,255,.7);
  backdrop-filter:blur(40px) saturate(1.6);
  border:1px solid rgba(255,255,255,.9);
  border-radius:22px;flex-shrink:0;
  box-shadow:0 16px 40px rgba(26,26,36,.12), 0 1px 0 rgba(255,255,255,.9) inset;
}
.di-cell{
  display:flex;flex-direction:column;align-items:center;gap:6px;
  width:78px;cursor:pointer;padding:2px 4px;
}
.di{
  width:54px;height:54px;border-radius:11px;
  display:flex;align-items:center;justify-content:center;overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
  box-shadow:0 1px 0 rgba(255,255,255,.18) inset, 0 -1px 0 rgba(0,0,0,.25) inset, 0 6px 16px rgba(15,17,21,.22);
  transition:transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms;
}
.di svg{display:block;shape-rendering:geometricPrecision}
.di-cell:hover .di{transform:translateY(-5px);box-shadow:0 1px 0 rgba(255,255,255,.22) inset, 0 -1px 0 rgba(0,0,0,.3) inset, 0 14px 26px rgba(15,17,21,.28)}
.di-cell:active .di{transform:scale(.94);transition-duration:80ms}
.di-label{
  font-family:var(--sans);font-size:10.5px;font-weight:600;
  color:var(--ink);letter-spacing:-.005em;text-align:center;margin-top:1px;
}
.di-tag{
  font-family:var(--mono);font-size:8.5px;color:var(--ink-3);
  text-transform:uppercase;letter-spacing:.08em;text-align:center;
}

@media (prefers-reduced-motion:reduce){
  .di,.sb-dot,#agent-dot{animation:none;transition:none}
}
`;

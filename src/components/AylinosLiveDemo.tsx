import { useEffect, useRef, useState } from "react";

type PipelineStep = { label: string; sub?: string };
type NextItem = { label: string; url: string };

type NextSteps = {
  type: "next_steps";
  items: NextItem[];
  pipeline_steps: PipelineStep[];
  color: string;
};

type RouteEvent = { type: "route"; agent: string; reason?: string };
type TokenEvent = { type: "token"; text: string };
type StreamEvent = RouteEvent | TokenEvent | NextSteps | { type: string; [k: string]: unknown };

const ENDPOINT = "https://aylinos.onrender.com/api/stream";

const SUGGESTIONS = [
  "Find me PM roles at AI startups",
  "Draft an intro to a Series A founder",
  "Build a pricing tier for a usage-based API",
];

export function AylinosLiveDemo() {
  const [query, setQuery] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [output, setOutput] = useState("");
  const [agent, setAgent] = useState<RouteEvent | null>(null);
  const [next, setNext] = useState<NextSteps | null>(null);
  const [checkedCount, setCheckedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Sequentially check off pipeline steps when next_steps arrives.
  useEffect(() => {
    if (!next) return;
    setCheckedCount(0);
    const total = next.pipeline_steps.length;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCheckedCount(i);
      if (i >= total) window.clearInterval(id);
    }, 450);
    return () => window.clearInterval(id);
  }, [next]);

  const reset = () => {
    setOutput("");
    setAgent(null);
    setNext(null);
    setCheckedCount(0);
    setError(null);
  };

  const submit = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || streaming) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    reset();
    setStreaming(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const raw of lines) {
          const line = raw.trim();
          if (!line) continue;
          const json = line.startsWith("data:") ? line.slice(5).trim() : line;
          if (!json) continue;
          let evt: StreamEvent;
          try {
            evt = JSON.parse(json) as StreamEvent;
          } catch {
            continue;
          }
          if (evt.type === "route") setAgent(evt as RouteEvent);
          else if (evt.type === "token") setOutput((o) => o + (evt as TokenEvent).text);
          else if (evt.type === "next_steps") setNext(evt as NextSteps);
        }
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setError((e as Error).message || "Stream failed");
      }
    } finally {
      setStreaming(false);
    }
  };

  useEffect(() => () => abortRef.current?.abort(), []);

  const accent = next?.color ?? "#e11d48"; // rose-600 fallback

  return (
    <div className="mx-auto max-w-[1280px] mt-8">
      {/* Search bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
        className="flex gap-2 rounded-2xl border border-stone-200 bg-white/80 backdrop-blur p-2 shadow-sm"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try it live — ask AylinOS anything…"
          className="flex-1 bg-transparent px-3 py-2 text-[15px] text-stone-800 placeholder:text-stone-400 focus:outline-none"
          disabled={streaming}
        />
        <button
          type="submit"
          disabled={streaming || !query.trim()}
          className="rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-white text-sm font-medium transition-colors"
        >
          {streaming ? "Running…" : "Run"}
        </button>
      </form>

      {/* Suggestion chips */}
      {!output && !streaming && !next && (
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setQuery(s);
                submit(s);
              }}
              className="text-xs text-stone-600 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-full px-3 py-1.5 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Streamed output panel */}
      {(agent || output || streaming || error) && (
        <div className="mt-4 rounded-2xl border border-stone-200 bg-white/90 backdrop-blur p-5 shadow-sm">
          {agent && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-stone-500">
                Routed to
              </span>
              <span
                className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: accent }}
              >
                {agent.agent}
              </span>
              {agent.reason && (
                <span className="text-xs text-stone-500 italic">— {agent.reason}</span>
              )}
            </div>
          )}
          {error ? (
            <p className="text-sm text-rose-600">Couldn't reach the live demo: {error}</p>
          ) : (
            <pre className="whitespace-pre-wrap font-sans text-[14px] text-stone-800 leading-relaxed">
              {output}
              {streaming && <span className="inline-block w-1.5 h-4 ml-0.5 bg-stone-400 animate-pulse align-middle" />}
            </pre>
          )}
        </div>
      )}

      {/* What happens next + Where to go next */}
      {next && (
        <div className="mt-6 grid md:grid-cols-2 gap-6 animate-fade-in">
          {/* Pipeline */}
          <div
            className="rounded-2xl border bg-white/90 backdrop-blur p-5 shadow-sm"
            style={{ borderColor: `${accent}55` }}
          >
            <div
              className="text-[11px] uppercase tracking-[0.14em] font-semibold mb-4"
              style={{ color: accent }}
            >
              What happens next
            </div>
            <ul className="space-y-3">
              {next.pipeline_steps.map((step, i) => {
                const checked = i < checkedCount;
                return (
                  <li
                    key={`${step.label}-${i}`}
                    className="flex items-start gap-3 transition-opacity"
                    style={{ opacity: checked ? 1 : 0.45 }}
                  >
                    <span
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: checked ? accent : "transparent",
                        border: `2px solid ${accent}`,
                      }}
                    >
                      {checked && (
                        <svg viewBox="0 0 16 16" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M3 8.5l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[14px] font-medium text-stone-800">{step.label}</div>
                      {step.sub && (
                        <div className="text-[12px] text-stone-500 mt-0.5">{step.sub}</div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Where to go next */}
          <div
            className="rounded-2xl border bg-white/90 backdrop-blur p-5 shadow-sm"
            style={{ borderColor: `${accent}55` }}
          >
            <div
              className="text-[11px] uppercase tracking-[0.14em] font-semibold mb-4"
              style={{ color: accent }}
            >
              Where to go next
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {next.items.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 px-3.5 py-3 transition-colors"
                  style={{ borderLeftWidth: 3, borderLeftColor: accent }}
                >
                  <span className="text-[14px] font-medium text-stone-800 group-hover:text-stone-900">
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-medium transition-transform group-hover:translate-x-0.5"
                    style={{ color: accent }}
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

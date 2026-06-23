import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Github, Linkedin, Briefcase, Database, MessageSquare, Workflow, ChevronDown, Languages, History, Search, Sparkles, ListOrdered, Gavel, CalendarCheck, MailCheck, type LucideIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import dashboardImg from "@/assets/portfolio-dashboard.jpg";
import emailGenImg from "@/assets/email-generator-screenshot.png";
import complianceRagImg from "@/assets/project-3-compliance-rag.png";
import forkYeahResults from "@/assets/fork-yeah-results.png";
import forkYeahLoading from "@/assets/fork-yeah-loading.png";
import gtmHome from "@/assets/gtm-pricing-home.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aylin Uyar — AI Deployment, Strategy & Ops Portfolio" },
      {
        name: "description",
        content:
          "Aylin Uyar — Tuck MBA 2026, ex-Deloitte Tech Strategy, PM Intern at Skild AI. Six live, shipped AI projects across deployment, strategy, and ops — Claude pipelines, agentic email automation, RAG compliance, and a consumer makeup app.",
      },
      { property: "og:title", content: "Aylin Uyar — AI Deployment, Strategy & Ops Portfolio" },
      {
        property: "og:description",
        content:
          "Six live AI projects shipped end-to-end. Operator-level AI thinking from a Tuck MBA + ex-Deloitte strategist.",
      },
      { property: "og:url", content: "https://aylin-uyar-portfolio.lovable.app/" },
      { name: "twitter:title", content: "Aylin Uyar — AI Deployment, Strategy & Ops Portfolio" },
      {
        name: "twitter:description",
        content:
          "Six live AI projects shipped end-to-end. Operator-level AI thinking from a Tuck MBA + ex-Deloitte strategist.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://aylin-uyar-portfolio.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Aylin Uyar",
          url: "https://aylin-uyar-portfolio.lovable.app/",
          jobTitle: "MBA Candidate · AI Deployment, Strategy & Ops",
          alumniOf: [
            { "@type": "CollegeOrUniversity", name: "Tuck School of Business at Dartmouth" },
          ],
          worksFor: { "@type": "Organization", name: "Skild AI" },
          sameAs: [
            "https://www.linkedin.com/in/aylinuyar/",
            "https://github.com/aylineuyar-arch",
          ],
          knowsAbout: [
            "AI Deployment",
            "AI Strategy",
            "AI Operations",
            "Claude",
            "Agentic Workflows",
            "RAG",
            "Product Management",
          ],
        }),
      },
    ],
  }),
  component: PortfolioPage,
});

// Color palette per tech tag
const TAG_COLORS: Record<string, string> = {
  default: "bg-stone-100 text-stone-700 border-stone-300",
  Claude: "bg-orange-50 text-orange-800 border-orange-300",
  Python: "bg-blue-50 text-blue-800 border-blue-300",
  Greenhouse: "bg-green-50 text-green-800 border-green-300",
  Lever: "bg-purple-50 text-purple-800 border-purple-300",
  Ashby: "bg-indigo-50 text-indigo-800 border-indigo-300",
  JSearch: "bg-amber-50 text-amber-800 border-amber-300",
  Railway: "bg-violet-50 text-violet-800 border-violet-300",
  Lovable: "bg-rose-50 text-rose-800 border-rose-300",
  TypeScript: "bg-sky-50 text-sky-800 border-sky-300",
  TanStack: "bg-teal-50 text-teal-800 border-teal-300",
  Streamlit: "bg-red-50 text-red-800 border-red-300",
  Cursor: "bg-slate-100 text-slate-800 border-slate-300",
};

// Real brand logos. simpleicons CDN for most; Lovable uses its own favicon; concepts use Lucide icons.
type ToolLogo = { src?: string; icon?: LucideIcon; bg: string; iconClass?: string };
const TOOL_LOGOS: Record<string, ToolLogo> = {
  Claude: { src: "https://cdn.simpleicons.org/claude", bg: "bg-orange-50 ring-orange-200" },
  Python: { src: "https://cdn.simpleicons.org/python", bg: "bg-blue-50 ring-blue-200" },
  Railway: { src: "https://cdn.simpleicons.org/railway", bg: "bg-violet-50 ring-violet-200" },
  React: { src: "https://cdn.simpleicons.org/react", bg: "bg-sky-50 ring-sky-200" },
  TypeScript: { src: "https://cdn.simpleicons.org/typescript", bg: "bg-blue-50 ring-blue-200" },
  Lovable: { src: "https://lovable.dev/favicon.ico", bg: "bg-rose-50 ring-rose-200" },
  Streamlit: { src: "https://cdn.simpleicons.org/streamlit", bg: "bg-red-50 ring-red-200" },
  ATS: { icon: Briefcase, bg: "bg-amber-50 ring-amber-200", iconClass: "text-amber-700" },
  RAG: { icon: Database, bg: "bg-emerald-50 ring-emerald-200", iconClass: "text-emerald-700" },
  NLP: { icon: MessageSquare, bg: "bg-cyan-50 ring-cyan-200", iconClass: "text-cyan-700" },
  Triage: { icon: Workflow, bg: "bg-indigo-50 ring-indigo-200", iconClass: "text-indigo-700" },
  n8n: { src: "https://cdn.simpleicons.org/n8n/EA4B71", bg: "bg-pink-50 ring-pink-200" },
  Cursor: { src: "https://cdn.simpleicons.org/cursor", bg: "bg-slate-50 ring-slate-200" },
  Resend: { src: "https://cdn.simpleicons.org/resend/000000", bg: "bg-stone-50 ring-stone-200" },
  Supabase: { src: "https://cdn.simpleicons.org/supabase/3FCF8E", bg: "bg-emerald-50 ring-emerald-200" },
  LangGraph: { src: "https://cdn.simpleicons.org/langchain/1C3C3C", bg: "bg-teal-50 ring-teal-200" },
  Playwright: { src: "https://playwright.dev/img/playwright-logo.svg", bg: "bg-green-50 ring-green-200" },
  Tavily: { src: "https://www.tavily.com/favicon.ico", bg: "bg-violet-50 ring-violet-200" },
  FastAPI: { src: "https://cdn.simpleicons.org/fastapi/009688", bg: "bg-teal-50 ring-teal-200" },
  ChromaDB: { icon: Database, bg: "bg-amber-50 ring-amber-200", iconClass: "text-amber-700" },
  OpenTable: { icon: Briefcase, bg: "bg-red-50 ring-red-200", iconClass: "text-red-700" },
};

function ToolIcons({ tools }: { tools: string[] }) {
  const withLogos = tools.filter((t) => TOOL_LOGOS[t]);
  if (withLogos.length === 0) return null;
  return (
    <TooltipProvider delayDuration={100}>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {withLogos.map((t) => {
          const logo = TOOL_LOGOS[t]!;
          const Icon = logo.icon;
          return (
            <Tooltip key={t}>
              <TooltipTrigger asChild>
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full ring-1 shadow-sm cursor-default ${logo.bg}`}
                >
                  {Icon ? (
                    <Icon className={`w-4 h-4 ${logo.iconClass ?? ""}`} strokeWidth={2} />
                  ) : (
                    <img src={logo.src} alt={t} className="w-4 h-4" loading="lazy" />
                  )}
                </span>
              </TooltipTrigger>
              <TooltipContent>{t}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

function Tag({ label }: { label: string }) {
  const key = Object.keys(TAG_COLORS).find((k) => label.includes(k)) ?? "default";
  return (
    <span
      className={`border px-2.5 py-1 rounded-full text-xs font-medium ${TAG_COLORS[key]}`}
    >
      {label}
    </span>
  );
}

function GradientDivider() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
      <div className="mt-1 h-[3px] bg-gradient-to-r from-transparent via-rose-500 to-transparent rounded-full" />
      <div className="mt-1 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
    </div>
  );
}

type AgentStep = { label: string; sub: string; tone: "rose" | "amber" | "violet" | "emerald" | "sky" | "judge"; Icon: LucideIcon };

function AgentFlowMarquee({ steps }: { steps: AgentStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stepNum = Object.fromEntries(steps.map((s, i) => [s.label, i + 1]));
  const tones: Record<string, string> = {
    rose: "bg-rose-50 text-rose-700 ring-rose-200",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
    violet: "bg-violet-50 text-violet-700 ring-violet-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    sky: "bg-sky-50 text-sky-700 ring-sky-200",
    judge: "bg-stone-100 text-stone-800 ring-1 ring-stone-400 border border-dashed border-stone-500",
  };
  const bubbleTones: Record<string, string> = {
    rose: "bg-rose-500 text-white",
    amber: "bg-amber-500 text-white",
    violet: "bg-violet-500 text-white",
    emerald: "bg-emerald-500 text-white",
    sky: "bg-sky-500 text-white",
    judge: "bg-stone-500 text-white",
  };
  // Normal content + normal animation = leftward motion (right→left), steps appear in 1→8 order from left to right.
  const cycle: Array<{ kind: "start" } | { kind: "end" } | ({ kind: "step" } & AgentStep)> = [
    { kind: "start" },
    ...steps.map((s) => ({ kind: "step" as const, ...s })),
    { kind: "end" },
  ];
  const loop = [...cycle, ...cycle];

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white/95 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white/95 to-transparent z-10" />
      <div
        className="flex w-max animate-marquee gap-1.5 py-1"
        style={{ animationPlayState: inView ? "running" : "paused", animationDirection: "normal" }}
      >
        {loop.map((item, i) => {
          if (item.kind === "start") {
            return (
              <div key={`s-${i}`} className="flex items-center shrink-0 px-2 text-emerald-600" aria-label="start">
                <span className="text-base leading-none">▶</span>
              </div>
            );
          }
          if (item.kind === "end") {
            return (
              <div key={`e-${i}`} className="flex items-center shrink-0 px-2 text-amber-500" aria-label="end">
                <span className="text-base leading-none">★</span>
              </div>
            );
          }
          const s = item;
          const Icon = s.Icon;
          const isLastStep = i > 0 && loop[i + 1]?.kind === "end";
          const num = stepNum[s.label];
          return (
            <div key={`${s.label}-${i}`} className="flex items-stretch gap-1 shrink-0">
              <div className={`relative rounded-lg px-2 py-3 ring-1 ${tones[s.tone]} flex flex-col items-center justify-center w-[112px]`}>
                <span className={`absolute top-1 left-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full text-[11px] font-bold leading-none tabular-nums ring-1 ring-white/70 shadow-sm ${bubbleTones[s.tone]}`}>
                  {num}
                </span>
                <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden />
                <div className="mt-1.5 w-full text-center text-[13px] font-semibold leading-none">{s.label}</div>
                <div className="mt-1 w-full text-center text-[10.5px] tracking-wide opacity-70 leading-none">{s.sub}</div>
              </div>
              {!isLastStep && (
                <div className="flex items-center text-stone-400 text-sm" aria-hidden>→</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProjectCollapse({
  id,
  num,
  numCls,
  title,
  sub,
  children,
}: {
  id: string;
  num: string;
  numCls: string;
  title: ReactNode;
  sub?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const sync = () => {
      if (typeof window !== "undefined" && window.location.hash === `#${id}`) {
        setOpen(true);
      }
    };
    sync();
    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", sync);
      return () => window.removeEventListener("hashchange", sync);
    }
  }, [id]);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="group w-full flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white/70 hover:bg-white/90 hover:border-rose-300 px-5 py-4 text-left transition-colors">
        <div className="flex flex-col min-w-0">
          <span className={`text-[11px] uppercase tracking-[0.22em] font-semibold ${numCls}`}>{num}</span>
          <span className="mt-1 text-xl md:text-2xl font-light tracking-tight text-stone-900 truncate">{title}</span>
          {sub && <span className="mt-1 text-xs text-stone-500">{sub}</span>}
        </div>
        <span className="flex items-center gap-2 shrink-0 text-stone-500">
          <span className="hidden sm:inline text-[11px] uppercase tracking-wider group-data-[state=open]:hidden">Expand</span>
          <span className="hidden sm:inline text-[11px] uppercase tracking-wider group-data-[state=closed]:hidden">Collapse</span>
          <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]:rotate-180" />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-8">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}




function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdf8f3] via-[#faf3ec] to-[#f5ede2] text-stone-900">
      {/* Built & shipped badge — fixed top right */}
      <div className="fixed top-4 right-4 z-50 w-[244px] rounded-xl border border-rose-200 bg-white/95 backdrop-blur px-4 py-3 shadow-lg shadow-rose-900/10">
        <p className="text-[13.5px] leading-snug font-medium text-stone-900">
          Built &amp; shipped by{" "}
          <span className="text-rose-600 font-semibold">Aylin Uyar</span>.
        </p>
        <div className="mt-2 grid grid-cols-2 gap-1.5 border-t border-stone-200 pt-2">
          <a
            href="https://github.com/aylineuyar-arch"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-stone-900 px-2 py-1.5 text-white text-[11px] font-medium transition-transform hover:scale-[1.02]"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/aylinuyar/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[#0A66C2] px-2 py-1.5 text-white text-[11px] font-medium transition-transform hover:scale-[1.02]"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Hero */}
      <header className="relative mx-auto max-w-6xl px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <h1 className="text-5xl md:text-7xl font-light leading-[1.05] tracking-tight flex flex-wrap items-end gap-x-5 gap-y-2 pr-[240px]">
          <span>Aylin Uyar</span>
          <span className="text-base md:text-lg uppercase tracking-[0.3em] text-rose-600 font-medium pb-2 md:pb-3">
            AI Portfolio
          </span>
        </h1>

        {/* Tagline — the through-line of the work */}
        <p className="mt-4 text-xl md:text-2xl font-light italic text-rose-700">
          Rewiring the workflows you already run.
        </p>

        <p className="mt-6 max-w-4xl text-sm md:text-base text-stone-600 leading-snug">
          Tuck MBA <span className="text-stone-400">|</span> Ex Deloitte and Skild AI <span className="text-stone-400">|</span> AI Deployment, Strategy, Ops
        </p>


        {/* === AylinOS meta-project demo === */}
        <section className="mt-12 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-6 md:px-16 lg:px-24">
          <div className="mx-auto max-w-[1280px] rounded-2xl bg-white/80 backdrop-blur border border-stone-200 overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Video */}
              <div className="relative bg-stone-100 border-b md:border-b-0 md:border-r border-stone-200 md:col-span-3 md:min-h-[520px]">
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600/95 text-white text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 shadow-sm backdrop-blur">
                    Demo — more to come
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600/95 text-white text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 shadow-sm backdrop-blur">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Use case: Job Search
                  </span>
                </div>
                <video
                  src="/__l5e/assets-v1/7617be75-5049-45ba-b653-97f26b957c4c/screen-recording.mp4"
                  autoPlay
                  muted
                  playsInline
                  ref={(el) => {
                    if (!el) return;
                    const updateRate = () => {
                      const t = el.currentTime;
                      // 0–10s: search entry (2x); 10–19s: streaming/composing (4x); 19s+: output (2x)
                      const rate = t >= 10 && t < 19 ? 4 : 2;
                      if (el.playbackRate !== rate) el.playbackRate = rate;
                    };
                    const onEnded = () => {
                      // Hold last frame for 1s before looping
                      window.setTimeout(() => {
                        el.currentTime = 0;
                        el.play().catch(() => {});
                      }, 1000);
                    };
                    el.playbackRate = 2;
                    el.addEventListener("timeupdate", updateRate);
                    el.addEventListener("ended", onEnded);
                  }}
                  className="absolute inset-0 w-full h-full object-cover object-top block opacity-70"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/40" />
              </div>

              {/* Copy */}
              <div className="p-8 md:p-10 flex flex-col justify-center md:col-span-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-rose-600">
                    Featured · The layer above all 6
                  </span>

                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                  </span>
                </div>

                <h2 className="mt-3 text-4xl md:text-5xl font-light leading-[1.05] tracking-tight">
                  <em className="italic">AylinOS</em>
                </h2>

                <p className="mt-4 text-[15px] text-stone-500 leading-relaxed">
                  A personal AI operating system for work <em>and</em> life — the meta-layer that reaches into the 6 projects below.
                </p>

                <div className="mt-7 space-y-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-rose-600 mb-2.5">
                      What it is
                    </div>
                    <p className="text-[15px] text-stone-800 leading-relaxed">
                      One chat, <span className="font-semibold">6 specialized agents</span> —{" "}
                      <span className="font-semibold text-violet-700">Job Search</span>,{" "}
                      <span className="font-semibold text-sky-600">Outreach</span>,{" "}
                      <span className="font-semibold text-emerald-700">Pricing &amp; GTM</span>,{" "}
                      <span className="font-semibold text-amber-700">Policy Desk</span>,{" "}
                      <span className="font-semibold text-cyan-700">Inbox &amp; Reservations</span>, and{" "}
                      <span className="font-semibold text-pink-700">Research</span>.
                    </p>
                    <p className="mt-3 text-[15px] text-stone-800 leading-relaxed">
                      A <span className="font-semibold">router</span> picks the right one, an <span className="font-semibold">LLM-as-judge</span> scores the answer, and each agent's output is <span className="font-semibold">color-coded</span> so you can see who did what.
                    </p>
                  </div>


                  <Collapsible>
                    <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 px-3 py-2 text-[11px] uppercase tracking-[0.14em] font-semibold text-rose-700 transition-colors">
                      <span>See the 6 agents, what it proves, &amp; skills</span>
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3.5 pt-3.5">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-rose-600 mb-1">
                          The 6 agents &amp; what they touch
                        </div>
                        <ul className="text-[14px] text-stone-800 leading-snug space-y-1.5">
                          <li><span className="font-semibold text-violet-700">Job Search</span> — pulls roles from 130+ ATSs, Claude-scores fit, ships an 8am ranked digest <span className="text-stone-500">· Job Dashboard + Email Generator</span></li>
                          <li><span className="font-semibold text-sky-600">Outreach</span> — drafts intros &amp; follow-ups across a 130-target contact graph, human-gated send <span className="text-stone-500">· Outreach engine</span></li>
                          <li><span className="font-semibold text-emerald-700">Pricing &amp; GTM</span> — builds tiers, ICP, comp sets, packaging memos <span className="text-stone-500">· GTM Pricing Tool</span></li>
                          <li><span className="font-semibold text-amber-700">Policy Desk</span> — grounded Q&amp;A across 4 policy domains, returns citations <span className="text-stone-500">· Compliance RAG</span></li>
                          <li><span className="font-semibold text-cyan-700">Inbox &amp; Reservations</span> — sub-1s ticket triage and 8-node reservation graph <span className="text-stone-500">· CS Triage + Fork Yea!</span></li>
                          <li><span className="font-semibold text-pink-700">Research</span> — fan-in briefs, comp pulls, shadow-eval scoring delivered to Drive <span className="text-stone-500">· Research agent → Drive</span></li>
                        </ul>
                      </div>

                      <div>
                        <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-rose-600 mb-1">
                          What it proves
                        </div>
                        <p className="text-[15px] text-stone-800 leading-snug">
                          End-to-end <span className="font-semibold">AI deployment</span>: orchestration, evals, memory, and observability — designed, shipped, and run in production.
                        </p>
                      </div>

                      <div>
                        <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-rose-600 mb-1">
                          Skills on display
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            "Agent orchestration",
                            "LLM-as-judge evals",
                            "Vector memory",
                            "Prompt architecture",
                            "Claude",
                            "Tavily",
                            "SQLite",
                            "TanStack Start",
                          ].map((s) => (
                            <span
                              key={s}
                              className="text-xs font-medium text-stone-700 bg-stone-100 border border-stone-200 rounded-full px-2.5 py-1"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>


                <div className="mt-6 flex items-center gap-4">
                  <a
                    href="https://aylinos.lovable.app"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-rose-600 hover:bg-rose-700 transition-colors px-4 py-2 text-white text-sm font-medium"
                  >
                    Launch AylinOS →
                  </a>
                  <span className="text-xs text-stone-500 font-mono">
                    aylinos.lovable.app
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* === end AylinOS section === */}

        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />

        {/* Combined section header — credibility number + section title */}
        <div className="mt-8 flex items-baseline justify-between gap-4 flex-wrap">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl md:text-4xl font-medium tracking-tight text-rose-600 leading-none">6</span>
            <h3 className="text-base md:text-lg uppercase tracking-[0.18em] text-stone-700 font-semibold">
              AI portfolio projects live in production
            </h3>
          </div>
          <span className="text-sm text-rose-700 font-medium">click any card for details ↓</span>
        </div>
        <div className="mt-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3 items-stretch">
            {[
              { num: "No. 01", id: "project-restaurant", numCls: "text-rose-600", title: "Fork Yea! — Restaurant Reservation Agent", blurb: "Finds and books the right restaurant, with a Haiku judge scoring every pick.", sub: "LangGraph · Claude · Playwright", tools: ["Cursor", "LangGraph", "Claude", "Playwright", "Tavily", "FastAPI"] },
              { num: "No. 02", id: "project-1", numCls: "text-orange-700", title: "AI Job Search Dashboard", blurb: "Scores 130+ ATS feeds for fit and conversion likelihood.", sub: "Claude · Python · Railway", tools: ["Claude", "Python", "Railway", "ATS"] },
              { num: "No. 03", id: "project-gtm", numCls: "text-teal-700", title: "GTM Pricing Tool", blurb: "Models revenue, pricing, and scenarios for founders, consultants, operators, and investors.", sub: "Claude · Python · Railway", tools: ["Claude", "Python", "Railway"] },
              { num: "No. 04", id: "project-2", numCls: "text-amber-700", title: "Agentic Email Generator", blurb: "Always-on agent emails a ranked digest at 8am ET daily.", sub: "n8n · Claude · Supabase", tools: ["Claude", "n8n", "Railway", "Resend", "Supabase"] },
              { num: "No. 05", id: "project-3", numCls: "text-emerald-700", title: "Compliance RAG Chatbot", blurb: "Grounded policy Q&A for regulated financial services teams.", sub: "Claude · Python · Streamlit", tools: ["Claude", "Python", "Streamlit", "RAG"] },
              { num: "No. 06", id: "project-4", numCls: "text-indigo-700", title: "Customer Service Triage", blurb: "Classifies, prioritizes, and drafts replies in under a second.", sub: "Claude · Python · NLP", tools: ["Claude", "Python", "Triage", "NLP"] },
            ].map((p) => {
              const logos = p.tools.filter((t) => TOOL_LOGOS[t]);
              return (
                <a key={p.id} href={`#${p.id}`} className="flex flex-col p-3.5 rounded-2xl bg-white/80 backdrop-blur border border-stone-200 hover:border-rose-400 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] uppercase tracking-wider font-semibold ${p.numCls}`}>{p.num}</span>
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <div className="mt-3 text-[15px] font-semibold text-stone-900 leading-tight tracking-tight">
                    {p.title.startsWith("Fork Yea!") ? (
                      <><em className="italic">Fork Yea!</em> — Restaurant Reservation Agent</>
                    ) : (
                      p.title
                    )}
                  </div>
                  <p className="mt-2 text-[13px] text-stone-600 leading-snug">{p.blurb}</p>
                  <div className="mt-auto pt-3 flex flex-nowrap -space-x-1.5">
                    <TooltipProvider delayDuration={100}>
                      {logos.slice(0, 6).map((t) => {
                        const logo = TOOL_LOGOS[t]!;
                        const Icon = logo.icon;
                        return (
                          <Tooltip key={t}>
                            <TooltipTrigger asChild>
                              <span className={`inline-flex shrink-0 items-center justify-center w-8 h-8 rounded-full ring-1 ring-white shadow-sm cursor-default ${logo.bg}`}>
                                {Icon ? <Icon className={`w-[15px] h-[15px] ${logo.iconClass ?? ""}`} strokeWidth={2} /> : <img src={logo.src} alt={t} className="w-[15px] h-[15px]" loading="lazy" />}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>{t}</TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </TooltipProvider>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />

        {/* Demonstrated skills — category-colored marquee */}
        <div className="mt-8 flex items-baseline justify-between gap-4 flex-wrap">
          <h3 className="text-base md:text-lg uppercase tracking-[0.18em] text-stone-700 font-semibold">
            Demonstrated skills
          </h3>
          <span className="text-sm text-stone-500 italic">color-coded by category</span>
        </div>
        <div className="mt-3 rounded-2xl border border-stone-300/70 bg-white/70 backdrop-blur-sm p-3 md:p-4 space-y-2">
          {[
            {
              label: "AI",
              labelCls: "text-amber-700",
              dot: "bg-amber-500",
              chip: "bg-amber-50 border-amber-200 text-amber-900",
              items: ["Claude API", "OpenAI API", "RAG", "AI agents", "LLM-as-judge evals", "Function calling", "Prompt engineering"],
            },
            {
              label: "Automation",
              labelCls: "text-violet-700",
              dot: "bg-violet-500",
              chip: "bg-violet-50 border-violet-200 text-violet-900",
              items: ["n8n", "Cron pipelines", "Greenhouse / Lever / Ashby APIs", "Resend", "Webhooks", "Workflow observability", "Human-in-the-loop feedback"],
            },
            {
              label: "Engineering",
              labelCls: "text-sky-700",
              dot: "bg-sky-500",
              chip: "bg-sky-50 border-sky-200 text-sky-900",
              items: ["Python", "SQL", "SQLite (WAL)", "Supabase / Postgres", "React + TypeScript", "Streamlit"],
            },
          ].map((g) => {
            const loop = [...g.items, ...g.items, ...g.items, ...g.items];
            return (
              <div key={g.label} className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-1">
                <span className={`shrink-0 sm:w-24 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold ${g.labelCls}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${g.dot}`} />
                  {g.label}
                </span>
                <div className="relative flex-1 overflow-hidden">
                  <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white/90 to-transparent z-10" />
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white/90 to-transparent z-10" />
                  <div className="flex w-max animate-marquee gap-1.5">
                    {loop.map((name, i) => (
                      <span
                        key={i}
                        className={`shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-medium ${g.chip}`}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll cue — signal there's more below */}
        <div className="mt-10 flex justify-center">
          <a
            href="#project-restaurant"
            className="group inline-flex flex-col items-center gap-1 text-stone-500 hover:text-rose-600 transition-colors"
            aria-label="See the 6 projects below"
          >
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold">
              + 6 more projects below
            </span>
            <ChevronDown className="h-5 w-5 animate-bounce group-hover:text-rose-600" />
          </a>
        </div>
      </header>


      <GradientDivider />

      {/* Project Restaurant — Restaurant Reservation Agent */}
      <section id="project-restaurant" className="mx-auto max-w-6xl px-6 py-10 md:py-12 scroll-mt-8">
        <ProjectCollapse id="project-restaurant" num="No. 01 · Restaurant Reservation Agent" numCls="text-rose-700" title={<><em className="italic">Fork Yea!</em> — Restaurant Reservation Agent</>} sub="LangGraph · Claude · Playwright">
        <div className="grid md:grid-cols-12 gap-10">

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-700 font-medium">
              No. 01 · Built with LangGraph + Claude
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              <em className="italic">Fork Yea!</em> — Restaurant Reservation Agent
            </h2>
            <p className="mt-3 text-sm text-rose-700 font-medium uppercase tracking-wider">
              <span className="inline-block whitespace-nowrap">Agentic orchestration</span>
              <span className="mx-2">·</span>
              <span className="inline-block whitespace-nowrap">LLM-as-judge evals</span>
              <span className="mx-2">·</span>
              <span className="inline-block whitespace-nowrap">Vector memory</span>
              <span className="mx-2">·</span>
              <span className="inline-block whitespace-nowrap">Human-in-the-loop</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Cursor", "LangGraph", "Claude", "Playwright", "Tavily", "FastAPI", "ChromaDB"].map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <Collapsible className="mt-8">
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-rose-200 bg-rose-50/60 px-4 py-3 text-sm font-medium text-rose-800 hover:bg-rose-50 transition-colors">
                <span className="uppercase tracking-wider text-xs">See technical details</span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-6 pt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-200">
                    <div className="text-xs uppercase tracking-wider text-rose-700 font-semibold">Cost-aware role-based model routing</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Eight specialized sub-agents in a LangGraph pipeline, each routed to the cheapest model that can do the job: Haiku for fast parsing, Sonnet for deep ranking, Haiku again as judge — no single model does everything.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-200">
                    <div className="text-xs uppercase tracking-wider text-rose-700 font-semibold">Persistent vector memory</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">ChromaDB stores past searches so recommendations personalize over time, not just per session.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-200">
                    <div className="text-xs uppercase tracking-wider text-rose-700 font-semibold">Real browser automation</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Playwright over Chrome DevTools Protocol drives an isolated profile — navigates OpenTable, selects a slot, sandboxed from personal Chrome.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-200">
                    <div className="text-xs uppercase tracking-wider text-rose-700 font-semibold">LLM-as-judge eval layer</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">After Sonnet ranks results, Haiku independently scores the top pick and writes a one-sentence verdict — catches low-quality outputs with no human in the loop.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-200">
                    <div className="text-xs uppercase tracking-wider text-rose-700 font-semibold">Observability dashboard</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Per-run node latency, confidence scores, escalation flags, and eval scores persist to SQLite (WAL); a review queue surfaces low-confidence runs.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-200">
                    <div className="text-xs uppercase tracking-wider text-rose-700 font-semibold">Closed feedback loop</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Thumbs up/down on each recommendation persists to the monitor DB and appears in the run-detail trace alongside the node pipeline timeline.</p>
                  </div>
                </div>

                <div className="rounded-lg border border-stone-200 bg-white/70 p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-stone-700 font-bold mb-3">The tool stack</div>
                  <div className="grid sm:grid-cols-2 gap-2.5 text-sm">
                    <div className="flex gap-3"><span className="font-semibold text-stone-900 min-w-[110px]">Agent graph</span><span className="text-stone-600">LangGraph — stateful, conditional</span></div>
                    <div className="flex gap-3"><span className="font-semibold text-stone-900 min-w-[110px]">Parsing LLM</span><span className="text-stone-600">Claude Haiku 4.5</span></div>
                    <div className="flex gap-3"><span className="font-semibold text-stone-900 min-w-[110px]">Ranking LLM</span><span className="text-stone-600">Claude Sonnet</span></div>
                    <div className="flex gap-3"><span className="font-semibold text-stone-900 min-w-[110px]">Judge LLM</span><span className="text-stone-600">Claude Haiku — independent scorer</span></div>
                    <div className="flex gap-3"><span className="font-semibold text-stone-900 min-w-[110px]">Observability</span><span className="text-stone-600">SQLite (WAL) + run dashboard</span></div>
                    <div className="flex gap-3"><span className="font-semibold text-stone-900 min-w-[110px]">Feedback</span><span className="text-stone-600">Thumbs ratings → monitor DB</span></div>
                    <div className="flex gap-3"><span className="font-semibold text-stone-900 min-w-[110px]">Web search</span><span className="text-stone-600">Tavily API → OpenTable + Google Maps</span></div>
                    <div className="flex gap-3"><span className="font-semibold text-stone-900 min-w-[110px]">Vector memory</span><span className="text-stone-600">ChromaDB (local persistence)</span></div>
                    <div className="flex gap-3"><span className="font-semibold text-stone-900 min-w-[110px]">Browser</span><span className="text-stone-600">Playwright over Chrome CDP</span></div>
                    <div className="flex gap-3"><span className="font-semibold text-stone-900 min-w-[110px]">API</span><span className="text-stone-600">FastAPI (Python 3.10+)</span></div>
                    <div className="flex gap-3"><span className="font-semibold text-stone-900 min-w-[110px]">Frontend</span><span className="text-stone-600">React + Vite + Tailwind</span></div>
                    <div className="flex gap-3"><span className="font-semibold text-stone-900 min-w-[110px]">Notify</span><span className="text-stone-600">Gmail SMTP (App Password)</span></div>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm md:text-base text-stone-700 leading-relaxed">
                  <li className="flex gap-3"><span className="text-rose-500">▸</span>Single natural-language input — "Italian in NYC for 2 on June 1" — drives the full pipeline</li>
                  <li className="flex gap-3"><span className="text-rose-500">▸</span>Tavily searches OpenTable, then enriches each candidate with ratings, neighborhood, price tier</li>
                  <li className="flex gap-3"><span className="text-rose-500">▸</span>FastAPI exposes the agent to a React + Vite + Tailwind frontend</li>
                  <li className="flex gap-3"><span className="text-rose-500">▸</span>Emails a pre-filled one-click checkout link via Gmail SMTP — agent handles every step up to confirm</li>
                  <li className="flex gap-3"><span className="text-rose-500">▸</span>Isolated <code className="text-xs bg-rose-100 px-1.5 py-0.5 rounded">.chrome-dev-profile/</code> — never touches personal Chrome data</li>
                  <li className="flex gap-3"><span className="text-rose-500">▸</span>Haiku judge re-scores Sonnet's top pick with a one-sentence verdict — production pattern for catching bad outputs without human review</li>
                  <li className="flex gap-3"><span className="text-rose-500">▸</span>Observability dashboard logs node latency, confidence, escalation flags, and eval scores to SQLite (WAL); review queue surfaces low-confidence runs</li>
                  <li className="flex gap-3"><span className="text-rose-500">▸</span>Thumbs up/down ratings persist to the monitor DB and render inline in the run-detail trace next to the pipeline timeline</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="http://localhost:5173/"
                target="_blank"
                rel="noreferrer"
                aria-label="Open live demo"
                title="Open live demo"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-colors text-xs font-medium"
              >
                <span>Live Demo</span>
              </a>
              <a
                href="https://github.com/aylineuyar-arch/restaurant-agent"
                target="_blank"
                rel="noreferrer"
                aria-label="View repository on GitHub"
                title="View repository on GitHub"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
              >
                <Github className="w-4 h-4" />
                <span>Repository</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="p-5 rounded-xl bg-rose-50/70 border-l-4 border-rose-400">
              <p className="text-xs uppercase tracking-wider text-rose-700 font-semibold mb-2">
                Why this one is the most complex
              </p>
              <p className="text-sm md:text-base text-stone-700 leading-relaxed">
                Finding the <strong className="text-stone-900">perfect reservation</strong> takes a team of AI agents — they understand the ask, search, rank the best fit, <strong className="text-stone-900">books the reservation</strong>, and emails you to confirm.
              </p>
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-rose-700 font-bold mb-5">Agent signals</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-rose-900 leading-none">8</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Graph nodes</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-rose-900 leading-none">3</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Claude roles · parse, rank, judge</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-rose-900 leading-none">1-click</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Inbox to booked</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white/60 p-5 md:p-6">
              <div className="flex items-baseline justify-between mb-4">
                <div className="text-xs uppercase tracking-[0.22em] text-stone-700 font-bold">Agent flow</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-stone-500">8 specialized sub-agents</div>
              </div>

              <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                You type something like <span className="font-medium text-stone-800">"Find me a quiet Italian spot for four this Saturday, outdoor seating, something with handmade pasta"</span> — and the system figures out the rest.
              </p>

              <AgentFlowMarquee
                steps={[
                  { label: "Parse", sub: "understand request", tone: "amber", Icon: Languages },
                  { label: "Recall", sub: "past preferences", tone: "violet", Icon: History },
                  { label: "Research", sub: "find options ↻", tone: "sky", Icon: Search },
                  { label: "Enrich", sub: "add context", tone: "sky", Icon: Sparkles },
                  { label: "Rank", sub: "score best fit", tone: "amber", Icon: ListOrdered },
                  { label: "Judge", sub: "verify top pick", tone: "judge", Icon: Gavel },
                  { label: "Book", sub: "reserve slot", tone: "emerald", Icon: CalendarCheck },
                  { label: "Confirm", sub: "email you", tone: "rose", Icon: MailCheck },
                ]}
              />
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10.5px] uppercase tracking-[0.14em] text-stone-600">
                <span className="font-semibold text-stone-700">Color key:</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-200 ring-1 ring-amber-300" />Reasoning</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-violet-200 ring-1 ring-violet-300" />Memory</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-sky-200 ring-1 ring-sky-300" />Search</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-200 ring-1 ring-emerald-300" />Action</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-stone-100 ring-1 ring-stone-500 border border-dashed border-stone-500" />Verifier (Haiku)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-rose-200 ring-1 ring-rose-300" />Notify</span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-stone-600">
                <span className="text-amber-600">↻</span>
                <span>If <span className="font-medium text-stone-800">Research</span> finds fewer than 3 options, the agent automatically broadens the search and tries again.</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <figure className="overflow-hidden rounded-lg border border-rose-200 bg-stone-950 shadow-md flex flex-col">
                <div className="aspect-video w-full bg-stone-950 flex items-center justify-center">
                  <img
                    src={forkYeahLoading}
                    alt="Fork Yeah! agent working — sub-agents checking past searches, querying OpenTable, enriching with Maps & reviews."
                    loading="lazy"
                    className="w-full h-full object-cover object-top block"
                  />
                </div>
                <figcaption className="px-2 py-1.5 text-[11px] leading-snug text-stone-800 bg-rose-50 border-t border-rose-200">
                  Agents at work — Haiku, ChromaDB, Tavily and Sonnet running in sequence.
                </figcaption>
              </figure>
              <figure className="overflow-hidden rounded-lg border border-rose-200 bg-stone-950 shadow-md flex flex-col">
                <div className="aspect-video w-full bg-stone-950 flex items-center justify-center">
                  <img
                    src={forkYeahResults}
                    alt="Fork Yeah! agent results — ranked top pick with neighborhood, price tier and vibe tags."
                    loading="lazy"
                    className="w-full h-full object-cover object-top block"
                  />
                </div>
                <figcaption className="px-2 py-1.5 text-[11px] leading-snug text-stone-800 bg-rose-50 border-t border-rose-200">
                  Ranked result — top pick with price tier, vibe tags and a one-click booking link.
                </figcaption>
              </figure>

              {/* Simulated Monitor Mode dashboard — what observability looks like in production */}
              <figure className="overflow-hidden rounded-lg border border-amber-300/40 bg-stone-950 shadow-md flex flex-col">
                <div className="aspect-video w-full overflow-hidden">
                  <div className="origin-top-left scale-[0.46] w-[217%]">
                    <div className="px-4 py-3 border-b border-stone-800">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-2xl text-amber-300 italic leading-none">fork yeah!</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400">Monitor mode — workflow observability</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-emerald-500/15 text-emerald-300 px-2 py-1 rounded-full font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live · simulated
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] text-stone-400 leading-relaxed max-w-xl">
                      Every agent run is tracked, scored, and surfaced — so you know what your AI is doing in production.
                    </p>
                    </div>

                  <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Total runs", value: "1,284", sub: "47 today" },
                      { label: "Success rate", value: "94.2%", sub: "judge-verified" },
                      { label: "Avg latency", value: "3.8s", sub: "p95 6.1s" },
                      { label: "Escalations", value: "12", sub: "avg conf 0.71" },
                    ].map((m) => (
                      <div key={m.label} className="rounded-lg bg-stone-900/80 border border-stone-800 p-3">
                        <div className="text-[10px] uppercase tracking-wider text-stone-400">{m.label}</div>
                        <div className="mt-1.5 font-serif text-2xl text-stone-50 leading-none">{m.value}</div>
                        <div className="mt-1.5 text-[11px] text-stone-500">{m.sub}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mx-4 mb-4 rounded-lg bg-stone-900/60 border border-stone-800">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-stone-800">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-stone-400">Recent runs</span>
                      <span className="text-[10px] uppercase tracking-wider bg-amber-300/90 text-stone-900 px-2 py-0.5 rounded-full font-semibold">all runs</span>
                    </div>
                    <div className="divide-y divide-stone-800/80 text-[12px]">
                      {[
                        { q: "vegetarian, Greenwich Village, $$", pick: "Superiority Burger", conf: 0.93, lat: "3.2s", ok: true },
                        { q: "date night, West Village, $$$", pick: "I Sodi", conf: 0.88, lat: "4.1s", ok: true },
                        { q: "late night ramen near Bryant Park", pick: "Ippudo Midtown", conf: 0.81, lat: "3.7s", ok: true },
                        { q: "private room, 12 ppl, Flatiron", pick: "—", conf: 0.42, lat: "5.9s", ok: false },
                        { q: "outdoor seating, dog-friendly, Brooklyn", pick: "Bar Bayeux", conf: 0.86, lat: "3.4s", ok: true },
                      ].map((r, i) => (
                        <div key={i} className="grid grid-cols-12 items-center gap-2 px-3 py-2">
                          <span className="col-span-5 text-stone-300 truncate">{r.q}</span>
                          <span className="col-span-3 text-stone-400 truncate">→ <span className="text-stone-200">{r.pick}</span></span>
                          <span className="col-span-2 text-stone-500">{r.lat}</span>
                          <span className={`col-span-1 font-mono text-[11px] ${r.conf >= 0.7 ? "text-emerald-300" : "text-rose-300"}`}>{r.conf.toFixed(2)}</span>
                          <span className="col-span-1 text-right">
                            {r.ok ? (
                              <span className="text-[10px] uppercase text-emerald-300/90">ok</span>
                            ) : (
                              <span className="text-[10px] uppercase text-rose-300/90">review</span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="px-3 py-2 border-t border-stone-800 text-[10px] text-stone-500 text-center">
                      est. total cost $1.842 · auto-refreshes every 30s
                    </div>
                  </div>
                  </div>
                </div>

                <figcaption className="px-2 py-1.5 text-[11px] leading-snug text-stone-800 bg-amber-50 border-t border-amber-300/40">
                  Monitor mode shows live run metrics, confidence scores, and flagged cases for human review.
                </figcaption>
              </figure>
            </div>


          </div>
        </div>
        </ProjectCollapse>
      </section>


      <GradientDivider />

      {/* Project 1 */}
      <section id="project-1" className="mx-auto max-w-6xl px-6 py-10 md:py-12 scroll-mt-8">
        <ProjectCollapse id="project-1" num="No. 02 · AI Job Search" numCls="text-orange-700" title="Live AI Job Search Dashboard" sub="Claude · Python · Railway">
        <div className="grid md:grid-cols-12 gap-10">

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-orange-700 font-medium">
              No. 02 · Built with Claude
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              Live AI Job Search Dashboard
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Claude haiku-4-5",
                "Greenhouse",
                "Lever",
                "Ashby",
                "JSearch",
                "Python",
                "Railway",
              ].map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <Collapsible className="mt-8">
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-orange-200 bg-orange-50/40 px-4 py-3 text-sm font-medium text-orange-800 hover:bg-orange-50 transition-colors">
                <span className="uppercase tracking-wider text-xs">See technical details</span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-6 pt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-orange-50/60 border border-orange-200">
                    <div className="text-xs uppercase tracking-wider text-orange-700 font-semibold">Fit Score (0–100)</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">How well the role matches background, industry, and stated goals.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-orange-50/60 border border-orange-200">
                    <div className="text-xs uppercase tracking-wider text-orange-700 font-semibold">Conversion Score (0–100)</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Realistic offer likelihood, calibrated by company type and competitiveness.</p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm md:text-base text-stone-700 leading-relaxed">
                  <li className="flex gap-3"><span className="text-orange-500">▸</span>~300 deduplicated roles per run across 130+ target companies</li>
                  <li className="flex gap-3"><span className="text-orange-500">▸</span>Honest conversion scoring — Anthropic 10–25, early-stage startups 45–65</li>
                  <li className="flex gap-3"><span className="text-orange-500">▸</span>Apply-now list: fit ≥ 65 AND conversion ≥ 45 — actionable, not a dump</li>
                  <li className="flex gap-3"><span className="text-orange-500">▸</span>Eliminated manual checking of Anthropic, Ramp, Rippling, Databricks + 126 more</li>
                  <li className="flex gap-3"><span className="text-orange-500">▸</span>Deployed on Railway — zero infrastructure overhead</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            <a
              href="https://github.com/aylineuyar-arch/ai-workflow-demo"
              target="_blank"
              rel="noreferrer"
              aria-label="View repository on GitHub"
              title="View repository on GitHub"
              className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
            >
              <Github className="w-4 h-4" />
              <span>Repository</span>
            </a>
          </div>

          <div className="md:col-span-8 space-y-6">

            <div className="rounded-xl border border-orange-200 bg-orange-50/60 p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-orange-700 font-bold mb-5">Live signals</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-orange-900 leading-none">286</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Roles / run</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-orange-900 leading-none">130+</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Companies tracked</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-orange-900 leading-none">~3 min</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Pipeline end-to-end</div>
                </div>
              </div>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-stone-700">
              An AI-powered pipeline that aggregates live postings from{" "}
              <strong className="text-stone-900">130+ company Applicant Tracking Systems (ATSs)</strong> and
              major job boards, scores each role with Claude on fit and
              realistic conversion likelihood, and renders results in a
              filterable web dashboard.
            </p>

            <figure className="mt-8">
              <img
                src={dashboardImg}
                alt="Job Search Dashboard — color-coded fit and conversion scores"
                className="w-full rounded-lg shadow-lg ring-1 ring-stone-200"
                loading="eager"
              />
              <figcaption className="mt-3 text-xs text-stone-500 italic">
                Live dashboard — color-coded fit & conversion scores, one-click
                apply links.
              </figcaption>
            </figure>
          </div>
        </div>
        </ProjectCollapse>
      </section>


      <GradientDivider />

      {/* Project GTM — GTM Pricing Tool */}
      <section id="project-gtm" className="mx-auto max-w-6xl px-6 py-10 md:py-12 scroll-mt-8">
        <ProjectCollapse id="project-gtm" num="No. 03 · GTM Pricing Tool" numCls="text-teal-700" title="GTM Pricing Tool" sub="Claude · Python · Railway">
        <div className="grid md:grid-cols-12 gap-10">

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-teal-700 font-medium">
              No. 03 · Built with Claude + Python
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              GTM Pricing Tool
            </h2>
            <p className="mt-3 text-sm text-teal-700 font-medium uppercase tracking-wider">
              <span className="inline-block whitespace-nowrap">Revenue modeling</span>
              <span className="mx-2">·</span>
              <span className="inline-block whitespace-nowrap">pricing architecture</span>
              <span className="mx-2">·</span>
              <span className="inline-block whitespace-nowrap">scenario forecasting</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Claude", "Python", "Railway", "GTM", "Pricing", "ICP"].map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <Collapsible className="mt-8">
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-teal-200 bg-teal-50/60 px-4 py-3 text-sm font-medium text-teal-800 hover:bg-teal-50 transition-colors">
                <span className="uppercase tracking-wider text-xs">See technical details</span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-6 pt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-teal-50/60 border border-teal-200">
                    <div className="text-xs uppercase tracking-wider text-teal-700 font-semibold">Role-based workflows</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Four distinct paths — Founder, Consultant, GTM Operator, Investor — each surfaces the modules that matter for that lens.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-teal-50/60 border border-teal-200">
                    <div className="text-xs uppercase tracking-wider text-teal-700 font-semibold">Claude-powered ICP</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Describe your product in a sentence — Claude recommends industry, customer segment, and pricing model before you touch a slider.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-teal-50/60 border border-teal-200">
                    <div className="text-xs uppercase tracking-wider text-teal-700 font-semibold">Benchmark library</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">25+ benchmarks across 8 industries and 3 segments (SMB, Mid-Market, Enterprise) — ACV, CAC payback, NRR, gross margin grounded in real comps.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-teal-50/60 border border-teal-200">
                    <div className="text-xs uppercase tracking-wider text-teal-700 font-semibold">Connected workflow</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Market Explorer → Pricing Architect → Revenue Modeler. Outputs from one stage feed defaults into the next — no copying between spreadsheets.</p>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm md:text-base text-stone-700 leading-relaxed">
                  <li className="flex gap-3"><span className="text-teal-500">▸</span>Three scenarios per model — base, upside, downside — for stress-testing assumptions</li>
                  <li className="flex gap-3"><span className="text-teal-500">▸</span>Unit-economics view: LTV/CAC, payback, gross margin, burn multiple — all computed live</li>
                  <li className="flex gap-3"><span className="text-teal-500">▸</span>Deployed on Railway behind a private-beta gate; zero infra babysitting</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="https://web-production-b4e0ad.up.railway.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors text-xs font-medium"
              >
                Live app ↗
              </a>
              <a
                href="https://github.com/aylineuyar-arch/gtm-pricing-tool"
                target="_blank"
                rel="noreferrer"
                aria-label="View repository on GitHub"
                title="View repository on GitHub"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
              >
                <Github className="w-4 h-4" />
                <span>Repository</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="p-5 rounded-xl bg-teal-50/70 border-l-4 border-teal-400">
              <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">
                The GTM operating system
              </p>
              <p className="text-sm md:text-base text-stone-700 leading-relaxed">
                Market benchmarks, pricing architecture, and scenario forecasting — in <strong className="text-stone-900">one connected workflow</strong>. Pick a role and the tool sequences the right modules behind the scenes.
              </p>
            </div>

            <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-teal-700 font-bold mb-5">Build signals</div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-teal-900 leading-none">8</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Industries</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-teal-900 leading-none">3</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Segments</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-teal-900 leading-none">25+</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Benchmarks</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-teal-900 leading-none">3</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Scenarios</div>
                </div>
              </div>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-stone-700">
              Four roles, one engine. <strong className="text-stone-900">Founders</strong> define ICP and model revenue from scratch. <strong className="text-stone-900">Consultants</strong> get market sizing and defensible financial models for clients. <strong className="text-stone-900">Operators</strong> benchmark current performance and optimize pricing. <strong className="text-stone-900">Investors</strong> validate unit economics and stress-test scenarios.
            </p>

            <figure>
              <img
                src={gtmHome}
                alt="GTM Pricing Tool — role-selection home screen with Founder, Consultant, GTM Operator, and Investor paths."
                className="w-full rounded-lg shadow-lg ring-1 ring-stone-200"
                loading="lazy"
              />
              <figcaption className="mt-2 text-xs text-stone-500 italic">
                Role selection — Founder, Consultant, GTM Operator, Investor.
              </figcaption>
            </figure>
          </div>
        </div>
        </ProjectCollapse>
      </section>


      <GradientDivider />

      {/* Project 2 — Agentic AI Email Generator */}
      <section id="project-2" className="mx-auto max-w-6xl px-6 py-10 md:py-12 scroll-mt-8">
        <ProjectCollapse id="project-2" num="No. 04 · Agentic Email Generator" numCls="text-amber-700" title="Agentic Email Generator" sub="n8n · Claude · Supabase">
        <div className="grid md:grid-cols-12 gap-10">

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-700 font-medium">
              No. 04 · Built with n8n + Claude
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              Agentic AI Email Generator
            </h2>
            <p className="mt-3 text-sm text-stone-600 font-medium uppercase tracking-wider">
              Always-on agent · daily cron · ranked digest to inbox
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["n8n", "Claude", "Railway", "Supabase", "Resend", "Cron"].map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <Collapsible className="mt-8">
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors">
                <span className="uppercase tracking-wider text-xs">See technical details</span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-6 pt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                    <div className="text-xs uppercase tracking-wider text-stone-600 font-semibold">Agentic Workflow</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">n8n orchestrates search → Claude scoring → dedupe → email, no human in the loop.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                    <div className="text-xs uppercase tracking-wider text-stone-600 font-semibold">Persistent Memory</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Supabase stores every prior run so today's digest never repeats yesterday's roles.</p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm md:text-base text-stone-700 leading-relaxed">
                  <li className="flex gap-3"><span className="text-stone-500">▸</span>Cron-triggered daily — zero manual touch, runs while I sleep</li>
                  <li className="flex gap-3"><span className="text-stone-500">▸</span>Claude scores every posting on relevance, dedupes against yesterday's run via Supabase</li>
                  <li className="flex gap-3"><span className="text-stone-500">▸</span>Self-hosted n8n on Railway — own the workflow, no per-execution SaaS fees</li>
                  <li className="flex gap-3"><span className="text-stone-500">▸</span>Resend delivers a clean HTML digest straight to inbox — ready to skim with morning coffee</li>
                  <li className="flex gap-3"><span className="text-stone-500">▸</span>Built to demonstrate AI fluency across orchestration tools, not just one</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://muse-agent-transfer.lovable.app"
                target="_blank"
                rel="noreferrer"
                aria-label="Open live app"
                title="Open live app"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-amber-700 text-white hover:bg-amber-800 transition-colors text-xs font-medium"
              >
                <span>Live App</span>
              </a>
              <a
                href="https://github.com/aylineuyar-arch/agentic-ai-email-generator"
                target="_blank"
                rel="noreferrer"
                aria-label="View repository on GitHub"
                title="View repository on GitHub"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
              >
                <Github className="w-4 h-4" />
                <span>Repository</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="p-5 rounded-xl bg-amber-50/70 border-l-4 border-amber-400">
              <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">
                Why this matters
              </p>
              <p className="text-sm md:text-base text-stone-700 leading-relaxed">
                Job hunting is a daily grind of refreshing the same boards. This agent wakes up on its own every morning, scours fresh roles overnight, ranks them against my profile, and drops a curated digest in my inbox before coffee — <strong className="text-stone-900">no app to open, no button to click.</strong>
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-amber-700 font-bold mb-5">Agent signals</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-amber-900 leading-none">8am ET</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Daily cron trigger</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-amber-900 leading-none">0</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Manual touches / run</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-amber-900 leading-none">4</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Tools orchestrated</div>
                </div>
              </div>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-stone-700">
              A fully autonomous agent that runs every morning at{" "}
              <strong className="text-stone-900">8am ET</strong> — searches fresh
              job postings against my target keywords, has Claude filter and rank
              them for fit, and delivers a clean, ready-to-skim digest straight
              to my inbox. Built in n8n, deployed on Railway, persisted in
              Supabase, sent via Resend.
            </p>

            <img
              src={emailGenImg}
              alt="Live countdown to next email release and tracked job titles"
              className="w-full rounded-lg shadow-lg ring-1 ring-stone-200"
              loading="eager"
            />

          </div>
        </div>
        </ProjectCollapse>
      </section>


      <GradientDivider />

      {/* Project 3 — Compliance RAG */}
      <section id="project-3" className="mx-auto max-w-6xl px-6 py-10 md:py-12 scroll-mt-8">
        <ProjectCollapse id="project-3" num="No. 05 · Compliance RAG Chatbot" numCls="text-emerald-700" title="Compliance RAG Chatbot" sub="Claude · Python · Streamlit">
        <div className="grid md:grid-cols-12 gap-10">

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-700 font-medium">
              No. 05 · Built with Claude
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              Compliance RAG Chatbot
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Claude", "Python", "Streamlit", "RAG", "Financial Services"].map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <Collapsible className="mt-8">
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-sm font-medium text-emerald-800 hover:bg-emerald-50 transition-colors">
                <span className="uppercase tracking-wider text-xs">See technical details</span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-6 pt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200">
                    <div className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Retrieval pipeline</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Sentence-transformers embeddings → cosine search → top-k chunks injected into Claude prompt with citations.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200">
                    <div className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Grounded by default</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Confidence threshold + cross-document synthesis callout — falls back honestly when policies don't cover the question.</p>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm md:text-base text-stone-700 leading-relaxed">
                  <li className="flex gap-3"><span className="text-emerald-500">▸</span>Streaming token-by-token answers with conversation memory — follow-ups like "what about exceptions?" stay in context</li>
                  <li className="flex gap-3"><span className="text-emerald-500">▸</span>Suggested follow-up questions + CSV session export — built for analyst workflows and audit trails</li>
                  <li className="flex gap-3"><span className="text-emerald-500">▸</span>Local embeddings = $0 per query on retrieval; only generation hits the Claude API</li>
                  <li className="flex gap-3"><span className="text-emerald-500">▸</span>Deployed on Streamlit Cloud with claude-haiku-4-5 — production-grade UX, demo-grade cost</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://compliance-rag-demo-mrwtbs4k7gvdvmiuck8mdn.streamlit.app"
                target="_blank"
                rel="noreferrer"
                aria-label="Open live demo"
                title="Open live demo"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-700 text-white hover:bg-emerald-800 transition-colors text-xs font-medium"
              >
                <span>Live Demo</span>
              </a>
              <a
                href="https://github.com/aylineuyar-arch/compliance-rag-demo"
                target="_blank"
                rel="noreferrer"
                aria-label="View repository on GitHub"
                title="View repository on GitHub"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
              >
                <Github className="w-4 h-4" />
                <span>Repository</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="p-5 rounded-xl bg-stone-50 border-l-4 border-emerald-400">
              <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-2">
                Why this matters
              </p>
              <p className="text-sm md:text-base text-stone-700 leading-relaxed">
                Compliance teams spend hours hunting through dense policy PDFs for a single answer — and one wrong call can mean a fine. This grounds every answer in the actual policy doc, with citations, turning that hunt into <strong className="text-stone-900">seconds of trustworthy answers</strong> — exactly what regulated fintechs need.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-emerald-700 font-bold mb-5">Retrieval signals</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-emerald-900 leading-none">4</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Policy domains indexed</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-emerald-900 leading-none">21</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Doc chunks retrieved</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-emerald-900 leading-none">0 $</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Embedding API cost</div>
                </div>
              </div>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-stone-700">
              A live chatbot that answers <strong className="text-stone-900">financial services compliance questions</strong> — streams Claude's responses token by token, grounds every answer in retrieved policy passages, and falls back honestly when the docs don't cover the question. Built to mirror the internal tooling a regulated fintech (Revolut, Ramp, Stripe) actually needs.
            </p>

            <figure>
              <img
                src={complianceRagImg}
                alt="Compliance Policy Q&A chatbot — indexed AML, KYC, Trade Surveillance, and Data Governance documents with example questions"
                className="w-full rounded-lg shadow-lg ring-1 ring-emerald-200"
                loading="eager"
              />
              <figcaption className="mt-3 text-xs text-stone-500 italic">
                Live app — 4 indexed policy domains, 21 chunks, Claude Haiku 4.5 with grounded retrieval.
              </figcaption>
            </figure>

          </div>
        </div>
        </ProjectCollapse>
      </section>


      <GradientDivider />

      {/* Project 4 — Customer Service Triage */}
      <section id="project-4" className="mx-auto max-w-6xl px-6 py-10 md:py-12 scroll-mt-8">
        <ProjectCollapse id="project-4" num="No. 06 · Customer Service Triage" numCls="text-indigo-700" title="Customer Service Triage" sub="Claude · Python · NLP">
        <div className="grid md:grid-cols-12 gap-10">

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-700 font-medium">
              No. 06 · Built with Claude
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              AI Customer Service Triage
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Claude", "Python", "NLP", "Routing"].map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <Collapsible className="mt-8">
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-indigo-200 bg-indigo-50/40 px-4 py-3 text-sm font-medium text-indigo-800 hover:bg-indigo-50 transition-colors">
                <span className="uppercase tracking-wider text-xs">See technical details</span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-6 pt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-indigo-50/60 border border-indigo-200">
                    <div className="text-xs uppercase tracking-wider text-indigo-700 font-semibold">Prompt → JSON contract</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Single Claude call returns <code className="text-[11px]">{`{summary, category, priority, next_action}`}</code> — drops straight into Zendesk / Intercom / Front.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-indigo-50/60 border border-indigo-200">
                    <div className="text-xs uppercase tracking-wider text-indigo-700 font-semibold">Draft-first agent UX</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Triage classifies AND drafts the reply — agents edit instead of writing from scratch, collapsing handle time.</p>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm md:text-base text-stone-700 leading-relaxed">
                  <li className="flex gap-3"><span className="text-indigo-500">▸</span>~640ms end-to-end on claude-haiku-4-5 — sub-second triage at production scale</li>
                  <li className="flex gap-3"><span className="text-indigo-500">▸</span>Replaces brittle keyword routing with a single grounded LLM call — fewer rules, better recall</li>
                  <li className="flex gap-3"><span className="text-indigo-500">▸</span>Color-coded priority + category badges built for the ticketing UIs ops teams already use</li>
                  <li className="flex gap-3"><span className="text-indigo-500">▸</span>Structured output = trivially loggable, A/B-testable, and auditable per ticket</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            <a
              href="https://github.com/aylineuyar-arch/ai-cs-triage"
              target="_blank"
              rel="noreferrer"
              aria-label="View repository on GitHub"
              title="View repository on GitHub"
              className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
            >
              <Github className="w-4 h-4" />
              <span>Repository</span>
            </a>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="p-5 rounded-xl bg-stone-50 border-l-4 border-indigo-400">
              <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">
                Why this matters
              </p>
              <p className="text-sm md:text-base text-stone-700 leading-relaxed">
                Support inboxes are the biggest pile of unstructured text most companies own — and agents burn hours sorting and reply-starting before they ever help a customer. One grounded LLM call sorts the ticket, pulls the right help-doc, and drafts a reply: <strong className="text-stone-900">sub-second triage</strong> and a working draft instead of a blank reply box.
              </p>
            </div>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-indigo-700 font-bold mb-5">Inference signals</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-indigo-900 leading-none">~640ms</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">End-to-end triage</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-indigo-900 leading-none">1</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Claude call / ticket</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-indigo-900 leading-none">JSON</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Structured output</div>
                </div>
              </div>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-stone-700">
              An AI triage layer for customer support inboxes — classifies
              incoming tickets by intent, urgency, and team, then drafts a
              first-response so human agents start from a working reply
              instead of a blank box.
            </p>

            {/* Mock Streamlit UI render */}
            <figure>
              <div className="rounded-xl overflow-hidden ring-1 ring-stone-200 shadow-lg bg-[#0e1117] text-stone-100 font-mono">
                {/* fake browser chrome */}
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-stone-900 border-b border-stone-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-[10px] text-stone-500 truncate">ai-cs-triage · localhost:8501</span>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-indigo-400 font-semibold">AI Customer Support Triage</div>
                    <div className="text-lg text-stone-100 mt-1 font-sans">Classify and route inbound tickets</div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-stone-500 font-sans">Incoming ticket</label>
                    <div className="mt-1.5 p-3 rounded-md bg-stone-950 border border-stone-800 text-sm text-stone-200 leading-relaxed font-sans">
                      "I was charged twice this month — two charges of £29 on the same day. Need this refunded ASAP."
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-xs font-sans font-medium">▶ Run triage</button>
                    <span className="text-[11px] text-stone-500 font-sans">claude-haiku-4-5 · ~640ms</span>
                  </div>

                  <div className="pt-4 border-t border-stone-800 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-red-500/15 text-red-300 text-[11px] font-sans font-semibold uppercase tracking-wider ring-1 ring-red-500/30">Priority · High</span>
                      <span className="px-2.5 py-1 rounded-md bg-indigo-500/15 text-indigo-300 text-[11px] font-sans font-semibold uppercase tracking-wider ring-1 ring-indigo-500/30">Category · Billing</span>
                      <span className="px-2.5 py-1 rounded-md bg-stone-500/15 text-stone-300 text-[11px] font-sans font-semibold uppercase tracking-wider ring-1 ring-stone-500/30">Route → Payments team</span>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-stone-500 font-sans">Summary</div>
                      <div className="mt-1 text-sm text-stone-200 font-sans">Customer reports a duplicate billing charge of £29 and requests an urgent refund.</div>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-stone-500 font-sans">Suggested next action</div>
                      <div className="mt-1 text-sm text-stone-200 font-sans">Pull transaction history, confirm duplicate charge, issue refund within 24h, send confirmation email.</div>
                    </div>
                  </div>

                  <pre className="mt-2 p-3 rounded-md bg-stone-950 border border-stone-800 text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">{`{
  "summary": "Customer reports a duplicate billing charge of £29",
  "category": "billing",
  "priority": "high",
  "next_action": "Pull transaction history, confirm duplicate charge, issue refund"
}`}</pre>
                </div>
              </div>
              <figcaption className="mt-3 text-xs text-stone-500 italic">
                Mock render of the Streamlit UI — single Claude prompt returns structured JSON (summary, category, priority, next_action) with color-coded badges, ready to route.
              </figcaption>
            </figure>

          </div>
        </div>
        </ProjectCollapse>
      </section>


      <GradientDivider />

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-16 text-sm text-stone-600">
        <div className="flex flex-wrap justify-between gap-4">
          <div>Aylin Uyar · AI Portfolio · 2026</div>
          <div className="flex gap-6">
            <a
              href="https://github.com/aylineuyar-arch"
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-900"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aylinuyar/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-900"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

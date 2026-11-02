import { useEffect, useRef, useState, type ReactNode } from "react";
import { Github, Linkedin, Briefcase, Database, MessageSquare, Workflow, ChevronDown, Languages, History, Search, Sparkles, ListOrdered, Gavel, CalendarCheck, MailCheck, type LucideIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { warmAylinosBackend } from "@/components/AylinosLiveDemo";
import { useEngagementTracking } from "@/hooks/use-engagement-tracking";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import dashboardImg from "@/assets/portfolio-dashboard.jpg";
import emailGenImg from "@/assets/email-generator-screenshot.png";
import complianceRagImg from "@/assets/project-3-compliance-rag.png";
import forkYeahResults from "@/assets/fork-yeah-results.png";
import forkYeahLoading from "@/assets/fork-yeah-loading.png";
import gtmHome from "@/assets/gtm-pricing-home.png";

// Color palette per tech tag
export const TAG_COLORS: Record<string, string> = {
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
export type ToolLogo = { src?: string; icon?: LucideIcon; bg: string; iconClass?: string };
export const TOOL_LOGOS: Record<string, ToolLogo> = {
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

export function ToolIcons({ tools }: { tools: string[] }) {
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

export function Tag({ label }: { label: string }) {
  const key = Object.keys(TAG_COLORS).find((k) => label.includes(k)) ?? "default";
  return (
    <span
      className={`border px-2.5 py-1 rounded-full text-xs font-medium ${TAG_COLORS[key]}`}
    >
      {label}
    </span>
  );
}

export function GradientDivider() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
      <div className="mt-1 h-[3px] bg-gradient-to-r from-transparent via-rose-500 to-transparent rounded-full" />
      <div className="mt-1 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
    </div>
  );
}

export type AgentStep = { label: string; sub: string; tone: "rose" | "amber" | "violet" | "emerald" | "sky" | "judge"; Icon: LucideIcon };

export function AgentFlowMarquee({ steps }: { steps: AgentStep[] }) {
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

export function ProjectCollapse({
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
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
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




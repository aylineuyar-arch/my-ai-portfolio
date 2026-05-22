import { createFileRoute, Link } from "@tanstack/react-router";
import { Github, Linkedin, Briefcase, Database, MessageSquare, Workflow, ChevronDown, type LucideIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import dashboardImg from "@/assets/portfolio-dashboard.jpg";
import emailGenImg from "@/assets/email-generator-screenshot.png";
import complianceRagImg from "@/assets/project-3-compliance-rag.png";
import auraLanding from "@/assets/aura-landing.jpg";
import auraProfile from "@/assets/aura-profile.jpg";
import auraTutorials from "@/assets/aura-tutorials.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aylin Uyar — AI Deployment, Strategy & Ops Portfolio" },
      {
        name: "description",
        content:
          "Aylin Uyar — Tuck MBA 2026, ex-Deloitte Tech Strategy, PM Intern at Skild AI. Five live, shipped AI projects across deployment, strategy, and ops — Claude pipelines, agentic email automation, RAG compliance, and a consumer makeup app.",
      },
      { property: "og:title", content: "Aylin Uyar — AI Deployment, Strategy & Ops Portfolio" },
      {
        property: "og:description",
        content:
          "Five live AI projects shipped end-to-end. Operator-level AI thinking from a Tuck MBA + ex-Deloitte strategist.",
      },
      { property: "og:url", content: "https://aylin-uyar-portfolio.lovable.app/" },
      { name: "twitter:title", content: "Aylin Uyar — AI Deployment, Strategy & Ops Portfolio" },
      {
        name: "twitter:description",
        content:
          "Five live AI projects shipped end-to-end. Operator-level AI thinking from a Tuck MBA + ex-Deloitte strategist.",
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
  Resend: { src: "https://cdn.simpleicons.org/resend/000000", bg: "bg-stone-50 ring-stone-200" },
  Supabase: { src: "https://cdn.simpleicons.org/supabase/3FCF8E", bg: "bg-emerald-50 ring-emerald-200" },
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

function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdf8f3] via-[#faf3ec] to-[#f5ede2] text-stone-900">
      {/* Built & shipped badge — fixed top right */}
      <div className="fixed top-4 right-4 z-50 w-[220px] rounded-xl border border-rose-200 bg-white/95 backdrop-blur px-3.5 py-2.5 shadow-lg shadow-rose-900/10">
        <p className="text-[12px] leading-snug font-medium text-stone-900">
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

        <p className="mt-6 max-w-4xl text-lg md:text-2xl text-stone-700 leading-snug font-light">
          Tuck MBA <span className="text-stone-400">|</span> Ex Deloitte and Skild AI <span className="text-stone-400">|</span> AI Deployment, Strategy, Ops
        </p>

        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />

        {/* Combined section header — credibility number + section title */}
        <div className="mt-8 flex items-baseline justify-between gap-4 flex-wrap">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl md:text-5xl font-medium tracking-tight text-rose-600 leading-none">5</span>
            <h3 className="text-base md:text-lg uppercase tracking-[0.18em] text-stone-700 font-semibold">
              AI portfolio projects live in production
            </h3>
          </div>
          <span className="text-sm text-rose-700 font-medium">click any card for details ↓</span>
        </div>
        <div className="mt-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch">
            {[
              { num: "No. 01", id: "project-1", title: "AI Job Search Dashboard", blurb: "Scores 130+ ATS feeds for fit and conversion likelihood.", sub: "Claude · Python · Railway", tools: ["Claude", "Python", "Railway", "ATS"] },
              { num: "No. 02", id: "project-2", title: "Agentic Email Generator", blurb: "Always-on agent emails a ranked digest at 8am ET daily.", sub: "n8n · Claude · Supabase", tools: ["Claude", "n8n", "Railway", "Resend", "Supabase"] },
              { num: "No. 03", id: "project-3", title: "Compliance RAG Chatbot", blurb: "Grounded policy Q&A for regulated financial services teams.", sub: "Claude · Python · Streamlit", tools: ["Claude", "Python", "Streamlit", "RAG"] },
              { num: "No. 04", id: "project-4", title: "Customer Service Triage", blurb: "Classifies, prioritizes, and drafts replies in under a second.", sub: "Claude · Python · NLP", tools: ["Claude", "Python", "Triage", "NLP"] },
              { num: "No. 05", id: "project-5", title: "Aura — Makeup Assistant", blurb: "Maps your features to a personalized beauty routine.", sub: "Lovable · React · Claude", tools: ["Lovable", "React", "TypeScript", "Claude"] },
            ].map((p) => {
              const logos = p.tools.filter((t) => TOOL_LOGOS[t]);
              return (
                <a key={p.id} href={`#${p.id}`} className="block p-4 rounded-2xl bg-white/80 backdrop-blur border border-stone-200 hover:border-rose-400 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-rose-600 font-semibold">{p.num}</span>
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <div className="mt-2 flex flex-nowrap -space-x-1.5 justify-end overflow-hidden">
                    {logos.slice(0, 4).map((t) => {
                      const logo = TOOL_LOGOS[t]!;
                      const Icon = logo.icon;
                      return (
                        <span key={t} title={t} className={`inline-flex shrink-0 items-center justify-center w-8 h-8 rounded-full ring-1 ring-white shadow-sm ${logo.bg}`}>
                          {Icon ? <Icon className={`w-4 h-4 ${logo.iconClass ?? ""}`} strokeWidth={2} /> : <img src={logo.src} alt={t} className="w-4 h-4" loading="lazy" />}
                        </span>
                      );
                    })}
                  </div>
                  <div className="mt-3 text-[16px] font-semibold text-stone-900 leading-tight tracking-tight">{p.title}</div>
                  <p className="mt-2 text-[13px] text-stone-600 leading-snug">{p.blurb}</p>
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
              items: ["Claude API", "OpenAI API", "RAG", "AI agents", "Function calling", "Prompt engineering"],
            },
            {
              label: "Automation",
              labelCls: "text-violet-700",
              dot: "bg-violet-500",
              chip: "bg-violet-50 border-violet-200 text-violet-900",
              items: ["n8n", "Cron pipelines", "Greenhouse / Lever / Ashby APIs", "Resend", "Webhooks"],
            },
            {
              label: "Engineering",
              labelCls: "text-sky-700",
              dot: "bg-sky-500",
              chip: "bg-sky-50 border-sky-200 text-sky-900",
              items: ["Python", "SQL", "Supabase / Postgres", "React + TypeScript", "Streamlit"],
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
      </header>

      <GradientDivider />

      {/* Project 1 */}
      <section id="project-1" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-orange-700 font-medium">
              No. 01 · Built with Claude
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
      </section>

      <GradientDivider />

      {/* Project 2 — Agentic AI Email Generator */}
      <section id="project-2" className="mx-auto max-w-6xl px-6 py-20 md:py-28 scroll-mt-8">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-600 font-medium">
              No. 02 · Built with n8n + Claude
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              Agentic AI Email Generator
            </h2>
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
            <a
              href="https://muse-agent-transfer.lovable.app"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
            >
              Live app ↗
            </a>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="p-5 rounded-xl bg-stone-50 border-l-4 border-stone-400">
              <p className="text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                How this differs from Project 01
              </p>
              <p className="text-sm md:text-base text-stone-700 leading-relaxed">
                Project 01 is a <strong className="text-stone-900">Python pipeline</strong> I run on-demand — I pull the data into a dashboard when I want it. This one is an <strong className="text-stone-900">always-on agent</strong> in n8n that runs itself on a daily cron and pushes a ranked digest to my inbox — the data comes to me. Same problem, deliberately different architectures: scripted pull vs. agentic push, code-first vs. visual orchestration.
              </p>
            </div>

            <div className="rounded-xl border border-stone-300 bg-stone-100/70 p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-stone-700 font-bold mb-5">Agent signals</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 leading-none">8am ET</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Daily cron trigger</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 leading-none">0</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Manual touches / run</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 leading-none">4</div>
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

            <figure>
              <img
                src={emailGenImg}
                alt="Live countdown to next email release and tracked job titles"
                className="w-full rounded-lg shadow-lg ring-1 ring-stone-200"
                loading="eager"
              />
              <figcaption className="mt-3 text-xs text-stone-500 italic">
                Live countdown to the next 8am ET email run + the exact job titles the agent tracks.
              </figcaption>
            </figure>

          </div>
        </div>
      </section>

      <GradientDivider />

      {/* Project 3 — Compliance RAG */}
      <section id="project-3" className="mx-auto max-w-6xl px-6 py-20 md:py-28 scroll-mt-8">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-700 font-medium">
              No. 03 · Built with Claude
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
                Compliance and policy lookups are exactly the kind of high-volume, judgment-heavy workflow where grounded LLM retrieval delivers measurable time savings — directly relevant to ops teams at fintechs operating under FCA, SEC, and multi-jurisdiction frameworks.
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
      </section>

      <GradientDivider />

      {/* Project 4 — Customer Service Triage */}
      <section id="project-4" className="mx-auto max-w-6xl px-6 py-20 md:py-28 scroll-mt-8">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-700 font-medium">
              No. 04 · Built with Claude
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
                Support inboxes are the highest-volume unstructured-text workflow most companies have. Replacing brittle rule-based routing with a single grounded LLM call collapses triage time to sub-second and frees agents to start from a working draft instead of a blank box — directly relevant to ops, CX, and AI deployment roles.
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
      </section>

      <GradientDivider />

      {/* Project 5 — Aura */}
      <section id="project-5" className="mx-auto max-w-6xl px-6 py-20 md:py-28 scroll-mt-8">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-700 font-medium">
              No. 05 · Built with Lovable
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              Aura — Makeup Assistant
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Lovable", "TypeScript", "React", "Claude API", "TanStack"].map(
                (t) => (
                  <Tag key={t} label={t} />
                ),
              )}
            </div>
            <Collapsible className="mt-8">
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-rose-200 bg-rose-50/40 px-4 py-3 text-sm font-medium text-rose-800 hover:bg-rose-50 transition-colors">
                <span className="uppercase tracking-wider text-xs">See technical details</span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-6 pt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-200">
                    <div className="text-xs uppercase tracking-wider text-rose-700 font-semibold">Reactive personalization</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Each profile dimension updates the kit + routine in real time — no submit button, no full recompute.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-200">
                    <div className="text-xs uppercase tracking-wider text-rose-700 font-semibold">Operator-built stack</div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-snug">Lovable + React + Claude API — design, logic, and deployment shipped by one person, no engineering team.</p>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm md:text-base text-stone-700 leading-relaxed">
                  <li className="flex gap-3"><span className="text-rose-500">▸</span>4-dimensional profile (skin tone, undertone, face shape, eye shape) drives kit + technique recs</li>
                  <li className="flex gap-3"><span className="text-rose-500">▸</span>Visual tutorials — technique maps with brush + product callouts, not just text</li>
                  <li className="flex gap-3"><span className="text-rose-500">▸</span>Proves range: same operator-rewires-workflows mindset, applied to a consumer-facing surface</li>
                  <li className="flex gap-3"><span className="text-rose-500">▸</span>End-to-end on Lovable — repo, preview, deploy in one loop</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="https://face-harmony-helper.lovable.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-colors text-xs font-medium"
              >
                Live app ↗
              </a>
              <a
                href="https://github.com/aylineuyar-arch/your-makeup-muse"
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
            <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-rose-700 font-bold mb-5">Build signals</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-rose-900 leading-none">4</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Dimensions profiled</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-rose-900 leading-none">0</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Engineers shipped with</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-rose-900 leading-none">Live</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">End-to-end on Lovable</div>
                </div>
              </div>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-stone-700">
              Aura maps your{" "}
              <strong className="text-stone-900">
                skin tone, undertone, face shape, and eye shape
              </strong>{" "}
              to compose a personalized beauty routine — with the products and
              techniques to wear it well. Built end-to-end with Lovable: zero
              engineering team, shipped and live.
            </p>

            <div className="mt-8 space-y-4">
              <figure>
                <img
                  src={auraLanding}
                  alt="Aura — editorial landing page"
                  className="w-full rounded-lg shadow-lg ring-1 ring-stone-200"
                  loading="eager"
                />
                <figcaption className="mt-2 text-xs text-stone-500 italic">
                  Editorial landing page — face-harmony-helper.lovable.app
                </figcaption>
              </figure>
              <div className="grid grid-cols-2 gap-4">
                <figure>
                  <img
                    src={auraProfile}
                    alt="Aura — The Profile, real-time personalization"
                    className="w-full rounded-lg shadow-md ring-1 ring-stone-200"
                    loading="eager"
                  />
                  <figcaption className="mt-2 text-xs text-stone-500 italic">
                    The Profile — real-time personalization
                  </figcaption>
                </figure>
                <figure>
                  <img
                    src={auraTutorials}
                    alt="Aura — Universal Tutorials, visual technique guides"
                    className="w-full rounded-lg shadow-md ring-1 ring-stone-200"
                    loading="eager"
                  />
                  <figcaption className="mt-2 text-xs text-stone-500 italic">
                    Universal Tutorials — visual technique guides
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-16 text-sm text-stone-600">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            Aylin Uyar · AI Portfolio · 2026
            <div className="mt-1">
              <Link
                to="/aura"
                className="text-rose-800 underline underline-offset-4 decoration-rose-400/60"
              >
                View Aura app →
              </Link>
            </div>
          </div>
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

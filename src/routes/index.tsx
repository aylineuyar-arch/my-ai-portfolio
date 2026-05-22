import { createFileRoute, Link } from "@tanstack/react-router";
import { Github, Linkedin, Briefcase, Database, MessageSquare, Workflow, type LucideIcon } from "lucide-react";
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
      <div className="mt-3 flex items-center gap-2">
        {withLogos.map((t) => {
          const logo = TOOL_LOGOS[t]!;
          const Icon = logo.icon;
          return (
            <Tooltip key={t}>
              <TooltipTrigger asChild>
                <span
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-full ring-1 shadow-sm cursor-default ${logo.bg}`}
                >
                  {Icon ? (
                    <Icon className={`w-5 h-5 ${logo.iconClass ?? ""}`} strokeWidth={2} />
                  ) : (
                    <img src={logo.src} alt={t} className="w-5 h-5" loading="lazy" />
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
      {/* Hero */}
      <header className="relative mx-auto max-w-6xl px-6 pt-4 pb-16 md:pt-6 md:pb-20">
        {/* Author badge — aligned with name title */}
        <div className="absolute top-12 right-6 z-40 w-[230px] rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 shadow-md shadow-stone-900/5">
          <p className="text-[13px] leading-snug font-medium text-stone-900 whitespace-nowrap">
            Built &amp; shipped by{" "}
            <span className="text-amber-800 font-semibold">Aylin Uyar</span>.
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1.5 border-t border-stone-200 pt-2">
            <a
              href="https://github.com/aylineuyar-arch"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center gap-1.5 rounded-lg bg-stone-900 px-2 py-1.5 text-white text-xs font-medium transition-transform hover:scale-[1.02]"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aylinuyar/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center gap-1.5 rounded-lg bg-[#0A66C2] px-2 py-1.5 text-white text-xs font-medium transition-transform hover:scale-[1.02]"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        <h1 className="mt-6 text-5xl md:text-7xl font-light leading-[1.05] tracking-tight flex flex-wrap items-end gap-x-5 gap-y-2 pr-[250px]">
          <span>Aylin Uyar</span>
          <span className="text-base md:text-lg uppercase tracking-[0.3em] text-amber-800 font-medium pb-2 md:pb-3">
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

        {/* Tools & concepts — 3 scannable marquee rows */}
        <div className="mt-8 max-w-3xl rounded-2xl border border-stone-300/70 bg-white/60 backdrop-blur-sm p-5 md:p-6 space-y-5">
          {[
            {
              label: "AI",
              items: ["Claude API", "OpenAI API", "RAG", "AI agents", "Function calling", "Prompt engineering"],
            },
            {
              label: "Automation",
              items: ["n8n", "Cron pipelines", "Greenhouse / Lever / Ashby APIs", "Resend"],
            },
            {
              label: "Engineering",
              items: ["Python", "SQL", "Supabase / Postgres", "React + TypeScript", "Streamlit"],
            },
          ].map((g) => {
            const loop = [...g.items, ...g.items, ...g.items];
            return (
              <div key={g.label} className="flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-3">
                <span className="shrink-0 sm:w-28 text-sm uppercase tracking-[0.22em] text-amber-800 font-semibold">
                  {g.label}
                </span>
                <div className="relative flex-1 overflow-hidden">
                  <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white/80 to-transparent z-10" />
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white/80 to-transparent z-10" />
                  <div className="flex w-max animate-marquee gap-2">
                    {loop.map((t, i) => (
                      <span
                        key={i}
                        className="shrink-0 inline-flex items-center gap-2 rounded-full border border-stone-300/70 bg-white/90 px-4 py-1.5 text-[15px] text-stone-800"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-700" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project navigation bubbles */}
        <div className="mt-16 lg:-mx-16 xl:-mx-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
            {[
              { num: "No. 01", id: "project-1", title: "AI Job Search Dashboard", sub: "Claude · Python · 130+ Applicant Tracking Systems", tools: ["Claude", "Python", "Railway", "ATS"] },
              { num: "No. 02", id: "project-2", title: "Agentic AI Email Generator", sub: "Claude · n8n · Railway · 8am ET", tools: ["Claude", "n8n", "Railway", "Resend", "Supabase"] },
              { num: "No. 03", id: "project-3", title: "Compliance RAG Chatbot", sub: "Financial services · Python", tools: ["Claude", "Python", "Streamlit", "RAG"] },
              { num: "No. 04", id: "project-4", title: "AI Customer Service Triage", sub: "Claude · Python · NLP routing", tools: ["Claude", "Python", "Triage", "NLP"] },
              { num: "No. 05", id: "project-5", title: "Aura — Makeup Assistant", sub: "Lovable · React · Claude", tools: ["Lovable", "React", "TypeScript", "Claude"] },
            ].map((p) => (
              <a key={p.id} href={`#${p.id}`} className="block p-5 rounded-2xl bg-white/80 backdrop-blur border border-stone-200 hover:border-rose-400 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-rose-600 font-semibold">{p.num}</span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                  </span>
                </div>
                <div className="mt-3 text-base font-medium text-stone-900 leading-snug">{p.title}</div>
                <div className="mt-1 text-xs text-stone-600">{p.sub}</div>
                <ToolIcons tools={p.tools} />
              </a>
            ))}
          </div>
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
            <a
              href="https://github.com/aylineuyar-arch/ai-workflow-demo"
              target="_blank"
              rel="noreferrer"
              aria-label="View repository on GitHub"
              title="View repository on GitHub"
              className="mt-8 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
            >
              <Github className="w-4 h-4" />
              <span>Repository</span>
            </a>
          </div>

          <div className="md:col-span-8 space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-stone-700">
              An AI-powered pipeline that aggregates live postings from{" "}
              <strong className="text-stone-900">130+ company Applicant Tracking Systems (ATSs)</strong> and
              major job boards, scores each role with Claude on fit and
              realistic conversion likelihood, and renders results in a
              filterable web dashboard.
            </p>

            <div className="grid grid-cols-3 gap-4 border-y border-orange-200/60 py-6">
              {[
                ["286", "Roles per run"],
                ["130+", "Companies tracked"],
                ["~3 min", "End-to-end pipeline"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl md:text-3xl font-light text-orange-900">
                    {n}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-orange-50/60 border border-orange-200">
                <div className="text-xs uppercase tracking-wider text-orange-700 font-semibold">
                  Fit Score (0–100)
                </div>
                <p className="mt-1.5 text-sm text-stone-700 leading-snug">
                  How well the role matches background, industry, and stated goals.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-orange-50/60 border border-orange-200">
                <div className="text-xs uppercase tracking-wider text-orange-700 font-semibold">
                  Conversion Score (0–100)
                </div>
                <p className="mt-1.5 text-sm text-stone-700 leading-snug">
                  Realistic offer likelihood, calibrated by company type and competitiveness.
                </p>
              </div>
            </div>

            <ul className="space-y-2.5 text-sm md:text-base text-stone-700 leading-relaxed">
              <li className="flex gap-3"><span className="text-orange-500">▸</span>~300 deduplicated roles per run across 130+ target companies</li>
              <li className="flex gap-3"><span className="text-orange-500">▸</span>Honest conversion scoring — Anthropic 10–25, early-stage startups 45–65</li>
              <li className="flex gap-3"><span className="text-orange-500">▸</span>Apply-now list: fit ≥ 65 AND conversion ≥ 45 — actionable, not a dump</li>
              <li className="flex gap-3"><span className="text-orange-500">▸</span>Eliminated manual checking of Anthropic, Ramp, Rippling, Databricks + 126 more</li>
              <li className="flex gap-3"><span className="text-orange-500">▸</span>Deployed on Railway — zero infrastructure overhead</li>
            </ul>

            <figure className="mt-8">
              <img
                src={dashboardImg}
                alt="Job Search Dashboard — color-coded fit and conversion scores"
                className="w-full rounded-lg shadow-lg ring-1 ring-stone-200"
                loading="lazy"
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
            <a
              href="https://muse-agent-transfer.lovable.app"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
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
                loading="lazy"
              />
              <figcaption className="mt-3 text-xs text-stone-500 italic">
                Live countdown to the next 8am ET email run + the exact job titles the agent tracks.
              </figcaption>
            </figure>



            <div className="grid grid-cols-3 gap-4 border-y border-stone-200 py-6">
              {[
                ["8am ET", "Daily cron trigger"],
                ["0", "Manual touches per run"],
                ["4", "Tools orchestrated"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl md:text-3xl font-light text-stone-800">
                    {n}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <div className="text-xs uppercase tracking-wider text-stone-600 font-semibold">
                  Agentic Workflow
                </div>
                <p className="mt-1.5 text-sm text-stone-700 leading-snug">
                  n8n orchestrates search → Claude scoring → dedupe → email, no human in the loop.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <div className="text-xs uppercase tracking-wider text-stone-600 font-semibold">
                  Persistent Memory
                </div>
                <p className="mt-1.5 text-sm text-stone-700 leading-snug">
                  Supabase stores every prior run so today's digest never repeats yesterday's roles.
                </p>
              </div>
            </div>

            <ul className="space-y-2.5 text-sm md:text-base text-stone-700 leading-relaxed">
              <li className="flex gap-3"><span className="text-stone-500">▸</span>Cron-triggered daily — zero manual touch, runs while I sleep</li>
              <li className="flex gap-3"><span className="text-stone-500">▸</span>Claude scores every posting on relevance, dedupes against yesterday's run via Supabase</li>
              <li className="flex gap-3"><span className="text-stone-500">▸</span>Self-hosted n8n on Railway — own the workflow, no per-execution SaaS fees</li>
              <li className="flex gap-3"><span className="text-stone-500">▸</span>Resend delivers a clean HTML digest straight to inbox — ready to skim with morning coffee</li>
              <li className="flex gap-3"><span className="text-stone-500">▸</span>Built to demonstrate AI fluency across orchestration tools, not just one</li>
            </ul>

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
            <div className="mt-8 flex flex-wrap gap-2">
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

            <p className="text-base md:text-lg leading-relaxed text-stone-700">
              A live chatbot that answers <strong className="text-stone-900">financial services compliance questions</strong> — streams Claude's responses token by token, grounds every answer in retrieved policy passages, and falls back honestly when the docs don't cover the question. Built to mirror the internal tooling a regulated fintech (Revolut, Ramp, Stripe) actually needs.
            </p>


            <figure>
              <img
                src={complianceRagImg}
                alt="Compliance Policy Q&A chatbot — indexed AML, KYC, Trade Surveillance, and Data Governance documents with example questions"
                className="w-full rounded-lg shadow-lg ring-1 ring-emerald-200"
                loading="lazy"
              />
              <figcaption className="mt-3 text-xs text-stone-500 italic">
                Live app — 4 indexed policy domains, 21 chunks, Claude Haiku 4.5 with grounded retrieval.
              </figcaption>
            </figure>


            <ul className="space-y-2.5 text-sm md:text-base text-stone-700 leading-relaxed">
              <li className="flex gap-3"><span className="text-emerald-500">▸</span>Streaming answers with conversation memory — follow-ups like "what about exceptions?" work in context</li>
              <li className="flex gap-3"><span className="text-emerald-500">▸</span>Confidence threshold + cross-document synthesis callout — no weak answers, flags when reasoning spans AML + KYC</li>
              <li className="flex gap-3"><span className="text-emerald-500">▸</span>Suggested follow-up questions and CSV session export — built for analyst workflows and audit trails</li>
              <li className="flex gap-3"><span className="text-emerald-500">▸</span>Deployed live on Streamlit Cloud: claude-haiku-4-5 + local sentence-transformers embeddings, zero API cost on retrieval</li>
            </ul>

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
            <a
              href="https://github.com/aylineuyar-arch/ai-cs-triage"
              target="_blank"
              rel="noreferrer"
              aria-label="View repository on GitHub"
              title="View repository on GitHub"
              className="mt-8 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
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
            <div className="mt-8 flex flex-wrap items-center gap-2">
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
            <p className="text-base md:text-lg leading-relaxed text-stone-700">
              Aura maps your{" "}
              <strong className="text-stone-900">
                skin tone, undertone, face shape, and eye shape
              </strong>{" "}
              to compose a personalized beauty routine — with the products and
              techniques to wear it well. Built end-to-end with Lovable: zero
              engineering team, shipped and live.
            </p>

            <ul className="space-y-2.5 text-sm md:text-base text-stone-700 leading-relaxed">
              <li className="flex gap-3"><span className="text-rose-500">▸</span>5-dimensional profile updates kit and routine in real time</li>
              <li className="flex gap-3"><span className="text-rose-500">▸</span>Visual tutorials — technique maps with brush + product callouts</li>
              <li className="flex gap-3"><span className="text-rose-500">▸</span>Zero engineering team: design, logic, deployment all in Lovable</li>
              <li className="flex gap-3"><span className="text-rose-500">▸</span>Range beyond backend pipelines — same operator mindset, consumer-facing delivery</li>
            </ul>

            <div className="mt-8 space-y-4">
              <figure>
                <img
                  src={auraLanding}
                  alt="Aura — editorial landing page"
                  className="w-full rounded-lg shadow-lg ring-1 ring-stone-200"
                  loading="lazy"
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
                    loading="lazy"
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
                    loading="lazy"
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

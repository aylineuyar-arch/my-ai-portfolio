import { createFileRoute, Link } from "@tanstack/react-router";
import { Github } from "lucide-react";
import dashboardImg from "@/assets/portfolio-dashboard.jpg";
import auraLanding from "@/assets/aura-landing.jpg";
import auraProfile from "@/assets/aura-profile.jpg";
import auraTutorials from "@/assets/aura-tutorials.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aylin Uyar — AI Portfolio" },
      {
        name: "description",
        content:
          "Aylin Uyar — Tuck MBA 2026, ex-Deloitte. Live AI projects: a Claude-powered job search dashboard and Aura, a personalized makeup app built end-to-end with Lovable.",
      },
      { property: "og:title", content: "Aylin Uyar — AI Portfolio" },
      {
        property: "og:description",
        content:
          "Live AI projects built with Claude, Python, and Lovable — shipped end-to-end.",
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
};

// Real brand logos via simpleicons CDN. Fallback to colored letter badge for non-brand items.
const TOOL_LOGOS: Record<string, { slug: string; bg: string }> = {
  Claude: { slug: "claude", bg: "bg-orange-50 ring-orange-200" },
  Python: { slug: "python", bg: "bg-blue-50 ring-blue-200" },
  Railway: { slug: "railway", bg: "bg-violet-50 ring-violet-200" },
  React: { slug: "react", bg: "bg-sky-50 ring-sky-200" },
  TypeScript: { slug: "typescript", bg: "bg-blue-50 ring-blue-200" },
};
const TOOL_FALLBACK: Record<string, string> = {
  Lovable: "bg-rose-500 text-white",
  RAG: "bg-emerald-600 text-white",
  ATS: "bg-amber-600 text-white",
  Triage: "bg-indigo-600 text-white",
  NLP: "bg-cyan-600 text-white",
};

function ToolIcons({ tools }: { tools: string[] }) {
  return (
    <div className="mt-3 flex items-center gap-2">
      {tools.map((t) => {
        const logo = TOOL_LOGOS[t];
        if (logo) {
          return (
            <span
              key={t}
              title={t}
              className={`inline-flex items-center justify-center w-7 h-7 rounded-full ring-1 shadow-sm ${logo.bg}`}
            >
              <img
                src={`https://cdn.simpleicons.org/${logo.slug}`}
                alt={t}
                className="w-4 h-4"
                loading="lazy"
              />
            </span>
          );
        }
        return (
          <span
            key={t}
            title={t}
            className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold ring-1 ring-white shadow-sm ${TOOL_FALLBACK[t] ?? "bg-stone-400 text-white"}`}
          >
            {t[0]}
          </span>
        );
      })}
    </div>
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
      <div className="h-[2px] bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
    </div>
  );
}

function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdf8f3] via-[#faf3ec] to-[#f5ede2] text-stone-900">
      {/* Hero */}
      <header className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="text-sm md:text-base uppercase tracking-[0.35em] text-rose-700/80 font-medium">
          AI Portfolio · 2026
        </p>
        <h1 className="mt-6 text-5xl md:text-7xl font-light leading-[1.05] tracking-tight">
          Aylin Uyar
        </h1>

        <p className="mt-8 max-w-4xl text-lg md:text-2xl text-stone-700 leading-snug font-light">
          Tuck MBA 2026 · Ex-Deloitte Tech Strategy · PM Intern at Skild AI.
          Operator-level AI thinking — building reliable pipelines and
          consumer products end-to-end.
        </p>

        {/* Pronounced links */}
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="https://github.com/aylineuyar-arch"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
            <span className="opacity-60 group-hover:translate-x-0.5 transition-transform">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/aylinuyar/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 bg-[#0A66C2] text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-[#0855a3] transition-colors shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
            <span className="opacity-60 group-hover:translate-x-0.5 transition-transform">↗</span>
          </a>
        </div>

        {/* Project navigation bubbles */}
        <div className="mt-14">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500 font-medium mb-4">
            Four live projects · jump to →
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="#project-1" className="block p-5 rounded-2xl bg-white/80 backdrop-blur border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-orange-700 font-semibold">No. 01</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="mt-3 text-lg font-medium text-stone-900 leading-snug">AI Job Search Dashboard</div>
              <div className="mt-1 text-xs text-stone-600">Claude · Python · 130+ ATSs</div>
              <ToolIcons tools={["Claude", "Python", "Railway", "ATS"]} />
            </a>
            <a href="#project-2" className="block p-5 rounded-2xl bg-white/80 backdrop-blur border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">No. 02</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="mt-3 text-lg font-medium text-stone-900 leading-snug">Compliance RAG Chatbot</div>
              <div className="mt-1 text-xs text-stone-600">Financial services · Python</div>
              <ToolIcons tools={["Claude", "Python", "RAG"]} />
            </a>
            <a href="#project-3" className="block p-5 rounded-2xl bg-white/80 backdrop-blur border-2 border-rose-200 hover:border-rose-400 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-rose-700 font-semibold">No. 03</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="mt-3 text-lg font-medium text-stone-900 leading-snug">Aura — Makeup Assistant</div>
              <div className="mt-1 text-xs text-stone-600">Lovable · React · Claude</div>
              <ToolIcons tools={["Lovable", "React", "TypeScript", "Claude"]} />
            </a>
            <a href="#project-4" className="block p-5 rounded-2xl bg-white/80 backdrop-blur border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-indigo-700 font-semibold">No. 04</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="mt-3 text-lg font-medium text-stone-900 leading-snug">AI CS Triage</div>
              <div className="mt-1 text-xs text-stone-600">Claude · Python · NLP routing</div>
              <ToolIcons tools={["Claude", "Python", "Triage", "NLP"]} />
            </a>
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
              <strong className="text-stone-900">130+ company ATSs</strong> and
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

      {/* Project 2 — Compliance RAG */}
      <section id="project-2" className="mx-auto max-w-6xl px-6 py-20 md:py-28 scroll-mt-8">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-700 font-medium">
              No. 02 · Built with Claude
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              Compliance RAG Chatbot
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Claude", "Python", "RAG", "Financial Services"].map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <a
              href="https://github.com/aylineuyar-arch/compliance-rag-demo"
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
              A chatbot that answers <strong className="text-stone-900">financial services compliance questions</strong> by retrieving from internal policy documents and grounding Claude's responses in cited source passages — built to mirror the kind of internal tooling a regulated fintech (Revolut, Ramp, Stripe) actually needs.
            </p>

            <ul className="space-y-2.5 text-sm md:text-base text-stone-700 leading-relaxed">
              <li className="flex gap-3"><span className="text-emerald-500">▸</span>Retrieval-augmented generation over policy PDFs — answers cite source passages, not hallucinations</li>
              <li className="flex gap-3"><span className="text-emerald-500">▸</span>Built for regulated environments where every answer needs an auditable trail</li>
              <li className="flex gap-3"><span className="text-emerald-500">▸</span>Demonstrates judgment on where LLMs help (synthesis) vs. where they hurt (unsourced claims)</li>
              <li className="flex gap-3"><span className="text-emerald-500">▸</span>Same operator pattern as the job dashboard: real problem → reliable pipeline → useful output</li>
            </ul>

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
              <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-2">
                Why this matters
              </p>
              <p className="text-sm text-stone-700 leading-relaxed">
                Compliance and policy lookups are exactly the kind of high-volume, judgment-heavy workflow where grounded LLM retrieval delivers measurable time savings — directly relevant to ops teams at fintechs operating under FCA, SEC, and multi-jurisdiction frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* Project 3 — Aura */}
      <section id="project-3" className="mx-auto max-w-6xl px-6 py-20 md:py-28 scroll-mt-8">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-700 font-medium">
              No. 03 · Built with Lovable
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

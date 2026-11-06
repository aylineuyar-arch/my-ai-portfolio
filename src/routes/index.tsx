import { createFileRoute } from "@tanstack/react-router";
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
import headshot from "@/assets/aylin-headshot.jpg.asset.json";
import gtmHome from "@/assets/gtm-pricing-home.png";
import { TAG_COLORS, TOOL_LOGOS, ToolIcons, Tag, GradientDivider, AgentFlowMarquee, ProjectCollapse, type AgentStep } from "@/components/portfolio-kit";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aylin Uyar — AI Deployment, Strategy & Ops Portfolio" },
      {
        name: "description",
        content:
          "Aylin Uyar, Tuck MBA 2026, ex-Deloitte Tech Strategy, PM Intern at Skild AI. Six live, shipped AI projects across deployment, strategy, and ops: Claude agent pipelines, agentic email automation, RAG compliance, and customer-service triage.",
      },
      { property: "og:title", content: "Aylin Uyar — AI Deployment, Strategy & Ops Portfolio" },
      {
        property: "og:description",
        content:
          "Aylin Uyar, Tuck MBA 2026, ex-Deloitte Tech Strategy, PM Intern at Skild AI. Six live, shipped AI projects across deployment, strategy, and ops: Claude agent pipelines, agentic email automation, RAG compliance, and customer-service triage.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://aylin-uyar-portfolio.lovable.app/" },
      { name: "twitter:title", content: "Aylin Uyar — AI Deployment, Strategy & Ops Portfolio" },
      {
        name: "twitter:description",
        content:
          "Aylin Uyar, Tuck MBA 2026, ex-Deloitte Tech Strategy, PM Intern at Skild AI. Six live, shipped AI projects across deployment, strategy, and ops: Claude agent pipelines, agentic email automation, RAG compliance, and customer-service triage.",
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


function PortfolioPage() {
  useEngagementTracking();
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdf8f3] via-[#faf3ec] to-[#f5ede2] text-stone-900">
      {/* Built & shipped badge — fixed top right */}
      <div className="relative mx-6 mt-4 md:mx-0 md:mt-0 md:fixed md:top-4 md:right-4 z-50 md:w-[244px] rounded-xl border border-rose-200 bg-white/95 backdrop-blur px-4 py-3 shadow-lg shadow-rose-900/10">
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

      {/* Quick-nav bubbles under the badge */}
      <div className="relative mx-6 mt-2 grid grid-cols-2 gap-2 md:mx-0 md:mt-0 md:fixed md:top-[118px] md:right-[46px] z-50 md:flex md:w-[183px] md:flex-col">
        <a href="#bio" className="rounded-full border border-stone-500 bg-stone-200 px-2.5 py-1.5 md:px-4 md:py-2 text-center text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.12em] md:tracking-[0.15em] text-stone-800 shadow-md shadow-stone-900/10 hover:bg-stone-300 transition-transform hover:scale-[1.04]">
          Bio
        </a>
        <a href="/agent-deep-dive" className="rounded-full border border-stone-500 bg-stone-200 px-2.5 py-1.5 md:px-4 md:py-2 text-center text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.12em] md:tracking-[0.15em] text-stone-800 shadow-md shadow-stone-900/10 hover:bg-stone-300 transition-transform hover:scale-[1.04]">
          Agent Deep Dive
        </a>
      </div>

      {/* Hero */}
      <header className="relative mx-auto max-w-6xl px-6 pt-6 pb-8 md:pt-8 md:pb-10 scroll-mt-8">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light leading-[1.05] tracking-tight flex flex-wrap items-center gap-x-4 md:gap-x-5 gap-y-2 md:pr-[240px]">
          <img src={headshot.url} alt="Aylin Uyar headshot" className="h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-full object-cover object-[50%_25%] ring-2 ring-rose-200 shadow-sm" />
          <span>Aylin Uyar</span>
        </h1>

        {/* Tagline — the through-line of the work */}
        <p className="mt-4 text-xl md:text-2xl font-medium italic text-rose-700 leading-tight">
          Designing AI systems people actually adopt.
        </p>

        <p className="mt-3 max-w-4xl text-xl md:text-2xl font-light text-stone-800 leading-tight">
          Tuck MBA <span className="text-stone-400">|</span> Ex Deloitte and Skild AI <span className="text-stone-400">|</span> AI Deployment, Technical Strategy, Ops
        </p>

        {/* One-sentence positioning */}
        <p className="mt-3 max-w-3xl text-base md:text-lg text-stone-700 leading-relaxed">
          Engineer turned AI deployment and strategy leader, helping organizations operationalize AI through workflow redesign, adoption, and measurable business outcomes.
        </p>

        {/* Principles as header subtext */}
        <p className="mt-2 max-w-3xl text-sm md:text-base text-stone-500 leading-relaxed">
          Bottlenecks first. Ship fast. Measure adoption.
        </p>


        {/* === AylinOS meta-project demo === */}
        <section data-track-section="aylinos-demo" className="mt-8 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-6 md:px-16 lg:px-24">



          <div className="mx-auto max-w-[980px] rounded-2xl bg-white/80 backdrop-blur border border-stone-200 overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Video */}
              <div className="relative bg-stone-100 border-b md:border-b-0 md:border-r border-stone-200 md:col-span-3 aspect-[16/10] md:aspect-auto md:min-h-[400px]">
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600/95 text-white text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 shadow-sm backdrop-blur">
                    Demo: more to come
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
                  className="absolute inset-0 w-full h-full object-contain object-center block opacity-70"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/40" />
              </div>

              {/* Copy */}
              <div className="p-6 md:p-8 flex flex-col justify-center md:col-span-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-rose-600">
                    Featured
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
                  A personal AI operations system for work <em>and</em> life: the meta-layer that reaches into the 6 projects below.
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
                    <CollapsibleTrigger data-track-click="aylinos-expand-agents" onClick={() => warmAylinosBackend()} className="group flex w-full items-center justify-between rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 px-3 py-2 text-[11px] uppercase tracking-[0.14em] font-semibold text-rose-700 transition-colors">
                      <span>See the 6 agents, what it proves, &amp; skills</span>
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3.5 pt-3.5">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-rose-600 mb-1">
                          The 6 agents &amp; what they touch
                        </div>
                        <ul className="text-[14px] text-stone-800 leading-snug space-y-1.5">
                          <li><span className="font-semibold text-violet-700">Job Search</span>: pulls roles from 130+ ATSs, Claude-scores fit, ships an 8am ranked digest <span className="text-stone-500">· Job Dashboard + Email Generator</span></li>
                          <li><span className="font-semibold text-sky-600">Outreach</span>: drafts intros &amp; follow-ups across a 130-target contact graph, human-gated send <span className="text-stone-500">· Outreach engine</span></li>
                          <li><span className="font-semibold text-emerald-700">Pricing &amp; GTM</span>: builds tiers, ICP, comp sets, packaging memos <span className="text-stone-500">· GTM Pricing Tool</span></li>
                          <li><span className="font-semibold text-amber-700">Policy Desk</span>: grounded Q&amp;A across 4 policy domains, returns citations <span className="text-stone-500">· Compliance RAG</span></li>
                          <li><span className="font-semibold text-cyan-700">Inbox &amp; Reservations</span>: sub-1s ticket triage and 8-node reservation graph <span className="text-stone-500">· CS Triage + Fork Yea!</span></li>
                          <li><span className="font-semibold text-pink-700">Research</span>: fan-in briefs, comp pulls, shadow-eval scoring delivered to Drive <span className="text-stone-500">· Research agent → Drive</span></li>
                        </ul>
                      </div>

                      <div>
                        <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-rose-600 mb-1">
                          What it proves
                        </div>
                        <p className="text-[15px] text-stone-800 leading-snug">
                          End-to-end <span className="font-semibold">AI deployment</span>: orchestration, evals, memory, and observability. Designed, shipped, and run in production.
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
                    href="https://aylinos.lovable.app/aylinos-app"
                    target="_blank"
                    rel="noreferrer"
                    data-track-click="launch-aylinos"
                    className="inline-flex items-center gap-2 rounded-lg bg-rose-600 hover:bg-rose-700 transition-colors px-4 py-2 text-white text-sm font-medium"
                  >
                    Launch AylinOS →
                  </a>
                </div>
              </div>
            </div>
          </div>



        </section>

        <div className="mt-12 mb-2 flex items-center gap-4">
          <span className="shrink-0 text-[12px] uppercase tracking-[0.3em] font-semibold text-rose-600">Bio</span>
          <div className="flex-1 border-t-2 border-rose-300" />
        </div>

        {/* === Experience timeline === */}
        <section id="bio" data-track-section="experience-timeline" className="mt-8 scroll-mt-8">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-3xl md:text-4xl font-medium tracking-tight text-rose-600 leading-none">6+</span>
            <h3 className="text-base md:text-lg uppercase tracking-[0.18em] text-stone-700 font-semibold">Years of experience</h3>
            <span className="ml-auto text-xs italic text-stone-500 md:hidden">swipe →</span>
          </div>
          <div className="relative overflow-x-auto pb-2">
            <ol className="relative grid grid-cols-8 gap-3 min-w-[1000px] pt-9">
              <div className="pointer-events-none absolute left-0 right-0 top-[54px] h-px bg-stone-300" />
              <div className="pointer-events-none absolute top-[2px] h-[57px] left-[34%] -translate-x-1/2 flex flex-col items-center" title="London Business School MBA exchange, 2025">
                <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider text-sky-700 leading-tight text-center">London Business School<br /><span className="font-medium normal-case italic tracking-normal text-sky-600">MBA Exchange · 2025</span></span>
                <span className="my-0.5 w-0 flex-1 border-l border-dashed border-sky-300" />
                <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-sky-400 bg-sky-200" />
              </div>
              {[
                { y: "2026–now", org: "Rownd AI (YC)", t: "AI Implementation Strategist", s: "Leading agentic AI implementation and proposal automation for defense-tech workflows." },
                { y: "2026", org: "LinguaLinq.ai", t: "Product Strategy & Operations", s: "Led product strategy, adoption, and GTM for an AI translation platform in 70+ languages." },
                { y: "2025", org: "Skild AI (Forbes AI 50)", t: "Product Management Intern", s: "PM intern driving GTM strategy, deployment, and a zero-to-one PRD for a flagship robotics client." },
                { y: "2024–26", edu: true, org: "Dartmouth Tuck", t: "MBA", s: "Forté Fellow and Startup Builder Fellow at the Center for Entrepreneurship." },
                { y: "2020–24", org: "Deloitte Consulting", t: "Tech Strategy Senior Consultant", s: "Led tech strategy for $150M–$500M cloud transformations; Interim Chief of Staff for a 2,500-person program." },
                { y: "2019–20", org: "DCS Corporation", t: "Sensor Integration Engineer", s: "Engineered C++ sensor integration for military vehicle operator controls." },
                { y: "2018–19", org: "Booz Allen Hamilton", t: "Staff Engineer", s: "Built C++ software for a computer-vision anti-drone sensor fusion system." },
                { y: "2014–18", edu: true, org: "George Washington University", t: "B.S. Electrical Engineering", s: "Electrical engineering degree; Dean's Commendation List x3 and Merit Scholarship." },
              ].map((e) => (
                <li key={e.org}>
                  <span className={`relative inline-block whitespace-nowrap rounded-full border px-3 py-1.5 text-[12px] font-semibold ${e.y.includes("now") ? "border-green-700/30 bg-green-100/70 text-green-800" : e.edu ? "border-sky-300 bg-sky-50 text-sky-800" : "border-rose-200 bg-rose-50 text-rose-700"}`}>{e.y}</span>
                  <p className="mt-3 text-sm font-semibold text-stone-900">{e.org}</p>
                  <p className="text-[11px] italic text-stone-500">{e.t}</p>
                  <p className="mt-1 text-[12px] leading-snug text-stone-600">{e.s}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        {/* === end AylinOS section === */}

        <div className="mt-12 mb-6 flex items-center gap-4 md:mt-14">
          <h3 className="shrink-0 text-[12px] uppercase font-semibold text-section-divider">AylinOS Breakdown</h3>
          <div className="flex-1 border-t border-section-divider/40" />
        </div>
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3 items-stretch">
            {[
              { num: "No. 01", id: "project-1", numCls: "text-orange-700", title: "AI Job Search Dashboard", blurb: "Scores 130+ ATS feeds for fit and conversion likelihood.", outcome: "Turns hours of daily job-board scrolling into a ranked 5-minute morning triage.", sub: "Claude · Python · Railway", metric: "286 roles per run", tools: ["Claude", "Python", "Railway", "ATS"] },
              { num: "No. 02", id: "project-3", numCls: "text-emerald-700", title: "Compliance RAG Chatbot", blurb: "Grounded policy Q&A for regulated financial services teams, with citations on every answer.", outcome: "Frees compliance teams from hunting through policy PDFs, cuts research time and keeps every answer auditable.", sub: "Claude · Python · Streamlit", metric: "Zero embedding cost", tools: ["Claude", "Python", "Streamlit", "RAG"] },
              { num: "No. 03", id: "project-4", numCls: "text-indigo-700", title: "Customer Service Triage Agent", blurb: "Classifies, prioritizes, drafts a grounded reply, and completes the action end to end.", outcome: "Turns a support queue that used to sit for hours into replies that ship inside a single shift.", sub: "Claude · LangGraph · Python · FastAPI", metric: "Under 640ms end to end", tools: ["Claude", "LangGraph", "Python", "FastAPI"] },
              { num: "No. 04", id: "project-gtm", numCls: "text-teal-700", title: "GTM Pricing Tool", blurb: "Models revenue, pricing, and scenarios for founders, consultants, operators, and investors.", outcome: "Compresses a multi-week pricing exercise into a 20-minute recommendation grounded in real benchmarks.", sub: "Claude · Python · Railway", metric: "4 personas modeled", tools: ["Claude", "Python", "Railway"] },
              { num: "No. 05", id: "project-restaurant", numCls: "text-rose-600", title: "Fork Yea! — Multi-Agentic Reservation Agent", blurb: "Finds and books the right restaurant, with a Haiku judge scoring every pick.", outcome: "Collapses hours of research and 20+ tab-switches into one confident booking.", sub: "Cursor · LangGraph · Claude · Playwright", metric: "LLM-as-judge scored", tools: ["Cursor", "LangGraph", "Claude", "Playwright", "Tavily", "FastAPI"] },
              { num: "No. 06", id: "project-2", numCls: "text-amber-700", title: "Agentic Email Generator", blurb: "Always-on agent emails a ranked digest at 8am ET daily.", outcome: "Removes manual research: every morning, the right opportunities are surfaced, ranked, and ready to act on.", sub: "n8n · Claude · Supabase", metric: "8am ET daily digest", tools: ["Claude", "n8n", "Railway", "Resend", "Supabase"] },

            ].map((p) => {
              const logos = p.tools.filter((t) => TOOL_LOGOS[t]);
              return (
                <a key={p.id} href={`/agent-deep-dive#${p.id}`} className="flex flex-col p-3.5 rounded-2xl bg-white/80 backdrop-blur border border-stone-200 hover:border-rose-400 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] uppercase tracking-wider font-semibold ${p.numCls}`}>{p.num}</span>
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <div className="mt-3 text-[15px] font-semibold text-stone-900 leading-tight tracking-tight">
                    {p.title.startsWith("Fork Yea!") ? (
                      <><em className="italic">Fork Yea!</em> — Multi-Agentic Reservation Agent</>
                    ) : (
                      p.title
                    )}
                  </div>
                  <p className="mt-2 text-[13px] text-stone-600 leading-snug">{p.blurb}</p>
                  {p.outcome && (
                    <p className="mt-1.5 text-[12px] text-emerald-800 leading-snug">
                      <span className="font-semibold uppercase tracking-wider text-[10px] text-emerald-700 mr-1">Impact:</span>
                      {p.outcome}
                    </p>
                  )}
                  <div className="mt-2.5">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider ${p.numCls} border-current/20 bg-white`}>
                      <span className="w-1 h-1 rounded-full bg-current opacity-70" />
                      {p.metric}
                    </span>
                  </div>
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
                    {g.items.map((name, i) => (
                      <span
                        key={`a-${i}`}
                        className={`shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-medium ${g.chip}`}
                      >
                        {name}
                      </span>
                    ))}
                    {g.items.map((name, i) => (
                      <span
                        key={`b-${i}`}
                        aria-hidden="true"
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


      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-stone-600">
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
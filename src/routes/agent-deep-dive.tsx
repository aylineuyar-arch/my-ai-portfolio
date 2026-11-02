import { createFileRoute } from "@tanstack/react-router";
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
import { TAG_COLORS, TOOL_LOGOS, ToolIcons, Tag, GradientDivider, AgentFlowMarquee, ProjectCollapse, type AgentStep } from "@/components/portfolio-kit";

export const Route = createFileRoute("/agent-deep-dive")({
  head: () => ({
    meta: [
      { title: "Agent Deep Dive — Aylin Uyar AI Portfolio" },
      { name: "description", content: "Detailed breakdowns of six production AI agents built and shipped by Aylin Uyar: job search, compliance RAG, CS triage, GTM pricing, reservations, and email." },
      { property: "og:title", content: "Agent Deep Dive — Aylin Uyar AI Portfolio" },
      { property: "og:description", content: "Detailed breakdowns of six production AI agents built and shipped by Aylin Uyar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgentDeepDivePage,
});

function AgentDeepDivePage() {
  useEngagementTracking();
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdf8f3] via-[#faf3ec] to-[#f5ede2] text-stone-900">
      <header className="mx-auto max-w-6xl px-6 pt-8 pb-6">
        <a href="/" className="inline-flex items-center gap-1 rounded-full border border-stone-500 bg-stone-200 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-stone-800 hover:bg-stone-300">← Back to portfolio</a>
        <h1 className="mt-5 text-4xl md:text-6xl font-light tracking-tight">Agent Deep Dive</h1>
        <p className="mt-3 text-stone-600">Six production AI agents — how each one works, what it touches, and the outcome it drives.</p>
      </header>
      <GradientDivider />

      {/* Project 1 */}
      <section id="project-1" className="mx-auto max-w-6xl px-6 py-6 md:py-8 scroll-mt-8">
        <ProjectCollapse id="project-1" num="No. 01 · AI Job Search" numCls="text-orange-700" title="Live AI Job Search Dashboard" sub="Claude · Python · Railway">
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
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-orange-300 bg-orange-100 px-4 py-3 text-sm font-medium text-orange-900 hover:bg-orange-200 transition-colors">
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
              href="https://aylinos.onrender.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Try this agent in AylinOS"
              title="Try this agent in AylinOS"
              className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Try in AylinOS</span>
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

      {/* Project 2 — Compliance RAG Chatbot */}
      <section id="project-3" className="mx-auto max-w-6xl px-6 py-6 md:py-8 scroll-mt-8">
        <ProjectCollapse id="project-3" num="No. 02 · Compliance RAG Chatbot" numCls="text-emerald-700" title="Compliance RAG Chatbot" sub="Claude · Python · Streamlit">
        <div className="grid md:grid-cols-12 gap-10">

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-700 font-medium">
              No. 02 · Built with Claude
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
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-emerald-300 bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-900 hover:bg-emerald-200 transition-colors">
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
                href="https://aylinos.onrender.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Try this agent in AylinOS"
                title="Try this agent in AylinOS"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Try in AylinOS</span>
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

      {/* Project 3 — Customer Service Triage */}
      <section id="project-4" className="mx-auto max-w-6xl px-6 py-6 md:py-8 scroll-mt-8">
        <ProjectCollapse id="project-4" num="No. 03 · Customer Service Triage Agent" numCls="text-indigo-700" title="Customer Service Triage Agent" sub="Claude · LangGraph · Python · FastAPI">
        <div className="grid md:grid-cols-12 gap-10">

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-700 font-medium">
              No. 03 · Built with Claude + LangGraph
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              Customer Service Triage Agent
            </h2>
            <p className="mt-3 text-sm text-stone-600 leading-snug">
              Classifies, prioritizes, and drafts a grounded reply, then completes the action end to end, in under 640ms.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Claude", "LangGraph", "Python", "FastAPI"].map((t) => (

                <Tag key={t} label={t} />
              ))}
            </div>
            <Collapsible className="mt-8">
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-indigo-300 bg-indigo-100 px-4 py-3 text-sm font-medium text-indigo-900 hover:bg-indigo-200 transition-colors">
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
              href="https://aylinos.onrender.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Try this agent in AylinOS"
              title="Try this agent in AylinOS"
              className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Try in AylinOS</span>
            </a>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-stone-50 border-l-4 border-rose-400">
                <div className="text-[11px] uppercase tracking-[0.18em] text-rose-700 font-bold">Problem</div>
                <p className="mt-2 text-sm text-stone-700 leading-snug">Support teams hand-sort incoming tickets across platforms before anyone can respond, adding delay and cost to every contact.</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border-l-4 border-indigo-400">
                <div className="text-[11px] uppercase tracking-[0.18em] text-indigo-700 font-bold">What I built</div>
                <p className="mt-2 text-sm text-stone-700 leading-snug">An agent that classifies each message by intent and priority, drafts a grounded reply, and completes the action end to end — orchestrated as an 8-node LangGraph flow with Claude.</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border-l-4 border-emerald-400">
                <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-700 font-bold">Outcome</div>
                <p className="mt-2 text-sm text-stone-700 leading-snug">Resolves end to end in under 640ms, turning manual first-touch triage into an automated one.</p>
              </div>
            </div>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-indigo-700 font-bold mb-5">Inference signals</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-indigo-900 leading-none">&lt;640ms</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">End-to-end</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-indigo-900 leading-none">8</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">LangGraph nodes</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-indigo-900 leading-none">JSON</div>
                  <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.16em] text-stone-600 font-medium">Structured output</div>
                </div>
              </div>
            </div>


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
      {/* Project GTM — GTM Pricing Tool */}
      <section id="project-gtm" className="mx-auto max-w-6xl px-6 py-6 md:py-8 scroll-mt-8">
        <ProjectCollapse id="project-gtm" num="No. 04 · GTM Pricing Tool" numCls="text-teal-700" title="GTM Pricing Tool" sub="Claude · Python · Railway">
        <div className="grid md:grid-cols-12 gap-10">

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-teal-700 font-medium">
              No. 04 · Built with Claude + Python
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
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-teal-300 bg-teal-100 px-4 py-3 text-sm font-medium text-teal-900 hover:bg-teal-200 transition-colors">
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
                href="https://aylinos.onrender.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Try this agent in AylinOS"
                title="Try this agent in AylinOS"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Try in AylinOS</span>
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

      {/* Project Restaurant — Multi-Agentic Reservation Agent */}
      <section id="project-restaurant" className="mx-auto max-w-6xl px-6 py-6 md:py-8 scroll-mt-8">
        <ProjectCollapse id="project-restaurant" num="No. 05 · Multi-Agentic Reservation Agent" numCls="text-rose-700" title={<><em className="italic">Fork Yea!</em> — Multi-Agentic Reservation Agent</>} sub="Cursor · LangGraph · Claude · Playwright">
        <div className="grid md:grid-cols-12 gap-10">

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-700 font-medium">
              No. 05 · Built with LangGraph + Claude
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              <em className="italic">Fork Yea!</em> — Multi-Agentic Reservation Agent
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
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-rose-300 bg-rose-100 px-4 py-3 text-sm font-medium text-rose-900 hover:bg-rose-200 transition-colors">
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
                href="https://github.com/aylineuyar-arch/fork-yea"
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

      <section id="project-2" className="mx-auto max-w-6xl px-6 py-6 md:py-8 scroll-mt-8">
        <ProjectCollapse id="project-2" num="No. 06 · Agentic Email Generator" numCls="text-amber-700" title="Agentic Email Generator" sub="n8n · Claude · Supabase">
        <div className="grid md:grid-cols-12 gap-10">

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-700 font-medium">
              No. 06 · Built with n8n + Claude
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
              <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-amber-300 bg-amber-100 px-4 py-3 text-sm font-medium text-amber-900 hover:bg-amber-200 transition-colors">
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
                href="https://aylinos.onrender.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Try this agent in AylinOS"
                title="Try this agent in AylinOS"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors text-xs font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Try in AylinOS</span>
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


    </main>
  );
}

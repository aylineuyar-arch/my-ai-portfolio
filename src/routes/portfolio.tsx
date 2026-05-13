import { createFileRoute, Link } from "@tanstack/react-router";
import dashboardImg from "@/assets/portfolio-dashboard.jpg";
import auraImg from "@/assets/portfolio-aura.jpg";

export const Route = createFileRoute("/portfolio")({
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

function PortfolioPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      {/* Hero */}
      <header className="mx-auto max-w-5xl px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          AI Portfolio · 2026
        </p>
        <h1 className="mt-6 text-5xl md:text-7xl font-light leading-[1.05] tracking-tight">
          Aylin Uyar
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
          Tuck MBA 2026 · Ex-Deloitte Tech Strategy · PM Intern, Skild AI.
          Operator-level AI thinking — building reliable pipelines and
          consumer products end-to-end.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            className="underline-offset-4 hover:underline"
            href="https://github.com/aylineuyar-arch"
            target="_blank"
            rel="noreferrer"
          >
            github.com/aylineuyar-arch ↗
          </a>
          <a
            className="underline-offset-4 hover:underline"
            href="https://www.linkedin.com/in/aylinuyar/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6">
        <hr className="border-t border-border" />
      </div>

      {/* Project 1 */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              No. 01 · Built with Claude
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              Live AI Job Search Dashboard
            </h2>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {[
                "Claude haiku-4-5",
                "Greenhouse / Lever / Ashby",
                "JSearch",
                "Python",
                "Railway",
              ].map((t) => (
                <span
                  key={t}
                  className="border border-border px-2 py-1 rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href="https://github.com/aylineuyar-arch/ai-workflow-demo"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block text-sm underline underline-offset-4"
            >
              View repository ↗
            </a>
          </div>

          <div className="md:col-span-8 space-y-6">
            <p className="text-base md:text-lg leading-relaxed">
              An AI-powered pipeline that aggregates live postings from{" "}
              <strong>130+ company ATSs</strong> and major job boards, scores
              each role with Claude on fit and realistic conversion likelihood,
              and renders results in a filterable web dashboard.
            </p>

            <div className="grid grid-cols-4 gap-4 border-y border-border py-6">
              {[
                ["286", "Roles / run"],
                ["130+", "Companies"],
                ["~3 min", "Full pipeline"],
                ["2", "Scores per role"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl md:text-3xl font-light">{n}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>

            <ul className="space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed">
              <li>
                ~300 deduplicated roles per run across 130+ target companies
              </li>
              <li>
                Honest conversion scoring — Anthropic 10–25, early-stage
                startups 45–65
              </li>
              <li>
                Apply-now list: fit ≥ 65 AND conversion ≥ 45 — actionable, not
                a dump
              </li>
              <li>
                Eliminated manual checking of Anthropic, Ramp, Rippling,
                Databricks + 126 more
              </li>
              <li>Deployed on Railway — zero infrastructure overhead</li>
            </ul>

            <figure className="mt-8">
              <img
                src={dashboardImg}
                alt="Job Search Dashboard — color-coded fit and conversion scores"
                className="w-full border border-border rounded-sm"
                loading="lazy"
              />
              <figcaption className="mt-3 text-xs text-muted-foreground italic">
                Live dashboard — color-coded fit & conversion scores, one-click
                apply links.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <hr className="border-t border-border" />
      </div>

      {/* Project 2 */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              No. 02 · Built with Lovable
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light leading-tight">
              Aura — Makeup Assistant
            </h2>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {["Lovable", "TypeScript / React", "Claude API", "TanStack"].map(
                (t) => (
                  <span
                    key={t}
                    className="border border-border px-2 py-1 rounded-sm"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
            <div className="mt-8 space-y-2 text-sm">
              <a
                href="https://face-harmony-helper.lovable.app"
                target="_blank"
                rel="noreferrer"
                className="block underline underline-offset-4"
              >
                Live app ↗
              </a>
              <a
                href="https://github.com/aylineuyar-arch/your-makeup-muse"
                target="_blank"
                rel="noreferrer"
                className="block underline underline-offset-4"
              >
                View repository ↗
              </a>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <p className="text-base md:text-lg leading-relaxed">
              Aura maps your <strong>skin tone, undertone, face shape, and
              eye shape</strong> to compose a personalized beauty routine —
              with the products and techniques to wear it well. Built
              end-to-end with Lovable: zero engineering team, shipped and live.
            </p>

            <ul className="space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed">
              <li>
                5-dimensional profile updates kit and routine in real time
              </li>
              <li>
                Visual tutorials — technique maps with brush + product callouts
              </li>
              <li>
                Zero engineering team: design, logic, deployment all in Lovable
              </li>
              <li>
                Range beyond backend pipelines — same operator mindset,
                consumer-facing delivery
              </li>
            </ul>

            <figure className="mt-8">
              <img
                src={auraImg}
                alt="Aura — editorial landing page"
                className="w-full border border-border rounded-sm"
                loading="lazy"
              />
              <figcaption className="mt-3 text-xs text-muted-foreground italic">
                Aura — editorial landing page, live at
                face-harmony-helper.lovable.app.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <hr className="border-t border-border" />
      </div>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl px-6 py-16 text-sm text-muted-foreground">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            Aylin Uyar · AI Portfolio · 2026
            <div className="mt-1">
              <Link to="/" className="underline underline-offset-4">
                ← Back to Aura
              </Link>
            </div>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/aylineuyar-arch" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/aylinuyar/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { useMemo, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import {
  BRUSH_KIT,
  EYE_SHAPE_GUIDE,
  FACE_SHAPE_GUIDE,
  recommend,
  SKIN_SWATCHES,
  type EyeShape,
  type FaceShape,
  type Profile,
  type SkillLevel,
  type SkinTone,
  type Undertone,
} from "@/lib/recommendations";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Aura — Personalized Makeup Recommender" },
      {
        name: "description",
        content:
          "A precision makeup routine for your unique skin tone, face shape, and eye shape. Get curated products and step-by-step application.",
      },
    ],
  }),
});

const UNDERTONES: { id: Undertone; label: string; hint: string }[] = [
  { id: "cool", label: "Cool", hint: "Pink / rosy" },
  { id: "neutral", label: "Neutral", hint: "Balanced" },
  { id: "warm", label: "Warm", hint: "Golden / olive" },
];

const FACE_SHAPES: { id: FaceShape; label: string }[] = [
  { id: "oval", label: "Oval" },
  { id: "round", label: "Round" },
  { id: "square", label: "Square" },
  { id: "heart", label: "Heart" },
];

const EYE_SHAPES: { id: EyeShape; label: string }[] = [
  { id: "almond", label: "Almond" },
  { id: "hooded", label: "Hooded" },
  { id: "round", label: "Round" },
  { id: "monolid", label: "Monolid" },
];

function FaceIcon({ shape }: { shape: FaceShape }) {
  const paths: Record<FaceShape, React.ReactNode> = {
    oval: <ellipse cx="32" cy="34" rx="18" ry="24" />,
    round: <circle cx="32" cy="34" r="22" />,
    square: <rect x="12" y="12" width="40" height="44" rx="8" />,
    heart: (
      <path d="M12 18 Q32 6 52 18 Q52 38 32 58 Q12 38 12 18 Z" />
    ),
  };
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
      {paths[shape]}
    </svg>
  );
}

function EyeIcon({ shape }: { shape: EyeShape }) {
  const paths: Record<EyeShape, React.ReactNode> = {
    almond: <path d="M4 16 Q32 0 60 16 Q32 32 4 16 Z" />,
    hooded: (
      <>
        <path d="M4 16 Q32 4 60 16 Q32 28 4 16 Z" />
        <path d="M6 12 Q32 -2 58 12" />
      </>
    ),
    round: <ellipse cx="32" cy="16" rx="16" ry="12" />,
    monolid: <path d="M6 16 Q32 6 58 16 L58 17 Q32 19 6 17 Z" />,
  };
  return (
    <svg viewBox="0 0 64 32" className="w-12 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      {paths[shape]}
    </svg>
  );
}

function Index() {
  const [profile, setProfile] = useState<Profile>({
    tone: "medium",
    undertone: "warm",
    face: "oval",
    eye: "almond",
  });

  const result = useMemo(() => recommend(profile), [profile]);
  const profileLabel = `${profile.undertone[0].toUpperCase()}${profile.undertone.slice(1)} undertone · ${profile.face[0].toUpperCase()}${profile.face.slice(1)} face · ${profile.eye[0].toUpperCase()}${profile.eye.slice(1)} eyes`;

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Nav */}
      <nav className="w-full border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase">Aura</span>
          <div className="hidden md:flex gap-8 text-sm text-muted-foreground">
            <a href="#diagnostic" className="hover:text-ink transition-colors">Consultation</a>
            <a href="#kit" className="hover:text-ink transition-colors">Kit</a>
            <a href="#routine" className="hover:text-ink transition-colors">Routine</a>
          </div>
          <a href="#diagnostic" className="text-xs uppercase tracking-widest font-medium text-accent hover:opacity-70 transition-opacity">Begin →</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-6 font-medium">No. 01 · The Method</p>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-balance mb-8 leading-[1.05]">
              A precision routine for your unique architecture.
            </h1>
            <p className="text-lg text-muted-foreground mb-10 text-pretty max-w-[52ch]">
              Move beyond generic trends. Aura maps your skin tone, undertone, face shape, and eye shape to compose a singular beauty signature — with the products and the technique to wear it well.
            </p>
            <a
              href="#diagnostic"
              className="inline-flex items-center bg-accent text-accent-foreground text-sm py-3 pr-5 pl-3 rounded-full hover:translate-y-[-1px] transition-transform"
            >
              <svg className="size-4 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Start your profile
            </a>
          </div>
          <div className="lg:col-span-5">
            <img
              src={heroImg}
              alt="Editorial close-up of luminous skin with subtle highlight"
              width={1024}
              height={1280}
              className="w-full aspect-[4/5] object-cover rounded-sm"
            />
          </div>
        </div>
      </section>

      {/* Diagnostic */}
      <section id="diagnostic" className="py-24 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-4 font-medium">No. 02</p>
              <h2 className="text-3xl font-medium mb-4 tracking-tight">The Profile</h2>
              <p className="text-muted-foreground text-pretty max-w-[44ch]">
                Select the attributes that define your natural canvas. Every choice updates your kit and routine in real time.
              </p>
              <div className="mt-10 p-5 bg-card rounded-md border border-border">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Current Profile</p>
                <p className="text-sm font-medium">{profileLabel}</p>
              </div>
            </div>

            <div className="space-y-14">
              {/* Skin Tone */}
              <div>
                <Label n="01" title="Skin Tone" />
                <div className="grid grid-cols-6 gap-3">
                  {SKIN_SWATCHES.map((s) => {
                    const active = profile.tone === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setProfile({ ...profile, tone: s.id as SkinTone })}
                        title={s.label}
                        className={`aspect-square rounded-sm transition-all ${active ? "ring-2 ring-accent ring-offset-2 ring-offset-surface" : "ring-1 ring-black/10 hover:ring-black/30"}`}
                        style={{ backgroundColor: s.hex }}
                        aria-label={s.label}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Undertone */}
              <div>
                <Label n="02" title="Undertone" />
                <div className="grid grid-cols-3 gap-3">
                  {UNDERTONES.map((u) => {
                    const active = profile.undertone === u.id;
                    return (
                      <button
                        key={u.id}
                        onClick={() => setProfile({ ...profile, undertone: u.id })}
                        className={`px-4 py-4 rounded-md text-left transition-all border ${active ? "border-accent bg-card" : "border-border bg-card hover:border-ink/40"}`}
                      >
                        <p className="text-sm font-medium">{u.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{u.hint}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Face shape */}
              <div>
                <Label n="03" title="Face Shape" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {FACE_SHAPES.map((f) => {
                    const active = profile.face === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setProfile({ ...profile, face: f.id })}
                        className={`flex flex-col items-center gap-3 p-5 rounded-md border bg-card transition-all ${active ? "border-accent text-accent" : "border-border text-muted-foreground hover:border-ink/40 hover:text-ink"}`}
                      >
                        <FaceIcon shape={f.id} />
                        <span className="text-xs uppercase tracking-widest font-medium">{f.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Eye shape */}
              <div>
                <Label n="04" title="Eye Shape" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {EYE_SHAPES.map((e) => {
                    const active = profile.eye === e.id;
                    return (
                      <button
                        key={e.id}
                        onClick={() => setProfile({ ...profile, eye: e.id })}
                        className={`flex flex-col items-center gap-3 p-5 rounded-md border bg-card transition-all ${active ? "border-accent text-accent" : "border-border text-muted-foreground hover:border-ink/40 hover:text-ink"}`}
                      >
                        <EyeIcon shape={e.id} />
                        <span className="text-xs uppercase tracking-widest font-medium">{e.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kit */}
      <section id="kit" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-4 font-medium">No. 03</p>
            <h2 className="text-3xl font-medium tracking-tight mb-2">Your Signature Kit</h2>
            <p className="text-sm text-muted-foreground">Calculated for {profileLabel.toLowerCase()}.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard category="Base" name={result.foundation.name} shade={result.foundation.shade} why={result.foundation.why} swatch={SKIN_SWATCHES.find(s => s.id === profile.tone)?.hex} />
            <ProductCard category="Eye" name={result.eye.name} shade={result.eye.shade} why={result.eye.why} swatch="#7a5a48" />
            <ProductCard category="Cheek" name={result.blush.name} shade={result.blush.shade} why={result.blush.why} swatch={profile.undertone === "cool" ? "#c98a9b" : profile.undertone === "warm" ? "#d99477" : "#cf8b86"} />
            <ProductCard category="Lip" name={result.lip.name} shade={result.lip.shade} why={result.lip.why} swatch={profile.undertone === "cool" ? "#7a2840" : profile.undertone === "warm" ? "#b25a44" : "#9a4a4a"} />
          </div>
        </div>
      </section>

      {/* Routine */}
      <section id="routine" className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-surface rounded-2xl p-8 md:p-16 border border-border">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-4 font-medium">No. 04</p>
            <h3 className="text-3xl font-medium mb-12 tracking-tight">The Application Protocol</h3>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
              {result.routine.map((step, i) => (
                <div key={i} className="flex gap-6">
                  <span className="text-4xl font-light text-accent/40 tabular-nums leading-none pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-medium mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">© 2026 Aura · Personal Beauty Intelligence</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Made with care</p>
        </div>
      </footer>
    </div>
  );
}

function Label({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline justify-between mb-5">
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium">{n} · {title}</span>
    </div>
  );
}

function ProductCard({
  category,
  name,
  shade,
  why,
  swatch,
}: {
  category: string;
  name: string;
  shade: string;
  why: string;
  swatch?: string;
}) {
  return (
    <div className="bg-card p-5 rounded-md border border-border hover:translate-y-[-2px] transition-transform">
      <div
        className="w-full aspect-[4/5] rounded-sm mb-5 relative overflow-hidden border border-black/5"
        style={{ background: `linear-gradient(160deg, ${swatch ?? "#d9c9ba"} 0%, color-mix(in oklab, ${swatch ?? "#d9c9ba"} 70%, black 30%) 100%)` }}
      >
        <div className="absolute inset-x-6 bottom-6 h-2/5 rounded-sm bg-black/15 backdrop-blur-sm" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-accent mb-1 font-medium">{category}</p>
      <h3 className="text-base font-medium mb-1">{name}</h3>
      <p className="text-xs text-muted-foreground mb-4">Shade: {shade}</p>
      <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">{why}</p>
    </div>
  );
}

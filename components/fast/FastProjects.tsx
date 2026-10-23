"use client";
import { useState } from "react";
import { projects } from "@/content/content";

const accentByProject: Record<string, string> = {
  "dental-ai":        "#00e5ff",
  "crypto-current":   "#f7931a",
  "cadiente-digital": "#ff2d78",
};

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ display: "inline", marginLeft: 4, verticalAlign: "middle" }}>
      <path d="M2 2h8m0 0v8m0-8L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ProjectDetail({ projectId, onClose }: { projectId: string; onClose: () => void }) {
  const project = projects.find((p) => p.id === projectId) ?? projects[0];
  const accent = accentByProject[project.id] ?? "var(--cyan)";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ background: "var(--bg)" }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 shrink-0"
        style={{ background: "rgba(10,10,18,0.92)", borderBottom: `1px solid ${accent}44`, backdropFilter: "blur(8px)" }}
      >
        <button
          onClick={onClose}
          className="text-sm flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: "var(--fg-muted)", background: "transparent", border: "none", cursor: "pointer" }}
        >
          ← Back
        </button>
        <span className="text-xs font-mono" style={{ color: accent }}>{project.label}</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-8 md:py-12" style={{ maxWidth: 680, margin: "0 auto", width: "100%" }}>
        <h2 className="text-3xl font-extrabold mb-2" style={{ color: accent }}>{project.title}</h2>
        <p className="text-base mb-6" style={{ color: "var(--fg-muted)" }}>{project.tagline}</p>

        {"preview" in project && project.preview && (
          <div className="w-full rounded-xl overflow-hidden mb-10" style={{ border: `1px solid ${accent}33` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.preview} alt={`${project.title} preview`} className="w-full object-cover object-top" />
          </div>
        )}

        <dl className="flex flex-col gap-8">
          {[
            { label: "Problem",      value: project.problem },
            { label: "What I built", value: project.built   },
            { label: "Result",       value: project.result  },
          ].filter(({ value }) => value).map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs font-semibold uppercase tracking-wider mb-3 pb-2" style={{ color: accent, borderBottom: `1px solid ${accent}33` }}>
                {label}
              </dt>
              <dd className="text-sm leading-relaxed flex flex-col gap-3" style={{ color: "var(--fg)" }}>
                {value.split("\n\n").map((para, i) => (
                  <p key={i}>
                    {para}
                    {label === "Result" && "resultLinks" in project && project.resultLinks?.[i] && (
                      <> <a href={project.resultLinks[i].url} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80" style={{ color: accent }}> Read more →</a></>
                    )}
                    {label === "Result" && "resultImages" in project && project.resultImages?.[i] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <span className="block mt-3"><img src={project.resultImages[i]!} alt="" className="rounded-lg w-full" style={{ border: `1px solid ${accent}33` }} /></span>
                    )}
                  </p>
                ))}
              </dd>
            </div>
          ))}

          {project.stack.length > 0 && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider mb-3 pb-2" style={{ color: accent, borderBottom: `1px solid ${accent}33` }}>
                Stack
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li key={s} className="text-xs px-3 py-1 rounded-full font-mono" style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}33` }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>

        {(project.links.live || project.links.github) && (
          <div className="flex flex-wrap gap-3 mt-10 pt-8" style={{ borderTop: `1px solid ${accent}22` }}>
            <button
              onClick={onClose}
              className="inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              style={{ border: `1px solid rgba(255,255,255,0.15)`, color: "var(--fg-muted)", background: "transparent", cursor: "pointer" }}
            >
              ← Back
            </button>
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity hover:opacity-90"
                style={{ background: accent, color: "var(--bg)" }}>
                Live site <ExternalLinkIcon />
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                style={{ border: `1px solid ${accent}55`, color: "var(--fg)" }}>
                GitHub <ExternalLinkIcon />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function FastProjects() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="text-2xl font-bold mb-8 px-6" style={{ color: "var(--fg)", maxWidth: "680px", margin: "0 auto 2rem" }}>
        Projects
      </h2>

      <div className="flex gap-5 overflow-x-auto pb-4 px-6 justify-center" style={{ scrollbarWidth: "none" }}>
        {projects.map((p) => {
          const accent = accentByProject[p.id] ?? "var(--cyan)";
          return (
            <article
              key={p.id}
              onClick={() => setSelected(p.id)}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(p.id); }}
              className="rounded-xl p-5 flex flex-col cursor-pointer shrink-0 transition-all"
              style={{
                width: 280,
                background: "var(--bg-panel)",
                border: `2px solid rgba(255,255,255,0.07)`,
                outline: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.border = `2px solid ${accent}`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${accent}22`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.border = "2px solid rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Label */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] px-2 py-1 rounded-full font-mono" style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}44` }}>
                  {p.label}
                </span>
              </div>

              {/* Preview */}
              {"preview" in p && p.preview && (
                <div className="w-full rounded-lg overflow-hidden mb-4" style={{ border: `1px solid ${accent}33`, maxHeight: 120 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.preview} alt={`${p.title} preview`} className="w-full object-cover object-top" style={{ maxHeight: 120 }} />
                </div>
              )}

              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--fg)" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "var(--fg-muted)" }}>{p.tagline}</p>

              {/* Stack pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.stack.slice(0, 3).map((s) => (
                  <span key={s} className="text-[9px] px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,255,255,0.05)", color: "var(--fg-muted)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {s}
                  </span>
                ))}
                {p.stack.length > 3 && (
                  <span className="text-[9px] px-2 py-0.5 rounded font-mono" style={{ color: "var(--fg-muted)", opacity: 0.5 }}>
                    +{p.stack.length - 3}
                  </span>
                )}
              </div>

              <div className="text-xs mt-auto" style={{ color: accent }}>View details →</div>
            </article>
          );
        })}
      </div>

      {selected && <ProjectDetail projectId={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

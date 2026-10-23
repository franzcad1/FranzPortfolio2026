"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { projects } from "@/content/content";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface Props {
  projectId: string;
  onBack: () => void;
  onContact: () => void;
  onFullPortfolio: () => void;
}

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ display: "inline", marginLeft: 4, verticalAlign: "middle" }}>
      <path d="M2 2h8m0 0v8m0-8L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const accentByProject: Record<string, string> = {
  "dental-ai":        "#00e5ff",
  "crypto-current":   "#f7931a",
  "cadiente-digital": "#ff2d78",
};

export function ProjectDetail({ projectId, onBack, onContact, onFullPortfolio }: Props) {
  const reduced = useReducedMotion();
  const project = projects.find((p) => p.id === projectId) ?? projects[0];
  const accent = accentByProject[project.id] ?? "var(--cyan)";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onBack]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col overflow-y-auto"
      style={{ background: "var(--bg)", zIndex: 60 }}
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : 12 }}
      transition={{ duration: reduced ? 0 : 0.3, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-label={`Project: ${project.title}`}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 shrink-0"
        style={{ background: "rgba(10,10,18,0.92)", borderBottom: `1px solid ${accent}44`, backdropFilter: "blur(8px)" }}
      >
        <button
          onClick={onBack}
          className="text-[8px] flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ fontFamily: "var(--font-pixel)", color: "var(--fg-muted)", background: "transparent", border: "none", cursor: "pointer" }}
          aria-label="Back to project select"
        >
          ← BACK
        </button>

        <p className="text-[8px]" style={{ fontFamily: "var(--font-pixel)", color: accent }}>
          {project.label}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onContact}
            className="text-[8px] transition-opacity hover:opacity-70"
            style={{ fontFamily: "var(--font-pixel)", color: "var(--fg-muted)", background: "transparent", border: "none", cursor: "pointer" }}
            aria-label="Go to contact"
          >
            CONTACT
          </button>
          <button
            onClick={onFullPortfolio}
            className="text-[8px] px-3 py-1.5 rounded transition-opacity hover:opacity-80"
            style={{ fontFamily: "var(--font-pixel)", background: "var(--yellow)", color: "var(--bg)", border: "none", cursor: "pointer" }}
            aria-label="See full portfolio"
          >
            SEE FULL PORTFOLIO →
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-8 md:py-12" style={{ maxWidth: 680, margin: "0 auto", width: "100%" }}>
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-2" style={{ color: accent }}>
          {project.title}
        </h2>
        <p className="text-base mb-6" style={{ color: "var(--fg-muted)" }}>
          {project.tagline}
        </p>

        {"preview" in project && project.preview && (
          <div className="w-full rounded-xl overflow-hidden mb-10" style={{ border: `1px solid ${accent}33` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.preview} alt={`${project.title} preview`} className="w-full object-cover object-top" />
          </div>
        )}

        {/* Detail sections */}
        <dl className="flex flex-col gap-8">
          {[
            { label: "Problem",      value: project.problem },
            { label: "What I built", value: project.built   },
            { label: "Result",       value: project.result  },
          ].filter(({ value }) => value).map(({ label, value }) => (
            <div key={label}>
              <dt
                className="text-[8px] tracking-widest uppercase mb-3 pb-2"
                style={{
                  fontFamily: "var(--font-pixel)",
                  color: accent,
                  borderBottom: `1px solid ${accent}33`,
                }}
              >
                {label}
              </dt>
              <dd className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
                {value}
              </dd>
            </div>
          ))}

          {/* Stack */}
          {project.stack.length > 0 && <div>
            <dt
              className="text-[8px] tracking-widest uppercase mb-3 pb-2"
              style={{ fontFamily: "var(--font-pixel)", color: accent, borderBottom: `1px solid ${accent}33` }}
            >
              Stack
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2" aria-label={`Stack for ${project.title}`}>
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="text-xs px-3 py-1 rounded-full font-mono"
                    style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}33` }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>}
        </dl>

        {/* Links */}
        {(project.links.live || project.links.github || project.links.caseStudy) && (
          <div className="flex flex-wrap gap-3 mt-10 pt-8" style={{ borderTop: `1px solid ${accent}22` }}>
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity hover:opacity-90"
                style={{ background: accent, color: "var(--bg)" }}
              >
                Live site <ExternalLinkIcon />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                style={{ border: `1px solid ${accent}55`, color: "var(--fg)" }}
              >
                GitHub <ExternalLinkIcon />
              </a>
            )}
            {project.links.caseStudy && (
              <a
                href={project.links.caseStudy}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                style={{ border: `1px solid ${accent}55`, color: "var(--fg)" }}
              >
                Case study <ExternalLinkIcon />
              </a>
            )}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 flex gap-3 flex-wrap">
          <button
            onClick={onBack}
            className="text-sm px-5 py-2.5 rounded-lg transition-opacity hover:opacity-80"
            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--fg-muted)", background: "transparent", cursor: "pointer" }}
          >
            ← Other projects
          </button>
          <button
            onClick={onFullPortfolio}
            className="text-[8px] px-5 py-2.5 rounded-lg transition-opacity hover:opacity-80"
            style={{ fontFamily: "var(--font-pixel)", background: "var(--yellow)", color: "var(--bg)", cursor: "pointer" }}
          >
            SEE FULL PORTFOLIO →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

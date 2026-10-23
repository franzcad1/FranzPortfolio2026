"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/content/content";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface Props {
  onSelect: (id: string) => void;
  onContinue: () => void;
  onFullPortfolio: () => void;
  onRestart: () => void;
}

// Per-project accent colors and pixel icons
const projectMeta: Record<string, { color: string; icon: React.ReactNode }> = {
  "dental-ai": {
    color: "#00e5ff",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" fill="#00e5ff" opacity="0.15" stroke="#00e5ff" strokeWidth="1.5"/>
        <rect x="7" y="7" width="10" height="2" fill="#00e5ff" opacity="0.7"/>
        <rect x="7" y="11" width="7" height="2" fill="#00e5ff" opacity="0.5"/>
        <rect x="7" y="15" width="9" height="2" fill="#00e5ff" opacity="0.5"/>
        <circle cx="18" cy="18" r="5" fill="#050510" stroke="#00e5ff" strokeWidth="1.5"/>
        <path d="M16 18l1.5 1.5L20 16" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
"crypto-current": {
    color: "#f7931a",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#f7931a" opacity="0.12" stroke="#f7931a" strokeWidth="1.5"/>
        <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f7931a" fontFamily="monospace">₿</text>
        <path d="M7 8h2M7 16h2M15 8h2M15 16h2" stroke="#f7931a" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  "cadiente-digital": {
    color: "#ff2d78",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="20" height="14" rx="2" fill="#ff2d78" opacity="0.1" stroke="#ff2d78" strokeWidth="1.5"/>
        <path d="M8 2h8l2 4H6L8 2z" fill="#ff2d78" opacity="0.3" stroke="#ff2d78" strokeWidth="1.5"/>
        <circle cx="12" cy="13" r="3" fill="none" stroke="#ff2d78" strokeWidth="1.5"/>
        <path d="M12 10V8M12 18v-2M9 13H7M17 13h-2" stroke="#ff2d78" strokeWidth="1" opacity="0.5"/>
      </svg>
    ),
  },
};

export function ProjectSelect({ onSelect, onContinue, onFullPortfolio, onRestart }: Props) {
  const reduced = useReducedMotion();
  const [focused, setFocused] = useState(0);
  const [entered, setEntered] = useState(false);

  // Entrance stagger trigger
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  { e.preventDefault(); setFocused(f => Math.max(0, f - 1)); }
      if (e.key === "ArrowRight") { e.preventDefault(); setFocused(f => Math.min(projects.length - 1, f + 1)); }
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(projects[focused].id); }
      if (e.key === "Escape")     onContinue();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [focused, onSelect, onContinue]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col"
      style={{ background: "var(--bg)", zIndex: 20 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.35 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-8 pb-4 shrink-0" style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
        <div>
          <p className="text-[8px] tracking-widest mb-1" style={{ fontFamily: "var(--font-pixel)", color: "var(--fg-muted)" }}>
            STORY MODE
          </p>
          <h2 className="text-[12px] md:text-[14px]" style={{ fontFamily: "var(--font-pixel)", color: "var(--cyan)" }}>
            SELECT PROJECT
          </h2>
        </div>
        <button
          onClick={onContinue}
          className="text-[8px] px-3 py-2 rounded transition-opacity hover:opacity-70"
          style={{ fontFamily: "var(--font-pixel)", border: "1px solid var(--fg-muted)", color: "var(--fg-muted)", background: "transparent", cursor: "pointer" }}
          aria-label="Skip to contact"
        >
          CONTACT
        </button>
      </div>

      {/* Cards */}
      <div
        className="flex-1 flex items-center px-4 md:px-8 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div
          className="flex gap-4 md:gap-6 mx-auto py-4"
          style={{ maxWidth: 900, width: "100%" }}
          role="list"
        >
          {projects.map((project, i) => {
            const meta = projectMeta[project.id] ?? { color: "var(--cyan)", icon: null };
            const isActive = i === focused;

            return (
              <motion.article
                key={project.id}
                role="listitem"
                initial={reduced ? false : { y: 40, opacity: 0 }}
                animate={entered ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : i * 0.1, ease: "easeOut" }}
                onClick={() => onSelect(project.id)}
                onMouseEnter={() => setFocused(i)}
                onFocus={() => setFocused(i)}
                tabIndex={0}
                aria-label={`${project.title} — ${project.tagline}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(project.id); } }}
                className="flex-1 rounded-xl p-5 md:p-6 flex flex-col cursor-pointer transition-all"
                style={{
                  minWidth: "240px",
                  background: isActive ? `${meta.color}0d` : "var(--bg-panel)",
                  border: `2px solid ${isActive ? meta.color : "rgba(255,255,255,0.07)"}`,
                  boxShadow: isActive ? `0 0 32px ${meta.color}22, 0 8px 32px rgba(0,0,0,0.4)` : "0 4px 16px rgba(0,0,0,0.3)",
                  transform: isActive ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.2s ease",
                  outline: "none",
                }}
              >
                {/* Icon + label */}
                <div className="flex items-start justify-between mb-4">
                  <div>{meta.icon}</div>
                  <span
                    className="text-[7px] px-2 py-1 rounded-full"
                    style={{
                      fontFamily: "var(--font-pixel)",
                      background: `${meta.color}18`,
                      color: meta.color,
                      border: `1px solid ${meta.color}44`,
                    }}
                  >
                    {project.label}
                  </span>
                </div>

                {/* Preview image */}
                {"preview" in project && project.preview && (
                  <div
                    className="w-full rounded-lg overflow-hidden mb-4"
                    style={{ border: `1px solid ${meta.color}33`, maxHeight: 120 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.preview}
                      alt={`${project.title} preview`}
                      className="w-full object-cover object-top"
                      style={{ maxHeight: 120 }}
                    />
                  </div>
                )}

                {/* Title */}
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: isActive ? meta.color : "var(--fg)" }}
                >
                  {project.title}
                </h3>

                <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "var(--fg-muted)" }}>
                  {project.tagline}
                </p>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="text-[9px] px-2 py-0.5 rounded font-mono"
                      style={{ background: "rgba(255,255,255,0.05)", color: "var(--fg-muted)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {s}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="text-[9px] px-2 py-0.5 rounded font-mono" style={{ color: "var(--fg-muted)", opacity: 0.5 }}>
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div
                  className="text-[8px] flex items-center gap-1.5 mt-auto"
                  style={{ fontFamily: "var(--font-pixel)", color: isActive ? meta.color : "var(--fg-muted)" }}
                  aria-hidden="true"
                >
                  {isActive ? "► PRESS ENTER" : "SELECT"}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Below-cards CTAs */}
      <div className="flex items-center justify-center gap-4 pb-5 shrink-0">
        <button
          onClick={onRestart}
          className="text-[8px] px-4 py-2.5 rounded-lg transition-opacity hover:opacity-70"
          style={{ fontFamily: "var(--font-pixel)", border: "1px solid var(--fg-muted)", color: "var(--fg-muted)", background: "transparent", cursor: "pointer" }}
        >
          ↩ PLAY AGAIN
        </button>
        <button
          onClick={onFullPortfolio}
          className="text-[8px] px-5 py-2.5 rounded-lg transition-opacity hover:opacity-80"
          style={{ fontFamily: "var(--font-pixel)", background: "var(--yellow)", color: "var(--bg)", border: "none", cursor: "pointer" }}
          aria-label="See full portfolio"
        >
          SEE FULL PORTFOLIO →
        </button>
      </div>

      {/* Footer nav hint */}
      <p
        className="text-center pb-6 text-[7px]"
        style={{ fontFamily: "var(--font-pixel)", color: "var(--fg-muted)", opacity: 0.4 }}
      >
        ←→ NAVIGATE &nbsp;&nbsp; ENTER SELECT &nbsp;&nbsp; ESC SKIP
      </p>
    </motion.div>
  );
}

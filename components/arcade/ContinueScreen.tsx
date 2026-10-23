"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { contact, hero } from "@/content/content";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface Props {
  onRestart: () => void;
  onBack?: () => void;
}

export function ContinueScreen({ onRestart, onBack }: Props) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (onBack) onBack(); else onRestart(); }
      if (e.key === "r" || e.key === "R") onRestart();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onRestart, onBack]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--bg)", zIndex: 20 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.4 }}
    >
      {/* Heading */}
      <p
        className="mb-2 text-[8px] tracking-widest"
        style={{ fontFamily: "var(--font-pixel)", color: "var(--fg-muted)" }}
      >
        GAME CLEAR
      </p>
      <h2
        className="mb-10 text-[18px] md:text-[24px]"
        style={{
          fontFamily: "var(--font-pixel)",
          color: "var(--cyan)",
          textShadow: "0 0 20px var(--cyan)",
        }}
      >
        CONTACT
      </h2>

      {/* Contact block */}
      <div
        className="rounded-xl p-6 md:p-8 mb-8 text-left w-full"
        style={{ maxWidth: 420, background: "var(--bg-panel)", border: "1px solid rgba(0,229,255,0.12)" }}
      >
        <p
          className="text-[8px] tracking-widest mb-5"
          style={{ fontFamily: "var(--font-pixel)", color: "var(--cyan)" }}
        >
          INSERT COIN
        </p>

        <p className="text-sm font-semibold mb-1" style={{ color: "var(--fg)" }}>
          {hero.name}
        </p>
        <p className="text-xs mb-6" style={{ color: "var(--fg-muted)" }}>
          Open to AI engineering roles and agency inquiries.
        </p>

        {/* Primary CTA */}
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm mb-5 w-full justify-center transition-opacity hover:opacity-90"
          style={{ background: "var(--cyan)", color: "var(--bg)" }}
        >
          Send me an email
        </a>

        {/* Secondary links */}
        <ul className="flex flex-col gap-3 text-sm">
          <li>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
              style={{ color: "var(--fg-muted)" }}
            >
              <span aria-hidden="true" style={{ fontFamily: "var(--font-pixel)", fontSize: 8, color: "var(--cyan)" }}>LI</span>
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
              style={{ color: "var(--fg-muted)" }}
            >
              <span aria-hidden="true" style={{ fontFamily: "var(--font-pixel)", fontSize: 8, color: "var(--cyan)" }}>GH</span>
              GitHub
            </a>
          </li>
        </ul>
      </div>

      {/* Back to projects */}
      {onBack && (
        <button
          onClick={onBack}
          className="text-[8px] px-4 py-2 rounded mb-3 transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-pixel)",
            border: "1px solid var(--cyan)",
            color: "var(--cyan)",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          ← OTHER PROJECTS
        </button>
      )}

      {/* Restart */}
      <button
        onClick={onRestart}
        className="text-[8px] px-4 py-2 rounded transition-opacity hover:opacity-70"
        style={{
          fontFamily: "var(--font-pixel)",
          border: "1px solid var(--fg-muted)",
          color: "var(--fg-muted)",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        ↩ PLAY AGAIN
      </button>

      <p className="mt-10 text-[7px]" style={{ color: "var(--fg-muted)", opacity: 0.35 }}>
        &copy; {new Date().getFullYear()} {hero.name}
      </p>
    </motion.div>
  );
}

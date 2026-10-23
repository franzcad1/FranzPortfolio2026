"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useSound } from "@/lib/hooks/useSound";

interface Props {
  onStory: () => void;
  onExpress: () => void;
}

export function ModeSelect({ onStory, onExpress }: Props) {
  const reduced = useReducedMotion();
  const { playConfirm, playClick } = useSound();
  const [focused, setFocused] = useState<"story" | "express" | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setFocused("story");
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setFocused("express");
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (focused === "story") { playConfirm(); onStory(); }
        if (focused === "express") { playClick(); onExpress(); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [focused, onStory, onExpress]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-6"
      style={{ background: "var(--bg)", zIndex: 20 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.35 }}
    >
      <p
        className="mb-2 text-[8px] tracking-widest"
        style={{ fontFamily: "var(--font-pixel)", color: "var(--fg-muted)" }}
      >
        FRANZ CADIENTE
      </p>
      <p
        className="mb-12 text-[10px] md:text-[12px]"
        style={{ fontFamily: "var(--font-pixel)", color: "var(--cyan)" }}
      >
        SELECT MODE
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full" style={{ maxWidth: 560 }}>
        {/* Story Mode */}
        <button
          onClick={() => { playConfirm(); onStory(); }}
          onMouseEnter={() => setFocused("story")}
          onFocus={() => setFocused("story")}
          aria-label="Story Mode — continue the arcade experience"
          className="flex-1 rounded-xl p-6 text-left transition-all cursor-pointer group"
          style={{
            background: focused === "story" ? "rgba(0,229,255,0.08)" : "var(--bg-panel)",
            border: `2px solid ${focused === "story" ? "var(--cyan)" : "rgba(255,255,255,0.08)"}`,
            boxShadow: focused === "story" ? "0 0 24px rgba(0,229,255,0.15)" : "none",
          }}
        >
          <p
            className="text-[9px] mb-3"
            style={{ fontFamily: "var(--font-pixel)", color: "var(--cyan)" }}
          >
            ► STORY MODE
          </p>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--fg)" }}>
            The full experience
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Arcade project select, detail cards, and contact screen.
          </p>
        </button>

        {/* Express Mode */}
        <button
          onClick={() => { playClick(); onExpress(); }}
          onMouseEnter={() => setFocused("express")}
          onFocus={() => setFocused("express")}
          aria-label="Express Mode — skip straight to the portfolio"
          className="flex-1 rounded-xl p-6 text-left transition-all cursor-pointer"
          style={{
            background: focused === "express" ? "rgba(255,230,0,0.06)" : "var(--bg-panel)",
            border: `2px solid ${focused === "express" ? "var(--yellow)" : "rgba(255,255,255,0.08)"}`,
            boxShadow: focused === "express" ? "0 0 24px rgba(255,230,0,0.1)" : "none",
          }}
        >
          <p
            className="text-[9px] mb-3"
            style={{ fontFamily: "var(--font-pixel)", color: "var(--yellow)" }}
          >
            ⚡ EXPRESS MODE
          </p>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--fg)" }}>
            Just the portfolio, please
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Switch to a clean, readable layout — everything at once.
          </p>
        </button>
      </div>

      <p
        className="mt-8 text-[7px]"
        style={{ fontFamily: "var(--font-pixel)", color: "var(--fg-muted)", opacity: 0.4 }}
      >
        ↑↓ NAVIGATE &nbsp;&nbsp; ENTER SELECT
      </p>
    </motion.div>
  );
}

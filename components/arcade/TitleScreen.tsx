"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { hero } from "@/content/content";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useSound } from "@/lib/hooks/useSound";

interface Props {
  onStart: () => void;
}

export function TitleScreen({ onStart }: Props) {
  const reduced = useReducedMotion();
  const { playConfirm } = useSound();
  const [blink, setBlink] = useState(true);

  // Blink "PRESS START"
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(id);
  }, [reduced]);

  const handleStart = useCallback(() => { playConfirm(); onStart(); }, [onStart, playConfirm]);

  // Any key or click starts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["Enter", " ", "ArrowRight", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleStart]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center select-none"
      style={{ background: "var(--bg)", zIndex: 100 }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.4 }}
      onClick={handleStart}
      role="button"
      tabIndex={0}
      aria-label="Press any key or click to start"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleStart();
      }}
    >
      {/* Scanline shimmer on the title */}
      <div className="relative text-center px-6" style={{ maxWidth: "560px" }}>
        {/* Pixel star field (static, CSS only) */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(24)].map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 3 === 0 ? 3 : 2,
                height: i % 3 === 0 ? 3 : 2,
                background: i % 5 === 0 ? "var(--cyan)" : "var(--fg-muted)",
                opacity: 0.3 + (i % 4) * 0.15,
                top: `${(i * 37 + 11) % 100}%`,
                left: `${(i * 53 + 7) % 100}%`,
              }}
            />
          ))}
        </div>

        {/* Subtitle */}
        <p
          className="text-[8px] tracking-[0.3em] mb-8 uppercase"
          style={{ fontFamily: "var(--font-pixel)", color: "var(--fg-muted)" }}
        >
          Franz Cadiente
        </p>

        {/* Main title */}
        <h1
          className="leading-tight mb-4"
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "clamp(18px, 4vw, 36px)",
            color: "var(--cyan)",
            textShadow: "0 0 20px var(--cyan), 0 0 40px rgba(0,229,255,0.3)",
            lineHeight: 1.5,
          }}
        >
          AI ENGINEER
        </h1>

        <p
          className="text-[10px] leading-relaxed mb-16"
          style={{
            fontFamily: "var(--font-pixel)",
            color: "var(--fg-muted)",
            maxWidth: "340px",
            margin: "0 auto 64px",
          }}
        >
          {hero.tagline}
        </p>

        {/* PRESS START */}
        <p
          aria-live="polite"
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "clamp(10px, 2vw, 14px)",
            color: "var(--yellow)",
            textShadow: "0 0 10px var(--yellow)",
            opacity: reduced ? 1 : blink ? 1 : 0,
            transition: reduced ? "none" : "opacity 0.1s",
            letterSpacing: "0.1em",
          }}
        >
          {hero.pressStart}
        </p>

        <p
          className="mt-4 text-[8px]"
          style={{ fontFamily: "var(--font-pixel)", color: "var(--fg-muted)", opacity: 0.5 }}
        >
          CLICK OR PRESS ENTER
        </p>
      </div>

      {/* Corner decorations */}
      <CornerDecor />
    </motion.div>
  );
}

function CornerDecor() {
  const style = (flip: boolean) => ({
    position: "absolute" as const,
    width: 40,
    height: 40,
    borderColor: "rgba(0,229,255,0.25)",
    borderStyle: "solid",
    borderWidth: 0,
    ...(flip
      ? { borderTopWidth: 2, borderRightWidth: 2, top: 24, right: 24 }
      : { borderBottomWidth: 2, borderLeftWidth: 2, bottom: 24, left: 24 }),
  });
  return (
    <>
      <span aria-hidden style={style(false)} />
      <span aria-hidden style={style(true)} />
    </>
  );
}

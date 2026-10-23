"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useSound } from "@/lib/hooks/useSound";

interface Props {
  text: string;
  accentColor: string;
  onDone?: () => void;
}

const CHARS_PER_TICK = 4;
const TICK_MS = 20;

export function DialogueBox({ text, accentColor, onDone }: Props) {
  const reduced = useReducedMotion();
  const { playTick, playClick } = useSound();
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const finish = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplayed(text);
    setDone(true);
    onDone?.();
  }, [text, onDone]);

  // Reset when text changes (new level)
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    indexRef.current = 0;

    if (reduced) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    timerRef.current = setInterval(() => {
      indexRef.current = Math.min(indexRef.current + CHARS_PER_TICK, text.length);
      setDisplayed(text.slice(0, indexRef.current));
      // Tick every ~6 chars to avoid audio spam
      if (indexRef.current % 6 === 0) playTick();
      if (indexRef.current >= text.length) {
        clearInterval(timerRef.current!);
        setDone(true);
        onDone?.();
      }
    }, TICK_MS);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [text, reduced, onDone]);

  return (
    <div
      className="relative rounded-lg p-4 md:p-5 cursor-pointer"
      style={{
        background: "rgba(10,10,18,0.92)",
        border: `2px solid ${accentColor}`,
        boxShadow: `0 0 20px ${accentColor}33`,
        maxWidth: "520px",
        width: "100%",
      }}
      onClick={() => { if (!done) { playClick(); finish(); } }}
      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !done) finish(); }}
      role="region"
      aria-label="Dialogue"
      aria-live="polite"
      tabIndex={0}
    >
      {/* Corner triangle — classic JRPG box */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -8,
          left: 16,
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: `8px solid ${accentColor}`,
        }}
      />

      <p
        className="text-sm leading-relaxed"
        style={{ fontFamily: "var(--font-body)", color: "var(--fg)", minHeight: "3.6em" }}
      >
        {displayed}
        {!done && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 8,
              height: "1em",
              background: accentColor,
              marginLeft: 2,
              verticalAlign: "bottom",
              animation: "typewriter-cursor 0.7s step-end infinite",
            }}
          />
        )}
      </p>

      {done && (
        <p
          className="text-[8px] mt-2 text-right"
          style={{ fontFamily: "var(--font-pixel)", color: accentColor, opacity: 0.7 }}
          aria-hidden="true"
        >
          ▼
        </p>
      )}

      {!done && (
        <p
          className="text-[8px] mt-2 text-right opacity-40"
          style={{ fontFamily: "var(--font-pixel)", color: "var(--fg-muted)" }}
        >
          CLICK TO SKIP
        </p>
      )}
    </div>
  );
}

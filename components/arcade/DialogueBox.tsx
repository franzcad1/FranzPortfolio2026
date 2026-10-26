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

  // Split script into sentences on \n\n
  const lines = text.split("\n\n").map(s => s.trim()).filter(Boolean);

  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentLine = lines[lineIndex] ?? "";
  const isLastLine = lineIndex === lines.length - 1;

  const finishTyping = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplayed(currentLine);
    setTyping(false);
  }, [currentLine]);

  // Reset typewriter when line changes
  useEffect(() => {
    setDisplayed("");
    setTyping(true);
    indexRef.current = 0;

    if (reduced) {
      setDisplayed(currentLine);
      setTyping(false);
      return;
    }

    timerRef.current = setInterval(() => {
      indexRef.current = Math.min(indexRef.current + CHARS_PER_TICK, currentLine.length);
      setDisplayed(currentLine.slice(0, indexRef.current));
      if (indexRef.current % 6 === 0) playTick();
      if (indexRef.current >= currentLine.length) {
        clearInterval(timerRef.current!);
        setTyping(false);
      }
    }, TICK_MS);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [lineIndex, currentLine, reduced]);

  // Reset to first line when the script changes (new level)
  useEffect(() => {
    setLineIndex(0);
  }, [text]);

  const advance = useCallback(() => {
    playClick();
    if (typing) {
      finishTyping();
      return;
    }
    if (isLastLine) {
      onDone?.();
    } else {
      setLineIndex(i => i + 1);
    }
  }, [typing, isLastLine, finishTyping, onDone, playClick]);

  // Keyboard: Enter / Space / ArrowRight advance
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["Enter", " ", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [advance]);

  return (
    <div
      className="relative rounded-lg p-4 md:p-5 cursor-pointer select-none"
      style={{
        background: "rgba(10,10,18,0.92)",
        border: `2px solid ${accentColor}`,
        boxShadow: `0 0 20px ${accentColor}33`,
        maxWidth: "520px",
        width: "100%",
      }}
      onClick={advance}
      role="region"
      aria-label="Dialogue"
      aria-live="polite"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") advance(); }}
    >
      {/* Corner triangle */}
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
        {typing && (
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

      {/* Bottom bar: back button + progress dots + next/done button */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {/* Back button — only visible when not on first sentence */}
          <button
            onClick={(e) => { e.stopPropagation(); playClick(); setLineIndex(i => i - 1); }}
            aria-label="Previous sentence"
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "8px",
              color: accentColor,
              opacity: lineIndex > 0 ? 0.5 : 0,
              pointerEvents: lineIndex > 0 ? "auto" : "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "opacity 0.2s",
            }}
          >
            ◀
          </button>

          {/* Sentence progress dots */}
          <div className="flex gap-1" aria-hidden="true">
            {lines.map((_, i) => (
              <span
                key={i}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: i === lineIndex ? accentColor : "rgba(255,255,255,0.2)",
                  display: "inline-block",
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <p
          className="text-[8px]"
          style={{ fontFamily: "var(--font-pixel)", color: accentColor, opacity: typing ? 0.35 : 0.85 }}
          aria-hidden="true"
        >
          {typing ? "CLICK TO SKIP" : isLastLine ? "▼ CONTINUE" : "▼ NEXT"}
        </p>
      </div>
    </div>
  );
}

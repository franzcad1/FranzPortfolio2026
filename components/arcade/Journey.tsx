"use client";
import { useCallback, useRef, useState } from "react";
import { levels } from "@/content/content";
import { HUD } from "./HUD";
import { Level } from "./Level";

interface Props {
  onComplete: () => void;
}

export function Journey({ onComplete }: Props) {
  const [currentLevel, setCurrentLevel] = useState(1); // starts at 1, IO confirms as user scrolls
  const containerRef = useRef<HTMLDivElement>(null);

  const handleVisible = useCallback((id: number) => {
    setCurrentLevel(id);
  }, []);

  const jumpToLevel = useCallback((id: number) => {
    const el = document.getElementById(`level-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleNext = useCallback((id: number) => {
    const nextLevel = levels.find((l) => l.id === id + 1);
    if (nextLevel) {
      jumpToLevel(nextLevel.id);
    } else {
      const el = document.getElementById("level-end");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [jumpToLevel]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "100svh", overflow: "hidden" }}>
      <HUD currentLevel={currentLevel} onJump={jumpToLevel} />

      {/* Scroll container — snap per level, fills below HUD (~44px) */}
      <div
        style={{
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          height: "calc(100svh - 44px)",
          marginTop: "44px",
        }}
      >
        {levels.map((level) => (
          <Level
            key={level.id}
            level={level}
            isActive={level.id === currentLevel}
            onVisible={handleVisible}
            onNext={() => handleNext(level.id)}
          />
        ))}

        {/* After level 5 — nudge to project select */}
        <div
          id="level-end"
          className="flex items-center justify-center"
          style={{ height: "calc(100svh - 44px)", scrollSnapAlign: "start", background: "var(--bg)" }}
        >
          <div className="text-center px-6">
            <p
              className="mb-6 text-[10px] tracking-widest"
              style={{ fontFamily: "var(--font-pixel)", color: "var(--cyan)" }}
            >
              JOURNEY COMPLETE
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-3 rounded transition-opacity hover:opacity-80"
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "10px",
                background: "var(--cyan)",
                color: "var(--bg)",
              }}
            >
              SEE THE WORK &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

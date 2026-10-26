"use client";
import { levels } from "@/content/content";

interface Props {
  currentLevel: number; // 1-based
  onJump: (levelId: number) => void;
}

export function HUD({ currentLevel, onJump }: Props) {
  const total = levels.length;
  const progress = ((currentLevel - 1) / (total - 1)) * 100;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background: "rgba(10,10,18,0.85)",
        backdropFilter: "blur(4px)",
        borderBottom: "1px solid rgba(0,229,255,0.12)",
      }}
      role="navigation"
      aria-label="Level navigation"
    >
      <div className="hidden sm:flex items-center gap-3 px-4 py-2" style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Progress bar */}
        <div
          className="relative flex-1 h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
          role="progressbar"
          aria-valuenow={currentLevel}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Level ${currentLevel} of ${total}`}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--cyan), var(--magenta))",
              boxShadow: "0 0 8px var(--cyan)",
            }}
          />
        </div>

        {/* Level dots */}
        <nav aria-label="Jump to level">
          <ul className="flex items-center gap-2">
            {levels.map((level) => {
              const active = level.id === currentLevel;
              const visited = level.id <= currentLevel;
              return (
                <li key={level.id}>
                  <button
                    onClick={() => onJump(level.id)}
                    title={level.title}
                    aria-current={active ? "step" : undefined}
                    aria-label={`Jump to ${level.title}`}
                    className="flex items-center justify-center rounded-full transition-all"
                    style={{
                      width: active ? 28 : 18,
                      height: active ? 28 : 18,
                      background: active
                        ? level.accentColor
                        : visited
                        ? `${level.accentColor}44`
                        : "rgba(255,255,255,0.1)",
                      border: `2px solid ${active ? level.accentColor : "transparent"}`,
                      boxShadow: active ? `0 0 10px ${level.accentColor}88` : "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-pixel)",
                        fontSize: "6px",
                        color: active ? "var(--bg)" : visited ? level.accentColor : "var(--fg-muted)",
                        lineHeight: 1,
                      }}
                    >
                      {level.id}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Level label */}
        <p
          className="hidden sm:block text-[8px] shrink-0"
          style={{ fontFamily: "var(--font-pixel)", color: "var(--fg-muted)", maxWidth: 120 }}
          aria-hidden="true"
        >
          {levels.find((l) => l.id === currentLevel)?.slug.toUpperCase()}
        </p>
      </div>
    </header>
  );
}

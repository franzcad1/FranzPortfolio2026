"use client";
import { useMode } from "@/lib/ModeContext";

export function ModeToggle() {
  const { mode, toggle, soundEnabled, toggleSound } = useMode();

  return (
    <div
      className="fixed top-2 right-2 z-50 flex items-center gap-2"
      role="toolbar"
      aria-label="Display controls"
    >
      {/* Sound toggle — hidden on mobile */}
      <button
        onClick={toggleSound}
        title={soundEnabled ? "Mute sound effects" : "Enable sound effects"}
        aria-pressed={soundEnabled}
        className="hidden sm:block px-2 py-1 text-[8px] border border-current rounded cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        style={{ fontFamily: "var(--font-pixel)", color: "var(--fg-muted)" }}
      >
        SFX {soundEnabled ? "ON" : "OFF"}
      </button>

      {/* Mode toggle — primary */}
      <button
        onClick={toggle}
        title={mode === "arcade" ? "Switch to readable layout" : "Switch to arcade layout"}
        className="px-2 py-1 text-[7px] sm:px-3 sm:text-[8px] border-2 rounded cursor-pointer font-bold transition-colors"
        style={{
          fontFamily: "var(--font-pixel)",
          borderColor: mode === "arcade" ? "var(--cyan)" : "var(--magenta)",
          color:       mode === "arcade" ? "var(--cyan)" : "var(--magenta)",
          background:  "transparent",
        }}
      >
        {mode === "arcade" ? "FAST MODE" : "ARCADE MODE"}
      </button>
    </div>
  );
}

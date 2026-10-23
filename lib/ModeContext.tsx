"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

type Mode = "arcade" | "fast";

interface ModeContextValue {
  mode: Mode;
  toggle: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  crtEnabled: boolean;
  toggleCrt: () => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("arcade");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(true);

  return (
    <ModeContext.Provider
      value={{
        mode,
        toggle: () => setMode((m) => (m === "arcade" ? "fast" : "arcade")),
        soundEnabled,
        toggleSound: () => setSoundEnabled((v) => !v),
        crtEnabled,
        toggleCrt: () => setCrtEnabled((v) => !v),
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used inside ModeProvider");
  return ctx;
}

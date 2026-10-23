"use client";
import { useMode } from "@/lib/ModeContext";
import { FastLayout } from "@/components/fast/FastLayout";

// Arcade layer imported lazily — loaded only when needed
import dynamic from "next/dynamic";
const ArcadeLayout = dynamic(() => import("@/components/arcade/ArcadeLayout").then((m) => m.ArcadeLayout), {
  ssr: false,
});

export default function Home() {
  const { mode, crtEnabled } = useMode();

  return (
    <main
      className={[
        mode === "fast" ? "fast-mode" : "",
        mode === "arcade" && crtEnabled ? "crt-overlay" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {mode === "fast" ? <FastLayout /> : <ArcadeLayout />}
    </main>
  );
}

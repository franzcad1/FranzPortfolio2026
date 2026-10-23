"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TitleScreen } from "./TitleScreen";
import { ModeSelect } from "./ModeSelect";
import { Journey } from "./Journey";
import { ProjectSelect } from "./ProjectSelect";
import { ProjectDetail } from "./ProjectDetail";
import { ContinueScreen } from "./ContinueScreen";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useMode } from "@/lib/ModeContext";

type Screen =
  | "title"
  | "mode-select"
  | "journey"
  | "projects"
  | "project-detail"
  | "continue";

export function ArcadeLayout() {
  const [screen, setScreen] = useState<Screen>("title");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const { toggle } = useMode();

  const go = useCallback((s: Screen) => setScreen(s), []);

  const handleExpress = useCallback(() => go("projects"), [go]);

  const handleSelectProject = useCallback((id: string) => {
    setActiveProject(id);
    setScreen("project-detail");
  }, []);

  // Escape nav map
  useEffect(() => {
    const back: Partial<Record<Screen, Screen>> = {
      "mode-select":    "title",
      "journey":        "mode-select",
      "projects":       "mode-select",
      "project-detail": "projects",
      "continue":       "projects",
    };
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && back[screen]) setScreen(back[screen]!);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [screen]);

  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>

      <AnimatePresence mode="wait">
        {screen === "title" && (
          <TitleScreen key="title" onStart={() => go("mode-select")} />
        )}

        {screen === "mode-select" && (
          <ModeSelect
            key="mode-select"
            onStory={() => go("journey")}
            onExpress={handleExpress}
          />
        )}

        {screen === "journey" && (
          <motion.div
            key="journey"
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35 }}
            style={{ zIndex: 10 }}
          >
            <Journey onComplete={() => go("projects")} />
          </motion.div>
        )}

        {screen === "projects" && (
          <ProjectSelect
            key="projects"
            onSelect={handleSelectProject}
            onContinue={() => go("continue")}
            onFullPortfolio={toggle}
            onRestart={() => go("title")}
          />
        )}

        {screen === "project-detail" && activeProject && (
          <ProjectDetail
            key={`detail-${activeProject}`}
            projectId={activeProject}
            onBack={() => go("projects")}
            onContact={() => go("continue")}
            onFullPortfolio={toggle}
          />
        )}

        {screen === "continue" && (
          <ContinueScreen
            key="continue"
            onRestart={() => go("title")}
            onBack={() => go("projects")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

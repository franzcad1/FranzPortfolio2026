"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sprite } from "./Sprite";
import { DialogueBox } from "./DialogueBox";
import { SceneBackground } from "./SceneBackground";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useSound } from "@/lib/hooks/useSound";
import type { levels } from "@/content/content";

type Level = (typeof levels)[number];

interface Props {
  level: Level;
  isActive: boolean;
  onVisible: (id: number) => void;
  onNext?: () => void;
}

export function Level({ level, isActive, onVisible, onNext }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [showScrollHint, setShowScrollHint] = useState(level.id === 1);
  const { playTransition } = useSound();
  const prevActive = useRef(false);

  useEffect(() => {
    if (isActive && !prevActive.current) playTransition();
    prevActive.current = isActive;
  }, [isActive, playTransition]);

  // Hide scroll hint after 3.5s (Level 1 only)
  useEffect(() => {
    if (level.id !== 1) return;
    const t = setTimeout(() => setShowScrollHint(false), 3500);
    return () => clearTimeout(t);
  }, [level.id]);

  // IntersectionObserver — fires when level crosses 50% visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(level.id); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [level.id, onVisible]);

  return (
    <section
      ref={ref}
      id={`level-${level.id}`}
      aria-label={level.title}
      className="relative flex items-center md:items-end justify-center"
      style={{
        height: "calc(100svh - 44px)",
        minHeight: 440,
        scrollSnapAlign: "start",
        overflow: "hidden",
      }}
    >
      {/* Scene art */}
      <SceneBackground scene={level.scene} />

      {/* Dark overlay — stronger for photo backgrounds */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: ["airport","campus","dental-chair","studio","clinic-desk"].includes(level.scene)
            ? "rgba(0,0,0,0.55)"
            : `radial-gradient(ellipse at 50% 80%, ${level.accentColor}0a 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      {/* Accent color wash */}
      {["airport","campus","dental-chair","studio","clinic-desk"].includes(level.scene) && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 80%, ${level.accentColor}12 0%, transparent 70%)` }}
          aria-hidden="true"
        />
      )}

      {/* Content — mobile: stacked column; desktop: sprite + dialogue row */}
      <div
        className="relative z-10 w-full px-4 md:px-8 pb-8 md:pb-16 flex flex-col md:flex-row md:items-end gap-3 md:gap-6"
        style={{ maxWidth: "860px", margin: "0 auto" }}
      >
        {/* Sprite: centred on mobile, left-anchored on desktop */}
        <motion.div
          initial={false}
          animate={isActive ? { x: 0, opacity: 1 } : { x: reduced ? 0 : -20, opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: "easeOut" }}
          className="flex justify-center md:justify-start shrink-0"
        >
          <div style={level.scene === "dental-chair" ? { marginLeft: "-48px" } : level.scene === "studio" ? { marginBottom: "-48px" } : undefined}>
            <Sprite outfit={level.outfit} walking={false} scale={3} />
          </div>
        </motion.div>

        {/* Dialogue box */}
        <motion.div
          className="flex-1 min-w-0"
          initial={false}
          animate={isActive ? { y: 0, opacity: 1 } : { y: reduced ? 0 : 12, opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.1, ease: "easeOut" }}
        >
          <p
            className="mb-2 text-[8px] md:text-[10px] tracking-widest"
            style={{ fontFamily: "var(--font-pixel)", color: level.accentColor }}
          >
            {level.title}
          </p>
          <DialogueBox
            text={level.script}
            accentColor={level.accentColor}
            onDone={onNext}
          />
        </motion.div>
      </div>

      {/* Scroll hint — Level 1 only, fades out after 3.5s */}
      {level.id === 1 && (
        <div
          className="absolute inset-x-0 pointer-events-none"
          style={{ top: "50%", transform: "translateY(-50%)", display: "flex", justifyContent: "center" }}
          aria-hidden="true"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showScrollHint ? 0.35 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "13px",
              color: "var(--fg)",
              letterSpacing: "0.15em",
            }}
          >
            SCROLL TO SKIP
          </motion.p>
        </div>
      )}

      {/* Level number — corner watermark */}
      <div
        className="absolute top-14 right-4 md:right-8"
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-pixel)",
          fontSize: "clamp(32px, 8vw, 64px)",
          color: level.accentColor,
          opacity: 0.06,
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {String(level.id).padStart(2, "0")}
      </div>
    </section>
  );
}

"use client";
import { FastHero } from "./FastHero";
import { FastProjects } from "./FastProjects";
import { FastSkills } from "./FastProfile";
import { FastContact } from "./FastContact";

export function FastLayout() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <FastHero />
      <FastProjects />
      <FastSkills />
      <FastContact />
    </div>
  );
}

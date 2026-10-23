"use client";
import { levels } from "@/content/content";

export function FastTimeline() {
  return (
    <section
      id="timeline"
      className="px-6 py-20"
      style={{ maxWidth: "680px", margin: "0 auto" }}
      aria-labelledby="timeline-heading"
    >
      <h2
        id="timeline-heading"
        className="text-2xl font-bold mb-12"
        style={{ color: "var(--fg)" }}
      >
        Journey
      </h2>

      <ol className="relative" aria-label="Career timeline">
        {/* Vertical rule */}
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px"
          style={{ background: "var(--bg-panel)" }}
          aria-hidden="true"
        />

        {levels.map((level, i) => (
          <li key={level.id} className={`relative pl-8 ${i < levels.length - 1 ? "mb-10" : ""}`}>
            {/* Dot */}
            <span
              className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 flex-shrink-0"
              style={{
                background: level.accentColor,
                borderColor: level.accentColor,
                boxShadow: `0 0 8px ${level.accentColor}66`,
              }}
              aria-hidden="true"
            />

            <p
              className="text-xs font-mono mb-1 uppercase tracking-wider"
              style={{ color: "var(--fg-muted)" }}
            >
              {level.subtitle}
            </p>

            <h3
              className="text-base font-semibold mb-2"
              style={{ color: "var(--fg)" }}
            >
              {level.title.replace(/^LEVEL \d+:\s*/, "")}
            </h3>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--fg-muted)", maxWidth: "520px" }}
            >
              {level.script}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

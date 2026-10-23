"use client";
import { profile } from "@/content/content";

export function FastProfile() {
  return (
    <section
      id="profile"
      className="px-6 py-20"
      style={{ maxWidth: "680px", margin: "0 auto" }}
      aria-labelledby="profile-heading"
    >
      <h2
        id="profile-heading"
        className="text-2xl font-bold mb-10"
        style={{ color: "var(--fg)" }}
      >
        About
      </h2>

      {/* Bio row */}
      <div className="flex gap-6 items-start flex-wrap mb-12">
        {/* TODO: replace with <img src={profile.workPhoto} ... /> when photo is ready */}
        <div
          className="w-28 h-28 rounded-lg flex items-center justify-center text-xs shrink-0"
          style={{
            background: "var(--bg-panel)",
            color: "var(--fg-muted)",
            border: "2px dashed var(--fg-muted)",
          }}
          aria-label="Work photo — TODO: add real photo"
          title="TODO: work photo"
        >
          PHOTO
        </div>
        <div className="flex-1" style={{ minWidth: "200px" }}>
          <p
            className="text-base leading-relaxed mb-3"
            style={{ color: "var(--fg)" }}
          >
            {profile.bio}
          </p>
          <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
            {profile.location}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-10">
        {profile.skillGroups.map((group) => (
          <div key={group.label}>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--fg-muted)" }}
            >
              {group.label}
            </h3>
            <ul className="flex flex-col gap-4" role="list">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                      {skill.name}
                    </span>
                    <span
                      className="text-xs font-mono"
                      style={{ color: skill.level > 0 ? "var(--cyan)" : "var(--fg-muted)" }}
                    >
                      {skill.level > 0 ? `${skill.level}` : "TODO"}
                    </span>
                  </div>
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency: ${skill.level}%`}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, var(--cyan), var(--cyan)88)`,
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

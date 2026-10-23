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
        {(profile.workPhoto ?? profile.headshot) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={(profile.workPhoto ?? profile.headshot)!}
            alt="Franz Cadiente"
            className="w-28 h-28 rounded-lg object-cover object-top shrink-0"
          />
        )}
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

    </section>
  );
}

export function FastSkills() {
  return (
    <section
      id="skills"
      className="px-6 py-20"
      style={{ maxWidth: "680px", margin: "0 auto" }}
      aria-labelledby="skills-heading"
    >
      <h2
        id="skills-heading"
        className="text-2xl font-bold mb-10"
        style={{ color: "var(--fg)" }}
      >
        Skills
      </h2>
      <div className="flex flex-col gap-8">
        {profile.skillGroups.map((group) => (
          <div key={group.label}>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--fg-muted)" }}
            >
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {group.skills.filter((s) => s.level > 0).map((skill) => (
                <li
                  key={skill.name}
                  className="text-sm px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "var(--fg)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

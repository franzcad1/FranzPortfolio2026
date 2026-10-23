"use client";
import { hero, contact, profile } from "@/content/content";

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export function FastHero() {
  return (
    <section
      id="hero"
      className="flex flex-col px-6 pt-24 pb-16"
      style={{ maxWidth: "680px", margin: "0 auto" }}
    >
      {profile.headshot && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.headshot}
          alt="Franz Cadiente"
          className="w-20 h-20 rounded-full mb-8 object-cover object-top"
          style={{ flexShrink: 0 }}
        />
      )}

      <p
        className="text-xs font-mono mb-3 uppercase tracking-widest"
        style={{ color: "var(--fg-muted)" }}
      >
        AI Engineer · Full-Stack Dev · Founder · GTA, Canada
      </p>

      <h1
        className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight tracking-tight"
        style={{ color: "var(--fg)" }}
      >
        {hero.name}
      </h1>

      <p
        className="text-xl md:text-2xl font-medium mb-6 leading-snug"
        style={{ color: "var(--cyan)", maxWidth: "480px" }}
      >
        {hero.tagline}
      </p>

      <p
        className="text-base leading-relaxed mb-10"
        style={{ color: "var(--fg-muted)", maxWidth: "560px" }}
      >
        {profile.bio}
      </p>

      {/* Primary CTAs */}
      <div className="flex flex-wrap gap-3 mb-6">
        <a
          href="#projects"
          className="px-5 py-2.5 rounded font-semibold text-sm transition-opacity hover:opacity-90 focus-visible:outline-2"
          style={{ background: "var(--cyan)", color: "var(--bg)" }}
        >
          See my work
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="px-5 py-2.5 rounded font-semibold text-sm transition-colors hover:border-current focus-visible:outline-2"
          style={{ border: "1.5px solid var(--fg-muted)", color: "var(--fg)" }}
        >
          Email me
        </a>
      </div>

      {/* Social links */}
      <div className="flex gap-3">
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors hover:border-white"
          style={{ border: "1.5px solid rgba(255,255,255,0.15)", color: "var(--fg-muted)" }}
          aria-label="GitHub"
        >
          <GitHubIcon /> GitHub
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors hover:border-white"
          style={{ border: "1.5px solid rgba(255,255,255,0.15)", color: "var(--fg-muted)" }}
          aria-label="LinkedIn"
        >
          <LinkedInIcon /> LinkedIn
        </a>
      </div>
    </section>
  );
}

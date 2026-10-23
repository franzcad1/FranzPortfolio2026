"use client";
import { contact, hero } from "@/content/content";

export function FastContact() {
  return (
    <section
      id="contact"
      className="px-6 py-20 pb-32"
      style={{ maxWidth: "680px", margin: "0 auto" }}
      aria-labelledby="contact-heading"
    >
      {/* Divider */}
      <div
        className="mb-12 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
        aria-hidden="true"
      />

      <h2
        id="contact-heading"
        className="text-2xl font-bold mb-3"
        style={{ color: "var(--fg)" }}
      >
        {contact.ctaLabel}
      </h2>
      <p className="text-base mb-8" style={{ color: "var(--fg-muted)", maxWidth: "420px" }}>
        Open to AI engineering roles and agency inquiries.
      </p>

      {/* Primary CTA */}
      <a
        href={`mailto:${contact.email}`}
        className="inline-block px-6 py-3 rounded-lg font-bold text-base mb-10 transition-opacity hover:opacity-90"
        style={{ background: "var(--cyan)", color: "var(--bg)" }}
      >
        Send me an email
      </a>

      {/* Secondary links */}
      <ul className="flex flex-col gap-3">
        <li>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm hover:underline"
            style={{ color: "var(--fg-muted)" }}
          >
            <span aria-hidden="true">→</span>
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm hover:underline"
            style={{ color: "var(--fg-muted)" }}
          >
            <span aria-hidden="true">→</span>
            GitHub
          </a>
        </li>
      </ul>

      <p
        className="mt-20 text-xs"
        style={{ color: "var(--fg-muted)", opacity: 0.5 }}
      >
        &copy; {new Date().getFullYear()} {hero.name}
      </p>
    </section>
  );
}

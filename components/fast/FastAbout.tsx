"use client";
import { useState } from "react";

const PHOTOS = [
  "/headshot.jpg",
  "/about/9916ad89-7580-462c-ae87-a6ab0f902c49.jfif",
  "/about/7bb594e1-c057-4bc5-a431-ea9b7915df66.jfif",
];

export function FastAbout() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + PHOTOS.length) % PHOTOS.length);
  const next = () => setIdx(i => (i + 1) % PHOTOS.length);

  return (
    <section
      id="about"
      className="px-6 py-16 md:py-24"
      style={{ maxWidth: "900px", margin: "0 auto" }}
    >
      <h2
        className="mb-10 text-xs tracking-widest uppercase"
        style={{ fontFamily: "var(--font-pixel)", color: "var(--cyan)" }}
      >
        About Me
      </h2>

      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        {/* Text */}
        <div className="flex-1 space-y-4 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          <p>My path hasn't been linear, but every chapter has shaped how I build today.</p>
          <p>
            I studied game programming and software development, gained experience in the tech industry,
            and later moved into healthcare operations. Navigating permanent residency in Canada meant
            making practical decisions about my career, and dentistry became an unexpected chapter.
            Working in dental clinics gave me a different perspective on technology: I saw how much time
            people spent on repetitive tasks and how better systems could make a real difference.
          </p>
          <p>
            That experience led me to build DentalAI, an AI-powered practice management platform,
            while growing Cadiente Digital, my digital agency helping businesses improve their online
            presence and operations.
          </p>
          <p>
            These days, I'm focused on building practical AI tools, shipping full-stack products,
            and turning real-world problems into working solutions.
          </p>
          <p>
            When I'm not coding or working on a business, I'm probably exploring new technology,
            experimenting with a side project, or playing video games.
          </p>
        </div>

        {/* Photo carousel */}
        <div className="shrink-0 w-full md:w-56">
          <div className="relative" style={{ aspectRatio: "3/4" }}>
            <img
              src={PHOTOS[idx]}
              alt="Franz Cadiente"
              className="w-full h-full rounded-lg object-cover object-top"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            />
            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-opacity hover:opacity-100"
              style={{
                width: 28, height: 28,
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "var(--fg)",
                fontSize: 12,
                opacity: 0.7,
                cursor: "pointer",
              }}
            >
              ‹
            </button>
            {/* Next */}
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-opacity hover:opacity-100"
              style={{
                width: 28, height: 28,
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "var(--fg)",
                fontSize: 12,
                opacity: 0.7,
                cursor: "pointer",
              }}
            >
              ›
            </button>
            {/* Dots */}
            <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Photo ${i + 1}`}
                  style={{
                    width: 5, height: 5,
                    borderRadius: "50%",
                    background: i === idx ? "var(--cyan)" : "rgba(255,255,255,0.3)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

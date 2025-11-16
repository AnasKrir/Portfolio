// components/ProjectCard.tsx
"use client";
import { Project } from "@/lib/types";
import { useState } from "react";

export function ProjectCard(p: Project) {
  const [hover, setHover] = useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)] shadow-[0_18px_50px_-22px_rgba(0,0,0,.55)] transition-transform duration-200 hover:-translate-y-[2px] hover:border-[color-mix(in_srgb,var(--brand)_55%,var(--border))]"
    >
      {/* Media */}
      <div className="aspect-[16/9] overflow-hidden bg-[var(--bg-soft)]">
        <img
          src={p.image}
          alt={p.title}
          className={`h-full w-full object-cover transition duration-300 ${hover ? "scale-[1.04]" : "scale-100"}`}
        />
      </div>

      {/* Body — NOTE: pb-20/md:pb-24 pour laisser la place au bouton */}

      <div className="p-5 pb-20 md:pb-24">
        <div className="mb-2 flex items-center gap-2 text-[var(--muted)]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--brand)_22%,transparent)] text-lg">
            {p.icon}
          </span>
          <span className="text-sm font-medium">{p.category}</span>
        </div>

        <h3 className="mb-1 text-lg font-semibold tracking-tight">{p.title}</h3>
        <p className="mb-4 line-clamp-2 text-[var(--muted)]">{p.description}</p>

        {/* Key features */}
        {p.features?.length ? (
          <div className="mb-4 space-y-2">
            <div className="text-sm font-medium text-[var(--muted-2)]">Key Features</div>
            <ul className="grid gap-1.5 text-sm text-[var(--muted)]">
              {p.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-[2px] text-[var(--brand)]">▸</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="skill-chip proj-tag rounded-full border border-[color-mix(in_srgb,var(--brand)_45%,var(--border))] px-2.5 py-1 text-xs text-[var(--heading)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action — bottom-right */}
      {p.link && (
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${p.title}`}
          className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium
                     bg-[color-mix(in_srgb,var(--brand)_22%,transparent)]
                     border border-[color-mix(in_srgb,var(--brand)_55%,var(--border))]
                     text-[var(--heading)]
                     shadow-[0_8px_24px_-12px_rgba(0,0,0,.5)]
                     transition hover:-translate-y-[1px]
                     hover:bg-[color-mix(in_srgb,var(--brand)_28%,transparent)]
                     hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,.55)]
                     focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40"
        >
          View
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}

      {/* Glow */}
      
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(600px 120px at 50% -10%, color-mix(in srgb, var(--brand) 16%, transparent), transparent 60%)" }}
      />
    </article>
  );
}

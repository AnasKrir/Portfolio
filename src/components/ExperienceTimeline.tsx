// components/ExperienceTimeline.tsx
"use client";
import clsx from "clsx";

type Exp = {
  role: string;
  company: string;
  period: string;
  location: string;
  start?: string;         // YYYY-MM pour le tri
  bullets: string[];
  stack: string[];
};

export default function ExperienceTimeline({ items }: { items: Exp[] }) {
  // Tri anti-chronologique (dernier en haut)
  const data = [...items].sort((a,b) => (b.start||"") < (a.start||"") ? -1 : 1);

  return (
    <div className="relative">
      {/* Ligne globale (centrée en ≥md, masquée en mobile) */}
      <div
        className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]
                   bg-gradient-to-b from-[var(--brand)]/80 via-[var(--brand)]/35 to-transparent rounded"
        aria-hidden
      />

      <ul className="space-y-10 md:space-y-14">
        {data.map((e, i) => {
          const right = i % 2 === 0; // alterne droite/gauche
          return (
            <li key={e.role + i} className="relative">
              {/* Point pour CET item, aligné sur le padding-top de la carte (p-6 ⇒ top-6) */}
              <span
                className="hidden md:block absolute left-1/2 -translate-x-1/2 top size-3
                           rounded-full border-2 border-[var(--brand)] bg-[var(--bg)]
                           shadow-[0_0_0_4px_color-mix(in_srgb,var(--brand)_25%,transparent)]"
                aria-hidden
              />

              {/* Carte qui “flotte” à gauche ou à droite */}
              <article
                className={clsx(
                  "card p-6 md:w-[min(42rem,calc(50%-2.25rem))]",
                  right ? "md:ml-[53%]" : "md:mr-[53%]" // droite ↔ gauche
                )}
              >
                <div className="mb-2 text-[var(--muted)] flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl
                                   bg-[color-mix(in_srgb,var(--brand)_22%,transparent)]">🏢</span>
                  <span className="text-sm font-medium">{e.company}</span>
                </div>

                <h3 className="text-lg md:text-xl font-semibold leading-snug">{e.role}</h3>
                <div className="text-sm text-[var(--muted)] mb-3">
                  {e.period} • {e.location}
                </div>

                <ul className="grid gap-2 mb-4 text-[var(--muted)]">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-[var(--brand)] mt-[2px]">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <span key={s} className="skill-chip">{s}</span>
                  ))}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

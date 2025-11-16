// components/ProjectFilters.tsx
"use client";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";

const TABS = ["All", "Web Apps", "Data Projects", "Mobile Apps", "Desktop Apps", "Console Apps"] as const;

export function ProjectGallery({ items }: { items: Project[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  const filtered = useMemo(
    () => (tab === "All" ? items : items.filter((p) => p.category === tab)),
    [tab, items]
  );

  return (
    <div className="space-y-5">
      {/* Filters */}
            <div className="flex justify-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {TABS.map((t) => {
                  const active = t === tab;
                  return (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`group inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition
                        border cursor-pointer
                        ${active
                          ? "text-[var(--heading)] border-[color-mix(in_srgb,var(--brand)_55%,var(--border))] bg-[color-mix(in_srgb,var(--brand)_18%,transparent)]"
                          : "text-[var(--muted)] border-[var(--border)] hover:text-[var(--heading)] hover:border-[color-mix(in_srgb,var(--brand)_40%,var(--border))]"
                        }`}
                    >
                      {/* icône filtre */}
                      <svg width="16" height="16" viewBox="0 0 24 24" className={`${active ? "opacity-100" : "opacity-70"} transition`}>
                        <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>


      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  );
}

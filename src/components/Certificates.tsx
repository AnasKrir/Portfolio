"use client";
import Image from "next/image";
import { useState } from "react";
import type { Certificate } from "@/lib/certifications";



function CertCard({ c, onOpen }: { c: Certificate; onOpen: () => void }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)] shadow-[0_18px_50px_-22px_rgba(0,0,0,.55)] card-glow">
      {/* Thumb */}
      <div className="aspect-[4/3] overflow-hidden bg-[var(--bg-soft)]">
        <Image
          src={c.thumb}
          alt={c.title}
          width={1200}
          height={900}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>

      {/* Body - NOTE: pb-16 pour réserver la place du footer */}


      <div className="p-4 pb-16">
        <div className="text-xs text-[var(--muted)]">{c.org}</div>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold tracking-tight">
          {c.title}
        </h3>
      </div>

      {/* Bottom-right actions - NOTE: positionnée en bas/droite */}


      <div className="absolute bottom-3 right-3 flex gap-2">
        <a
          href={c.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-[color-mix(in_srgb,var(--brand)_55%,var(--border))] bg-[color-mix(in_srgb,var(--brand)_22%,transparent)] px-3 py-1.5 text-sm text-[var(--heading)] transition hover:-translate-y-[1px] hover:bg-[color-mix(in_srgb,var(--brand)_28%,transparent)] cursor-pointer"
        >
          View
        </a>
        <a
          href={c.pdf}
          download
          className="rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 text-sm text-[var(--heading)]/80 transition hover:-translate-y-[1px] hover:border-[color-mix(in_srgb,var(--brand)_45%,var(--border))] cursor-pointer"
        >
          Download
        </a>
        <button
          onClick={onOpen}
          className="rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 text-sm text-[var(--heading)]/80 transition hover:-translate-y-[1px] hover:border-[color-mix(in_srgb,var(--brand)_45%,var(--border))] cursor-pointer"
          aria-label="Open preview"
        >
          Preview
        </button>
      </div>
    </article>
  );
}


export default function CertificatesGallery({ items }: { items: Certificate[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const current = openIdx == null ? null : items[openIdx];

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((c, i) => (
          <CertCard key={c.title} c={c} onOpen={() => setOpenIdx(i)} />
        ))}


        {/* ✅ Banner pleine largeur sous les certifs */}


        <div className="md:col-span-2 xl:col-span-3">
          <div
            suppressHydrationWarning className="
              relative overflow-hidden rounded-2xl
              border border-[var(--border)] bg-[var(--panel)]
              p-6 md:p-10 text-center
              shadow-[0_18px_50px_-22px_rgba(0,0,0,.55)]
            "
          >


            {/* halo léger */}


            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(80% 120% at 50% -20%, color-mix(in srgb, var(--brand) 12%, transparent), transparent 60%)",
              }}
            />
            <div className="relative">
              <div suppressHydrationWarning className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center
                              rounded-full bg-[color-mix(in_srgb,var(--brand)_18%,transparent)]
                              text-2xl">🎓</div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Continuous Learning
              </h3>
              <p className="mx-auto mt-3 max-w-4xl text-[var(--muted)] leading-relaxed text-base md:text-lg">
                I’m committed to ongoing growth through recognized certifications.
                Each certificate marks progress in full-stack development, DevOps,
                cloud infrastructure, and modern frameworks that power reliable,
                scalable products.
              </p>
            </div>
          </div>
        </div>

        
      </div>


      {/* Lightbox */}


   {current && (
  <div
    role="dialog"
    aria-modal="true"
    className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
    onClick={() => setOpenIdx(null)}
  >
    <div
      className="
        relative w-full max-w-5xl overflow-hidden
        rounded-2xl border border-[var(--border)] bg-[var(--panel)]
        max-h-[90vh] flex flex-col
      "
      onClick={(e) => e.stopPropagation()}
    >


      {/* Zone preview : ajuste la hauteur ici (ex: 60vh) */}


      <div className="h-[80vh] bg-[var(--bg-soft)]">
        <Image
          src={current.thumb}
          alt={current.title}
          width={1800}
          height={1200}
          className="h-full w-full object-contain"
          priority
        />
      </div>



      {/* Footer */}


      
      <div className="flex items-center justify-between gap-3 p-4">
        <div>
          <div className="text-xs text-[var(--muted)]">{current.org}</div>
          <div className="font-medium">{current.title}</div>
        </div>
        <div className="flex gap-2">
          <a
            href={current.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[color-mix(in_srgb,var(--brand)_55%,var(--border))] bg-[color-mix(in_srgb,var(--brand)_22%,transparent)] px-3 py-1.5 text-sm text-[var(--heading)] cursor-pointer"
          >
            Open PDF
          </a>
          <a
            href={current.pdf}
            download
            className="rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 text-sm text-[var(--heading)]/80 cursor-pointer"
          >
            Download
          </a>
          <button
            onClick={() => setOpenIdx(null)}
            className="rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 text-sm text-[var(--heading)]/80 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
}

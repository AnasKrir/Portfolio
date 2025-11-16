"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/#home",           label: "Home" },
  { href: "/#about",          label: "About" },
  { href: "/#skills",         label: "Skills" },
  { href: "/#projects",       label: "Projects" },
  { href: "/#experience",     label: "Experience" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/#contact",        label: "Contact" },
];

export default function Navbar() {
  usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const close  = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen(v => !v), []);

  // enable portal only on client
  useEffect(() => { setMounted(true); }, []);

  // ESC + lock scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [open, close]);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--bg), transparent 60%)" }}
    >
      <nav className="container-l py-3 flex items-center justify-between gap-4">
        <Link href="/#home" className="font-bold text-[18px] tracking-tight">
          <span style={{ color: "var(--brand)" }}>A</span>
          <span style={{ color: "var(--brand-2)" }}>K</span>
        </Link>

        <ul className="hidden md:flex gap-2 md:gap-3 text-sm">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="nav-link hover-mauve px-3 py-2 rounded-md">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border btn-raise"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={toggle}
            style={{ borderColor: "var(--border)", background: "var(--panel)" }}
          >
            <div className={`burger ${open ? "burger--open" : ""}`} aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Overlay + Drawer via portal (outside <header>) */}

      
      {mounted && open && createPortal(
        <div id="mobile-menu" className="md:hidden">
          {/* overlay that BLURS the whole page */}
          <div className="mobile-overlay" onClick={close} />

          {/* right drawer */}
          <aside
            className="mobile-drawer--right"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div
              className="flex items-center justify-between pl-4 pr-2 pt-3 pb-2 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="font-semibold" style={{ color: "var(--heading)" }}>Menu</span>
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border btn-raise"
                onClick={close}
                aria-label="Close menu"
                style={{ borderColor: "var(--border)", background: "var(--panel-2)" }}
              >
                <div className="burger burger--open" aria-hidden="true" />
              </button>
            </div>

            <nav className="p-2">
              <ul className="space-y-1">
                {links.map(l => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="nav-link hover-mauve block px-4 py-3 rounded-lg text-base transition"
                      onClick={close}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>,
        document.body
      )}
    </header>
  );
}

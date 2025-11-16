"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useMemo } from "react";
import Section from "@/components/Section";
import type { Project } from "@/lib/types";
import ScrollTop from "@/components/ScrollTop";
import { PROJECTS } from "@/lib/projects";
import { ProjectGallery } from "@/components/ProjectFilters";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { experience } from "@/lib/experience";
import CertificatesGallery from "@/components/Certificates";
import { CERTS } from "@/lib/certifications";



/* ---- Données ---- */
const skills = [
  {
    title: "Programming Languages",
    icon: "💻",
    tags: ["Java", "Python", "C", "C++", "C#", "Dart", "PHP", "JavaScript", "TypeScript", "HTML5", "CSS3", "SQL"],
  },
  {
    title: "Frameworks & Libraries",
    icon: "📦",
    tags: [
      "Spring Boot",
      "Django",
      "ASP.NET",
      "Flutter",
      "React Native",
      "Thymeleaf",
      "AJAX",
      "jQuery",
      "Bootstrap",
      "Tailwind CSS",
      "React.js",
      "Next.js",
      "Express.js",
      "Node.js",
      "Vue.js",
      "React native",
    ],
  },
  {
    title: "Databases & Data Systems",
    icon: "🗄️",
    tags: ["MySQL", "PostgreSQL", "SQLite"," SQL Server", "Oracle DB","Pig","Hive","hadoop HDFS"],
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    tags: [
      "Git",
      "GitHub",
      "Docker",
      "Render",
      "Kubernetes ",
      "OpenShift ",
      "CI/CD",
      "Microsoft Azure",
      "Vercel",
    ],
  },
  {
    title: "Business Intelligence & Analytics",
    icon: "📊",
    tags: ["Power BI", "Power Query", "Excel", "ETL Processes", "Data Visualization", "Data Modeling","KPI Reporting"],
  },
  {
    title: "Methodologies & Patterns",
    icon: "🧭",
    tags: ["MVC", "REST APIs", "Agile / Scrum", "POO", "TDD", "Design Patterns", "UML","Merise"],
  },
];







// Compte les tags d'un groupe de skills (le tableau `skills` doit être au scope module)
const get = (title: string) =>
  (skills.find(s => s.title === title)?.tags.length) ?? 0;

function SkillHighlights() {
  const get = (title: string) => skills.find((s) => s.title === title)?.tags.length ?? 0;

  const languages  = get("Programming Languages");
  const frameworks =
    get("Frameworks & Libraries") + get("Backend & APIs") + get("Web & Mobile Technologies");
  const dataCloud  =
    (get("Databases & Data Systems") || get("Databases & Data")) + get("Cloud & DevOps");

  const items = useMemo(
    () => [
      { value: Math.max(languages, 1), label: "Programming Languages" },
      { value: Math.max(frameworks, 1), label: "Frameworks & Libraries" },
      { value: Math.max(dataCloud, 1), label: "Database & Cloud Tools" },
    ],
    [languages, frameworks, dataCloud]
  );

  return (
    <div className="stats-wrap">
      <div className="stats-card">
        <h4 className="stats-title">Key Highlights</h4>
        <div className="stats-grid">
          {items.map((it) => (
            <div key={it.label} className="stat">
              {/* ← compteur animé */}
              <StatNumber value={it.value} suffix="+" />
              <div className="stat-label">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}






/** Observe si l’élément est visible à l’écran */
function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.35 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), opts);
    io.observe(ref.current);
    return () => io.disconnect();
  }, [opts.root, opts.rootMargin, opts.threshold]);

  return { ref, inView } as const;
}




/** Easing pour un rendu plus doux */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Hook count-up */
function useCountUp(target: number, { duration = 1200, start = false } = {}) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;

    // Accessibilité : pas d’animation si reduced motion
    const preferNoMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (preferNoMotion || duration <= 0) {
      setValue(target);
      return;
    }

    let raf = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setValue(Math.round(target * easeOutCubic(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return value;
}



/** Affichage d’un nombre animé avec suffixe (ex: “+”) */
function StatNumber({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const n = useCountUp(value, { duration: 1200, start: inView });
  return (
    <div ref={ref} className="stat-num">
      {n}
      {suffix}
    </div>
  );
}





/* ---------------- Typing hook (safe) ---------------- */


function useTypeLines(linesIn: string[], speed = 22) {
  const lines = linesIn ?? [];
  const [typed, setTyped] = useState<string[]>(() => Array(lines.length).fill(""));
  const [done, setDone] = useState(false);

  const iRef = useRef(0);
  const jRef = useRef(0);
  const alive = useRef(true);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    alive.current = true;

    // reset if lines change length
    iRef.current = 0;
    jRef.current = 0;
    setTyped(Array(lines.length).fill(""));
    setDone(false);

    const tick = () => {
      if (!alive.current) return;

      const i = iRef.current;
      const j = jRef.current;

      // stop BEFORE any access
      if (i >= lines.length || !lines[i]) {
        setDone(true);
        return;
      }

      setTyped(prev => {
        if (i >= lines.length || !lines[i]) return prev;
        const next = [...prev];
        next[i] = lines[i].slice(0, j + 1);
        return next;
      });

      // advance indices
      jRef.current = j + 1;
      if (jRef.current >= lines[i].length) {
        iRef.current = i + 1;
        jRef.current = 0;
      }

      // schedule next tick
      timer.current = window.setTimeout(tick, speed);
    };

    // start
    timer.current = window.setTimeout(tick, speed);

    return () => {
  alive.current = false;
  if (timer.current !== null) {
    window.clearTimeout(timer.current);
  }
};
  }, [lines.length, speed]);

  return { typed, done };
}








/* --------------------------- HERO --------------------------- */

function Hero() {
  const LINES = useMemo(
    () => ["Hi, I’m Anas KRIR —", "Full-Stack & Cloud Engineering Student"],
    []
  );
  const { typed, done } = useTypeLines(LINES, 20);

  return (
    <section id="home" className="container-l py-12 md:py-20">
      <div className="grid md:grid-cols-2 items-center gap-10">
        {/* Texte à gauche */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1]">
            <span className="text-[var(--heading)]">
              {typed[0]}
              <span className="caret" />
            </span>
            <br />
            <span
              className={
                typed[1] === LINES[1]
                  ? "bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)] bg-clip-text text-transparent"
                  : "text-[var(--heading)]"
              }
            >
              {typed[1]}
              {typed[1] !== LINES[1] && <span className="caret" />}
            </span>
          </h1>

          <p
            className={`mt-4 max-w-2xl md:mx-0 mx-auto text-[var(--muted)] fade-up ${
              done ? "show" : ""
            }`}
            style={{ transitionDelay: done ? "120ms" : "0ms" }}
          >
            I design and develop scalable web applications, cloud-ready architectures and data-driven
            software solutions. Currently in my 5th year of MIAGE engineering at EMSI Rabat, I’m seeking
            a 6-month end-of-study internship starting <b>February 2026</b>.
          </p>

          <div
            className={`mt-6 flex flex-wrap items-center gap-3 md:justify-start justify-center fade-up ${
              done ? "show" : ""
            }`}
            style={{ transitionDelay: done ? "220ms" : "0ms" }}
          >
            <a
              href="/cv/Anas_KRIR_CV.pdf"
              download
              className="btn-grad btn-raise inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
              </svg>
              Download CV
            </a>

            <a
              href="/#projects"
              className="btn-outline btn-raise inline-flex items-center gap-2"
            >
              View Projects
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
              </svg>
            </a>
          </div>

          <div
            className={`mt-6 flex items-center gap-4 md:justify-start justify-center fade-up ${
              done ? "show" : ""
            }`}
            style={{ transitionDelay: done ? "320ms" : "0ms" }}
          >
            <a
              href="https://github.com/AnasKrir"
              target="_blank"
              rel="noreferrer"
              className="nav-link nav-icon hover-mauve"
              aria-label="GitHub"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--heading)" }}>
                <path d="M12 .5A12 12 0 0 0 0 12.7a12 12 0 0 0 8.2 11.5c.6.1.8-.2.8-.5v-2c-3.3.8-4-1.6-4-1.6-.6-1.5-1.4-2-1.4-2-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.4-5.3-6.2 0-1.4.5-2.6 1.2-3.6-.1-.3-.5-1.7.1-3.6 0 0 1-.3 3.4 1.3a11.6 11.6 0 0 1 6.2 0c2.4-1.6 3.4-1.3 3.4-1.3.6 1.9.2 3.3.1 3.6.8 1 1.2 2.2 1.2 3.6 0 4.8-2.7 5.9-5.3 6.2.5.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A12 12 0 0 0 24 12.7 12 12 0 0 0 12 .5Z"/>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/krir-anas/"
              target="_blank"
              rel="noreferrer"
              className="nav-link nav-icon hover-mauve"
              aria-label="LinkedIn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--heading)" }}>
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1 1.84-2.05 3.8-2.05 4.06 0 4.8 2.67 4.8 6.13V23h-4v-6.7c0-1.6 0-3.7-2.25-3.7s-2.6 1.75-2.6 3.57V23h-4V8z"/>
              </svg>
            </a>

            <a
              href="mailto:anaskrir9@gmail.com"
              className="nav-link nav-icon hover-mauve"
              aria-label="Email"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--heading)" }}>
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.4l8 5.1 8-5.1V6H4Zm16 12V9.3l-8 5.1-8-5.1V18h16Z"/>
              </svg>
            </a>
          </div>
        </div>

                {/* Image à droite */}
          <div className="order-1 md:order-2 flex md:justify-end justify-center">
            <div
              className={`avatar-glow relative w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full ring-2 ring-[var(--brand)] ring-offset-4 ring-offset-[var(--bg)] hero-photo ${done ? "show" : ""}`}
              style={{ transitionDelay: done ? "420ms" : "0ms" }}  // apparaît après les autres éléments
            >
              <Image
                src="/anas.jpg"
                alt="Anas"
                fill
                priority
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 220px, 320px"
              />
            </div>
          </div>

      </div>
    </section>
  );
}

/* --------------------------- PAGE --------------------------- */


export default function OnePage(){
  return (
    <main>
      {/* HERO */}
      <Hero />

      {/* ABOUT */}


<Section id="about" title="About Me" subtitle="Get to know more about my journey and background">
  <div className="grid md:grid-cols-2 gap-8 items-start">
    {/* === PROFILE (card indépendant) === */}
    <article className="card section-card p-6 md:p-7">
            <h3
                  className="mb-3 flex w-full items-center justify-center gap-3 text-center
                            text-2xl md:text-3xl font-bold tracking-tight"
                >
                  <span className="text-3xl md:text-4xl leading-none" aria-hidden="true">🎓</span>
                  <span className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)] bg-clip-text text-transparent">
                    Profile
                  </span>
            </h3>


              <p className="justify-text mt-2 text-[var(--muted)] text-[15.5px] leading-7 md:text-base">

                    I’m a final-year Software Engineering student at EMSI Rabat (MIAGE) focused on
                    full-stack, cloud-ready, and data-driven applications. I enjoy turning ideas
                    into clean, reliable software through solid architecture and thoughtful automation.
                    <span className="block mt-4">
                      I’ve delivered projects from cloud stock management and real-time web platforms
                      to desktop tools, using Java/Spring Boot, Python/Django, ASP.NET, Flutter,
                      Docker, and Power BI.
                    </span>
                    <span className="block mt-4">
                      I care about scalability, performance, and product value, with strong habits
                      in DevOps, data engineering, and code quality (production-ready, maintainable code).
                    </span>
                    <span className="block mt-4">
                      Curious, detail-oriented, and growth-driven, I’m seeking a 6-month end-of-studies
                      internship starting <b>February 2026</b> to contribute to impactful products
                      alongside an innovative team.
                    </span>
                </p>

    </article>

    {/* === ACADEMIC TIMELINE (card indépendant) === */}


    <section>
          <h3
                  suppressHydrationWarning className="mb-3 flex items-center justify-start gap-3 text-2xl md:text-3xl font-bold tracking-tight"
                >
                  <span className="text-3xl md:text-4xl leading-none" aria-hidden="true">📅</span>
                  <span className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)] bg-clip-text text-transparent">
                    Academic Timeline
                  </span>
          </h3>



          {/* Piste verticale en mode 'standalone' */}

          <div className="timeline timeline--standalone mt-6">


            {/* 2023 — Present */}

            <div className="timeline-item">
              <span className="timeline-dot" />
              <div className="timeline-card">
                <div className="flex items-center gap-3 mb-2 text-sm text-[var(--muted)]">
                  <span>2023 — Present</span>
                  <span className="badge-pill">5th Year</span>
                </div>
                <h4 className="font-semibold leading-snug text-lg md:text-xl">
                  Engineering Cycle — Computer Science & Networks (MIAGE)
                </h4>
                <div className="mt-1 text-[var(--muted)] uppercase tracking-wide text-sm">
                  ÉCOLE MAROCAINE DES SCIENCES DE L’INGÉNIEUR (EMSI)
                </div>
                <div className="meta mt-2">📍 Rabat</div>
              </div>
            </div>


              {/* 2021 — 2023 */}


              <div className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-card">
                  <div className="mb-2 text-sm text-[var(--muted)]">2021 — 2023</div>
                  <h4 className="font-semibold leading-snug text-lg md:text-xl">
                    Integrated Preparatory Years — Computer, Industrial Engineering & Automation
                  </h4>
                  <div className="mt-1 text-[var(--muted)] uppercase tracking-wide text-sm">
                    ÉCOLE MAROCAINE DES SCIENCES DE L’INGÉNIEUR (EMSI)
                  </div>
                  <div className="meta mt-2">📍 Rabat</div>
                </div>
              </div>

                {/* 2020 — 2021 */}

                
                <div className="timeline-item">
                  <span className="timeline-dot" />
                  <div className="timeline-card">
                    <div className="mb-2 text-sm text-[var(--muted)]">2020 — 2021</div>
                    <h4 className="font-semibold leading-snug text-lg md:text-xl">
                      Baccalaureate — Physical Sciences (French Option)
                    </h4>
                    <div className="mt-1 text-[var(--muted)] uppercase tracking-wide text-sm">
                      INSTITUTION GAUSS
                    </div>
                    <div className="meta mt-2">📍 Kénitra</div>
                  </div>
                </div>
          </div>
      </section>
          </div>
</Section>





                                        {/* SKILLS */}


      <Section id="skills" title="Technical Skills" subtitle="Technologies and tools I work with">
                  <div className="skills-section">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {skills.map((s, i) => (
                        <article
                          key={s.title}
                          className="relative skill-card p-5 animate-skill"
                          style={{ animationDelay: `${i * 70}ms` }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="skill-icon">{s.icon}</div>
                            <h3 className="skill-title text-base md:text-lg">{s.title}</h3>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {s.tags.map((t) => (
                              <span key={t} className="skill-chip">{t}</span>
                            ))}
                          </div>
                        </article>
                      ))}
                      </div>

                        {/* 👉 Le bloc stats occupe toute la ligne */}

                        <div className="md:col-span-2 lg:col-span-3">
                          <SkillHighlights />
                        </div>
                  </div>
        </Section>





                                       {/* PROJECTS */}



                      <Section
                            id="projects"
                            title="Featured Projects"
                            subtitle="A selection of my most impactful and innovative work"
                          >
                            <ProjectGallery items={PROJECTS} />
                      </Section>






                                                  {/* EXPERIENCE */}
                        <Section
                              id="experience"
                              title="Professional Experience"
                              subtitle="A journey through impactful projects, collaborations, and professional growth"
                            >
                              <ExperienceTimeline items={experience} />
                        </Section>







                                            {/* CERTIFICATIONS */}
                          <Section
                                    id="certifications"
                                    title="Certifications & Training"
                                    subtitle="Professional certifications and courses"
                                  >
                                    <CertificatesGallery items={CERTS} />
                          </Section>




                                        {/* CONTACT */}





<Section id="contact" title="Get In Touch" subtitle="Let’s connect and collaborate on meaningful projects.">
  <div className="grid gap-8 lg:grid-cols-2">


    {/* ----- Colonne gauche : infos ----- */}


    <div className="space-y-6">

              <h3
                    suppressHydrationWarning className="mb-3 flex items-center justify-start gap-3
                              text-2xl md:text-3xl font-bold tracking-tight"
                  >
                    <span className="text-3xl md:text-4xl leading-none" aria-hidden>🔗</span>
                    <span suppressHydrationWarning className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)]
                                    bg-clip-text text-transparent">
                      Let’s Connect
                    </span>
              </h3>

      <p className="text-[var(--muted)] max-w-[60ch]">
        I’m always open to new collaborations and meaningful conversations. 
        My passion lies in designing and developing innovative digital solutions at the intersection of software engineering and data.
      </p>

                    {/* Email */}
      <a
        href="mailto:anaskrir9@gmail.com?subject=Hello%20Anas&body=Hi%20Anas,%0D%0A%0D%0A"
        className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--panel)]/90 p-5 shadow-[0_18px_50px_-22px_rgba(0,0,0,.55)] transition hover:-translate-y-[1px] hover:border-[color-mix(in_srgb,var(--brand)_55%,var(--border))]"
        aria-label="Send me an email"
      >
        {/* icône */}


        <span className="grid size-11 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--brand)_22%,transparent)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.8" />
            <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </span>


        <div className="min-w-0">

              <div className="text-sm text-[var(--muted)]">Email</div>
              <div className="truncate font-medium underline decoration-transparent underline-offset-4 transition group-hover:decoration-[var(--brand)]">
                anaskrir9@gmail.com
              </div>
        </div>
      </a>

      {/* LinkedIn */}



      <a
        href="https://www.linkedin.com/in/krir-anas/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--panel)]/90 p-5 shadow-[0_18px_50px_-22px_rgba(0,0,0,.55)] transition hover:-translate-y-[1px] hover:border-[color-mix(in_srgb,var(--brand)_55%,var(--border))]"
        aria-label="Open my LinkedIn profile in a new tab"
      >
        <span className="grid size-11 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--brand)_22%,transparent)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="7" cy="7" r="1.5" fill="currentColor" />
            <rect x="5.25" y="9.5" width="3.5" height="9.25" rx="0.7" stroke="currentColor" />
            <path d="M12 10.5h2.2a3.3 3.3 0 0 1 3.3 3.3V19h-3.5v-4.1c0-1-.6-1.7-1.6-1.7H12V10.5Z" stroke="currentColor"/>
          </svg>
        </span>


        <div className="min-w-0">
          <div className="text-sm text-[var(--muted)]">LinkedIn</div>
          <div className="truncate font-medium underline decoration-transparent underline-offset-4 transition hover:decoration-[var(--brand)]">
            Anas Krir
          </div>
        </div>

      </a>

      {/* Open for */}


      <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)]/90 p-5 shadow-[0_18px_50px_-22px_rgba(0,0,0,.55)]">
        <div className="text-sm text-[var(--muted)]">Currently Open For</div>
        <div className="mt-1 font-medium">
          Software Development • Data Engineering • Cloud &amp; DevOps Projects
        </div>
      </div>


    </div>

    {/* ----- Colonne droite : formulaire ----- */}


    <form
      action="https://formspree.io/f/movyqklj"  /* ← remplace par ton ID Formspree */
      method="POST"
      className="rounded-2xl border border-[var(--border)] bg-[var(--panel)]/95 p-6 shadow-[0_18px_50px_-22px_rgba(0,0,0,.55)]"
    >
      <h3
            suppressHydrationWarning className="mx-auto mb-3 flex items-center justify-center gap-3
                      text-3xl md:text-4xl font-extrabold tracking-tight text-center"
          >
            <span className="text-4xl md:text-5xl leading-none" aria-hidden>📨</span>
            <span suppressHydrationWarning className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)]
                            bg-clip-text text-transparent">
              Send a Message
            </span>
      </h3>

      {/* Meta + honeypot */}


      <input type="hidden" name="_subject" value="New message from portfolio" />
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <label className="mb-3 block">
        <span className="mb-2 block text-sm text-[var(--muted)]">Name</span>
        <input
          name="name"
          placeholder="Your name"
          required
          autoComplete="name"
          className="input w-full focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40"
        />
      </label>

      <label className="mb-3 block">
        <span className="mb-2 block text-sm text-[var(--muted)]">Email</span>
        <input
          name="email"
          type="email"
          placeholder="your.email@example.com"
          required
          autoComplete="email"
          className="input w-full focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40"
        />
      </label>

      <label className="mb-5 block">
        <span className="mb-2 block text-sm text-[var(--muted)]">Message</span>
        <textarea
          name="message"
          rows={7}
          placeholder="Your message..."
          required
          className="input w-full resize-y focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40"
        />
      </label>

      {/* CTA */}


      <button
         suppressHydrationWarning className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium text-[var(--heading)]
                   shadow-[0_18px_40px_-20px_rgba(0,0,0,.55)] transition hover:-translate-y-[1px]
                   bg-gradient-to-r from-[color-mix(in_srgb,var(--brand)_70%,#6ea8fe)]
                   to-[color-mix(in_srgb,var(--brand)_35%,#6ea8fe)] cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="m4 12 6 2 8-8-6 10-2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Send Message
      </button>

    </form>
  </div>
</Section>



<footer
                    aria-label="Site footer"
                    className="relative mt-20 border-t border-[color-mix(in_srgb,var(--border)_100%,transparent)]/60"
                  >


                    {/* Halo doux en haut du footer */}

              <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-[var(--brand-2)]/20 to-transparent" />

  <div className="container-l mx-auto px-4 py-10 text-center">

      {/* Nom / titre */}


          <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)] bg-clip-text text-transparent">
              Anas KRIR
            </span>
          </h4>

    {/* Tagline */}


    <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
      Passionate about Software Engineering, Data and Innovation — crafting intelligent, scalable digital solutions.
    </p>

    {/* Icônes sociales (tes boutons) */}


    <div className="mt-5 flex items-center justify-center gap-4">

      <a
        href="https://github.com/AnasKrir"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link nav-icon hover-mauve"
        aria-label="GitHub"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--heading)" }}>
          <path d="M12 .5A12 12 0 0 0 0 12.7a12 12 0 0 0 8.2 11.5c.6.1.8-.2.8-.5v-2c-3.3.8-4-1.6-4-1.6-.6-1.5-1.4-2-1.4-2-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.4-5.3-6.2 0-1.4.5-2.6 1.2-3.6-.1-.3-.5-1.7.1-3.6 0 0 1-.3 3.4 1.3a11.6 11.6 0 0 1 6.2 0c2.4-1.6 3.4-1.3 3.4-1.3.6 1.9.2 3.3.1 3.6.8 1 1.2 2.2 1.2 3.6 0 4.8-2.7 5.9-5.3 6.2.5.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A12 12 0 0 0 24 12.7 12 12 0 0 0 12 .5Z"/>
        </svg>
      </a>

      <a
        href="https://www.linkedin.com/in/krir-anas/"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link nav-icon hover-mauve"
        aria-label="LinkedIn"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--heading)" }}>
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1 1.84-2.05 3.8-2.05 4.06 0 4.8 2.67 4.8 6.13V23h-4v-6.7c0-1.6 0-3.7-2.25-3.7s-2.6 1.75-2.6 3.57V23h-4V8z"/>
        </svg>
      </a>

      <a
        href="mailto:anaskrir9@gmail.com"
        className="nav-link nav-icon hover-mauve"
        aria-label="Email"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--heading)" }}>
          <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.4l8 5.1 8-5.1V6H4Zm16 12V9.3l-8 5.1-8-5.1V18h16Z"/>
        </svg>
      </a>


    </div>

    {/* Divider */}


    <div className="mx-auto mt-6 h-px w-11/12 max-w-3xl bg-[var(--border)]/60" />

    {/* Copyright */}


    <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
      © {new Date().getFullYear()} <span className="font-medium" style={{ color: "var(--brand-2)" }}>Anas KRIR</span>. All rights reserved.
    </p>


  </div>
</footer>

          <ScrollTop />
    </main>
  );
}

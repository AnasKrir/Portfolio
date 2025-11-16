"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "mauve-dark" | "mauve-light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("mauve-dark");

  // Lire l'état au mount (mais le noFlash a déjà appliqué le bon thème côté <head>)
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme | null);
    const initial: Theme = saved ?? "mauve-dark"; // défaut dark
    setTheme(initial);
    apply(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apply = (t: Theme) => {
    setTheme(t);
    localStorage.setItem("theme", t);
    if (t === "mauve-light") {
      document.documentElement.setAttribute("data-theme", "mauve-light");
      document.documentElement.style.colorScheme = "light";
    } else {
      document.documentElement.removeAttribute("data-theme"); // dark = :root
      document.documentElement.style.colorScheme = "dark";
    }
  };

  const toggle = () => apply(theme === "mauve-dark" ? "mauve-light" : "mauve-dark");
  const isLight = theme === "mauve-light";

  return (
    <button
      onClick={toggle}
      className="toggle toggle--sm"
      data-mode={isLight ? "light" : "dark"}
      role="switch"
      aria-checked={isLight}
    >
      <span className="toggle-knob">
        <span className="toggle-icon">{isLight ? <Sun /> : <Moon />}</span>
      </span>
    </button>
  );
}

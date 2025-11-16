"use client";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 350);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`scroll-btn ${show ? "scroll-btn--visible" : ""}`}
      aria-label="Back to top"
    >
      <ArrowUp />
    </button>
  );
}

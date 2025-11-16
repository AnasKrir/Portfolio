import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Anas Krir — Portfolio",
  description: "Portfolio",
};

// Appliquer le thème AVANT l'hydratation pour éviter tout flash
const noFlash = `
(function () {
  try {
    var saved = localStorage.getItem('theme'); // 'mauve-light' | 'mauve-dark' | null
    // défaut = sombre
    var isLight = saved ? saved === 'mauve-light'
                        : false; // on ignore le système ici pour forcer dark par défaut
    if (isLight) {
      document.documentElement.setAttribute('data-theme','mauve-light');
      document.documentElement.style.colorScheme = 'light';
    } else {
      // sombre = pas d'attribut
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.style.colorScheme = 'dark';
    }
  } catch {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // AUCUN data-theme ici → on veut dark par défaut
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="color-scheme" content="dark light" />
        <Script id="theme-init" strategy="beforeInteractive">
          {noFlash}
        </Script>
      </head>
      <body
        className="antialiased"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -50%, var(--bg-grad-start) 0%, var(--bg-grad-stop) 60%), var(--bg)",
          color: "var(--text)",
        }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

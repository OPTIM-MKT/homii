import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

interface ThemeToggleProps {
  labelLight: string;
  labelDark: string;
}

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

export default function ThemeToggle({
  labelLight,
  labelDark,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const isDark = theme === "dark";
  const label = isDark ? labelLight : labelDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] transition-colors hover:bg-[var(--bg-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <span
        className="relative block h-5 w-5"
        style={{ opacity: mounted ? 1 : 0 }}
      >
        <FiSun
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
            isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`}
        />
        <FiMoon
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}

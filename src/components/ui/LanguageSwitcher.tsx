import { FiGlobe } from "react-icons/fi";

interface LanguageSwitcherProps {
  currentLocale: "es" | "en";
  esHref: string;
  enHref: string;
  label: string;
}

export default function LanguageSwitcher({
  currentLocale,
  esHref,
  enHref,
  label,
}: LanguageSwitcherProps) {
  const target = currentLocale === "es" ? enHref : esHref;
  const nextCode = currentLocale === "es" ? "EN" : "ES";

  return (
    <a
      href={target}
      aria-label={label}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 text-sm font-semibold text-[var(--fg)] transition-colors hover:bg-[var(--bg-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <FiGlobe className="h-4 w-4" aria-hidden />
      {nextCode}
    </a>
  );
}

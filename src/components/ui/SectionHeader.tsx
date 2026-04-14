import type { ReactNode } from "react";
import ScrollReveal from "./ScrollRevea";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  children,
}: SectionHeaderProps) {
  const alignCls =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <ScrollReveal>
      <div className={`flex flex-col ${alignCls} gap-4 max-w-3xl mx-auto`}>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 className="heading-lg">{title}</h2>
        {subtitle ? (
          <p className="text-lg text-muted leading-relaxed">{subtitle}</p>
        ) : null}
        {children}
      </div>
    </ScrollReveal>
  );
}

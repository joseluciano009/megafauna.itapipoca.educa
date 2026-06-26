import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { type ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative bg-deep text-deep-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,oklch(0.66_0.13_60/0.3),transparent_50%),radial-gradient(circle_at_80%_70%,oklch(0.52_0.05_150/0.3),transparent_50%)]" aria-hidden />
      <div className="container-page relative py-16 md:py-20">
        <nav className="flex items-center gap-1 text-xs text-deep-foreground/70 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-accent transition-colors">Início</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-accent">{eyebrow}</span>
        </nav>
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">{eyebrow}</span>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold text-deep-foreground leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-deep-foreground/80 leading-relaxed">{description}</p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}
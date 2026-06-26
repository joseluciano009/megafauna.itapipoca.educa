import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, MapPin, Calendar, Utensils, Ruler, Weight } from "lucide-react";
import { findAnimal, megafauna, type Animal } from "@/data/megafauna";
import { Reveal } from "@/components/reveal";
import { SEO } from "@/components/seo";

export default function AnimalDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const a: Animal | undefined = findAnimal(slug);
  if (!a) return <Navigate to="/megafauna" replace />;
  return (
    <article>
      <SEO
        title={`${a.nome} — Portal Megafauna Democrática`}
        description={a.resumo}
        image={a.imagem}
        path={`/megafauna/${a.slug}`}
      />
      <section className="relative bg-deep text-deep-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,oklch(0.66_0.13_60/0.3),transparent_50%)]" aria-hidden />
        <div className="container-page relative py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <nav className="flex items-center gap-1 text-xs text-deep-foreground/70 mb-5" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-accent">Início</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/megafauna" className="hover:text-accent">Megafauna</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-accent">{a.nome}</span>
            </nav>
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Espécie</span>
            <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold text-deep-foreground">{a.nome}</h1>
            <p className="mt-2 text-lg italic text-accent font-medium">{a.cientifico}</p>
            <p className="mt-6 text-deep-foreground/85 leading-relaxed">{a.descricao}</p>
            <Link to="/megafauna" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-deep-foreground/80 hover:text-accent transition-colors">
              <ArrowLeft className="h-4 w-4" /> Todas as espécies
            </Link>
          </div>
          <div className="rounded-3xl overflow-hidden bg-white/5 backdrop-blur border border-white/10 shadow-2xl">
            <img src={a.imagem} alt={a.nome} width={800} height={600} className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="container-page grid lg:grid-cols-3 gap-10">
          <Reveal className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold">Curiosidades</h2>
            <ul className="mt-6 space-y-4">
              {a.curiosidades.map((c, i) => (
                <li key={i} className="flex gap-4 rounded-xl bg-card border border-border p-5">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground font-bold text-sm">
                    {i + 1}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{c}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl md:text-3xl font-bold">Distribuição geográfica</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{a.distribuicao}</p>
          </Reveal>

          <Reveal delay={150}>
            <aside className="rounded-2xl bg-muted/50 border border-border p-6 lg:sticky lg:top-24">
              <h3 className="font-display font-bold text-lg mb-5">Ficha científica</h3>
              <dl className="space-y-4 text-sm">
                {[
                  { icon: Calendar, label: "Período", value: a.periodo },
                  { icon: MapPin, label: "Distribuição", value: a.distribuicao },
                  { icon: Utensils, label: "Alimentação", value: a.alimentacao },
                  { icon: Ruler, label: "Porte", value: a.altura },
                  { icon: Weight, label: "Peso estimado", value: a.peso },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                    <div className="min-w-0">
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
                      <dd className="font-medium text-foreground">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-muted/30">
        <div className="container-page">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Outras espécies</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {megafauna.filter((x) => x.slug !== a.slug).map((x) => (
              <Link key={x.slug} to={`/megafauna/${x.slug}`}
                className="group flex gap-4 items-center rounded-xl bg-card border border-border p-4 hover-lift">
                <img src={x.imagem} alt={x.nome} loading="lazy" width={80} height={80}
                  className="h-16 w-16 rounded-lg object-cover" />
                <div className="min-w-0">
                  <div className="font-semibold truncate">{x.nome}</div>
                  <div className="text-xs italic text-fossil">{x.cientifico}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
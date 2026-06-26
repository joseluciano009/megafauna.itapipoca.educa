import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { megafauna } from "@/data/megafauna";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SEO } from "@/components/seo";

export default function MegafaunaIndex() {
  return (
    <>
      <SEO
        title="Megafauna — Portal Megafauna Democrática"
        description="Espécies da megafauna pleistocênica registradas em Itapipoca, Ceará."
        path="/megafauna"
      />
      <PageHero
        eyebrow="Megafauna"
        title="Os gigantes do Pleistoceno cearense"
        description="Conheça os mamíferos que percorreram o sertão nordestino antes da última grande extinção. Cada espécie possui uma ficha científica completa."
      />
      <section className="section-pad bg-background">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {megafauna.map((a, i) => (
            <Reveal key={a.slug} delay={i * 100}>
              <Link
                to={`/megafauna/${a.slug}`}
                className="group grid md:grid-cols-[200px_1fr] gap-5 rounded-2xl bg-card border border-border overflow-hidden hover-lift p-4"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                  <img src={a.imagem} alt={a.nome} loading="lazy" width={400} height={400}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display font-bold text-xl">{a.nome}</h2>
                  <p className="text-xs italic text-fossil font-medium mt-0.5">{a.cientifico}</p>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-4">{a.resumo}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Saiba mais <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
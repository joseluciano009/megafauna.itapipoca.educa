import { useState } from "react";
import { Image as ImageIcon, Box, Camera, Layers, Sparkles, X } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { megafauna } from "@/data/megafauna";
import heroImg from "@/assets/hero-megafauna.jpg";
import { SEO } from "@/components/seo";

const CATEGORIES = ["Todos", "Fósseis", "Escavações", "Tanques", "Acervo"] as const;

const ITEMS = [
  ...megafauna.map((a) => ({ src: a.imagem, title: a.nome, cat: "Fósseis" as const, desc: a.cientifico })),
  { src: heroImg, title: "Tanque fossilífero #07", cat: "Tanques" as const, desc: "Sítio de escavação ativo em Itapipoca" },
  { src: heroImg, title: "Escavação 2023", cat: "Escavações" as const, desc: "Equipe de pesquisadores em campo" },
  { src: heroImg, title: "Acervo digital", cat: "Acervo" as const, desc: "Coleção digitalizada de peças" },
  { src: heroImg, title: "Reconstrução paleoambiental", cat: "Acervo" as const, desc: "Cenário pleistocênico de Itapipoca" },
];

export default function Museu() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Todos");
  const [zoom, setZoom] = useState<typeof ITEMS[number] | null>(null);
  const filtered = cat === "Todos" ? ITEMS : ITEMS.filter((i) => i.cat === cat);

  return (
    <>
      <SEO
        title="Museu Virtual — Portal Megafauna Democrática"
        description="Galeria digital de fósseis, escavações e tanques fossilíferos de Itapipoca."
        path="/museu"
      />
      <PageHero
        eyebrow="Museu Virtual"
        title="Galeria digital do patrimônio paleontológico"
        description="Explore fósseis, registros de escavação e os famosos tanques fossilíferos de Itapipoca. Em breve: modelos 3D, tour virtual e realidade aumentada."
      />

      <section className="section-pad bg-background">
        <div className="container-page">
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground hover:border-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <Reveal key={item.title + i} delay={i * 60}>
                <button
                  onClick={() => setZoom(item)}
                  className="group relative w-full text-left rounded-2xl overflow-hidden bg-card border border-border hover-lift"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={item.src} alt={item.title} loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 inset-x-0 p-4 text-deep-foreground translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                    <div className="text-xs text-accent uppercase tracking-wider">{item.cat}</div>
                    <div className="font-display font-bold">{item.title}</div>
                    <div className="text-xs text-deep-foreground/80 italic">{item.desc}</div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {/* Future features */}
          <div className="mt-16 grid md:grid-cols-3 gap-5">
            {[
              { icon: Box, title: "Modelos 3D", desc: "Visualização interativa de fósseis digitalizados em alta resolução." },
              { icon: Camera, title: "Tour Virtual", desc: "Percorra os tanques fossilíferos sem sair de casa." },
              { icon: Sparkles, title: "Realidade Aumentada", desc: "Coloque um glyptodonte na sua sala de aula." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border-2 border-dashed border-border p-6 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/20 text-accent">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-fossil font-semibold">Em breve</span>
                </div>
                <h3 className="mt-4 font-display font-bold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {zoom && (
        <div
          className="fixed inset-0 z-[60] bg-deep/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setZoom(null)}
        >
          <button
            className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-deep-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={zoom.src} alt={zoom.title} className="w-full h-auto rounded-2xl shadow-2xl" />
            <div className="mt-4 text-deep-foreground">
              <div className="text-xs text-accent uppercase tracking-wider">{zoom.cat}</div>
              <div className="font-display font-bold text-xl">{zoom.title}</div>
              <div className="text-sm text-deep-foreground/80 italic">{zoom.desc}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
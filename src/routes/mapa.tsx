import { useState } from "react";
import { MapPin, Layers } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SEO } from "@/components/seo";

type Ponto = { id: number; nome: string; tipo: string; x: number; y: number; desc: string };

const PONTOS: Ponto[] = [
  { id: 1, nome: "Tanque do Cariri", tipo: "Tanque fossilífero", x: 28, y: 35, desc: "Sítio com forte concentração de fósseis de preguiça-gigante." },
  { id: 2, nome: "Sítio Cacimba Nova", tipo: "Local de descoberta", x: 55, y: 50, desc: "Local onde foram encontrados restos de mastodonte em 2019." },
  { id: 3, nome: "Tanque do Riacho Seco", tipo: "Tanque fossilífero", x: 70, y: 30, desc: "Ostefólitos de gliptodonte em ótimo estado de preservação." },
  { id: 4, nome: "Área de Pesquisa Sul", tipo: "Área de pesquisa", x: 45, y: 70, desc: "Zona ativa de escavação com equipe multidisciplinar." },
  { id: 5, nome: "Tanque Central", tipo: "Tanque fossilífero", x: 50, y: 45, desc: "Referência paleontológica do município." },
];

export default function Mapa() {
  const [sel, setSel] = useState<Ponto | null>(PONTOS[0]);

  return (
    <>
      <SEO
        title="Mapa Interativo — Portal Megafauna Democrática"
        description="Localização dos tanques fossilíferos e áreas de pesquisa em Itapipoca."
        path="/mapa"
      />
      <PageHero
        eyebrow="Mapa Interativo"
        title="Tanques fossilíferos de Itapipoca"
        description="Explore os principais locais de descoberta e áreas de pesquisa paleontológica da região."
      />
      <section className="section-pad bg-background">
        <div className="container-page grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-fossil/30 via-muted to-amber/20 shadow-lg">
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <path d="M10,80 Q25,40 45,55 T80,30 L95,70 L90,95 L15,95 Z" fill="oklch(0.52 0.05 150)" />
              <path d="M5,30 Q20,20 35,35 T70,20 L85,40" stroke="oklch(0.39 0.055 220)" strokeWidth="0.5" fill="none" />
            </svg>
            <div className="absolute top-4 left-4 px-3 py-2 rounded-lg bg-background/90 backdrop-blur text-xs font-semibold flex items-center gap-2 shadow">
              <Layers className="h-3.5 w-3.5 text-accent" />
              Itapipoca, Ceará
            </div>

            {PONTOS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSel(p)}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                aria-label={p.nome}
              >
                <span className={`absolute inset-0 -m-2 rounded-full ${sel?.id === p.id ? "bg-accent/40 animate-ping" : ""}`} />
                <span className={`relative grid h-9 w-9 place-items-center rounded-full shadow-lg transition-all group-hover:scale-110 ${sel?.id === p.id ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
                  <MapPin className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>

          <aside className="space-y-4">
            {sel && (
              <div className="rounded-2xl bg-card border border-border p-6 animate-fade-up">
                <span className="text-xs uppercase tracking-wider text-accent font-semibold">{sel.tipo}</span>
                <h3 className="mt-2 font-display font-bold text-xl">{sel.nome}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{sel.desc}</p>
              </div>
            )}
            <div className="rounded-2xl bg-muted/50 border border-border p-6">
              <h4 className="font-display font-bold text-sm mb-3">Locais cadastrados</h4>
              <ul className="space-y-2">
                {PONTOS.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => setSel(p)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${sel?.id === p.id ? "bg-primary text-primary-foreground" : "hover:bg-card"}`}
                    >
                      {p.nome}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
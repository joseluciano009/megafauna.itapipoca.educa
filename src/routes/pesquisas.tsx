import { useMemo, useState } from "react";
import { Search, Calendar, User, Tag, Heart } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SEO } from "@/components/seo";

const PESQUISAS = [
  { id: 1, titulo: "Eremotherium laurillardi nos tanques de Itapipoca: paleobiogeografia e taxonomia", autor: "Dra. Ana Beatriz Souza", data: "2024", tags: ["preguiça-gigante", "taxonomia"], resumo: "Análise comparativa de fragmentos cranianos coletados em 12 tanques fossilíferos da região de Itapipoca." },
  { id: 2, titulo: "Mastodontes do Nordeste: novos registros de Notiomastodon platensis", autor: "Dr. Marcos Lima", data: "2023", tags: ["mastodonte", "pleistoceno"], resumo: "Revisão de espécimes recuperados entre 2018 e 2022 no semiárido cearense." },
  { id: 3, titulo: "Gliptodontes brasileiros: uma síntese sobre Glyptotherium", autor: "Dra. Camila Rocha", data: "2023", tags: ["glyptodonte", "morfologia"], resumo: "Estudo morfológico de osteodermos coletados em tanques do interior do Ceará." },
  { id: 4, titulo: "Convivência humana com a megafauna no semiárido", autor: "Dr. João Vieira", data: "2022", tags: ["paleoíndios", "extinção"], resumo: "Evidências arqueológicas da coexistência entre humanos e megafauna no Nordeste." },
  { id: 5, titulo: "Paleoambientes do Pleistoceno cearense", autor: "Dra. Helena Cardoso", data: "2022", tags: ["paleoambiente", "clima"], resumo: "Reconstrução paleoclimática a partir de assembleias fossilíferas." },
  { id: 6, titulo: "Tanques fossilíferos: formação e preservação", autor: "Dr. Rafael Mendes", data: "2021", tags: ["geologia", "tanques"], resumo: "Processos sedimentares responsáveis pela formação dos depósitos." },
];

export default function Pesquisas() {
  const [q, setQ] = useState("");
  const [year, setYear] = useState("Todos");
  const [favs, setFavs] = useState<Set<number>>(new Set());

  const years = ["Todos", ...Array.from(new Set(PESQUISAS.map((p) => p.data))).sort().reverse()];

  const filtered = useMemo(() => {
    const ql = q.toLowerCase().trim();
    return PESQUISAS.filter((p) =>
      (year === "Todos" || p.data === year) &&
      (!ql || p.titulo.toLowerCase().includes(ql) || p.autor.toLowerCase().includes(ql) || p.tags.some((t) => t.includes(ql)))
    );
  }, [q, year]);

  const toggleFav = (id: number) => {
    setFavs((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      try { localStorage.setItem("favPesquisas", JSON.stringify([...n])); } catch {}
      return n;
    });
  };

  return (
    <>
      <SEO
        title="Pesquisas — Portal Megafauna Democrática"
        description="Biblioteca científica de pesquisas sobre a megafauna de Itapipoca."
        path="/pesquisas"
      />
      <PageHero
        eyebrow="Pesquisas"
        title="Biblioteca científica"
        description="Trabalhos publicados sobre a megafauna pleistocênica de Itapipoca e do semiárido brasileiro."
      />

      <section className="section-pad bg-background">
        <div className="container-page">
          <div className="grid sm:grid-cols-[1fr_auto] gap-3 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por título, autor ou palavra-chave..."
                className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <article className="group rounded-2xl bg-card border border-border p-6 hover-lift relative">
                  <button
                    onClick={() => toggleFav(p.id)}
                    aria-label="Favoritar"
                    className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full hover:bg-muted transition-colors"
                  >
                    <Heart className={`h-4 w-4 ${favs.has(p.id) ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                  </button>
                  <h3 className="font-display font-bold text-lg pr-10 leading-snug">{p.titulo}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-accent" />{p.autor}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-accent" />{p.data}</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.resumo}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-fossil">
                        <Tag className="h-3 w-3" />{t}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center py-12 text-muted-foreground">Nenhuma pesquisa encontrada.</p>
          )}

          <div className="mt-10 flex items-center justify-center gap-2">
            <button className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted">Anterior</button>
            <span className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold">1</span>
            <button className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted">2</button>
            <button className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted">Próxima</button>
          </div>
        </div>
      </section>
    </>
  );
}
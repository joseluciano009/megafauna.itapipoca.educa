import { useState } from "react";
import { Search, Download, FileText, BookOpen, GraduationCap, Library } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SEO } from "@/components/seo";

const CATS = [
  { key: "Artigos", icon: FileText },
  { key: "Livros", icon: BookOpen },
  { key: "Teses", icon: GraduationCap },
  { key: "Educativos", icon: Library },
] as const;

const DOCS = [
  { tipo: "Artigos", titulo: "A megafauna pleistocênica do Nordeste brasileiro", autor: "Souza et al., 2024", pgs: 28 },
  { tipo: "Livros", titulo: "Paleontologia do Ceará — uma introdução", autor: "Lima, M., 2023", pgs: 312 },
  { tipo: "Teses", titulo: "Taxonomia de gliptodontes do semiárido", autor: "Rocha, C., 2022", pgs: 184 },
  { tipo: "Educativos", titulo: "Guia do professor: ensinando a megafauna", autor: "Equipe PMD, 2024", pgs: 42 },
  { tipo: "Artigos", titulo: "Coexistência humana e megafauna", autor: "Vieira, J., 2023", pgs: 22 },
  { tipo: "Teses", titulo: "Paleoclimas do Pleistoceno cearense", autor: "Cardoso, H., 2021", pgs: 220 },
  { tipo: "Educativos", titulo: "Caderno de atividades — Ensino Fundamental", autor: "Equipe PMD, 2024", pgs: 36 },
  { tipo: "Livros", titulo: "Tanques fossilíferos: uma janela ao passado", autor: "Mendes, R., 2022", pgs: 256 },
];

export default function Biblioteca() {
  const [cat, setCat] = useState<string>("Todos");
  const [q, setQ] = useState("");
  const filtered = DOCS.filter((d) =>
    (cat === "Todos" || d.tipo === cat) &&
    (!q || d.titulo.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <SEO
        title="Biblioteca Digital — Portal Megafauna Democrática"
        description="Artigos, livros, teses, dissertações e materiais educativos."
        path="/biblioteca"
      />
      <PageHero
        eyebrow="Biblioteca Digital"
        title="Conhecimento acessível e aberto"
        description="Reunimos artigos científicos, livros, teses, dissertações e materiais educativos para download e leitura."
      />
      <section className="section-pad bg-background">
        <div className="container-page">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Busca inteligente..."
              className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setCat("Todos")}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${cat === "Todos" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"}`}
            >Todos</button>
            {CATS.map((c) => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${cat === c.key ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"}`}
              >
                <c.icon className="h-3.5 w-3.5" />{c.key}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d, i) => (
              <Reveal key={d.titulo} delay={i * 60}>
                <article className="rounded-2xl bg-card border border-border p-5 hover-lift flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-accent font-semibold">{d.tipo}</span>
                    <span className="text-xs text-muted-foreground">{d.pgs} pg</span>
                  </div>
                  <h3 className="mt-3 font-display font-bold text-base leading-snug flex-1">{d.titulo}</h3>
                  <p className="mt-2 text-xs text-muted-foreground italic">{d.autor}</p>
                  <button className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors">
                    <Download className="h-4 w-4" /> Baixar PDF
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
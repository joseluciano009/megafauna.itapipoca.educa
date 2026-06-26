import { Mail, BookOpen, Building2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SEO } from "@/components/seo";

const PESSOAS = [
  { nome: "Dra. Ana Beatriz Souza", area: "Paleontologia de Mamíferos", inst: "UFC — Universidade Federal do Ceará", pubs: 24, iniciais: "AB" },
  { nome: "Dr. Marcos Lima", area: "Estratigrafia e Tafonomia", inst: "UECE", pubs: 18, iniciais: "ML" },
  { nome: "Dra. Camila Rocha", area: "Morfologia Funcional", inst: "USP", pubs: 31, iniciais: "CR" },
  { nome: "Dr. João Vieira", area: "Arqueologia Pré-Histórica", inst: "UFPE", pubs: 22, iniciais: "JV" },
  { nome: "Dra. Helena Cardoso", area: "Paleoclimatologia", inst: "UNICAMP", pubs: 27, iniciais: "HC" },
  { nome: "Dr. Rafael Mendes", area: "Geologia Sedimentar", inst: "UFRN", pubs: 15, iniciais: "RM" },
];

export default function Pesquisadores() {
  return (
    <>
      <SEO
        title="Pesquisadores — Portal Megafauna Democrática"
        description="Equipe de cientistas dedicada ao estudo da megafauna do Ceará."
        path="/pesquisadores"
      />
      <PageHero
        eyebrow="Pesquisadores"
        title="Quem está por trás da ciência"
        description="Cientistas e pesquisadores que se dedicam ao estudo, preservação e divulgação da megafauna do Ceará."
      />
      <section className="section-pad bg-background">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PESSOAS.map((p, i) => (
            <Reveal key={p.nome} delay={i * 80}>
              <article className="rounded-2xl bg-card border border-border p-6 hover-lift text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-primary to-fossil grid place-items-center text-primary-foreground font-display font-bold text-2xl">
                  {p.iniciais}
                </div>
                <h3 className="mt-5 font-display font-bold text-lg">{p.nome}</h3>
                <p className="mt-1 text-sm text-accent font-medium">{p.area}</p>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground text-left">
                  <div className="flex items-start gap-2"><Building2 className="h-4 w-4 mt-0.5 shrink-0 text-fossil" /><span>{p.inst}</span></div>
                  <div className="flex items-start gap-2"><BookOpen className="h-4 w-4 mt-0.5 shrink-0 text-fossil" /><span>{p.pubs} publicações</span></div>
                </div>
                <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                  <Mail className="h-4 w-4" /> Ver perfil completo
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
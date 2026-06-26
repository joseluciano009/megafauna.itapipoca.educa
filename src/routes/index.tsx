import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Microscope,
  BookOpen,
  Map as MapIcon,
  Users,
  Layers,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-megafauna.jpg";
import { Reveal } from "@/components/reveal";
import { megafauna } from "@/data/megafauna";
import { SEO } from "@/components/seo";

function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const y = window.scrollY;
      ref.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.08)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const duration = 1600;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString("pt-BR")}{suffix}</span>;
}

export default function Index() {
  const parallax = useParallax();

  return (
    <div>
      <SEO
        title="Portal Megafauna Democrática — Itapipoca, Ceará"
        description="Conhecer o passado para preservar a história e construir o futuro. Museu virtual, pesquisas e biblioteca digital da megafauna de Itapipoca."
        path="/"
      />
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[600px] -mt-16 overflow-hidden flex items-center">
        <div
          ref={parallax}
          className="absolute inset-0 will-change-transform"
          aria-hidden
        >
          <img
            src={heroImg}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/60 to-deep/90" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.14_0.03_245/0.6)_100%)]" aria-hidden />

        <div className="container-page relative z-10 text-deep-foreground">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent border border-white/15">
              <Sparkles className="h-3.5 w-3.5" />
              Itapipoca · Ceará · Brasil
            </span>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-deep-foreground leading-[1.05]">
              Megafauna Itapipoca <span className="text-accent"> Para Todos</span> 
            </h1>
            <p className="mt-6 text-lg md:text-xl text-deep-foreground/85 max-w-2xl leading-relaxed">
              Conhecer o passado para preservar a história e construir o futuro.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/megafauna"
                className="group inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-6 py-3.5 font-semibold shadow-lg hover:scale-[1.03] transition-transform"
              >
                Explorar Portal
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/museu"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 backdrop-blur text-deep-foreground px-6 py-3.5 font-semibold hover:bg-white/15 transition-colors"
              >
                Visitar Museu Virtual
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-deep-foreground/70 text-xs uppercase tracking-widest animate-pulse">
          Role para descobrir ↓
        </div>
      </section>

      {/* SOBRE */}
      <section className="section-pad bg-background">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Sobre o projeto</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Patrimônio paleontológico ao alcance de todos
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              O Portal Megafauna Democrática tem como objetivo divulgar o patrimônio paleontológico de
              Itapipoca, promovendo educação científica, preservação da memória natural e acesso
              democrático ao conhecimento.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Reunimos pesquisas, modelos digitais, fotografias e materiais educativos sobre os
              tanques fossilíferos da região — verdadeiros arquivos naturais da fauna pleistocênica
              brasileira.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/pesquisas" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                Ver pesquisas <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: 1247, label: "Fósseis catalogados", icon: Layers },
                { n: 86, label: "Pesquisas publicadas", icon: BookOpen },
                { n: 42, label: "Pesquisadores cadastrados", icon: Users },
                { n: 19, label: "Tanques mapeados", icon: MapIcon },
              ].map(({ n, label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-card border border-border p-5 hover-lift"
                >
                  <Icon className="h-6 w-6 text-accent" />
                  <div className="mt-4 text-3xl md:text-4xl font-bold text-deep font-display">
                    <Counter to={n} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MEGAFAUNA */}
      <section className="section-pad bg-muted/40">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Conheça os gigantes</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">A Megafauna de Itapipoca</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Espécies pleistocênicas registradas nos tanques fossilíferos da região, hoje
              referência mundial em paleontologia neotropical.
            </p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {megafauna.map((a, i) => (
              <Reveal key={a.slug} delay={i * 100}>
                <Link
                  to={`/megafauna/${a.slug}`}
                  className="group block rounded-2xl bg-card border border-border overflow-hidden hover-lift h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={a.imagem}
                      alt={a.nome}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg">{a.nome}</h3>
                    <p className="mt-1 text-xs italic text-fossil font-medium">{a.cientifico}</p>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{a.resumo}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Saiba mais <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section className="section-pad bg-background">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Explore o portal</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Ciência, educação e memória</h2>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Microscope, title: "Museu Virtual", desc: "Galeria moderna de fósseis, escavações e tanques fossilíferos — com espaço reservado para modelos 3D e tour virtual.", to: "/museu" },
              { icon: BookOpen, title: "Biblioteca Digital", desc: "Artigos, livros, teses, dissertações e materiais educativos para download e leitura.", to: "/biblioteca" },
              { icon: Users, title: "Pesquisadores", desc: "Perfis de cientistas e pesquisadores que estudam a paleontologia do Ceará.", to: "/pesquisadores" },
              { icon: MapIcon, title: "Mapa Interativo", desc: "Localização dos tanques fossilíferos e áreas de pesquisa em Itapipoca.", to: "/mapa" },
              { icon: GraduationCap, title: "Educação Científica", desc: "Conteúdos para estudantes e professores levarem a ciência para a sala de aula.", to: "/biblioteca" },
              { icon: Layers, title: "Acervo Aberto", desc: "Pesquisas e dados acessíveis à comunidade — ciência aberta e democrática.", to: "/pesquisas" },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <Link
                  to={f.to}
                  className="block h-full rounded-2xl bg-card border border-border p-6 hover-lift"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display font-bold text-xl">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-deep text-deep-foreground p-10 md:p-16">
              <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden />
              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-fossil/30 blur-3xl" aria-hidden />
              <div className="relative max-w-2xl">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-deep-foreground">
                  Faça parte da divulgação científica
                </h2>
                <p className="mt-4 text-deep-foreground/80 leading-relaxed">
                  Pesquisadores, professores, estudantes e curiosos — todos têm um papel na
                  preservação do nosso patrimônio paleontológico.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/contato" className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-6 py-3.5 font-semibold hover:scale-[1.03] transition-transform">
                    Entrar em contato <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/biblioteca" className="inline-flex items-center gap-2 rounded-md border border-white/25 px-6 py-3.5 font-semibold hover:bg-white/10 transition-colors">
                    Acessar biblioteca
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

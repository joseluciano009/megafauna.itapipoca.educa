import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SEO } from "@/components/seo";

const schema = z.object({
  nome: z.string().trim().min(2, "Nome muito curto").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  assunto: z.string().trim().min(3, "Informe o assunto").max(150),
  mensagem: z.string().trim().min(10, "Mensagem muito curta").max(1000),
});

export default function Contato() {
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    setForm({ nome: "", email: "", assunto: "", mensagem: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const Input = ({ name, label, type = "text" }: { name: keyof typeof form; label: string; type?: string }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        id={name}
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className={`w-full rounded-lg border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors[name] ? "border-destructive" : "border-border"}`}
      />
      {errors[name] && <p className="text-xs text-destructive mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <SEO
        title="Contato — Portal Megafauna Democrática"
        description="Entre em contato com a equipe do Portal Megafauna Democrática."
        path="/contato"
      />
      <PageHero
        eyebrow="Contato"
        title="Fale com a equipe"
        description="Sugestões, parcerias, dúvidas educacionais ou colaborações científicas — estamos abertos ao diálogo."
      />
      <section className="section-pad bg-background">
        <div className="container-page grid lg:grid-cols-[1fr_360px] gap-10">
          <form onSubmit={submit} className="space-y-5 rounded-2xl bg-card border border-border p-6 md:p-8" noValidate>
            <Input name="nome" label="Nome completo" />
            <Input name="email" label="E-mail" type="email" />
            <Input name="assunto" label="Assunto" />
            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium mb-1.5">Mensagem</label>
              <textarea
                id="mensagem"
                rows={6}
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                className={`w-full rounded-lg border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none ${errors.mensagem ? "border-destructive" : "border-border"}`}
              />
              {errors.mensagem && <p className="text-xs text-destructive mt-1">{errors.mensagem}</p>}
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-6 py-3.5 font-semibold hover:scale-[1.02] transition-transform"
            >
              <Send className="h-4 w-4" /> Enviar Mensagem
            </button>
            {sent && (
              <div className="flex items-center gap-2 rounded-lg bg-fossil/15 text-fossil border border-fossil/30 px-4 py-3 text-sm animate-fade-in">
                <CheckCircle2 className="h-5 w-5" />
                Mensagem enviada com sucesso! Em breve retornaremos.
              </div>
            )}
          </form>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-deep text-deep-foreground p-6">
              <h3 className="font-display font-bold text-lg mb-5">Informações</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3"><MapPin className="h-5 w-5 text-accent shrink-0" /><span>Itapipoca, Ceará — Brasil</span></li>
                <li className="flex gap-3"><Mail className="h-5 w-5 text-accent shrink-0" /><span>contato@megafaunademocratica.org</span></li>
                <li className="flex gap-3"><Phone className="h-5 w-5 text-accent shrink-0" /><span>+55 (85) 0000-0000</span></li>
              </ul>
            </div>
            <div className="rounded-2xl bg-muted/50 border border-border p-6">
              <h4 className="font-display font-bold text-sm mb-2">Horário de atendimento</h4>
              <p className="text-sm text-muted-foreground">Segunda a sexta, das 8h às 17h.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
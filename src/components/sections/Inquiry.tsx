import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { styles } from "@/lib/content";

const faqs = [
  { question: "¿Cómo preparo mi idea?", answer: "Podés reunir referencias, elegir una zona del cuerpo y pensar un tamaño aproximado. No hace falta tener un dibujo terminado." },
  { question: "¿Cómo se define el presupuesto?", answer: "Depende del diseño, el tamaño, la zona y el detalle de la pieza. Incluí esos datos en tu consulta para conversar sobre un presupuesto personalizado." },
  { question: "¿Puedo consultar por un cover up?", answer: "Sí, podés preparar una consulta indicando que querés cubrir una pieza. La viabilidad requiere evaluar el tatuaje existente con el artista." },
  { question: "¿Qué pasa después de la sesión?", answer: "Consultá con el artista las indicaciones específicas para tu piel y tu pieza. Si aparecen síntomas que te preocupan, buscá atención médica." },
];

export function Inquiry() {
  const [style, setStyle] = useState("blackwork");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setMessage(`Hola Maxsy, soy ${data.get("nombre")}. Quiero consultar por un tatuaje ${styles.find(s => s.slug === style)?.nombre}.\nZona: ${data.get("zona")}. Tamaño aproximado: ${data.get("tamano")} cm.\nMi idea: ${data.get("idea")}`);
    setCopied(false);
    setCopyError(false);
  }

  return <>
    <section id="consulta" className="border-t border-border px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">05 — Tu próxima pieza</p>
          <h2 className="mt-4 text-5xl leading-tight md:text-6xl">Una idea.<br /><em className="text-primary">Tu historia.</em></h2>
          <p className="mt-6 max-w-sm text-muted-foreground">Contame qué te gustaría llevar en la piel.</p>
          <ArrowUpRight className="mt-10 size-16 text-accent" strokeWidth={1} />
        </div>
        <form onSubmit={prepare} onChange={() => { setMessage(""); setCopied(false); }} className="min-w-0 space-y-6">
          <fieldset><legend className="mb-3 text-sm">Estilo</legend><div className="flex flex-wrap gap-2">{styles.map(s => <Button key={s.slug} type="button" variant={style === s.slug ? "default" : "outline"} aria-pressed={style === s.slug} onClick={() => { setStyle(s.slug); setMessage(""); }} className="rounded-sm">{s.nombre}</Button>)}</div></fieldset>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm"><span>Tu nombre</span><input name="nombre" required maxLength={80} className="h-12 w-full rounded-sm border border-input bg-card px-3" autoComplete="given-name" placeholder="Nombre" /></label>
            <label className="space-y-2 text-sm"><span>Zona del cuerpo</span><select name="zona" className="h-12 w-full rounded-sm border border-input bg-card px-3"><option>Brazo</option><option>Antebrazo</option><option>Pierna</option><option>Espalda</option><option>Costillas</option><option>Otra zona</option></select></label>
          </div>
          <label className="block space-y-2 text-sm"><span>Tamaño aproximado (cm)</span><input name="tamano" type="number" required min="1" max="200" defaultValue="15" className="h-12 w-full rounded-sm border border-input bg-card px-3" /></label>
          <label className="block space-y-2 text-sm"><span>Tu idea</span><textarea name="idea" required maxLength={2000} rows={4} placeholder="El motivo, las referencias, lo que significa para vos…" className="w-full rounded-sm border border-input bg-card p-3" /></label>
          <Button type="submit" size="lg" className="h-12 rounded-sm">Preparar consulta <ArrowUpRight /></Button>
          {message && <div aria-live="polite" className="border-l-2 border-accent pl-5">
            <h3 className="text-2xl">Tu consulta</h3><p className="my-4 whitespace-pre-line break-words text-sm leading-relaxed text-muted-foreground">{message}</p>
            <div className="flex flex-wrap gap-3"><Button type="button" variant="outline" onClick={async () => { try { await navigator.clipboard.writeText(message); setCopied(true); setCopyError(false); } catch { setCopyError(true); } }}>{copied ? <Check /> : <Copy />}{copied ? "Copiado" : "Copiar"}</Button><Button asChild><a href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer"><Send /> Compartir por WhatsApp</a></Button></div>
            {copyError && <p role="alert" className="mt-3 text-sm text-accent">No se pudo copiar. Seleccioná el texto de tu consulta para copiarlo.</p>}
          </div>}
        </form>
      </div>
    </section>
    <section id="preguntas" className="border-t border-border bg-card px-6 py-24 md:px-12"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2"><div><p className="eyebrow">06 — Preguntas</p><h2 className="mt-4 text-5xl">Antes de<br /><em className="text-accent">la tinta.</em></h2></div><Accordion type="single" collapsible>{faqs.map((faq, index) => <AccordionItem key={faq.question} value={String(index)}><AccordionTrigger className="py-6 text-base">{faq.question}</AccordionTrigger><AccordionContent className="max-w-lg leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
  </>;
}
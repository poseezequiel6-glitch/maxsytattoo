import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import hero from "@/assets/hero.jpg";
import studio from "@/assets/studio.jpg";
import artist from "@/assets/artist.jpg";
import { Gallery } from "@/components/sections/Gallery";
import { studioInfo } from "@/lib/content";
import { useState } from "react";
import { Menu, X, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Inquiry } from "@/components/sections/Inquiry";

const TITLE = "MAXSY TATTOO — Estudio de tatuajes en Formosa";
const DESC = "Estudio de tatuajes unipersonal en Formosa, Argentina. Blackwork, realismo, tradicional y fine line. Diseños únicos dibujados a mano.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TattooParlor",
          name: "MAXSY TATTOO",
          address: { "@type": "PostalAddress", addressLocality: "Formosa", addressRegion: "Formosa", addressCountry: "AR" },
        }),
      },
    ],
  }),
  component: Index,
});

const ease = [0.2, 0.7, 0.2, 1] as const;

function Index() {
  return (
    <main className="grain min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Gallery />
      <Process />
      <Studio />
      <Inquiry />
      <Contact />
    </main>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [{ href: "#sobre", label: "Sobre" }, { href: "#trabajos", label: "Trabajos" }, { href: "#proceso", label: "Proceso" }, { href: "#preguntas", label: "Preguntas" }, { href: "#consulta", label: "Turnos" }];
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-wrap items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur-md md:px-12">
      <a href="#top" className="font-display text-xl tracking-tight">MAXSY<span className="text-accent">.</span></a>
      <nav aria-label="Principal" className="hidden gap-8 text-xs uppercase tracking-[0.25em] md:flex">
        {links.map(link => <a key={link.href} href={link.href} className="hover:text-primary">{link.label}</a>)}
      </nav>
      <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      {open && <nav id="mobile-nav" aria-label="Navegación móvil" className="flex w-full flex-col gap-4 border-t border-border py-5 md:hidden">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-lg hover:text-primary">{link.label}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  const r = useReducedMotion();
  const a = (d: number, y = 40) => ({
    initial: r ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay: d, ease },
  });
  return (
    <section id="top" className="relative grid min-h-[min(760px,90svh)] grid-cols-1 overflow-hidden md:grid-cols-12">
      <div className="relative z-10 flex flex-col justify-end px-6 pb-14 pt-32 md:col-span-8 md:px-12 md:pb-20">
        <motion.p {...a(0.1, 10)} className="eyebrow">Formosa · Argentina · Est. 2016</motion.p>
        <h1 className="mt-6 text-7xl leading-[0.9] sm:text-8xl lg:text-9xl">
          <motion.span {...a(0.25)} className="block">Maxsy</motion.span>
          <motion.span {...a(0.4)} className="block italic text-primary">Tattoo</motion.span>
        </h1>
        <motion.p {...a(0.9, 0)} className="-mt-4 ml-[20%] font-script text-5xl text-bone md:text-7xl" aria-hidden>
          hecho a mano
        </motion.p>
        <motion.div {...a(1.1, 10)} className="mt-10 flex flex-wrap items-center gap-6">
          <Button asChild className="h-12 rounded-sm px-7 text-xs uppercase tracking-[0.2em]"><a href="#consulta">Pedir turno <ArrowUpRight /></a></Button>
          <Button asChild variant="link" className="text-xs uppercase tracking-[0.2em] text-foreground"><a href="#trabajos">
            Ver trabajos →
          </a></Button>
        </motion.div>
      </div>
      <motion.div
        initial={r ? false : { clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.4, ease }}
        className="absolute inset-0"
      >
        <img src={hero} alt="Manos de Maxsy con guantes negros tatuando un antebrazo bajo una lámpara cálida" width={1280} height={1600} className="h-full w-full object-cover object-[center_45%] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/10" />
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="border-t border-border px-6 py-28 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="eyebrow">01 — Sobre</p>
          <figure className="mt-8 border border-border bg-card p-2">
            <img src={artist} alt="Maxsy, tatuador con guantes negros y brazos tatuados, sosteniendo la máquina en su estudio" loading="lazy" width={832} height={1216} className="aspect-[3/4] w-full object-cover" />
            <figcaption className="flex items-baseline justify-between p-2 pt-3">
              <span className="font-display text-xl">Maxsy</span>
              <span className="eyebrow">Artista</span>
            </figcaption>
          </figure>
          <p className="mt-6 font-display text-6xl text-primary">{studioInfo.anios}</p>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">años tatuando</p>
        </div>
        <div className="md:col-span-8 md:col-start-5">
          <blockquote className="font-display text-4xl leading-tight md:text-6xl">
            “{studioInfo.cita}”
          </blockquote>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">{studioInfo.bio}</p>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "I", t: "Consulta", d: "Me contás la idea, la zona y el tamaño. Por WhatsApp o en persona." },
  { n: "II", t: "Diseño", d: "Dibujo la pieza a medida y la ajustamos juntos hasta que sea tuya." },
  { n: "III", t: "Sesión", d: "Una sola persona, un solo turno por día. Sin apuro, con cuidado." },
  { n: "IV", t: "Cuidado", d: "Te llevás las indicaciones y seguimiento hasta que cicatrice." },
];

function Process() {
  return (
    <section id="proceso" className="border-t border-border bg-card px-6 py-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">03 — Proceso</p>
        <h2 className="mt-4 text-5xl md:text-7xl">Cómo trabajamos</h2>
        <ol className="mt-16 grid gap-px bg-border md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="bg-card p-8">
              <span className="font-display text-3xl italic text-primary">{s.n}</span>
              <h3 className="mt-6 text-2xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section className="relative border-t border-border">
      <img src={studio} alt="Interior del estudio: camilla de cuero negro, lámpara encendida, tintas y flash enmarcado en la pared" loading="lazy" width={1280} height={832} className="h-[70vh] w-full object-cover" />
      <div className="absolute bottom-0 left-0 max-w-md bg-background p-8 md:p-12">
        <p className="eyebrow">04 — Estudio</p>
        <p className="mt-4 font-display text-3xl">Un espacio privado, esterilizado y tranquilo.</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="border-t border-border px-6 py-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">07 — Contacto</p>
        <h2 className="mt-4 text-6xl md:text-9xl">Escribime<span className="text-primary">.</span></h2>
        <div className="mt-16 grid gap-10 border-t border-border pt-10 text-sm md:grid-cols-3">
          <div><p className="eyebrow">Tu idea</p><Button asChild variant="link" className="mt-3 h-auto p-0 font-display text-2xl"><a href="#consulta">Preparar consulta <ArrowUpRight /></a></Button></div>
          <div><p className="eyebrow">Instagram</p><a href="https://instagram.com/maxsytattoo" className="mt-3 block font-display text-2xl hover:text-accent">@maxsytattoo</a></div>
          <div><p className="eyebrow">Ubicación</p><a href="https://www.google.com/maps/search/?api=1&query=Formosa+Capital+Argentina" target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-2 font-display text-2xl hover:text-primary"><MapPin className="size-5 shrink-0" />Formosa Capital, Argentina</a></div>
        </div>
        <p className="mt-24 text-xs text-muted-foreground">© {new Date().getFullYear()} MAXSY TATTOO</p>
      </div>
    </section>
  );
}

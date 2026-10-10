import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { styles, works } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export function Gallery() {
  const [active, setActive] = useState<string>("todos");
  const [selected, setSelected] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const list = active === "todos" ? works : works.filter((w) => w.estilo === active);
  const filters = [{ nombre: "Todos", slug: "todos" }, ...styles];
  const current = list.find(w => w.id === selected);
  function move(direction: number) {
    const index = list.findIndex(w => w.id === selected);
    const next = list[(index + direction + list.length) % list.length];
    if (next) setSelected(next.id);
  }

  return (
    <section id="trabajos" className="px-6 py-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">02 — Trabajos</p>
            <h2 className="mt-4 text-5xl md:text-7xl">Piel <em className="text-accent">archivada</em></h2>
          </div>
          <div role="group" aria-label="Filtrar por estilo" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Button
                variant="outline"
                key={f.slug}
                onClick={() => setActive(f.slug)}
                aria-pressed={active === f.slug}
                className={`h-auto rounded-sm border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                  active === f.slug ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
                }`}
              >
                {f.nombre}
              </Button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.ul layout={!reduce} className="grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {list.map((w) => (
                <motion.li
                  key={w.id}
                  layout={!reduce}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                  className={`group relative overflow-hidden bg-card ${active === "todos" ? w.span : ""}`}
                >
                  <Button variant="ghost" aria-label={`Ampliar ${w.titulo}`} onClick={() => setSelected(w.id)} className="block h-full w-full rounded-none p-0 hover:bg-card">
                  <img src={w.imagen} alt={w.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <Maximize2 className="absolute right-4 top-4 text-foreground" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 bg-gradient-to-t from-background/90 to-transparent p-4 pt-12 text-left whitespace-normal">
                    <span className="font-display text-lg">{w.titulo}</span>
                    <span className="eyebrow">{styles.find((s) => s.slug === w.estilo)?.nombre}</span>
                  </div>
                  </Button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
        <Dialog open={Boolean(current)} onOpenChange={open => { if (!open) setSelected(null); }}>
          {current && <DialogContent className="w-[calc(100%-2rem)] max-w-3xl p-4" onKeyDown={event => { if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); }}>
            <DialogTitle className="pr-8 font-display text-2xl">{current.titulo}</DialogTitle>
            <DialogDescription>{styles.find(s => s.slug === current.estilo)?.nombre}</DialogDescription>
            <img src={current.imagen} alt={current.alt} className="h-[55vh] w-full object-contain" />
            <div className="flex items-center justify-between"><Button variant="outline" size="icon" aria-label="Foto anterior" title="Foto anterior" onClick={() => move(-1)}><ChevronLeft /></Button><span className="text-sm text-muted-foreground">{list.findIndex(w => w.id === current.id) + 1} / {list.length}</span><Button variant="outline" size="icon" aria-label="Foto siguiente" title="Foto siguiente" onClick={() => move(1)}><ChevronRight /></Button></div>
            <Button asChild><a href="#consulta" onClick={() => setSelected(null)}>Consultar una pieza</a></Button>
          </DialogContent>}
        </Dialog>
      </div>
    </section>
  );
}

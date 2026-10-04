import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { styles, works } from "@/lib/content";

export function Gallery() {
  const [active, setActive] = useState<string>("todos");
  const reduce = useReducedMotion();
  const list = active === "todos" ? works : works.filter((w) => w.estilo === active);
  const filters = [{ nombre: "Todos", slug: "todos" }, ...styles];

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
              <button
                key={f.slug}
                onClick={() => setActive(f.slug)}
                aria-pressed={active === f.slug}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                  active === f.slug ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
                }`}
              >
                {f.nombre}
              </button>
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
                  <img src={w.imagen} alt={w.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-background/90 to-transparent p-4 pt-12">
                    <span className="font-display text-lg">{w.titulo}</span>
                    <span className="eyebrow">{styles.find((s) => s.slug === w.estilo)?.nombre}</span>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}

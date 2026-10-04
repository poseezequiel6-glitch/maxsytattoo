// Content modeled after the planned CMS schema (tattooStyle, tattooWork, studioInfo)
// so it can later be swapped for live data without touching the sections.
import w1 from "@/assets/w1.jpg";
import w2 from "@/assets/w2.jpg";
import w3 from "@/assets/w3.jpg";
import w4 from "@/assets/w4.jpg";
import w5 from "@/assets/w5.jpg";

export type TattooStyle = { nombre: string; slug: string };
export type TattooWork = {
  id: string;
  titulo: string;
  imagen: string;
  alt: string;
  estilo: string; // slug
  destacado: boolean;
  span: string; // mosaic placement
};

export const styles: TattooStyle[] = [
  { nombre: "Blackwork", slug: "blackwork" },
  { nombre: "Realismo", slug: "realismo" },
  { nombre: "Tradicional", slug: "tradicional" },
  { nombre: "Japonés", slug: "japones" },
  { nombre: "Fine line", slug: "fine-line" },
];

export const works: TattooWork[] = [
  { id: "1", titulo: "Serpiente y rosas", imagen: w1, alt: "Antebrazo con serpiente enroscada entre dos rosas en blackwork de puntillismo", estilo: "blackwork", destacado: true, span: "md:col-span-2 md:row-span-2" },
  { id: "2", titulo: "Retrato en grises", imagen: w2, alt: "Retrato realista en negro y grises de una mujer con el pelo mojado sobre el hombro", estilo: "realismo", destacado: true, span: "md:col-span-2" },
  { id: "3", titulo: "Daga y golondrina", imagen: w3, alt: "Daga atravesada por una golondrina en estilo tradicional con tinta roja en la pantorrilla", estilo: "tradicional", destacado: false, span: "" },
  { id: "4", titulo: "Koi entre olas", imagen: w4, alt: "Espalda completa con un koi rojo nadando entre olas japonesas en negro", estilo: "japones", destacado: true, span: "md:row-span-2" },
  { id: "5", titulo: "Helecho", imagen: w5, alt: "Helecho botánico en línea fina sobre las costillas", estilo: "fine-line", destacado: false, span: "" },
];

export const studioInfo = {
  bio: "Maxsy tatúa solo, con turnos largos y sin apuro. Cada pieza se dibuja a mano para quien la va a llevar: nada de catálogo, nada de copias.",
  cita: "La piel no es un papel. Hay que escucharla antes de marcarla.",
  anios: 9,
};

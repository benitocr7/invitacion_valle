export type BotonAnuncio = {
  texto: string;
  href?: string;
  accion?: "confirmar" | "mapa" | "detalles";
  primario?: boolean;
};

export type AnuncioItem = {
  id: string;
  badge: string;
  titulo: string;
  descripcion: string;
  botones: BotonAnuncio[];
  avatares?: string[];
  citaAvatar?: string;
  imagen: string;
  sloganImagen?: string;
};

export const listaAnuncios: AnuncioItem[] = [
  {
    id: "inauguracion",
    badge: "EVENTO PRINCIPAL",
    titulo: "Inauguración Iglesia Valle",
    descripcion:
      "Acompáñanos a celebrar la dedicatoria e inauguración oficial de nuestra nueva casa de adoración. Un hito histórico lleno de fe, gratitud y bendiciones para toda la comunidad.",
    botones: [
      { texto: "Confirmar asistencia", accion: "confirmar", primario: true },
      { texto: "Ver ubicación ↗", accion: "mapa" },
    ],
    avatares: ["/foto_iglesia.png"],
    citaAvatar: "Unidos en fe y esperanza para la gloria de Dios.",
    imagen: "/invitacion.png",
    sloganImagen: "Tu Asistencia, Nuestra Alegría.",
  },
  {
    id: "horarios",
    badge: "PROGRAMA ESPECIAL",
    titulo: "Culto de Gratitud y Celebración",
    descripcion:
      "Disfruta de momentos de alabanza especial, música sagrada en vivo y mensajes de inspiración bíblica desde las 08H00. Una mañana renovadora para toda la familia.",
    botones: [
      { texto: "Confirmar asistencia", accion: "confirmar", primario: true },
      { texto: "Detalles del programa", accion: "detalles" },
    ],
    avatares: ["/foto_iglesia.png"],
    citaAvatar: "Alabanza y edificación espiritual para todas las edades.",
    imagen: "/invitacionp1.png",
    sloganImagen: "Un Día Santo para Renovar la Fe.",
  },
  {
    id: "confraternidad",
    badge: "AGAPE & RECEPCIÓN",
    titulo: "Almuerzo de Confraternidad",
    descripcion:
      "Al finalizar el programa especial, compartiremos un momento inolvidable de comunión fraternal, agasajo e integración para todos nuestros invitados especiales y familias.",
    botones: [
      { texto: "Aceptar invitación", accion: "confirmar", primario: true },
    ],
    avatares: ["/foto_iglesia.png"],
    citaAvatar: "Compartiendo el pan y el amor en comunidad.",
    imagen: "/foto_iglesia.png",
    sloganImagen: "Comunión, Amor y Unidad.",
  },
];

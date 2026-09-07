import CartaInteractiva from "../../../src/components/CartaInteractiva";

const invitaciones = {
  "anahi-masaquiza": {
    nombre: "Anahí Masaquiza",
    datos: {
      evento: "Inauguración",
      iglesia: "Iglesia",
      sede: "Valle",
      fecha: "Sábado, 12 de septiembre de 2026",
      hora: "08H00",
      horaDetalle: "8 de la mañana",
      lugar: "Lugar:",
      direccion: "Valle – Loja, calles Cuenca y Chone",
    },
  },

  // Copia este bloque para crear otra invitación personalizada:
  // "nombre-apellido": {
  //   nombre: "Nombre Apellido",
  //   datos: {
  //     evento: "Inauguración",
  //     iglesia: "Iglesia",
  //     sede: "Valle",
  //     fecha: "Sábado, 12 de septiembre de 2026",
  //     hora: "08H00",
  //     horaDetalle: "8 de la mañana",
  //     lugar: "Lugar:",
  //     direccion: "Valle – Loja, calles Cuenca y Chone",
  //   },
  // },
} as const;

type InvitationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { slug } = await params;
  const invitacion = invitaciones[slug as keyof typeof invitaciones];

  if (!invitacion) {
    return <p className="p-8 text-center">Invitación no encontrada.</p>;
  }

  return (
    <main>
      <CartaInteractiva
        nombreInicialProp={invitacion.nombre}
        mostrarEtiquetaPersonalizada={false}
        esPersonalizada
        datosInvitacion={invitacion.datos}
      />
    </main>
  );
}

import InvitacionPersonal, { type DatosInvitacion } from "../../../src/components/InvitacionPersonal";

const invitaciones: Record<string, DatosInvitacion> = {
  "anahi-masaquiza": {
    nombre: "Anahí Masaquiza",
    tratamiento: "Estimada Srta.",
    evento: "Inauguración",
    iglesia: "Iglesia",
    sede: "Valle",
    fecha: "Sábado, 12 de septiembre de 2026",
    hora: "08H00",
    horaDetalle: "8 de la mañana",
    lugar: "Lugar:",
    direccion: "Valle – Loja, calles Cuenca y Chone",
    imagenIglesia: "/foto_iglesia.png",
  },

  // Para crear otra invitación personal, copia este bloque y cambia el slug y los datos:
  // "nombre-apellido": {
  //   nombre: "Nombre Apellido",
  //   tratamiento: "Estimado Sr.",
  //   evento: "Inauguración",
  //   iglesia: "Iglesia",
  //   sede: "Valle",
  //   fecha: "Sábado, 12 de septiembre de 2026",
  //   hora: "08H00",
  //   horaDetalle: "8 de la mañana",
  //   lugar: "Lugar:",
  //   direccion: "Valle – Loja, calles Cuenca y Chone",
  //   imagenIglesia: "/foto_iglesia.png",
  // },
};

type InvitationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { slug } = await params;
  const invitacion = invitaciones[slug];

  if (!invitacion) {
    return (
      <main className="min-h-screen bg-[#07162b] px-6 py-20 text-center text-white">
        <h1 className="text-3xl font-semibold">Invitación no encontrada</h1>
        <p className="mt-3 text-white/75">Verifica que el enlace esté escrito correctamente.</p>
      </main>
    );
  }

  return <InvitacionPersonal datos={invitacion} esPersonalizada />;
}

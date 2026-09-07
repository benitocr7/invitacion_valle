import InvitacionPersonal, { type DatosInvitacion } from "../src/components/InvitacionPersonal";

const invitacionGeneral: DatosInvitacion = {
  evento: "Inauguración",
  iglesia: "Iglesia",
  sede: "Valle",
  fecha: "Sábado, 12 de septiembre de 2026",
  hora: "08H00",
  horaDetalle: "8 de la mañana",
  lugar: "Lugar:",
  direccion: "Valle – Loja, calles Cuenca y Chone",
  imagenIglesia: "/foto_iglesia.png",
};

export default function Home() {
  return <InvitacionPersonal datos={invitacionGeneral} />;
}

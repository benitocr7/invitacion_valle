import CartaInteractiva from "../src/components/CartaInteractiva";

export default function Home() {
  return (
    <main>
      <CartaInteractiva
        datosInvitacion={{
          evento: "Inauguración",
          iglesia: "Iglesia",
          sede: "Valle",
          fecha: "Sábado, 12 de septiembre de 2026",
          hora: "08H00",
          horaDetalle: "8 de la mañana",
          lugar: "Lugar:",
          direccion: "Valle – Loja, calles Cuenca y Chone",
        }}
      />
    </main>
  );
}

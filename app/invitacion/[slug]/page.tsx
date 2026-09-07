import CartaInteractiva from "../../../src/components/CartaInteractiva";
import { datosEvento, invitadosPorSlug } from "../../../src/data/invitados";

type InvitationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { slug } = await params;
  const invitado = invitadosPorSlug[slug];

  if (!invitado) {
    return <p className="p-8 text-center">Invitación no encontrada.</p>;
  }

  return (
    <main>
      <CartaInteractiva
        nombreInicialProp={invitado.nombre}
        mostrarEtiquetaPersonalizada={false}
        esPersonalizada
        datosInvitacion={{ ...datosEvento, tratamiento: invitado.tratamiento }}
      />
    </main>
  );
}

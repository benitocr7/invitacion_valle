import CartaInteractiva from '../../../src/components/CartaInteractiva';

const invitaciones = {
  'anahi-masaquiza': {
    nombre: 'Anahí Masaquiza',
    imagen: '/invitacionp1.png',
  },
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
        invitacionSrc={invitacion.imagen}
        mostrarEtiquetaPersonalizada={false}
        esPersonalizada
      />
    </main>
  );
}
import Image from "next/image";
import styles from "./InvitacionContenido.module.css";

export type ContenidoInvitacion = {
  evento?: string;
  iglesia?: string;
  sede?: string;
  fecha?: string;
  hora?: string;
  horaDetalle?: string;
  lugar?: string;
  direccion?: string;
  imagenIglesia?: string;
  tratamiento?: string;
};

export default function InvitacionContenido({
  datos = {},
  nombre = "",
  personalizada = false,
  onAceptar,
}: {
  datos?: ContenidoInvitacion;
  nombre?: string;
  personalizada?: boolean;
  onAceptar?: () => void;
}) {
  return (
    <div className={`${styles.lienzo} ${personalizada ? styles.personalizada : ""}`}>
      <div className={styles.foto}>
        <Image
          src={datos.imagenIglesia || "/foto_iglesia.png"}
          alt="Iglesia Adventista del Séptimo Día Valle"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 560px"
          className={styles.imagen}
        />
        <div className={styles.sombra} />
      </div>

      <section className={styles.panel}>
        <div className={styles.destellos} aria-hidden="true" />
        {personalizada && nombre && <p className={styles.nombre}>{datos.tratamiento || "Estimada Srta."} {nombre}</p>}
        <p className={styles.intro}>Tenemos el agrado de invitarte a nuestra</p>
        <h1>{datos.evento || "Inauguración"}</h1>
        <div className={styles.linea}><span /><em>de la</em><span /></div>
        <h2>{datos.iglesia || "Iglesia"}</h2>
        <h3>Adventista del Séptimo Día</h3>
        <div className={styles.linea}><span /><strong>{datos.sede || "Valle"}</strong><span /></div>

        <div className={styles.detalles}>
          <div><b aria-hidden="true">▣</b><p><strong>{datos.fecha || "Sábado, 12 de septiembre de 2026"}</strong></p></div>
          <div><b aria-hidden="true">◷</b><p><strong>{datos.hora || "08H00"}</strong><small>({datos.horaDetalle || "8 de la mañana"})</small></p></div>
          <div><b aria-hidden="true">⌖</b><p><strong>{datos.lugar || "Lugar:"}</strong><small>{datos.direccion || "Valle – Loja, calles Cuenca y Chone"}</small></p></div>
        </div>

        <div
          className={styles.aceptar}
          onClick={onAceptar}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onAceptar?.();
            }
          }}
        >
          Aceptar invitación
        </div>
      </section>
    </div>
  );
}

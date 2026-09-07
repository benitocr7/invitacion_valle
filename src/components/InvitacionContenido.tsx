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
};

export default function InvitacionContenido({
  datos = {},
  nombre = "",
  personalizada = false,
}: {
  datos?: ContenidoInvitacion;
  nombre?: string;
  personalizada?: boolean;
}) {
  return (
    <div className={styles.lienzo}>
      <div className={styles.destellos} aria-hidden="true" />
      {personalizada && nombre && <p className={styles.nombre}>Estimada Srta. {nombre}</p>}
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

      <div className={styles.aceptar}>Aceptar invitación</div>
    </div>
  );
}

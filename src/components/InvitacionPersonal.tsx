"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import styles from "./InvitacionPersonal.module.css";

export type DatosInvitacion = {
  nombre?: string;
  tratamiento?: string;
  evento: string;
  iglesia: string;
  sede: string;
  fecha: string;
  hora: string;
  horaDetalle?: string;
  lugar: string;
  direccion: string;
  imagenIglesia?: string;
};

type Props = {
  datos: DatosInvitacion;
  esPersonalizada?: boolean;
};

export default function InvitacionPersonal({ datos, esPersonalizada = false }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState(datos.nombre || "");
  const [tipo, setTipo] = useState<"individual" | "familia">(esPersonalizada ? "individual" : "familia");
  const [integrantes, setIntegrantes] = useState("");

  async function confirmar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nombreLimpio = nombre.trim();
    const cantidad = tipo === "familia" ? Number(integrantes) : null;

    if (!nombreLimpio || (tipo === "familia" && (!Number.isInteger(cantidad) || Number(cantidad) < 1))) {
      setError("Completa correctamente todos los datos.");
      return;
    }

    setEnviando(true);
    setError("");

    try {
      const respuesta = await fetch("/api/confirmar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nombreLimpio, tipo, integrantes: cantidad }),
      });

      if (!respuesta.ok) throw new Error("No se pudo confirmar");
      setConfirmado(true);
    } catch {
      setError("No pudimos guardar tu confirmación. Inténtalo nuevamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className={styles.pagina}>
      <article className={styles.invitacion}>
        <header className={styles.fotografia}>
          <Image
            src={datos.imagenIglesia || "/foto_iglesia.png"}
            alt="Iglesia Adventista del Séptimo Día Valle"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 560px"
            className={styles.imagen}
          />
          <div className={styles.degradado} />
          <div className={styles.identidad}>
            <span className={styles.cruz} aria-hidden="true">✦</span>
            <p>Iglesia Adventista</p>
            <strong>del Séptimo Día</strong>
          </div>
        </header>

        <section className={styles.contenido}>
          <div className={styles.destellos} aria-hidden="true" />
          {esPersonalizada && datos.nombre && (
            <p className={styles.destinatario}>
              {datos.tratamiento || "Estimada"} {datos.nombre}
            </p>
          )}
          <p className={styles.intro}>Tenemos el agrado de invitarte a nuestra</p>
          <h1>{datos.evento}</h1>

          <div className={styles.separador}><span /><small>de la</small><span /></div>
          <h2>{datos.iglesia}</h2>
          <h3>Adventista del Séptimo Día</h3>
          <div className={styles.sede}><span /><strong>{datos.sede}</strong><span /></div>

          <dl className={styles.detalles}>
            <div><dt aria-label="Fecha">▣</dt><dd><strong>{datos.fecha}</strong></dd></div>
            <div>
              <dt aria-label="Hora">◷</dt>
              <dd><strong>{datos.hora}</strong>{datos.horaDetalle && <span>({datos.horaDetalle})</span>}</dd>
            </div>
            <div>
              <dt aria-label="Lugar">⌖</dt>
              <dd><strong>{datos.lugar}</strong><span>{datos.direccion}</span></dd>
            </div>
          </dl>

          <button className={styles.boton} type="button" onClick={() => setAbierto(true)}>
            Aceptar invitación
          </button>
        </section>
      </article>

      {abierto && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="confirmacion-titulo">
          <form className={styles.formulario} onSubmit={confirmar}>
            <button className={styles.cerrar} type="button" onClick={() => setAbierto(false)} aria-label="Cerrar">×</button>
            {confirmado ? (
              <>
                <div className={styles.check}>✓</div>
                <h2 id="confirmacion-titulo">¡Gracias, {nombre}!</h2>
                <p>Tu asistencia ha sido confirmada.</p>
                <button className={styles.boton} type="button" onClick={() => setAbierto(false)}>Cerrar</button>
              </>
            ) : (
              <>
                <p className={styles.etiqueta}>Confirmación</p>
                <h2 id="confirmacion-titulo">¿Confirmas tu asistencia?</h2>

                {!esPersonalizada && (
                  <>
                    <div className={styles.opciones}>
                      <button type="button" className={tipo === "familia" ? styles.activa : ""} onClick={() => setTipo("familia")}>Familia</button>
                      <button type="button" className={tipo === "individual" ? styles.activa : ""} onClick={() => { setTipo("individual"); setIntegrantes(""); }}>Individual</button>
                    </div>
                    <label className={styles.campo}>
                      {tipo === "familia" ? "Nombre de la familia" : "Tu nombre"}
                      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={tipo === "familia" ? "Ej: Familia Pérez" : "Ej: Juan Pérez"} required />
                    </label>
                    {tipo === "familia" && (
                      <label className={styles.campo}>
                        Número de personas
                        <input type="number" min="1" inputMode="numeric" value={integrantes} onChange={(e) => setIntegrantes(e.target.value)} placeholder="Ej: 4" required />
                      </label>
                    )}
                  </>
                )}

                {esPersonalizada && <p>Registraremos la asistencia de <strong>{datos.nombre}</strong>.</p>}
                {error && <p className={styles.error}>{error}</p>}
                <button className={styles.boton} disabled={enviando}>
                  {enviando ? "Confirmando…" : "Sí, asistiré"}
                </button>
              </>
            )}
          </form>
        </div>
      )}
    </main>
  );
}

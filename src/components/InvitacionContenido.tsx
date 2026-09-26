import { useState } from "react";
import Image from "next/image";
import styles from "./InvitacionContenido.module.css";
import CarruselAnuncios from "./CarruselAnuncios";

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
  const [vista, setVista] = useState<"tarjeta" | "anuncios">("tarjeta");

  return (
    <div className={`${styles.lienzo} ${personalizada ? styles.personalizada : ""}`}>
      {/* Selector de Vistas Elegante */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center bg-black/60 backdrop-blur-md p-1 rounded-full border border-amber-500/40 shadow-lg">
        <button
          type="button"
          onClick={() => setVista("tarjeta")}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
            vista === "tarjeta"
              ? "bg-[#cc9b4c] text-[#112a46] shadow-md"
              : "text-white/80 hover:text-white"
          }`}
        >
          Invitación
        </button>
        <button
          type="button"
          onClick={() => setVista("anuncios")}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
            vista === "anuncios"
              ? "bg-[#cc9b4c] text-[#112a46] shadow-md"
              : "text-white/80 hover:text-white"
          }`}
        >
          ✦ Anuncios
        </button>
      </div>

      {vista === "anuncios" ? (
        <div className="w-full h-full pt-14 pb-4 px-2 overflow-y-auto flex flex-col justify-center items-center bg-gradient-to-b from-[#091526] via-[#0e213b] to-[#07111e]">
          <CarruselAnuncios onConfirmarAsistencia={onAceptar} />
        </div>
      ) : (
        <>
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
            {personalizada && nombre && (
              <p className={styles.nombre}>
                {datos.tratamiento || "Estimada Srta."} {nombre}
              </p>
            )}
            <p className={styles.intro}>Tenemos el agrado de invitarte a nuestra</p>
            <h1>{datos.evento || "Inauguración"}</h1>
            <div className={styles.linea}>
              <span />
              <em>de la</em>
              <span />
            </div>
            <h2>{datos.iglesia || "Iglesia"}</h2>
            <h3>Adventista del Séptimo Día</h3>
            <div className={styles.linea}>
              <span />
              <strong>{datos.sede || "Valle"}</strong>
              <span />
            </div>

            <div className={styles.detalles}>
              <div>
                <b aria-hidden="true">▣</b>
                <p>
                  <strong>{datos.fecha || "Sábado, 12 de septiembre de 2026"}</strong>
                </p>
              </div>
              <div>
                <b aria-hidden="true">◷</b>
                <p>
                  <strong>{datos.hora || "08H00"}</strong>
                  <small>({datos.horaDetalle || "8 de la mañana"})</small>
                </p>
              </div>
              <div>
                <b aria-hidden="true">⌖</b>
                <p>
                  <strong>{datos.lugar || "Lugar:"}</strong>
                  <small>{datos.direccion || "Valle – Loja, calles Cuenca y Chone"}</small>
                </p>
              </div>
            </div>

            <div
              className={styles.aceptar}
              onClick={onAceptar}
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onAceptar?.();
                }
              }}
            >
              Aceptar invitación
            </div>
          </section>
        </>
      )}
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { listaAnuncios, AnuncioItem } from "../data/anuncios";
import styles from "./CarruselAnuncios.module.css";

type Props = {
  anuncios?: AnuncioItem[];
  onConfirmarAsistencia?: () => void;
  autoPlayInterval?: number;
};

export default function CarruselAnuncios({
  anuncios = listaAnuncios,
  onConfirmarAsistencia,
  autoPlayInterval = 6000,
}: Props) {
  const [indiceActual, setIndiceActual] = useState(0);
  const [direccion, setDireccion] = useState<1 | -1>(1);
  const [estaPausado, setEstaPausado] = useState(false);

  const anuncioActual = anuncios[indiceActual];

  const siguiente = () => {
    setDireccion(1);
    setIndiceActual((prev) => (prev + 1) % anuncios.length);
  };

  const anterior = () => {
    setDireccion(-1);
    setIndiceActual((prev) => (prev - 1 + anuncios.length) % anuncios.length);
  };

  const irAIndice = (i: number) => {
    setDireccion(i > indiceActual ? 1 : -1);
    setIndiceActual(i);
  };

  // Auto-play interval with pause on hover
  useEffect(() => {
    if (estaPausado || autoPlayInterval <= 0) return;
    const timer = setInterval(() => {
      siguiente();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [indiceActual, estaPausado, autoPlayInterval]);

  const variantesSlide = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <div
      className={styles.contenedorPadre}
      onMouseEnter={() => setEstaPausado(true)}
      onMouseLeave={() => setEstaPausado(false)}
    >
      <div className={styles.tarjetaCarrusel}>
        <AnimatePresence custom={direccion} mode="wait">
          <motion.div
            key={anuncioActual.id}
            custom={direccion}
            variants={variantesSlide}
            initial="enter"
            animate="center"
            exit="exit"
            className={styles.gridContenido}
          >
            {/* Columna Izquierda: Información, Etiquetas, Titulo, Botones y Avatares */}
            <div className={styles.columnaIzquierda}>
              <div className={styles.bloqueSuperior}>
                {/* Insignia Pill */}
                <div className={styles.badgePill}>
                  <span className={styles.badgeDot} />
                  {anuncioActual.badge}
                </div>

                {/* Título Principal */}
                <h2 className={styles.titulo}>{anuncioActual.titulo}</h2>

                {/* Descripción breve */}
                <p className={styles.descripcion}>{anuncioActual.descripcion}</p>

                {/* Grupo de Botones interactivos */}
                <div className={styles.grupoBotones}>
                  {anuncioActual.botones.map((btn, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (btn.accion === "confirmar" && onConfirmarAsistencia) {
                          onConfirmarAsistencia();
                        } else if (btn.accion === "mapa") {
                          window.open(
                            "https://maps.google.com/?q=Valle+Loja+calles+Cuenca+y+Chone",
                            "_blank"
                          );
                        }
                      }}
                      className={
                        btn.primario ? styles.botonPrimario : styles.botonSecundario
                      }
                    >
                      {btn.texto}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer con Cita y Avatares */}
              {anuncioActual.citaAvatar && (
                <div className={styles.bloqueInferior}>
                  <div className={styles.avatarStack}>
                    <Image
                      src="/foto_iglesia.png"
                      alt="Avatar"
                      width={36}
                      height={36}
                      className={styles.avatarItem}
                    />
                    <div className={styles.avatarBadgeIcon}>✦</div>
                  </div>
                  <span className={styles.citaTexto}>{anuncioActual.citaAvatar}</span>
                </div>
              )}
            </div>

            {/* Columna Derecha: Imagen Principal destacada con bordes curvos */}
            <div className={styles.columnaDerecha}>
              <div className={styles.marcoImagen}>
                <Image
                  src={anuncioActual.imagen}
                  alt={anuncioActual.titulo}
                  fill
                  priority
                  sizes="(max-width: 868px) 100vw, 480px"
                  className={styles.imagenPrincipal}
                />
                <div className={styles.degradadoImagen} />
              </div>

              {anuncioActual.sloganImagen && (
                <div className={styles.pieImagen}>
                  <span className={styles.sloganImagenTexto}>
                    {anuncioActual.sloganImagen}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Barra de Navegación del Carrusel (Controles inferiores) */}
        <div className={styles.barranavegacion}>
          {/* Contador de Anuncios */}
          <div className={styles.contadorPaginas}>
            <span className={styles.contadorActivo}>
              {String(indiceActual + 1).padStart(2, "0")}
            </span>{" "}
            / {String(anuncios.length).padStart(2, "0")}
          </div>

          {/* Indicadores de Puntos */}
          <div className={styles.puntosContenedor}>
            {anuncios.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => irAIndice(index)}
                aria-label={`Ir al anuncio ${index + 1}`}
                className={`${styles.punto} ${
                  index === indiceActual ? styles.puntoActivo : ""
                }`}
              />
            ))}
          </div>

          {/* Controles con Flechas */}
          <div className={styles.controlesFlechas}>
            <button
              type="button"
              onClick={anterior}
              aria-label="Anuncio anterior"
              className={styles.botonFlecha}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={siguiente}
              aria-label="Siguiente anuncio"
              className={styles.botonFlecha}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

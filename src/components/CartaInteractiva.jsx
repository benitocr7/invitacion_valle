"use client"; // Necesario en Next.js para usar animaciones y estados

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring, useMotionValueEvent, useTransform } from 'framer-motion';
import invitacionImg from '../../public/invitacion.png';

export default function CartaInteractiva() {
  const videoRef = useRef(null);
  const pausaActivadaRef = useRef(false);
  const [esperandoDeslizar, setEsperandoDeslizar] = useState(false);
  const [abriendoCarta, setAbriendoCarta] = useState(false);
  const [cartaAbierta, setCartaAbierta] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreFamilia, setNombreFamilia] = useState('');
  const [asistenciaConfirmada, setAsistenciaConfirmada] = useState(false);
  const [audioHabilitado, setAudioHabilitado] = useState(false);
  const [mostrarOverlayInicio, setMostrarOverlayInicio] = useState(true);
  const [videoSrc, setVideoSrc] = useState('/video.mp4');
  const [videoFinalizado, setVideoFinalizado] = useState(false);

  const iniciarVideo = async () => {
    if (videoFinalizado) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;
    setAudioHabilitado(true);
    setMostrarOverlayInicio(false);

    try {
      await video.play();
    } catch {
      setMostrarOverlayInicio(true);
    }
  };

  const activarAudio = () => {
    if (videoFinalizado) return;
    if (!audioHabilitado) {
      iniciarVideo();
    }
  };

  const activarVideoFinal = () => {
    if (videoFinalizado || videoSrc === '/final.mp4') return;

    setMostrarFormulario(false);
    setCartaAbierta(false);
    setAsistenciaConfirmada(true);
    setMostrarOverlayInicio(false);
    setEsperandoDeslizar(false);
    setVideoFinalizado(false);

    setTimeout(() => {
      setAsistenciaConfirmada(false);
      setVideoSrc('/final.mp4');

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          videoRef.current.muted = false;
          videoRef.current.volume = 1;
          videoRef.current.play().catch(() => {});
        }
      }, 150);
    }, 3200);
  };

  // Valores de movimiento para suavizar el arrastre
  const dragY = useMotionValue(0);
  const smoothDragY = useSpring(dragY, { stiffness: 150, damping: 25, mass: 0.5 });

  const invScale = useTransform(smoothDragY, [0, -220], [0.34, 1]);
  const invOpacity = useTransform(smoothDragY, [0, -60], [0, 1]);
  const invClip = useTransform(smoothDragY, [0, -220], ['inset(14% 7% 36% 7%)', 'inset(0% 0% 0% 0%)']);
  const invY = useTransform(smoothDragY, [0, -220], ['calc(-50% + 150px)', '-50%']);

  useMotionValueEvent(smoothDragY, "change", (latest) => {
    const video = videoRef.current;
    if (video && esperandoDeslizar && video.duration) {
      const avance = Math.min(1, Math.max(0, -latest) / 220);
      const pauseTime = 10.9;
      const remaining = video.duration > pauseTime ? video.duration - pauseTime : 0.1;
      let targetTime = pauseTime + avance * remaining;
      
      // Redondear a intervalos de 30fps para no saturar el decodificador del celular
      targetTime = Math.round(targetTime * 30) / 30;
      
      // Solo forzar al video a actualizar si el cambio de tiempo es de al menos 1 frame
      if (Math.abs(video.currentTime - targetTime) >= 0.03) {
        video.currentTime = Math.min(video.duration, targetTime);
      }
    }
  });

  return (
    <div
      className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-black"
      style={{ touchAction: 'none' }}
      onPointerDown={videoSrc === '/video.mp4' ? activarAudio : undefined}
    >
      
      <video 
        key={videoSrc}
        ref={videoRef}
        className="absolute inset-0 h-full w-full bg-black object-contain"
        src={videoSrc}
        playsInline
        preload="auto"
        onCanPlay={() => {
          if (!mostrarOverlayInicio && !videoFinalizado) {
            iniciarVideo();
          }
        }}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          if (!video.duration || videoSrc !== '/video.mp4') return;
          const pauseTime = 10.9;
          
          if (!pausaActivadaRef.current && video.currentTime >= pauseTime) {
            video.pause();
            pausaActivadaRef.current = true;
            setEsperandoDeslizar(true);
          }
        }}
        onEnded={() => {
          if (videoSrc === '/video.mp4') {
            setCartaAbierta(true);
            setAbriendoCarta(false);
            setEsperandoDeslizar(false);
            pausaActivadaRef.current = false;
            return;
          }

          if (videoSrc === '/final.mp4') {
            setVideoFinalizado(true);
            setMostrarFormulario(false);
            setAsistenciaConfirmada(false);
            setCartaAbierta(false);
            setAbriendoCarta(false);
            setEsperandoDeslizar(false);
            pausaActivadaRef.current = false;
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = videoRef.current.duration || 0;
            }
          }
        }}
        loop={false}
      />

      {mostrarOverlayInicio && !cartaAbierta && !abriendoCarta && (
        <button
          type="button"
          onClick={iniciarVideo}
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/55 px-8 text-center text-white backdrop-blur-sm"
        >
          <span className="flex flex-col items-center gap-2 px-2 py-1">
            <span className="text-3xl font-light">▶</span>
            <span className="text-xs font-semibold tracking-[0.38em]">
              TOCA PARA INICIAR
            </span>
          </span>
        </button>
      )}

      {asistenciaConfirmada && !mostrarFormulario && !cartaAbierta && (
        <motion.div
          className="absolute inset-0 z-40 flex items-center justify-center bg-white/95 px-6 backdrop-blur-[2px]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <motion.div
            className="flex max-w-md flex-col items-center gap-5 rounded-[28px] border border-[#e7e4df] bg-white p-8 text-center shadow-[0_24px_80px_rgba(17,42,70,0.12)]"
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.18, ease: 'easeOut' }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#dff5ee] shadow-inner shadow-[#a8dcc3]">
              <svg className="h-10 w-10 text-[#1b9d72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8d8d8d]">
                Confirmación
              </p>
              <h3 className="text-3xl font-semibold text-[#112a46]">
                ¡Gracias, {nombreFamilia}!
              </h3>
            </div>
            <p className="text-[#555] text-[min(3.5vw,1.8dvh)] mb-6 text-center leading-relaxed">
              Tu asistencia ha sido confirmada.
            </p>
            <button
              onClick={() => {
                if (!videoFinalizado) {
                  setAsistenciaConfirmada(false);
                }
              }}
              className="mt-2 rounded-full bg-[#112a46] px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#112a46]/20 transition-all duration-200 hover:bg-[#1b3d68] hover:shadow-xl"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}

      {esperandoDeslizar && (
        <>
          <motion.div
            className="absolute left-1/2 top-[18%] h-[46%] w-[88%] -translate-x-1/2 cursor-grab active:cursor-grabbing z-20"
            style={{ y: dragY, touchAction: 'none' }}
            drag="y"
            dragConstraints={{ top: -220, bottom: 0 }}
            dragElastic={0}
            onPointerDown={activarAudio}
            onDragEnd={(event, info) => {
              if (info.offset.y < -80) {
                setAbriendoCarta(true);
                setEsperandoDeslizar(false);
                activarAudio();
                
                // Animamos hasta el final
                import('framer-motion').then(({ animate }) => {
                  animate(dragY, -220, { duration: 0.6, ease: "easeOut" });
                });
                
                videoRef.current?.play();
              } else {
                import('framer-motion').then(({ animate }) => {
                  animate(dragY, 0, { type: "spring", stiffness: 150, damping: 25 });
                });
                if (videoRef.current && videoRef.current.duration) {
                  const pauseTime = 10.9;
                  videoRef.current.currentTime = pauseTime;
                }
              }
            }}
          />

          <motion.div
            className="pointer-events-none absolute bottom-[18%] left-1/2 flex -translate-x-1/2 flex-col items-center text-center text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="text-6xl font-light leading-none drop-shadow-md"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↑
            </motion.span>
            <span className="mt-2 whitespace-nowrap text-base font-bold tracking-[0.3em] drop-shadow-md">
              DESLIZA PARA ARRIBA
            </span>
          </motion.div>
        </>
      )}

      {/* La invitación sale suavemente desde la carta del último cuadro. */}
      <AnimatePresence>
        {(esperandoDeslizar || abriendoCarta || cartaAbierta) && (
          <motion.div
            className={`absolute left-1/2 top-1/2 h-[min(100dvh,177.7778vw)] w-[min(100vw,56.25dvh)] overflow-hidden bg-black z-10 ${cartaAbierta ? 'cursor-grab active:cursor-grabbing' : ''}`}
            style={{ 
              touchAction: 'none', 
              transformOrigin: '50% 40%',
              x: "-50%",
              y: cartaAbierta ? "-50%" : invY,
              scale: cartaAbierta ? 1 : invScale,
              clipPath: cartaAbierta ? 'inset(0% 0% 0% 0%)' : invClip,
              opacity: cartaAbierta ? 1 : invOpacity,
            }}
            exit={{ y: '50%', opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            drag={cartaAbierta ? "y" : false}
            dragConstraints={{ top: 0, bottom: 500 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              if (cartaAbierta && info.offset.y > 100) {
                setCartaAbierta(false);
                setTimeout(() => {
                  dragY.set(0);
                  pausaActivadaRef.current = false;
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                  }
                }, 500);
              }
            }}
          >
            <Image
              className="object-cover"
              fill
              priority
              src={invitacionImg}
              alt="Invitación especial de la Iglesia Adventista del Séptimo Día"
            />
            
            {/* Botón interactivo superpuesto elegante */}
            <div 
              className="absolute z-10 left-1/2 -translate-x-1/2"
              style={{
                top: '94.9%',
                width: '45.5%', 
                height: '3.5%' 
              }}
            >
              <motion.button 
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setMostrarFormulario(true)}
                className="w-full h-full cursor-pointer rounded-sm border border-transparent"
                animate={{ 
                  borderColor: ["rgba(211, 168, 75, 0)", "rgba(211, 168, 75, 0.8)", "rgba(211, 168, 75, 0)"],
                  boxShadow: [
                    "0px 0px 0px 0px rgba(211, 168, 75, 0)", 
                    "0px 0px 20px 4px rgba(211, 168, 75, 0.4)", 
                    "0px 0px 0px 0px rgba(211, 168, 75, 0)"
                  ],
                  backgroundColor: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0)"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                title="Aceptar Invitación"
              />
            </div>

            {/* Formulario Modal superpuesto */}
            <AnimatePresence>
              {mostrarFormulario && (
                <motion.div
                  className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-sm p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onPointerDown={(e) => e.stopPropagation()}
                  style={{ touchAction: 'auto' }}
                >
                  <motion.div 
                    className="bg-white/95 p-8 rounded-2xl w-full max-w-sm flex flex-col items-center gap-6 shadow-2xl"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                  >
                    {!asistenciaConfirmada ? (
                      <>
                        <h3 className="text-2xl font-semibold text-[#112a46] text-center">
                          Confirma tu Asistencia
                        </h3>
                        <p className="text-center text-gray-600 text-sm">
                          Por favor, ingresa tu nombre o el de tu familia.
                        </p>
                        <input
                          type="text"
                          placeholder="Ej: Familia Pérez"
                          value={nombreFamilia}
                          onChange={(e) => setNombreFamilia(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cc9b4c] text-gray-800"
                        />
                        <div className="flex gap-3 w-full">
                          <button
                            onClick={() => setMostrarFormulario(false)}
                            className="flex-1 px-4 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={async () => {
                              if(nombreFamilia.trim()) {
                                try {
                                  const res = await fetch('/api/confirmar', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name: nombreFamilia.trim() }),
                                  });
                                  if (res.ok) {
                                    activarVideoFinal();
                                    setAsistenciaConfirmada(true);
                                  } else {
                                    console.error('Error al confirmar asistencia');
                                  }
                                } catch (error) {
                                  console.error('Error de red:', error);
                                }
                              }
                            }}
                            disabled={!nombreFamilia.trim()}
                            className="flex-1 px-4 py-3 rounded-lg bg-[#cc9b4c] text-[#112a46] font-semibold hover:bg-[#b88534] disabled:opacity-50 transition-colors"
                          >
                            Confirmar
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center flex flex-col items-center gap-4 py-4">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-[#112a46]">
                          ¡Gracias, {nombreFamilia}!
                        </h3>
                        <p className="text-gray-600">
                          Tu asistencia ha sido confirmada.
                        </p>
                        <button
                          onClick={() => {
                            if (!videoFinalizado) {
                              setAsistenciaConfirmada(false);
                            }
                          }}
                          className="mt-4 px-6 py-2 rounded-lg bg-[#112a46] text-white font-medium hover:bg-[#1a3f69] transition-colors"
                        >
                          Cerrar
                        </button>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
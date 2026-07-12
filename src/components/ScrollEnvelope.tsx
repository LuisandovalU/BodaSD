import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 140;

export default function ScrollEnvelope() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Precargar imágenes
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Ahora usamos las imágenes .webp con fondo transparente
      img.src = `/envelope-sequence/frame-${i.toString().padStart(3, '0')}.webp`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === FRAME_COUNT && canvasRef.current) {
          // Dibujar el primer frame cuando todo carga
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) ctx.drawImage(images[0], 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Controlar el render loop basado en scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !canvasRef.current || imagesLoaded < FRAME_COUNT) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // La animación empieza cuando el contenedor llega arriba, 
      // y termina cuando el contenedor sale por arriba (descontando el windowHeight que es el sticky)
      const scrollableDistance = rect.height - windowHeight;
      const scrolledDistance = -rect.top;
      
      // Progreso de 0 a 1
      let progress = scrolledDistance / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
      
      // Calcular qué frame corresponde
      let frameIndex = Math.floor(progress * (FRAME_COUNT - 1));
      
      // Asegurar que esté en límites
      if (frameIndex < 0) frameIndex = 0;
      if (frameIndex >= FRAME_COUNT) frameIndex = FRAME_COUNT - 1;
      
      // Dibujar frame
      const ctx = canvasRef.current.getContext('2d');
      if (ctx && imagesRef.current[frameIndex]) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(imagesRef.current[frameIndex], 0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };

    // Usar requestAnimationFrame para optimizar el listener
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    window.addEventListener('resize', scrollListener);
    
    // Ejecutar inicial
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', scrollListener);
    };
  }, [imagesLoaded]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '300vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Fondo rojo plano y elegante */}
        <div className="absolute inset-0 z-0 bg-[#671104]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
        </div>

        {/* Canvas del video centrado */}
        <div className="relative z-10 w-full max-w-xl mx-auto aspect-square flex items-center justify-center">
          <canvas 
            ref={canvasRef}
            width={720} 
            height={720}
            className="absolute inset-0 w-full h-full object-contain"
          />
          
          {/* Overlay text / regalos */}
          <div className={`absolute top-[50%] -translate-y-1/2 left-0 w-full flex flex-col items-center px-8 z-10 pointer-events-none transition-all ${scrollProgress > 0.75 ? 'duration-1000 delay-300 opacity-100 translate-y-0' : 'duration-300 delay-0 opacity-0 translate-y-4'}`}>
            
            <div className="flex justify-center mb-1.5 w-full">
              <img src="/regalos_wine.webp" alt="Regalos" className="w-[60%] max-w-[180px] md:max-w-[220px] h-auto object-contain" />
            </div>
            <p className="font-sans text-[7px] md:text-[9px] leading-relaxed tracking-[0.15em] uppercase text-[#750f06] max-w-[220px] mx-auto text-center font-bold">
              Su presencia es el regalo más valioso.
            </p>
            <p className="font-sans text-[6.5px] md:text-[8px] leading-relaxed tracking-[0.12em] uppercase text-[#750f06]/90 max-w-[240px] mx-auto text-center mt-1">
              En caso de desear un detalle con nosotros, agradeceremos lluvia de sobres mediante transferencia bancaria.
            </p>
            {/* Datos bancarios - placeholder */}
            <div className="mt-1.5 px-3 py-1.5 rounded-sm border border-[#750f06]/20 bg-[#750f06]/5 max-w-[200px] mx-auto w-full">
              <p className="font-sans text-[6px] md:text-[7px] tracking-[0.2em] uppercase text-[#750f06]/60 mb-0.5">Transferencia</p>
              <p className="font-serif text-[8px] md:text-[9px] tracking-[0.1em] text-[#750f06] font-semibold">[BANCO PLACEHOLDER]</p>
              <p className="font-sans text-[6px] md:text-[7px] tracking-[0.15em] uppercase text-[#750f06]/70 mt-0.5">[CLABE / CUENTA]</p>
            </div>
          </div>
          
        </div>
        
        {/* Loader por si tarda en bajar los frames */}
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#faf8f5]">
            <div className="text-brand-wine tracking-widest uppercase text-xs animate-pulse">
              Cargando animación {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

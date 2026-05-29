import React from 'react';
import { motion } from 'framer-motion';

interface ColorPaletteProps {
  colors: string[];
  title?: string;
  isBanned?: boolean;
}

export default function ColorPalette({ colors, title, isBanned = false }: ColorPaletteProps) {
  return (
    <div className="flex flex-col items-center">
      {title && (
        <h4 className={`font-serif tracking-[0.2em] uppercase text-sm mb-6 ${isBanned ? 'text-red-500' : 'text-white/95'}`}>
          {title}
        </h4>
      )}
      
      {/* Contenedor blanco con textura hoja.webp */}
      <div className="relative py-3 px-6 md:py-4 md:px-8 rounded-full shadow-2xl overflow-hidden max-w-fit mx-auto border border-[#e2c589]/50">
        <div className="absolute inset-0 z-0 bg-[#faf8f5]">
          <img src="/hoja.webp" alt="Textura papel" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#faf8f5]/70 via-[#faf8f5]/30 to-[#faf8f5]/80"></div>
        </div>
        
        <div className="relative z-10 flex flex-wrap justify-center gap-3 md:gap-5">
          {colors.map((color, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative"
            >
              <div 
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full shadow-inner border-[0.5px] border-black/20 ${isBanned ? 'opacity-80' : ''}`}
                style={{ backgroundColor: color }}
              />
              {isBanned && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 md:w-12 h-px bg-red-600/90 rotate-45 absolute" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

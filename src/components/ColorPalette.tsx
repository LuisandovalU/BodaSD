import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ColorItem {
  hex: string;
  name: string;
}

interface ColorPaletteProps {
  colors: ColorItem[];
  title?: string;
  isBanned?: boolean;
}

export default function ColorPalette({ colors, title, isBanned = false }: ColorPaletteProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center">
      {title && (
        <h4 className={`font-serif tracking-[0.2em] uppercase font-bold text-sm mb-6 ${isBanned ? 'text-red-500' : 'text-white/95'}`}>
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
              onHoverStart={() => setSelectedIndex(index)}
              onHoverEnd={() => setSelectedIndex(null)}
              onTouchStart={() => setSelectedIndex(index)}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative cursor-pointer"
            >
              <div 
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full shadow-inner border-[0.5px] border-black/20 transition-all duration-300 ${selectedIndex === index ? 'ring-2 ring-offset-2 ring-[#c5a059] scale-110' : ''}`}
                style={{ backgroundColor: color.hex }}
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

      {/* Selected color name display */}
      <div className="h-6 mt-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {selectedIndex !== null ? (
            <motion.p 
              key={selectedIndex}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className={`font-serif text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold ${isBanned ? 'text-red-400' : 'text-[#e2c589]'}`}
            >
              {colors[selectedIndex].name}
            </motion.p>
          ) : (
            <motion.p 
              key="default-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-serif text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-white/70"
            >
              Toca un color para descubrirlo
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

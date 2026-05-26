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
        <h4 className={`font-serif tracking-[0.2em] uppercase text-sm mb-6 ${isBanned ? 'text-red-800' : 'text-brand-wine-dark'}`}>
          {title}
        </h4>
      )}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
          >
            <div 
              className={`w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md border border-black/5 ${isBanned ? 'opacity-90' : ''}`}
              style={{ backgroundColor: color }}
            />
            {isBanned && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-0.5 bg-red-600 rotate-45 absolute" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

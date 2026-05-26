import React from 'react';
import { motion } from 'framer-motion';
import { Wine, Gem, Utensils, Cake, PartyPopper } from 'lucide-react';

export interface TimelineItemProps {
  title: string;
  time: string;
  iconName: 'wine' | 'gem' | 'utensils' | 'cake' | 'party';
  index: number;
}

const icons = {
  wine: Wine,
  gem: Gem,
  utensils: Utensils,
  cake: Cake,
  party: PartyPopper,
};

export default function TimelineItem({ title, time, iconName, index }: TimelineItemProps) {
  const Icon = icons[iconName];
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
      className={`flex items-center w-full my-8 ${isEven ? 'flex-row-reverse' : ''}`}
    >
      {/* Text Container */}
      <div className={`w-1/2 px-4 md:px-8 flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
        <h3 className="font-serif text-xl md:text-2xl tracking-[0.2em] text-white uppercase">{title}</h3>
        <p className="font-sans text-sm tracking-widest text-brand-gold-light mt-2">{time}</p>
      </div>

      {/* Center Line and Icon Wrapper */}
      <div className="relative flex flex-col items-center justify-center">
        {/* The Dot */}
        <div className="absolute w-3 h-3 bg-white rounded-full z-10" />
      </div>

      {/* Icon Container with Floating Animation */}
      <div className={`w-1/2 px-4 md:px-8 flex ${isEven ? 'justify-end' : 'justify-start'}`}>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          className="text-brand-gold"
        >
          <Icon strokeWidth={1} size={48} className="opacity-90" />
        </motion.div>
      </div>
    </motion.div>
  );
}

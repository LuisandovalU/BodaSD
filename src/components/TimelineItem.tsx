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

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
      className="flex items-center w-full my-10 relative"
    >
      {/* The Dot centered exactly on the left line */}
      <div className="absolute left-0 transform -translate-x-1/2 flex items-center justify-center">
        <div className="w-3 h-3 bg-white rounded-full z-10 shadow-md" />
      </div>

      {/* Content Container (Icon + Text) */}
      <div className="flex items-center gap-6 md:gap-8 ml-6 md:ml-8">
        {/* Icon Container with subtle animation */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          className="text-white shrink-0"
        >
          <Icon strokeWidth={1.2} size={48} className="opacity-95" />
        </motion.div>

        {/* Text Container */}
        <div className="flex flex-col justify-center text-left">
          <h3 className="font-serif text-lg md:text-xl tracking-[0.2em] text-white uppercase leading-tight">{title}</h3>
          <p className="font-sans text-xs tracking-widest text-brand-gold-light/95 mt-1.5 uppercase font-medium">{time}</p>
        </div>
      </div>
    </motion.div>
  );
}

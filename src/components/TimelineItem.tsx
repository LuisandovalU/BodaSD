import React from 'react';

export interface TimelineItemProps {
  title: string;
  time: string;
  iconUrl: string;
  index: number;
}

export default function TimelineItem({ title, time, iconUrl, index }: TimelineItemProps) {
  return (
    <div 
      data-scroll-timeline
      className="flex items-center w-full my-12 relative opacity-0 transform translate-y-8 filter blur-md transition-all duration-300 ease-out"
      style={{ willChange: 'opacity, transform, filter' }}
    >
      {/* The concentric premium gold-rimmed timeline dot */}
      <div className="absolute left-0 transform -translate-x-1/2 flex items-center justify-center w-8 h-8">
        <div className="w-5 h-5 rounded-full border border-[#e2c589]/60 bg-[#4a0d18]/80 backdrop-blur-[1px] shadow-[0_0_8px_rgba(226,197,137,0.4)] flex items-center justify-center z-10">
          <div className="w-1.5 h-1.5 bg-white rounded-full z-20" />
        </div>
      </div>

      {/* Content Container (Icon + Text) */}
      <div className="flex items-center gap-6 md:gap-8 ml-6 md:ml-8">
        {/* Icon Container (enlarged for premium visibility) */}
        <div className="w-18 h-18 md:w-[84px] md:h-[84px] flex items-center justify-center shrink-0">
          <img 
            src={iconUrl} 
            alt={title} 
            className="w-full h-full object-contain opacity-95 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] animate-subtle-float"
          />
        </div>

        {/* Text Container */}
        <div className="flex flex-col justify-center text-left">
          <h3 className="font-serif text-lg md:text-xl tracking-[0.2em] text-white uppercase leading-tight">{title}</h3>
          <p className="font-sans text-xs tracking-widest text-brand-gold-light/95 mt-1.5 uppercase font-medium">{time}</p>
        </div>
      </div>
    </div>
  );
}

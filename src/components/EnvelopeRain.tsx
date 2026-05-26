import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function EnvelopeRain() {
  const [envelopes, setEnvelopes] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate random positions and delays for the envelopes
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
    }));
    setEnvelopes(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {envelopes.map((env) => (
        <motion.div
          key={env.id}
          className="absolute text-brand-gold-light/40"
          initial={{ top: "-10%", left: `${env.left}%`, rotate: 0, opacity: 0 }}
          whileInView={{ top: "110%", rotate: 360, opacity: [0, 1, 1, 0] }}
          viewport={{ once: true, margin: "200px" }}
          transition={{
            duration: env.duration,
            delay: env.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <Mail size={24} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
}

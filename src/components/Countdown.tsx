import { useEffect, useState } from 'react';

// Fecha de la boda: 11 de Diciembre de 2026 a las 3:00 PM (Colombia UTC-5)
const WEDDING_DATE = new Date('2026-12-11T15:00:00-05:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'Días', value: timeLeft.days, raw: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours, display: pad(timeLeft.hours) },
    { label: 'Minutos', value: timeLeft.minutes, display: pad(timeLeft.minutes) },
    { label: 'Segundos', value: timeLeft.seconds, display: pad(timeLeft.seconds) },
  ];

  return (
    <section
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #750b1c 0%, #4a0d18 100%)',
        padding: '4rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative top fader */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '40px',
        background: 'linear-gradient(to bottom, #670e01, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Section label */}
      <p style={{
        fontFamily: "'Cinzel', serif",
        letterSpacing: '0.4em',
        fontSize: '0.65rem',
        color: '#c5a059',
        textTransform: 'uppercase',
        opacity: 0.9,
        marginBottom: '0.25rem',
      }}>
        Faltan
      </p>

      {/* Countdown units */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {units.map(({ label, value, display }, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(197,160,89,0.25)',
              borderRadius: '4px',
              padding: '1.25rem 1rem',
              minWidth: '72px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}>
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(2rem, 6vw, 2.8rem)',
                fontWeight: 600,
                color: '#faf8f5',
                lineHeight: 1,
                letterSpacing: '0.05em',
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.3s',
              }}>
                {label === 'Días' ? String(value) : display}
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                color: '#c5a059',
                textTransform: 'uppercase',
                marginTop: '0.5rem',
                opacity: 0.85,
              }}>
                {label}
              </span>
            </div>

            {/* Separator dots — not after last item */}
            {i < units.length - 1 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                opacity: 0.6,
                marginTop: '-1rem',
              }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#c5a059' }} />
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#c5a059' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Date hint */}
      <p style={{
        fontFamily: "'Cinzel', serif",
        letterSpacing: '0.35em',
        fontSize: '0.6rem',
        color: 'rgba(250,248,245,0.5)',
        textTransform: 'uppercase',
        marginTop: '0.5rem',
      }}>
        11 · 12 · 26 &nbsp;·&nbsp; 3:00 PM
      </p>
    </section>
  );
}

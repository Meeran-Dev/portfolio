import { useState, useEffect } from 'react';
import { useWM } from '../context/WindowManager.jsx';

const MESSAGES = [
  'Initializing kernel...',
  'Loading pixel shaders...',
  'Mounting file system...',
  'Starting ML runtime...',
  'Connecting to GitHub...',
  'Portfolio ready.',
];

export default function BootScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const { openWindow } = useWM();

  useEffect(() => {
    if (step >= MESSAGES.length) {
      const t = setTimeout(() => {
        onComplete();
        setTimeout(() => openWindow('about'), 200);
      }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep(s => s + 1), 320);
    return () => clearTimeout(t);
  }, [step, onComplete, openWindow]);

  const pct = Math.round((step / MESSAGES.length) * 100);

  return (
    <div className="boot">
      <div className="boot__logo">MEERAN.DEV</div>
      <div className="boot__subtitle">PORTFOLIO OS v1.0</div>

      <div className="boot__bar-wrap">
        <div className="boot__bar" style={{ width: `${pct}%` }} />
      </div>

      <div className="boot__msg">{MESSAGES[Math.min(step, MESSAGES.length - 1)]}</div>
    </div>
  );
}

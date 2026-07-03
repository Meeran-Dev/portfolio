import { useRef, useEffect } from 'react';

const STAR_COUNT = 130;

function makeStars(w, h) {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() < 0.75 ? 1 : 2,
    baseOpacity: 0.25 + Math.random() * 0.65,
    phase: Math.random() * Math.PI * 2,
    speed: 0.008 + Math.random() * 0.025,
  }));
}

export default function StarsCanvas() {
  const canvasRef = useRef(null);
  const starsRef  = useRef([]);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      starsRef.current = makeStars(canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      // Nebula glows
      [
        { cx: w * 0.18, cy: h * 0.4,  r: w * 0.32, c: 'rgba(109,40,217,0.07)'  },
        { cx: w * 0.82, cy: h * 0.25, r: w * 0.28, c: 'rgba(139,92,246,0.055)' },
        { cx: w * 0.55, cy: h * 0.78, r: w * 0.22, c: 'rgba(167,139,250,0.05)' },
      ].forEach(({ cx, cy, r, c }) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, c);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });

      // Stars
      starsRef.current.forEach(s => {
        s.phase += s.speed;
        const opacity = s.baseOpacity * (0.55 + 0.45 * Math.sin(s.phase));
        ctx.fillStyle = `rgba(196,181,253,${opacity.toFixed(3)})`;
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="desktop__canvas"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

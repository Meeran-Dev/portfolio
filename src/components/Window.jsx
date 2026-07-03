import { useRef, useEffect } from 'react';
import { useWM, CONFIGS } from '../context/WindowManager.jsx';

const DIRS = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

function renderWindowIcon(icon) {
  if (!icon) return '📄';
  const isImagePath = typeof icon === 'string' && /\.(png|jpe?g|gif|svg|webp|bmp|avif)(\?.*)?$/i.test(icon);
  if (typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('data:') || icon.startsWith('.') || icon.startsWith('http') || isImagePath)) {
    return <img src={icon} alt="" className="win-title__icon" />;
  }
  return icon;
}

export default function Window({ id, children }) {
  const { windows, focusedId, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateBounds } = useWM();
  const win       = windows[id];
  const isFocused = focusedId === id;
  const cfg       = CONFIGS[id] || {};
  const title     = win?.title || cfg.title || 'window';
  const icon      = win?.icon || cfg.icon || '📄';

  // Use refs to avoid stale closures in document event listeners
  const dragRef    = useRef(null);
  const resizeRef  = useRef(null);
  const boundsRef  = useRef(updateBounds);
  useEffect(() => { boundsRef.current = updateBounds; });

  useEffect(() => {
    const onMove = (e) => {
      if (dragRef.current) {
        const { sx, sy, sl, st } = dragRef.current;
        boundsRef.current(id, {
          x: Math.max(0, Math.min(sl + e.clientX - sx, window.innerWidth  - 160)),
          y: Math.max(0, Math.min(st + e.clientY - sy, window.innerHeight - 44 - 40)),
        });
      }
      if (resizeRef.current) {
        const { dir, sx, sy, sl, st, sw, sh } = resizeRef.current;
        const dx = e.clientX - sx, dy = e.clientY - sy;
        let x = sl, y = st, w = sw, h = sh;
        if (dir.includes('e')) w = Math.max(320, sw + dx);
        if (dir.includes('s')) h = Math.max(220, sh + dy);
        if (dir.includes('w')) { w = Math.max(320, sw - dx); x = sl + sw - w; }
        if (dir.includes('n')) { h = Math.max(220, sh - dy); y = st + sh - h; }
        boundsRef.current(id, { x, y, w, h });
      }
    };
    const onUp = () => { dragRef.current = null; resizeRef.current = null; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);
    };
  }, [id]);

  if (!win || win.minimized) return null;

  const style = win.maximized
    ? { left: 0, top: 0, width: '100%', height: '100%', zIndex: win.zIndex }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.zIndex };

  const onTitleDown = (e) => {
    if (e.target.closest('.win-btn')) return;
    if (win.maximized) return;
    e.preventDefault();
    dragRef.current = { sx: e.clientX, sy: e.clientY, sl: win.x, st: win.y };
  };

  const onResizeDown = (dir, e) => {
    e.preventDefault();
    e.stopPropagation();
    resizeRef.current = { dir, sx: e.clientX, sy: e.clientY, sl: win.x, st: win.y, sw: win.w, sh: win.h };
  };

  return (
    <div
      className={`window${isFocused ? ' focused' : ''}`}
      style={{ position: 'absolute', ...style }}
      onMouseDown={() => focusWindow(id)}
    >
      {/* ── Title bar ── */}
      <div className="win-titlebar" onMouseDown={onTitleDown}>
        <span className="win-title">
          {renderWindowIcon(icon)}
          <span>{title}</span>
        </span>
        <div className="win-controls">
          <button className="win-btn minimize" onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} title="Minimize" />
          <button className="win-btn maximize" onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }} title="Maximize" />
          <button className="win-btn close"    onClick={(e) => { e.stopPropagation(); closeWindow(id); }} title="Close" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="win-content">{children}</div>

      {/* ── Resize handles ── */}
      {!win.maximized && DIRS.map(dir => (
        <div key={dir} className={`rh ${dir}`} onMouseDown={(e) => onResizeDown(dir, e)} />
      ))}
    </div>
  );
}

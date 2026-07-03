import { useEffect, useRef } from 'react';

export default function ContextMenu({ x, y, items, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = () => onClose();
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  // Keep menu inside viewport
  const style = { left: x, top: y };
  if (ref.current) {
    const { offsetWidth: w, offsetHeight: h } = ref.current;
    if (x + w > window.innerWidth)  style.left = x - w;
    if (y + h > window.innerHeight) style.top  = y - h;
  }

  return (
    <div ref={ref} className="ctx" style={{ position: 'fixed', ...style }} onMouseDown={e => e.stopPropagation()}>
      {items.map((item, i) =>
        item === 'sep' ? (
          <div key={i} className="ctx__sep" />
        ) : (
          <div key={i} className="ctx__item" onClick={() => { item.action(); onClose(); }}>
            {item.label}
          </div>
        )
      )}
    </div>
  );
}

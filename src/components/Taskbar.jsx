import { useState, useEffect } from 'react';
import { useWM, CONFIGS } from '../context/WindowManager.jsx';

function renderTaskbarIcon(icon) {
  if (!icon) return '📄';
  const isImagePath = typeof icon === 'string' && /\.(png|jpe?g|gif|svg|webp|bmp|avif)(\?.*)?$/i.test(icon);
  if (typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('data:') || icon.startsWith('.') || icon.startsWith('http') || isImagePath)) {
    return <img src={icon} alt="" className="taskbar__icon" />;
  }
  return icon;
}

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="taskbar__clock">
      <div className="taskbar__time">{time}</div>
      <div className="taskbar__date">{date}</div>
    </div>
  );
}

export default function Taskbar() {
  const { windows, focusedId, openWindow, minimizeWindow, focusWindow } = useWM();

  const handleItemClick = (id) => {
    const win = windows[id];
    if (!win) return;
    if (win.minimized) {
      openWindow(id); // unminimize + focus
    } else if (focusedId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className="taskbar">
      <div className="taskbar__start">⊞ START</div>
      <div className="taskbar__sep" />

      <div className="taskbar__items">
        {Object.values(windows).map(({ id }) => {
          const cfg = CONFIGS[id];
          const isActive = focusedId === id && !windows[id].minimized;
          return (
            <div
              key={id}
              className={`taskbar__item${isActive ? ' active' : ''}`}
              onClick={() => handleItemClick(id)}
              title={cfg.title}
            >
              <span className="taskbar__item-icon">{renderTaskbarIcon(cfg.icon)}</span>
              <span>{cfg.title}</span>
            </div>
          );
        })}
      </div>

      <Clock />
    </div>
  );
}

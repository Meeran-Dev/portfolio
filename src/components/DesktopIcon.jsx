import { useState } from 'react';

function renderIcon(icon) {
  if (!icon) return '📁';
  if (typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('data:'))) {
    return <img src={icon} alt="icon" className="dicon__img" />;
  }
  return icon;
}

export default function DesktopIcon({ emoji, label, onOpen }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(true);
    setTimeout(() => setActive(false), 300);
  };

  return (
    <div
      className={`dicon${active ? ' active' : ''}`}
      onClick={handleClick}
      onDoubleClick={onOpen}
      title={`Double-click to open ${label}`}
    >
      <div className="dicon__emoji">{renderIcon(emoji)}</div>
      <div className="dicon__label">{label}</div>
    </div>
  );
}

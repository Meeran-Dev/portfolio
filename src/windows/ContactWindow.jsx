import { CONTACT } from '../data.js';

function renderIcon(icon) {
  if (!icon) return '📧';
  const isImagePath = typeof icon === 'string' && /\.(png|jpe?g|gif|svg|webp|bmp|avif)(\?.*)?$/i.test(icon);
  if (typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('data:') || icon.startsWith('.') || icon.startsWith('http') || isImagePath)) {
    return <img src={icon} alt="icon" className="contact-icon" />;
  }
  return icon;
}

export default function ContactWindow() {
  return (
    <div>
      <div className="sec-title">▸ CONTACT.CFG</div>
      <div style={{ fontSize: 7, color: 'var(--text-dim)', lineHeight: 2.2, marginBottom: 20 }}>
        Open to internships, collabs, and interesting conversations.
      </div>
      {CONTACT.map(({ platform, handle, url, icon }) => (
        <a key={platform} className="clink" href={url} target="_blank" rel="noreferrer">
          <div className="clink__icon">{renderIcon(icon)}</div>
          <div>
            <div className="clink__platform">{platform}</div>
            <div className="clink__handle">{handle}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

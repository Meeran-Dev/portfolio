import { ABOUT } from '../data.js';

function renderIcon(icon) {
  if (!icon) return '🧑‍💻';
  const isImagePath = typeof icon === 'string' && /\.(png|jpe?g|gif|svg|webp|bmp|avif)(\?.*)?$/i.test(icon);
  if (typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('data:') || icon.startsWith('.') || icon.startsWith('http') || isImagePath)) {
    return <img src={icon} alt="profile" className="profile-icon" />;
  }
  return icon;
}

export default function AboutWindow() {
  return (
    <div>
      {/* Header */}
      <div className="about-header">
        <div className="about-avatar">{renderIcon(ABOUT.profileIcon)}</div>
        <div>
          <div className="about-name">{ABOUT.name}</div>
          <div className="about-role">▸ {ABOUT.title}</div>
          <div className="about-bio">{ABOUT.bio}</div>
        </div>
      </div>

      {/* Meta */}
      <div className="about-meta">
        📍 {ABOUT.location}&nbsp;&nbsp;·&nbsp;&nbsp;
        🎓 {ABOUT.education}&nbsp;&nbsp;·&nbsp;&nbsp;
        🐙 <a href="https://github.com/Meeran-Dev" target="_blank" rel="noreferrer" style={{ color: 'var(--lavender)', textDecoration: 'none', borderBottom: '1px solid var(--lavender-dk)' }}>
          {ABOUT.handle}
        </a>
      </div>

      {/* Tags */}
      <div className="tag-row">
        {ABOUT.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      {/* Status */}
      <div className="about-status">
        <div className="sec-title">▸ CURRENTLY</div>
        {ABOUT.status.map(line => (
          <div key={line} className="about-status__line">{line}</div>
        ))}
      </div>

      {/* Achievements */}
      <div className="about-achievements">
        <div className="sec-title">▸ ACHIEVEMENTS</div>
        {ABOUT.achievements.map(line => (
          <div key={line} className="about-achievements__line">{line}</div>
        ))}
      </div>
    </div>
  );
}

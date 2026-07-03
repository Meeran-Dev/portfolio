import { SKILLS } from '../data.js';

export default function SkillsWindow() {
  return (
    <div>
      <div className="sec-title">▸ SKILLS.DAT</div>
      {SKILLS.map(({ category, items, highlights }) => (
        <div key={category} className="skills-cat">
          <div className="skills-cat__name">▸ {category}</div>
          <div className="skills-grid">
            {items.map(skill => {
              const isHighlight = highlights.includes(skill);
              const isLearning  = category === 'Learning';
              return (
                <span
                  key={skill}
                  className={`chip${isHighlight ? ' hi' : ''}${isLearning ? ' learning' : ''}`}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 12, fontSize: 6, color: 'var(--text-muted)', lineHeight: 2 }}>
        <span className="chip hi" style={{ marginRight: 8 }}>highlighted</span> = primary skills
        &nbsp;&nbsp;
        <span className="chip learning" style={{ marginRight: 8 }}>pulsing</span> = currently learning
      </div>
    </div>
  );
}

import { PROJECTS } from '../data.js';

export default function ProjectsWindow() {
  return (
    <div>
      <div className="sec-title">▸ PROJECTS ({PROJECTS.length})</div>
      {PROJECTS.map((project) => (
        <div key={project.id} className="pcard">
          <div className="pcard__name">{project.name}</div>
          <div className="pcard__desc">{project.description}</div>
          <div className="pcard__tags">
            {project.tags.map((tag) => <span key={tag} className="pcard__tag">{tag}</span>)}
          </div>
          <div>
            <a className="pcard__link" href={project.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            {project.live && (
              <a className="pcard__link" href={project.live} target="_blank" rel="noreferrer" style={{ marginLeft: 14 }}>
                Live ↗
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

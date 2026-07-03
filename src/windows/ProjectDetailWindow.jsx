import { PROJECTS } from '../data.js';

export default function ProjectDetailWindow({ projectId }) {
  const project = PROJECTS.find((entry) => entry.id === projectId);

  if (!project) {
    return <div className="project-preview">Project not found.</div>;
  }

  return (
    <div className="project-preview">
      <div className="project-preview__header">
        <div className="project-preview__title">{project.name}</div>
      </div>
      <div className="project-preview__desc">{project.description}</div>
      <div className="pcard__tags">
        {project.tags.map((tag) => (
          <span key={tag} className="pcard__tag">{tag}</span>
        ))}
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
  );
}

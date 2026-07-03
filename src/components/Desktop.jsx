import { useState, useCallback } from 'react';
import { useWM, CONFIGS, ICON_ORDER } from '../context/WindowManager.jsx';
import StarsCanvas  from './StarsCanvas.jsx';
import DesktopIcon  from './DesktopIcon.jsx';
import ContextMenu  from './ContextMenu.jsx';
import Window       from './Window.jsx';

import AboutWindow    from '../windows/AboutWindow.jsx';
import ProjectsWindow from '../windows/ProjectsWindow.jsx';
import SkillsWindow   from '../windows/SkillsWindow.jsx';
import ContactWindow  from '../windows/ContactWindow.jsx';
import TerminalWindow from '../windows/TerminalWindow.jsx';

const WINDOW_CONTENT = {
  about:    <AboutWindow />,
  projects: <ProjectsWindow />,
  skills:   <SkillsWindow />,
  contact:  <ContactWindow />,
  terminal: <TerminalWindow />,
};

export default function Desktop() {
  const { windows, openWindow } = useWM();
  const [ctxMenu, setCtxMenu] = useState(null);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const ctxItems = [
    ...ICON_ORDER.map(id => ({
      label: (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <img src={CONFIGS[id].icon} alt="" className="ctx__icon" />
          <span>Open {CONFIGS[id].title}</span>
        </div>
      ),
      action: () => openWindow(id),
    })),
    'sep',
    { label: '⟳  Refresh', action: () => window.location.reload() },
  ];

  return (
    <div className="desktop" onContextMenu={handleContextMenu}>
      <StarsCanvas />
      <div className="desktop__grid" />

      {/* Desktop icons */}
      <div className="desktop__icons">
        {ICON_ORDER.map(id => (
          <DesktopIcon
            key={id}
            emoji={CONFIGS[id].icon}
            label={CONFIGS[id].title}
            onOpen={() => openWindow(id)}
          />
        ))}
      </div>

      {/* Open windows */}
      <div className="desktop__windows">
        {Object.keys(windows).map(id => (
          <Window key={id} id={id}>
            {WINDOW_CONTENT[id]}
          </Window>
        ))}
      </div>

      {/* Context menu */}
      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          items={ctxItems}
          onClose={() => setCtxMenu(null)}
        />
      )}
    </div>
  );
}

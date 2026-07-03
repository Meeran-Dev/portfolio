import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { FILE_ICONS } from '../data.js';

export const CONFIGS = {
  about:    { title: 'about_me.exe',  icon: FILE_ICONS.about, defaultW: 560, defaultH: 460 },
  projects: { title: 'projects/',      icon: FILE_ICONS.projects, defaultW: 640, defaultH: 540 },
  skills:   { title: 'skills.dat',     icon: FILE_ICONS.skills, defaultW: 500, defaultH: 460 },
  contact:  { title: 'contact.cfg',    icon: FILE_ICONS.contact, defaultW: 440, defaultH: 400 },
  terminal: { title: 'terminal.sh',    icon: FILE_ICONS.terminal, defaultW: 580, defaultH: 420 },
};

export const ICON_ORDER = ['about', 'projects', 'skills', 'contact', 'terminal'];

const WMContext = createContext(null);

export function WindowManagerProvider({ children }) {
  const [windows, setWindows] = useState({});
  const [focusedId, setFocusedId] = useState(null);
  const zRef = useRef(100);

  const openWindow = useCallback((id) => {
    zRef.current++;
    const z = zRef.current;
    setWindows(prev => {
      if (prev[id]) {
        return { ...prev, [id]: { ...prev[id], minimized: false, zIndex: z } };
      }
      const cfg = CONFIGS[id];
      const count = Object.keys(prev).length;
      const desktopW = window.innerWidth;
      const desktopH = window.innerHeight - 44;
      const x = Math.min(100 + count * 30, desktopW - cfg.defaultW - 20);
      const y = Math.min(50  + count * 30, desktopH - cfg.defaultH - 20);
      return {
        ...prev,
        [id]: { id, x, y, w: cfg.defaultW, h: cfg.defaultH, minimized: false, maximized: false, prevBounds: null, zIndex: z },
      };
    });
    setFocusedId(id);
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows(prev => { const n = { ...prev }; delete n[id]; return n; });
    setFocusedId(prev => (prev === id ? null : prev));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], minimized: true } }));
    setFocusedId(prev => (prev === id ? null : prev));
  }, []);

  const maximizeWindow = useCallback((id) => {
    setWindows(prev => {
      const win = prev[id];
      if (win.maximized) {
        return { ...prev, [id]: { ...win, maximized: false, ...(win.prevBounds || {}) } };
      }
      return { ...prev, [id]: { ...win, maximized: true, prevBounds: { x: win.x, y: win.y, w: win.w, h: win.h } } };
    });
  }, []);

  const focusWindow = useCallback((id) => {
    zRef.current++;
    const z = zRef.current;
    setFocusedId(id);
    setWindows(prev => (prev[id] ? { ...prev, [id]: { ...prev[id], zIndex: z } } : prev));
  }, []);

  const updateBounds = useCallback((id, bounds) => {
    setWindows(prev => (prev[id] ? { ...prev, [id]: { ...prev[id], ...bounds } } : prev));
  }, []);

  return (
    <WMContext.Provider value={{ windows, focusedId, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateBounds }}>
      {children}
    </WMContext.Provider>
  );
}

export const useWM = () => useContext(WMContext);

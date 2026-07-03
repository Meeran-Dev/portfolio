import { useState } from 'react';
import { WindowManagerProvider } from './context/WindowManager.jsx';
import BootScreen from './components/BootScreen.jsx';
import Desktop from './components/Desktop.jsx';
import Taskbar from './components/Taskbar.jsx';

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <WindowManagerProvider>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      <div className="app" style={{ opacity: booted ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Desktop />
        <Taskbar />
      </div>
    </WindowManagerProvider>
  );
}

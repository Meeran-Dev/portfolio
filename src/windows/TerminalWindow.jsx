import { useState, useRef, useEffect, useCallback } from 'react';
import { TERMINAL_COMMANDS } from '../data.js';

const PROMPT = 'meeran @ dev: ~$';

const WELCOME = [
  '══════════════════════════════════════',
  '   meeran.dev — v1.0                  ',
  '   Type "help" for available commands ',
  '══════════════════════════════════════',
];

export default function TerminalWindow() {
  const [history, setHistory]     = useState([]);
  const [input, setInput]         = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx]     = useState(-1);
  const outputRef = useRef(null);
  const inputRef  = useRef(null);

  // Auto-scroll on new output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when window is clicked
  const focusInput = () => inputRef.current?.focus();

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim();
    if (!cmd) return;

    // Save to command history
    setCmdHistory(prev => [cmd, ...prev.slice(0, 49)]);
    setHistIdx(-1);

    // Look up command
    const result = TERMINAL_COMMANDS[cmd.toLowerCase()];

    if (result?.type === 'clear') {
      setHistory([]);
      return;
    }

    const entry = { cmd, result: result ?? { type: 'error', output: `command not found: ${cmd}\nType 'help' for available commands.` } };

    // Matrix is generated fresh each time
    if (result?.type === 'matrix') {
      entry.result = { type: 'matrix', output: genMatrix() };
    }

    setHistory(prev => [...prev, entry]);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistIdx(i => {
        const next = Math.min(i + 1, cmdHistory.length - 1);
        setInput(cmdHistory[next] ?? '');
        return next;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistIdx(i => {
        const next = Math.max(i - 1, -1);
        setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
        return next;
      });
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const renderResponse = (result) => {
    if (!result) return null;
    if (result.type === 'list') {
      return result.output.map((line, i) => (
        <div key={i} className="term__response">{line}</div>
      ));
    }
    return <div className={`term__response ${result.type}`}>{result.output}</div>;
  };

  return (
    <div className="term" onClick={focusInput}>
      <div ref={outputRef} className="term__output">
        {/* Welcome banner */}
        <div className="term__welcome">
          {WELCOME.map((l, i) => <div key={i}>{l}</div>)}
        </div>

        {/* Command history */}
        {history.map((entry, i) => (
          <div key={i} className="term__entry">
            <div className="term__cmd-line">
              <span className="term__prompt">{PROMPT}</span>
              <span>&nbsp;{entry.cmd}</span>
            </div>
            {renderResponse(entry.result)}
          </div>
        ))}
      </div>

      {/* Input row */}
      <div className="term__input-row">
        <span className="term__prompt">{PROMPT}&nbsp;</span>
        <input
          ref={inputRef}
          className="term__input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}

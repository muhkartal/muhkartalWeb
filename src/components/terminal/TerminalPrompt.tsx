import React, { useState, useRef, useEffect } from 'react';

interface TerminalPromptProps {
  onCommand: (command: string) => void;
  history: string[];
}

export function TerminalPrompt({ onCommand, history }: TerminalPromptProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input);
      setInput('');
    }
  };

  // Keep focus on input
  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2 text-[#a9a9a9]">
      <span className="whitespace-nowrap">guest@muhkartal.dev:~$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none text-[#a9a9a9] font-terminal caret-[#a9a9a9]"
        autoFocus
        spellCheck={false}
        autoComplete="off"
      />
    </form>
  );
}


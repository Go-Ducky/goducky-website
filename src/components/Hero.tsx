"use client";

import { useEffect, useState } from "react";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "curl -fsSL https://goducky.dev/install | bash";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const copyCommand = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
          New — Now available on macOS, Windows, and Linux
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          The open source
          <br />
          <span className="gradient-text">AI coding agent</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Free models included or connect any model from any provider,
          <br className="hidden sm:block" />
          including Claude, GPT, Gemini and more.
        </p>

        <div className="max-w-xl mx-auto mb-12">
          <div
            className="terminal-window cursor-pointer"
            onClick={copyCommand}
          >
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span className="ml-2 text-xs text-gray-400">Terminal</span>
              <span className="ml-auto text-xs text-gray-500">
                {copied ? "Copied!" : "Click to copy"}
              </span>
            </div>
            <div className="terminal-content">
              <span className="terminal-prompt">$ </span>
              <span className="terminal-command">{typedText}</span>
              <span className="terminal-cursor" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <span className="px-3 py-1 rounded-md border border-border bg-secondary/30 font-mono text-xs">npm</span>
          <span className="px-3 py-1 rounded-md border border-border bg-secondary/30 font-mono text-xs">bun</span>
          <span className="px-3 py-1 rounded-md border border-border bg-secondary/30 font-mono text-xs">brew</span>
          <span className="px-3 py-1 rounded-md border border-border bg-secondary/30 font-mono text-xs">paru</span>
        </div>

        <div className="mt-16 relative max-w-4xl mx-auto">
          <div className="terminal-window animate-float">
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span className="ml-2 text-xs text-gray-400">GoDucky Terminal</span>
            </div>
            <div className="terminal-content text-left">
              <div className="mb-2">
                <span className="terminal-prompt">{"\u276F "} </span>
                <span className="text-purple-400">goducky</span>
                <span className="text-gray-400"> {"\u2014"}help</span>
              </div>
              <div className="mb-4 text-gray-400">
                <div className="ml-4">Starting GoDucky v1.0.0...</div>
                <div className="ml-4">Loading AI models...</div>
                <div className="ml-4 text-green-400">{"\u2713"} Ready</div>
              </div>
              <div className="mb-2">
                <span className="terminal-prompt">{"\u276F "} </span>
                <span className="text-gray-400">Help me refactor this component to use hooks</span>
              </div>
              <div className="ml-4 text-blue-300">
                <div>{"\u25CF"} Analyzing codebase...</div>
                <div>{"\u25CF"} Found 3 files to modify</div>
                <div className="text-green-300">{"\u25CF"} Changes applied successfully</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

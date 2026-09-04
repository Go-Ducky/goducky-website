"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

const tabs = [
  { id: "curl", label: "curl" },
  { id: "npm", label: "npm" },
  { id: "bun", label: "bun" },
  { id: "brew", label: "brew" },
  { id: "paru", label: "paru" },
];

const commands: Record<string, string> = {
  curl: "curl -fsSL https://goducky.dev/install | bash",
  npm: "npm install -g goducky-ai",
  bun: "bun install -g goducky-ai",
  brew: "brew install go-ducky/tap/goducky",
  paru: "paru -S goducky-bin",
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState("curl");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <section className="flex flex-col items-center pt-24 pb-16 px-4">
      <div className="inline-flex items-center gap-2 rounded bg-background-strong text-text-inverted text-xs px-2 py-1 mb-8">
        <span>[New]</span>
        <span>Introducing the GoDucky desktop app. Available on macOS, Windows, and Linux.</span>
        <a href="#" className="underline hover:opacity-80">
          Download now
        </a>
      </div>

      <h1 className="font-sans text-3xl sm:text-[38px] font-bold leading-tight text-text-strong mb-2">
        The open source AI coding agent
      </h1>

      <p className="text-text mb-8 max-w-[82%] text-center">
        Free models included or connect any model from any provider, including Claude, GPT, Gemini
        and more.
      </p>

      <div className="w-full max-w-xl">
        <div className="flex items-center bg-background-weak border border-border-weak rounded-t-md px-5 gap-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setCopied(false);
              }}
              className={`py-3 text-sm cursor-pointer ${
                activeTab === tab.id
                  ? "border-b-2 border-background-strong text-text-strong font-medium"
                  : "text-text-weak hover:text-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-background-weak border border-t-0 border-border-weak rounded-b-md p-4 flex items-center justify-between">
          <code className="font-mono text-sm text-text">{commands[activeTab]}</code>
          <button
            onClick={handleCopy}
            className="ml-4 p-1 rounded hover:bg-background-strong cursor-pointer text-text-weak hover:text-text"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    </section>
  );
}

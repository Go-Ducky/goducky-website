"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

const platforms = [
  {
    id: "mac-linux",
    label: "macOS & Linux",
    command:
      "curl -fsSL https://raw.githubusercontent.com/Go-Ducky/cli/main/scripts/install.sh | bash",
  },
  {
    id: "windows",
    label: "Windows",
    command:
      'irm https://raw.githubusercontent.com/Go-Ducky/cli/main/scripts/install.ps1 -OutFile "$env:TEMP\\goducky-install.ps1"\npowershell -ExecutionPolicy Bypass -File "$env:TEMP\\goducky-install.ps1"',
  },
];

export default function InstallCommands() {
  const [active, setActive] = useState("mac-linux");
  const [copied, setCopied] = useState(false);

  const current = platforms.find((p) => p.id === active) || platforms[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(current.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center bg-background-weak border border-border-weak rounded-t-md px-5 gap-10">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => {
              setActive(platform.id);
              setCopied(false);
            }}
            className={`py-3 text-sm cursor-pointer ${
              active === platform.id
                ? "border-b-2 border-background-strong text-text-strong font-medium"
                : "text-text-weak hover:text-text"
            }`}
          >
            {platform.label}
          </button>
        ))}
      </div>

      <div className="bg-background-weak border border-t-0 border-border-weak rounded-b-md p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-2 text-xs text-text-weak font-mono">
            <Terminal size={12} /> Install GoDucky
          </span>
          <button
            onClick={handleCopy}
            className="ml-4 p-1 rounded hover:bg-background-strong cursor-pointer text-text-weak hover:text-text"
            aria-label="Copy command"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap">
          <code className="text-sm text-text font-mono">{current.command}</code>
        </pre>
      </div>
    </div>
  );
}
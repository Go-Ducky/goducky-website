"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const commands = [
  {
    id: "update",
    label: "Update",
    title: "Update to the latest version",
    desc: "GoDucky checks for updates and installs the latest release.",
    command: "goducky update",
  },
  {
    id: "version",
    label: "Check version",
    title: "Check your current version",
    desc: "See what version of GoDucky you're running.",
    command: "goducky --version",
  },
];

export default function UpdateCommands() {
  const [active, setActive] = useState("update");
  const [copied, setCopied] = useState(false);

  const current = commands.find((c) => c.id === active) || commands[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(current.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section>
      <h2 className="text-base font-bold text-text-strong mb-4">
        How to update GoDucky
      </h2>
      <div className="border border-border-weak rounded-md overflow-hidden">
        <div className="flex items-center bg-background-weak border-b border-border-weak px-5 gap-10">
          {commands.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActive(c.id);
                setCopied(false);
              }}
              className={`py-3 text-sm cursor-pointer ${
                active === c.id
                  ? "border-b-2 border-background-strong text-text-strong font-medium"
                  : "text-text-weak hover:text-text"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-text-strong">
              {current.title}
            </h3>
            <button
              onClick={handleCopy}
              className="ml-4 p-1 rounded hover:bg-background-strong cursor-pointer text-text-weak hover:text-text"
              aria-label="Copy command"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <p className="text-xs text-text-weak mb-3">{current.desc}</p>
          <div className="bg-background-weak border border-border-weak rounded-md p-4 flex items-center gap-2">
            <RefreshCw size={14} className="text-text-weak shrink-0" />
            <code className="text-sm text-text font-mono">
              {current.command}
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
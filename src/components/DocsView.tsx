"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Search, Check, Copy } from "lucide-react";

interface DocSection {
  heading: string;
  paragraphs: string[];
  code?: string;
}

interface DocItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  content: DocSection[];
}

const DOCS: DocItem[] = [
  {
    id: "installation",
    category: "Getting Started",
    title: "Installation",
    desc: "Install GoDucky on macOS, Windows, or Linux",
    content: [
      {
        heading: "About GoDucky",
        paragraphs: [
          "GoDucky is a terminal-based AI coding agent written in Go. It reads, writes, and edits files, runs shell commands, and searches your codebase. One static binary that runs on Windows, macOS, and Linux.",
        ],
      },
      {
        heading: "macOS & Linux",
        paragraphs: [
          "One curl installer for both — it auto-detects your OS and CPU and adds goducky to your shell PATH (bash, zsh, fish, or ~/.profile). Open a new terminal and goducky just works.",
        ],
        code: "curl -fsSL https://raw.githubusercontent.com/Go-Ducky/cli/main/scripts/install.sh | bash",
      },
      {
        heading: "Windows",
        paragraphs: [
          "The installer downloads the right binary and adds it to your user PATH automatically (works in the current terminal too).",
        ],
        code: 'irm https://raw.githubusercontent.com/Go-Ducky/cli/main/scripts/install.ps1 -OutFile "$env:TEMP\\goducky-install.ps1"\npowershell -ExecutionPolicy Bypass -File "$env:TEMP\\goducky-install.ps1"',
      },
    ],
  },
  {
    id: "quickstart",
    category: "Getting Started",
    title: "Quick Start",
    desc: "Get up and running in under 2 minutes",
    content: [
      {
        heading: "Launch goDucky",
        paragraphs: [
          "Run goducky in any directory. The first run walks you through setup with simple menus (arrow keys / WASD): it can install Ollama and pull a local model for you. A list of recommended models is grouped by family (Qwen, Starcoder, Deepseek, Codegemma, Llama) — pick one and it's pulled automatically — or plug in a cloud API key. Groq is a good free starting point.",
        ],
        code: "goducky",
      },
      {
        heading: "One-shot prompt",
        paragraphs: [
          "Run a single prompt and exit without entering the interactive editor.",
        ],
        code: 'goducky -p "explain this repo"',
      },
      {
        heading: "List models",
        paragraphs: [
          "See every model available to a provider.",
        ],
        code: "goducky --models",
      },
    ],
  },
  {
    id: "configuration",
    category: "Getting Started",
    title: "Configuration",
    desc: "Configure GoDucky for your workflow",
    content: [
      {
        heading: "Config file",
        paragraphs: [
          "Settings live in ~/.config/goducky/config.json (or ~/Library/Application Support/goducky/config.json on macOS). Providers, models, and agent options are stored as plain JSON.",
        ],
      },
      {
        heading: "Edit from the TUI",
        paragraphs: [
          "Inside the TUI, /config shows your active provider and model. Use /config <key> <value> to edit — keys are dotted JSON paths (provider, ollama.host, agent.auto_approve) with friendly aliases: host, auto-approve (on/off), iterations, output, exclude. Provider and model changes apply immediately.",
        ],
        code: '/config agent.auto_approve true',
      },
    ],
  },
  {
    id: "flags",
    category: "CLI Reference",
    title: "Command-line Flags",
    desc: "All goducky flags and subcommands",
    content: [
      {
        heading: "Flags",
        paragraphs: [
          "goducky supports the following flags:",
        ],
        code: "goducky\n  -p string          Run a one-shot prompt and exit\n  -provider string   ollama | groq | openai | openai_compatible | anthropic | gemini | openrouter\n  -model string      Model name (overrides config)\n  -base-url string   Base URL for OpenAI-compatible endpoints\n  -key string        API key (overrides config/env)\n  -login string      Save an API key (groq|openai|openai_compatible|anthropic|gemini|openrouter)\n  -models            List available models and exit\n  -yes               Auto-approve all tool actions\n  -dir string        Working directory (default: current)\n  -version           Print version and exit",
      },
      {
        heading: "Subcommands",
        paragraphs: [
          "goducky also ships these subcommands:",
        ],
        code: "goducky completion <shell>   Print tab-completion (bash, zsh, fish, powershell)\ngoducky update [tag]        Self-update (or a specific tag)\ngoducky mcp [--dir <path>]  Run an MCP stdio server\ngoducky sessions            List saved chats\ngoducky resume <n-or-name>  Resume a saved chat\ngoducky rename <old> <new>  Rename a saved chat",
      },
    ],
  },
  {
    id: "tui-commands",
    category: "CLI Reference",
    title: "TUI Commands",
    desc: "Slash commands inside the terminal UI",
    content: [
      {
        heading: "In the TUI",
        paragraphs: [
          "While inside the interactive editor, these slash commands are available:",
        ],
        code: "/help           Show help\n/models         Pick a model for the current provider\n/config         Show configuration, then /config <key> <value> to edit\n/provider       Choose a provider interactively (or: /provider <name>)\n/model <name>   Set the model for the current provider (auto-pulls for Ollama)\n/pull <name>    Pull a model through Ollama (e.g. /pull qwen2.5-coder:7b)\n/rm <name>      Remove a local Ollama model\n/save <name>    Save this chat so you can resume it later\n/rename <name>  Rename the current chat\n/sessions       List saved chats (resume with goducky resume <n>)\n/github         Open the GoDucky repo in your browser\n/login          How to add a cloud API key\n/clear          Clear the conversation\n/exit           Quit",
      },
      {
        heading: "Navigation",
        paragraphs: [
          "Arrow up/down recalls previous prompts. Menus are navigated with arrow keys or WASD — Enter picks, Esc cancels. Ctrl+C or Ctrl+X quits. PageUp/PageDown scroll, and text is selectable with the mouse for normal copy/paste.",
        ],
      },
    ],
  },
  {
    id: "providers",
    category: "CLI Reference",
    title: "Providers & Models",
    desc: "Local Ollama or any cloud provider",
    content: [
      {
        heading: "Local models (Ollama)",
        paragraphs: [
          "GoDucky works with local models via Ollama.",
        ],
        code: "ollama pull qwen2.5-coder:7b\ngoducky --provider ollama --model qwen2.5-coder:7b",
      },
      {
        heading: "Cloud providers (API key)",
        paragraphs: [
          "Login once, then run with that provider. OpenRouter defaults to openrouter/free, which routes to any currently-free model.",
        ],
        code: "goducky --login groq\ngoducky --provider groq\n\ngoducky --login openrouter\ngoducky --provider openrouter",
      },
      {
        heading: "OpenAI-compatible endpoints",
        paragraphs: [
          "Any endpoint that speaks the OpenAI-compatible API works.",
        ],
        code: 'goducky --provider openai_compatible \\\n  --base-url http://localhost:1234/v1 \\\n  --model local-model',
      },
    ],
  },
  {
    id: "sessions",
    category: "CLI Reference",
    title: "Chat Sessions",
    desc: "Save, list, resume, and rename chats",
    content: [
      {
        heading: "Sessions are saved",
        paragraphs: [
          "Chats are saved automatically when you quit the TUI, so you can pick up where you left off. Untitled chats get a name like chat-2026-09-05-19-44.",
        ],
        code: "goducky sessions\ngoducky resume\ngoducky resume 2\ngoducky resume \"fix bug\"",
      },
      {
        heading: "Resume behavior",
        paragraphs: [
          "resume looks for an exact name first, then a name fragment, then a number. Sessions remember their provider, model, history, and working directory, so a resumed chat continues on the same model in the same project.",
        ],
      },
    ],
  },
  {
    id: "mcp",
    category: "CLI Reference",
    title: "MCP Server",
    desc: "Expose GoDucky tools to MCP clients",
    content: [
      {
        heading: "Run GoDucky as an MCP server",
        paragraphs: [
          "GoDucky can act as an MCP (Model Context Protocol) server over stdio, exposing its file/edit/bash/search tools to clients like Claude Desktop or AI IDEs.",
        ],
        code: "goducky mcp\ngoducky mcp --dir /path/to/project",
      },
      {
        heading: "Example: Claude Desktop",
        paragraphs: [
          "Add it to claude_desktop_config.json. The server auto-approves tool calls and only writes to stderr, keeping the stdio channel clean.",
        ],
        code: '{\n  "mcpServers": {\n    "goducky": { "command": "goducky", "args": ["mcp", "--dir", "/path/to/project"] }\n  }\n}',
      },
    ],
  },
  {
    id: "updating",
    category: "CLI Reference",
    title: "Updating",
    desc: "Update GoDucky to the newest release",
    content: [
      {
        heading: "Update",
        paragraphs: [
          "The updater downloads the matching binary for your OS/CPU from GitHub Releases, verifies its SHA-256 checksum, and replaces the current executable. On Windows the running binary is renamed aside first so you can update from within the app.",
        ],
        code: "goducky update\ngoducky update v1.0.0",
      },
    ],
  },
  {
    id: "completion",
    category: "CLI Reference",
    title: "Shell Completion",
    desc: "Tab completion for your shell",
    content: [
      {
        heading: "Generate a completion script",
        paragraphs: [
          "Completes all flags (--provider, --model, --login, ...) and offers provider values.",
        ],
        code: "goducky completion bash\ngoducky completion zsh\ngoducky completion fish\ngoducky completion powershell",
      },
      {
        heading: "Enable per shell",
        paragraphs: [
          "bash: source <(goducky completion bash) in ~/.bashrc. zsh: source <(goducky completion zsh) in ~/.zshrc. fish: goducky completion fish | source. PowerShell: goducky completion powershell | Out-String | Invoke-Expression in your $PROFILE.",
        ],
      },
    ],
  },
  {
    id: "uninstalling",
    category: "CLI Reference",
    title: "Uninstalling",
    desc: "Remove GoDucky from your system",
    content: [
      {
        heading: "macOS & Linux",
        paragraphs: [
          "Run the matching uninstall script — it removes the binary and the PATH entries the installer added, and asks whether to also delete your saved chats and config.",
        ],
        code: "curl -fsSL https://raw.githubusercontent.com/Go-Ducky/cli/main/scripts/uninstall.sh | bash",
      },
      {
        heading: "Windows",
        paragraphs: [
          "",
        ],
        code: 'irm https://raw.githubusercontent.com/Go-Ducky/cli/main/scripts/uninstall.ps1 -OutFile "$env:TEMP\\goducky-uninstall.ps1"\npowershell -ExecutionPolicy Bypass -File "$env:TEMP\\goducky-uninstall.ps1"',
      },
      {
        heading: "Manual removal",
        paragraphs: [
          "Or do it by hand: delete ~/.goducky/bin/goducky (or $HOME\\.goducky\\bin\\goducky.exe) and the PATH lines it added.",
        ],
      },
    ],
  },
  {
    id: "cli-interface",
    category: "Interfaces",
    title: "Command Line (CLI)",
    desc: "The GoDucky terminal agent — available now",
    content: [
      {
        heading: "Available now",
        paragraphs: [
          "The CLI is the full GoDucky terminal agent, released from the Go-Ducky/cli repository. Install it, then run goducky in any directory to start coding with AI assistance.",
        ],
      },
      {
        heading: "Get it",
        paragraphs: [
          "Head to the Download page for the one-line installers for macOS, Linux, and Windows.",
        ],
        code: "curl -fsSL https://raw.githubusercontent.com/Go-Ducky/cli/main/scripts/install.sh | bash",
      },
    ],
  },
  {
    id: "website",
    category: "Interfaces",
    title: "Website",
    desc: "GoDucky.org and this documentation",
    content: [
      {
        heading: "The website",
        paragraphs: [
          "The GoDucky website (goducky.org) is where you'll find downloads, docs, and the changelog. This documentation lives alongside the site, and both are maintained in the Go-Ducky/goducky-website repository.",
        ],
      },
      {
        heading: "Stay updated",
        paragraphs: [
          "Join the waitlist on the homepage to get early access invites and release announcements by email.",
        ],
      },
    ],
  },
  {
    id: "gui",
    category: "Interfaces",
    title: "GUI Desktop App",
    desc: "A graphic interface for GoDucky — coming soon",
    content: [
      {
        heading: "Coming soon",
        paragraphs: [
          "A GUI desktop app for GoDucky is in development. It will bring the same agent power to a visual interface on macOS, Windows, and Linux — with a chat window, agent panel, inline diffs, and built-in terminal.",
        ],
      },
      {
        heading: "Get notified",
        paragraphs: [
          "Join the waitlist on the homepage to be the first to know when the desktop app launches.",
        ],
      },
    ],
  },
];

const CATEGORY_ICONS: Record<string, string> = {
  "Getting Started": "🚀",
  "CLI Reference": "💻",
  Interfaces: "🖥️",
};

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="bg-background-weak border border-border-weak rounded-md overflow-hidden my-3">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-weak">
        <span className="text-xs text-text-weak font-mono">goducky</span>
        <button
          onClick={copy}
          className="p-1 rounded hover:bg-background-strong cursor-pointer text-text-weak hover:text-text"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-text font-mono">{code}</code>
      </pre>
    </div>
  );
}

export default function DocsView() {
  const [query, setQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    DOCS.map((d) => d.category).filter(
      (c, i, arr) => arr.indexOf(c) === i
    )
  );
  const [activeDoc, setActiveDoc] = useState<string>(DOCS[0].id);

  const categories = useMemo(() => {
    const map = new Map<string, DocItem[]>();
    for (const doc of DOCS) {
      const list = map.get(doc.category) || [];
      list.push(doc);
      map.set(doc.category, list);
    }
    return Array.from(map.entries());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map(([cat, items]) => [
        cat,
        items.filter(
          (doc) =>
            doc.title.toLowerCase().includes(q) ||
            doc.desc.toLowerCase().includes(q)
        ),
      ] as [string, DocItem[]])
      .filter(([, items]) => items.length > 0);
  }, [categories, query]);

  const active = DOCS.find((d) => d.id === activeDoc) || DOCS[0];

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-5">
      <h1 className="text-2xl font-bold mb-1">Documentation</h1>
      <p className="text-sm text-text-weak mb-6">
        Everything you need to get started with GoDucky.
      </p>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0">
          <div className="relative mb-4">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-weak"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search docs..."
              className="w-full bg-background-weak border border-border-weak rounded-md pl-9 pr-3 py-2 text-sm text-text placeholder:text-text-weak focus:outline-none focus:border-text-weak"
            />
          </div>

          <nav className="space-y-1">
            {filtered.map(([cat, items]) => {
              const expanded = expandedCategories.includes(cat);
              return (
                <div key={cat} className="border border-border-weak rounded-md overflow-hidden">
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-text-strong hover:bg-background-weak cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span>{CATEGORY_ICONS[cat]}</span>
                      {cat}
                    </span>
                    {expanded ? (
                      <ChevronDown size={14} className="text-text-weak" />
                    ) : (
                      <ChevronRight size={14} className="text-text-weak" />
                    )}
                  </button>
                  {expanded && (
                    <div className="border-t border-border-weak">
                      {items.map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => setActiveDoc(doc.id)}
                          className={`w-full text-left px-3 py-2 text-sm cursor-pointer no-underline transition-colors ${
                            activeDoc === doc.id
                              ? "bg-background-strong text-text-inverted"
                              : "text-text-weak hover:text-text-strong hover:bg-background-weak"
                          }`}
                        >
                          {doc.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          <article className="max-w-2xl">
            <h2 className="text-xl font-bold text-text-strong mb-1">
              {active.title}
            </h2>
            <p className="text-sm text-text-weak mb-6">{active.desc}</p>

            {active.content.map((section, i) => (
              <section key={i} className="mb-8">
                <h3 className="text-base font-bold text-text-strong mb-2">
                  {section.heading}
                </h3>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-text mb-3 leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.code && <CodeBlock code={section.code} />}
              </section>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}
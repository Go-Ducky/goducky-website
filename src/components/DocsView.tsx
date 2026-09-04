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
        heading: "Requirements",
        paragraphs: [
          "GoDucky runs on macOS, Windows, and Linux. You need at least 4GB of RAM and 500MB of free disk space. The desktop app bundles everything you need — no separate runtime required.",
        ],
      },
      {
        heading: "Download the app",
        paragraphs: [
          "Download the installer for your platform from the Download page. The desktop app includes the full GoDucky experience: chat, agent, terminal, and all integrations.",
        ],
      },
      {
        heading: "Install via the CLI (coming soon)",
        paragraphs: [
          "A GoDucky CLI is in the works and will be published to the goducky-cli repository. Once it ships you'll be able to install it with a curl script or your package manager.",
        ],
        code: "curl -fsSL https://github.com/go-ducky/goducky-cli/releases/latest/download/install.sh | bash",
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
        heading: "Launch GoDucky",
        paragraphs: [
          "Open the GoDucky app and sign in with your GoDucky account. On first launch you'll be asked to pick a model provider — free models are included out of the box.",
        ],
      },
      {
        heading: "Pick a model",
        paragraphs: [
          "Choose a bundled free model to start instantly, or connect your own provider key (Claude, GPT, Gemini, and more). You can switch providers at any time from Settings.",
        ],
      },
      {
        heading: "Start your first task",
        paragraphs: [
          "Open a folder in the agent panel and paste a prompt. GoDucky will read the codebase, plan the change, and apply edits you can review before accepting.",
        ],
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
        heading: "Settings",
        paragraphs: [
          "Open Settings to configure your provider keys, default model, theme, and keyboard shortcuts. All settings sync across devices when you're signed in.",
        ],
      },
      {
        heading: "goducky.json",
        paragraphs: [
          "Project-level configuration lives in a goducky.json file at your project root. You can pin the model, define rules, and toggle features per repository.",
        ],
        code: '{\n  "model": "claude-sonnet-4-5",\n  "rules": [".cursorrules"],\n  "disableTelemetry": true\n}',
      },
    ],
  },
  {
    id: "gui",
    category: "Interfaces",
    title: "GUI Desktop App",
    desc: "Use GoDucky as a native desktop application",
    content: [
      {
        heading: "The desktop app",
        paragraphs: [
          "The GUI desktop app is the primary way to use GoDucky. It provides a chat window, an agent panel for multi-file edits, a built-in terminal, and inline code diffs.",
        ],
      },
      {
        heading: "Keyboard shortcuts",
        paragraphs: [
          "Use Cmd/Ctrl+K to open the command palette, Cmd/Ctrl+Enter to run an agent task, and Cmd/Ctrl+I to toggle inline edits in supported editors.",
        ],
      },
    ],
  },
  {
    id: "webui",
    category: "Interfaces",
    title: "Web UI",
    desc: "Access GoDucky through your browser",
    content: [
      {
        heading: "Browser access",
        paragraphs: [
          "The Web UI gives you the same chat and agent experience in the browser. It's great for quick questions, pairing sessions, and working from machines without a desktop install.",
        ],
      },
      {
        heading: "Sessions sync",
        paragraphs: [
          "Conversations and agent sessions sync with your account, so you can start on desktop and continue in the browser seamlessly.",
        ],
      },
    ],
  },
  {
    id: "cli",
    category: "Interfaces",
    title: "Command Line (CLI)",
    desc: "Use GoDucky directly in your terminal",
    content: [
      {
        heading: "Coming soon",
        paragraphs: [
          "The GoDucky CLI is being prepared for release and will be published to the goducky-cli repository. It will let you run agents directly from your terminal and script them in CI.",
        ],
      },
      {
        heading: "Join the waitlist",
        paragraphs: [
          "Sign up on the homepage to get early access as soon as the CLI ships. We'll email you when the first release is available for download.",
        ],
      },
    ],
  },
  {
    id: "providers",
    category: "Providers",
    title: "Supported Models",
    desc: "View all supported LLM providers and models",
    content: [
      {
        heading: "Providers",
        paragraphs: [
          "GoDucky supports Anthropic (Claude), OpenAI (GPT), Google (Gemini), and open-weight models. Free tiers are included with your account for quick starts.",
        ],
      },
      {
        heading: "Bring your own key",
        paragraphs: [
          "Add a provider API key in Settings to use your own quota. Your keys are stored encrypted and never shared.",
        ],
      },
    ],
  },
  {
    id: "github-copilot",
    category: "Providers",
    title: "GitHub Copilot",
    desc: "Use your GitHub Copilot subscription",
    content: [
      {
        heading: "Copilot integration",
        paragraphs: [
          "If you have a GitHub Copilot subscription, you can point GoDucky at your Copilot credentials under Settings > Providers to reuse your existing quota.",
        ],
      },
    ],
  },
  {
    id: "local-models",
    category: "Providers",
    title: "Local Models",
    desc: "Connect local LLMs via Ollama or LM Studio",
    content: [
      {
        heading: "Ollama",
        paragraphs: [
          "Run models locally with Ollama and connect them in Settings > Providers > Local. GoDucky auto-detects models served on localhost.",
        ],
      },
      {
        heading: "LM Studio",
        paragraphs: [
          "LM Studio's local server is supported too. Start its server, then add the endpoint in GoDucky and pick any downloaded model.",
        ],
      },
    ],
  },
  {
    id: "mcp",
    category: "Advanced",
    title: "MCP Servers",
    desc: "Extend GoDucky with Model Context Protocol servers",
    content: [
      {
        heading: "What is MCP?",
        paragraphs: [
          "Model Context Protocol servers let GoDucky talk to external tools — browsers, databases, file systems, and more. Add MCP servers in Settings > MCP.",
        ],
      },
      {
        heading: "Example",
        paragraphs: [
          "Connect a filesystem MCP server to let the agent read and write files, or a database MCP to run queries while it plans changes.",
        ],
        code: '{"mcpServers": {"fs": {"command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]}}}',
      },
    ],
  },
  {
    id: "rules",
    category: "Advanced",
    title: "Custom Rules",
    desc: "Define custom behavior and coding rules",
    content: [
      {
        heading: "Rules files",
        paragraphs: [
          "Create .cursorrules or AGENTS.md files in your project to steer GoDucky's behavior: code style, testing conventions, and things to avoid.",
        ],
      },
      {
        heading: "Global rules",
        paragraphs: [
          "Set global rules in Settings to apply across every project, so your preferences follow you everywhere.",
        ],
      },
    ],
  },
  {
    id: "themes",
    category: "Advanced",
    title: "Themes",
    desc: "Customize the look and feel of GoDucky",
    content: [
      {
        heading: "Light and dark",
        paragraphs: [
          "GoDucky ships with light and dark themes, plus an automatic mode that follows your system. Set it in Settings > Appearance or with the toggle in the header.",
        ],
      },
      {
        heading: "Custom themes",
        paragraphs: [
          "More themes and custom accent colors are on the roadmap. Pull requests for new themes are welcome in the goducky-cli repository.",
        ],
      },
    ],
  },
];

const CATEGORY_ICONS: Record<string, string> = {
  "Getting Started": "🚀",
  Interfaces: "🖥️",
  Providers: "🔌",
  Advanced: "⚙️",
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
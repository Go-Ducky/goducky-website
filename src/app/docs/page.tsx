import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "GoDucky | Docs",
};

const docsSections = [
  {
    title: "Getting Started",
    items: [
      { name: "Installation", desc: "Install GoDucky on macOS, Windows, or Linux", href: "/docs/installation" },
      { name: "Quick Start", desc: "Get up and running in under 2 minutes", href: "/docs/quickstart" },
      { name: "Configuration", desc: "Configure GoDucky for your workflow", href: "/docs/configuration" },
    ],
  },
  {
    title: "Interfaces",
    items: [
      { name: "GUI Desktop App", desc: "Use GoDucky as a native desktop application", href: "/docs/gui" },
      { name: "Web UI", desc: "Access GoDucky through your browser", href: "/docs/webui" },
      { name: "Command Line (CLI)", desc: "Use GoDucky directly in your terminal", href: "/docs/cli" },
    ],
  },
  {
    title: "Providers",
    items: [
      { name: "Supported Models", desc: "View all supported LLM providers and models", href: "/docs/providers" },
      { name: "GitHub Copilot", desc: "Use your GitHub Copilot subscription", href: "/docs/github-copilot" },
      { name: "Local Models", desc: "Connect local LLMs via Ollama or LM Studio", href: "/docs/local-models" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { name: "MCP Servers", desc: "Extend GoDucky with Model Context Protocol servers", href: "/docs/mcp" },
      { name: "Custom Rules", desc: "Define custom behavior and coding rules", href: "/docs/rules" },
      { name: "Themes", desc: "Customize the look and feel of GoDucky", href: "/docs/themes" },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="text-2xl font-bold mb-2">Documentation</h1>
          <p className="text-sm text-text-weak mb-8">Everything you need to get started with GoDucky.</p>

          <div className="space-y-10">
            {docsSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-base font-bold text-text-strong mb-4">{section.title}</h2>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between p-3 rounded hover:bg-background-weak transition-colors no-underline group"
                    >
                      <div>
                        <div className="text-sm text-text-strong font-medium">{item.name}</div>
                        <div className="text-xs text-text-weak">{item.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-weak group-hover:text-text-strong transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

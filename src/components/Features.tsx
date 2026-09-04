import {
  Code2,
  Share2,
  GitBranch,
  Plug,
  Layers,
  Monitor,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "LSP enabled",
    description: "Automatically loads the right LSPs for the LLM",
  },
  {
    icon: Layers,
    title: "Multi-session",
    description: "Start multiple agents in parallel on the same project",
  },
  {
    icon: Share2,
    title: "Share links",
    description: "Share a link to any session for reference or to debug",
  },
  {
    icon: GitBranch,
    title: "GitHub Copilot",
    description: "Log in with GitHub to use your Copilot account",
  },
  {
    icon: MessageSquare,
    title: "Any model",
    description: "75+ LLM providers through Models.dev, including local models",
  },
  {
    icon: Plug,
    title: "MCP support",
    description: "Connect to any MCP server for extended capabilities",
  },
  {
    icon: Monitor,
    title: "Any editor",
    description: "Available as a terminal interface, desktop app, and IDE extension",
  },
];

export function Features() {
  return (
    <section id="docs" className="py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            What is GoDucky?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            GoDucky is an open source agent that helps you write code in your terminal, IDE, or desktop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-all duration-300 card-glow"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#download"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Read docs
          </a>
        </div>
      </div>
    </section>
  );
}

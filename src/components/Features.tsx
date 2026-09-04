import { ArrowRight } from "lucide-react";

const features = [
  {
    name: "LSP enabled",
    description: "Automatically loads the right LSPs for the LLM",
  },
  {
    name: "Multi-session",
    description: "Start multiple agents in parallel on the same project",
  },
  {
    name: "Share links",
    description: "Share a link to any session for reference or to debug",
  },
  {
    name: "GitHub Copilot",
    description: "Log in with GitHub to use your Copilot account",
  },
  {
    name: "Any model",
    description: "75+ LLM providers through Models.dev, including local models",
  },
  {
    name: "MCP support",
    description: "Connect to any MCP server for extended capabilities",
  },
  {
    name: "Any interface",
    description: "Available as a GUI, WebUI, and CLI",
  },
];

export default function Features() {
  return (
    <section className="section">
      <div className="max-w-3xl mx-auto px-5">
        <h3 className="text-base font-bold text-text-strong mb-3 font-sans">
          What is GoDucky?
        </h3>
        <p className="text-text mb-8">
          GoDucky is an open source agent that helps you write code in your GUI,
          WebUI, and CLI.
        </p>
        <div>
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex items-start gap-3 mb-1"
              style={{ lineHeight: "1.75" }}
            >
              <span className="text-icon flex-shrink-0">[*]</span>
              <p>
                <strong className="font-medium text-text-strong mr-3">
                  {feature.name}
                </strong>
                <span className="text-text">{feature.description}</span>
              </p>
            </div>
          ))}
        </div>
        <a href="/docs" className="btn-primary mt-8 inline-flex items-center gap-2">
          Read docs
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

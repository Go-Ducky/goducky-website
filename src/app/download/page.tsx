import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GoDucky | Download",
};

const platforms = [
  {
    name: "macOS",
    icon: "Mac",
    commands: [
      { label: "curl", command: "curl -fsSL https://goducky.dev/install | bash" },
      { label: "brew", command: "brew install go-ducky/tap/goducky" },
    ],
    note: "Also available as .dmg download",
  },
  {
    name: "Windows",
    icon: "Win",
    commands: [
      { label: "curl (WSL)", command: "curl -fsSL https://goducky.dev/install | bash" },
      { label: "npm", command: "npm install -g goducky-ai" },
    ],
    note: "Recommended: Use WSL for the best experience",
  },
  {
    name: "Linux",
    icon: "Linux",
    commands: [
      { label: "curl", command: "curl -fsSL https://goducky.dev/install | bash" },
      { label: "npm", command: "npm install -g goducky-ai" },
      { label: "paru", command: "paru -S goducky-bin" },
    ],
    note: "Available for all major distributions",
  },
];

export default function DownloadPage() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="text-2xl font-bold mb-2">Download GoDucky</h1>
          <p className="text-sm text-text-weak mb-8">Install GoDucky on your platform. Available as a GUI desktop app, WebUI, and CLI.</p>

          <div className="space-y-8">
            {platforms.map((platform) => (
              <div key={platform.name} className="border border-border-weak rounded-md overflow-hidden">
                <div className="bg-background-weak px-5 py-3 border-b border-border-weak">
                  <h3 className="text-sm font-bold text-text-strong">{platform.name}</h3>
                </div>
                <div className="p-5 space-y-3">
                  {platform.commands.map((cmd) => (
                    <div key={cmd.label} className="flex items-center gap-3">
                      <span className="text-xs text-text-weak w-16 flex-shrink-0">{cmd.label}</span>
                      <code className="text-sm text-text font-mono bg-background-weak px-3 py-1 rounded flex-1 overflow-x-auto">
                        {cmd.command}
                      </code>
                    </div>
                  ))}
                  <p className="text-xs text-text-weak mt-2">{platform.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 border border-border-weak rounded-md">
            <h3 className="text-sm font-bold text-text-strong mb-2">Docker</h3>
            <div className="flex items-center gap-3">
              <code className="text-sm text-text font-mono bg-background-weak px-3 py-1 rounded flex-1">
                docker run -it --rm ghcr.io/go-ducky/goducky
              </code>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

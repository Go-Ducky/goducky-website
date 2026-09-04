import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";

export const metadata = {
  title: "GoDucky | About",
};

const socials = [
  {
    label: "Website",
    value: "lordpipon.com",
    href: "https://lordpipon.com",
  },
  {
    label: "Bluesky",
    value: "@lordpipon.com",
    href: "https://bsky.app/profile/lordpipon.com",
  },
  {
    label: "YouTube",
    value: "@piponidlo",
    href: "https://youtube.com/@piponidlo",
  },
  {
    label: "TikTok",
    value: "@lordpipon",
    href: "https://tiktok.com/@lordpipon",
  },
  {
    label: "Discord",
    value: "@piponidlo",
    href: "https://discord.gg/piponidlo",
  },
  {
    label: "GitHub",
    value: "github.com/lordpipon",
    href: "https://github.com/lordpipon",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="text-2xl font-bold mb-2">About GoDucky</h1>
          <p className="text-sm text-text-weak mb-10">
            The open source AI coding agent. Built by developers, for developers.
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="text-base font-bold text-text-strong mb-3 font-sans">
                Our Mission
              </h2>
              <p className="text-sm leading-relaxed mb-3">
                GoDucky is an open source AI coding agent that helps you write,
                understand, and refactor code — available as a GUI desktop app,
                a WebUI, and a CLI. Our goal is to put reliable, privacy-first
                AI coding assistance in every developer&apos;s hands, for free,
                and to make it work with any model you already pay for.
              </p>
              <p className="text-sm leading-relaxed">
                We built GoDucky because we believe AI coding tools should be
                open, trustworthy, and let you keep full control of your data —
                without tying you to a single provider.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-text-strong mb-3 font-sans">
                Meet the Founder &amp; Main Developer
              </h2>

              <div className="flex flex-col sm:flex-row items-start gap-5 p-6 border border-border-weak rounded-md bg-background-weak">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-background-strong text-text-inverted font-bold text-2xl shrink-0">
                  L
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-text-strong text-sm font-sans">
                    lordpipon
                  </h3>
                  <p className="text-sm text-text-weak mb-3">
                    Founder &amp; Main Developer
                  </p>
                  <p className="text-sm leading-relaxed mb-4">
                    lordpipon is the creator and lead maintainer of GoDucky,
                    overseeing the architecture, the GUI, WebUI, and CLI
                    interfaces, and the overall vision for a privacy-first,
                    provider-agnostic AI coding agent.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-text-weak hover:text-text-strong no-underline transition-colors"
                      >
                        <span className="text-text-weaker w-16 shrink-0">
                          {s.label}
                        </span>
                        <span className="truncate">{s.value}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-text-strong mb-3 font-sans">
                Contact
              </h2>
              <p className="text-sm leading-relaxed mb-3">
                Have a question, a bug report, or an idea? We&apos;d love to
                hear from you.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:goduckysupport@proton.me"
                  className="inline-flex items-center gap-2 text-sm text-text-weak hover:text-text-strong no-underline transition-colors w-fit btn-secondary"
                >
                  <Mail size={16} />
                  goduckysupport@proton.me
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

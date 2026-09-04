import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="hidden md:flex border-t border-border-weak">
        <a
          href="https://github.com/go-ducky"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-5 text-sm border-l border-border-weak first:border-l-0 text-text-weak hover:text-text-strong hover:bg-background-weak transition-colors no-underline"
        >
          GitHub
        </a>
        <Link
          href="/docs"
          className="flex-1 text-center py-5 text-sm border-l border-border-weak text-text-weak hover:text-text-strong hover:bg-background-weak transition-colors no-underline"
        >
          Docs
        </Link>
        <Link
          href="/about"
          className="flex-1 text-center py-5 text-sm border-l border-border-weak text-text-weak hover:text-text-strong hover:bg-background-weak transition-colors no-underline"
        >
          About
        </Link>
        <a
          href="https://discord.gg/piponidlo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-5 text-sm border-l border-border-weak text-text-weak hover:text-text-strong hover:bg-background-weak transition-colors no-underline"
        >
          Discord
        </a>
        <a
          href="https://lordpipon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-5 text-sm border-l border-border-weak text-text-weak hover:text-text-strong hover:bg-background-weak transition-colors no-underline"
        >
          Founder
        </a>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between py-5 px-5 text-xs text-text-weak border-t border-border-weak gap-2">
        <span>©2026 GoDucky</span>
        <a
          href="mailto:goduckysupport@proton.me"
          className="text-text-weak hover:text-text-strong no-underline transition-colors"
        >
          Contact: goduckysupport@proton.me
        </a>
        <div className="flex gap-4">
          <Link
            href="/privacy"
            className="text-text-weak hover:text-text-strong no-underline transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-text-weak hover:text-text-strong no-underline transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/about"
            className="text-text-weak hover:text-text-strong no-underline transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
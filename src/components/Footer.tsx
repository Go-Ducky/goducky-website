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
        <a
          href="#"
          className="flex-1 text-center py-5 text-sm border-l border-border-weak text-text-weak hover:text-text-strong hover:bg-background-weak transition-colors no-underline"
        >
          Changelog
        </a>
        <a
          href="#"
          className="flex-1 text-center py-5 text-sm border-l border-border-weak text-text-weak hover:text-text-strong hover:bg-background-weak transition-colors no-underline"
        >
          Discord
        </a>
        <a
          href="#"
          className="flex-1 text-center py-5 text-sm border-l border-border-weak text-text-weak hover:text-text-strong hover:bg-background-weak transition-colors no-underline"
        >
          X
        </a>
      </div>

      <div className="flex items-center justify-between py-5 px-5 text-xs text-text-weak border-t border-border-weak">
        <span>©2026 GoDucky</span>
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
          <a
            href="#"
            className="text-text-weak hover:text-text-strong no-underline transition-colors"
          >
            Brand
          </a>
        </div>
      </div>
    </footer>
  );
}
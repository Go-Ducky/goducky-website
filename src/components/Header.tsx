"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 h-20 flex items-center justify-between px-5 border-b border-border-weak bg-background">
      <Link href="/" className="flex items-center gap-2 no-underline">
        <img
          src="/logo.jpeg"
          alt="GoDucky"
          className="w-[34px] h-[34px] rounded object-cover"
        />
        <span className="font-sans font-bold text-lg text-text-strong">
          GoDucky
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-5">
        <a
          href="https://github.com/go-ducky"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text-weak hover:text-text-strong no-underline"
        >
          GitHub
        </a>
        <a
          href="#docs"
          className="text-sm text-text-weak hover:text-text-strong no-underline"
        >
          Docs
        </a>
        <Link
          href="/about"
          className="text-sm text-text-weak hover:text-text-strong no-underline"
        >
          About
        </Link>
        <Link
          href="/download"
          className="btn-primary flex items-center gap-2"
        >
          <Download size={16} />
          Download
        </Link>
        <ThemeToggle />
      </nav>

      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-background border-b border-border-weak p-5 flex flex-col gap-4 md:hidden">
          <a
            href="https://github.com/go-ducky"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-weak hover:text-text-strong no-underline"
            onClick={() => setMenuOpen(false)}
          >
            GitHub
          </a>
          <a
            href="#docs"
            className="text-sm text-text-weak hover:text-text-strong no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Docs
          </a>
          <Link
            href="/about"
            className="text-sm text-text-weak hover:text-text-strong no-underline"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/download"
            className="btn-primary flex items-center gap-2 w-fit"
            onClick={() => setMenuOpen(false)}
          >
            <Download size={16} />
            Download
          </Link>
        </div>
      )}
    </header>
  );
}

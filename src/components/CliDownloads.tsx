"use client";

import { useEffect, useState } from "react";
import {
  Download,
  RefreshCw,
  ExternalLink,
  GitCommit,
  Copy,
  Check,
  Terminal,
} from "lucide-react";

interface Asset {
  name: string;
  size: number;
  downloadUrl: string;
  kind: "install-script" | "binary" | "archive" | "other";
}

interface LatestCommit {
  sha: string;
  message: string;
  date: string;
  url: string;
}

interface CliData {
  available: boolean;
  source?: "release" | "repo";
  repoUrl: string;
  branch?: string;
  tag?: string;
  publishedAt?: string;
  notes?: string;
  latestCommit?: LatestCommit;
  installCommand?: string;
  assets?: Asset[];
  updatedAt?: string;
}

const REFRESH_INTERVAL = 60000; // 60s

function formatSize(bytes: number) {
  if (!bytes) return "";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(1)} ${units[i]}`;
}

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const KIND_LABEL: Record<Asset["kind"], string> = {
  "install-script": "Install script",
  binary: "Binary",
  archive: "Archive",
  other: "File",
};

function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="border border-border-weak rounded-md overflow-hidden mb-6">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-weak bg-background-weak">
        <span className="flex items-center gap-2 text-xs text-text-weak font-mono">
          <Terminal size={12} /> Install with curl
        </span>
        <button
          onClick={copy}
          className="p-1 rounded hover:bg-background-strong cursor-pointer text-text-weak hover:text-text"
          aria-label="Copy install command"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-text font-mono">{command}</code>
      </pre>
    </div>
  );
}

export default function CliDownloads() {
  const [data, setData] = useState<CliData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch("/api/cli-releases", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      setData(json);
    } catch {
      // leave as unavailable
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="border border-border-weak rounded-md p-6 text-center">
        <p className="text-sm text-text-weak">
          Checking for latest push...
        </p>
      </div>
    );
  }

  if (!data || !data.available) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center">
        <h1 className="text-2xl font-bold mb-3">GoDucky CLI</h1>
        <p className="text-text-weak mb-2">
          Under construction. Coming soon.
        </p>
        <p className="text-xs text-text-weak mb-4">
          Push install scripts or binaries to
          <a
            href="https://github.com/go-ducky/goducky-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-strong ml-1 no-underline hover:underline"
          >
            github.com/go-ducky/goducky-cli
          </a>{" "}
          and this page will pick them up automatically.
        </p>
        <a
          href="https://github.com/go-ducky/goducky-cli"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-4 no-underline"
        >
          Follow the repo on GitHub
        </a>
      </div>
    );
  }

  const assets = data.assets || [];

  return (
    <>
      <h1 className="text-2xl font-bold mb-1">GoDucky CLI</h1>
      <div className="flex items-center gap-2 text-sm text-text-weak mb-6">
        <span>
          {data.source === "release"
            ? `Latest release: ${data.tag}`
            : `Synced to latest push on ${data.branch || "main"}`}
        </span>
        <span className="text-text-weak">·</span>
        <span>updated {formatDate(data.updatedAt)}</span>
        <button
          onClick={load}
          className="p-1 rounded hover:bg-background-weak cursor-pointer text-text-weak hover:text-text-strong"
          aria-label="Refresh"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {data.installCommand && (
        <InstallCommand command={data.installCommand} />
      )}

      {data.latestCommit && (
        <a
          href={data.latestCommit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-text-weak no-underline hover:text-text-strong mb-6 px-3 py-2 border border-border-weak rounded-md bg-background-weak"
        >
          <GitCommit size={12} className="shrink-0" />
          <span className="font-mono">{data.latestCommit.sha.slice(0, 7)}</span>
          <span className="truncate">{data.latestCommit.message}</span>
          <span className="shrink-0">{formatDate(data.latestCommit.date)}</span>
          <ExternalLink size={12} className="shrink-0" />
        </a>
      )}

      {data.notes && (
        <div className="text-sm text-text mb-5 whitespace-pre-line">
          {data.notes}
        </div>
      )}

      <div className="border border-border-weak rounded-md overflow-hidden">
        <div className="bg-background-weak px-5 py-3 border-b border-border-weak flex items-center justify-between">
          <h3 className="text-sm font-bold text-text-strong">
            {data.source === "release"
              ? `Release ${data.tag}`
              : "Files from the latest push"}
          </h3>
          <a
            href={data.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-weak hover:text-text-strong flex items-center gap-1 no-underline"
          >
            GitHub <ExternalLink size={12} />
          </a>
        </div>
        <div className="p-5">
          {assets.length > 0 ? (
            <div className="space-y-2">
              {assets.map((asset) => (
                <a
                  key={asset.name}
                  href={asset.downloadUrl}
                  download
                  className="flex items-center justify-between gap-3 p-3 border border-border-weak rounded no-underline hover:bg-background-weak transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Download size={16} className="text-text-weak shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-text-strong truncate">
                        {asset.name}
                      </div>
                      <div className="text-xs text-text-weak">
                        {KIND_LABEL[asset.kind]}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-text-weak shrink-0">
                    {formatSize(asset.size)}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-weak">
              No files found on the latest push yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Download, RefreshCw, ExternalLink } from "lucide-react";

interface Asset {
  name: string;
  size: number;
  downloadUrl: string;
  contentType: string;
}

interface ReleaseData {
  available: boolean;
  repoUrl: string;
  tag?: string;
  name?: string;
  publishedAt?: string;
  notes?: string;
  assets?: Asset[];
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

export default function CliDownloads() {
  const [data, setData] = useState<ReleaseData | null>(null);
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
        <p className="text-sm text-text-weak">Checking for latest release...</p>
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

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">GoDucky CLI</h1>
      <div className="flex items-center gap-2 text-sm text-text-weak mb-6">
        <span>Latest release: {data.tag}</span>
        <button
          onClick={load}
          className="p-1 rounded hover:bg-background-weak cursor-pointer text-text-weak hover:text-text-strong"
          aria-label="Refresh releases"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="border border-border-weak rounded-md overflow-hidden">
        <div className="bg-background-weak px-5 py-3 border-b border-border-weak flex items-center justify-between">
          <h3 className="text-sm font-bold text-text-strong">
            {data.name || data.tag}
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
          {data.notes && (
            <div className="text-sm text-text mb-5 whitespace-pre-line">
              {data.notes}
            </div>
          )}

          {data.assets && data.assets.length > 0 ? (
            <div className="space-y-2">
              {data.assets.map((asset) => (
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
                      {asset.contentType === "text/plain" && (
                        <div className="text-xs text-text-weak">
                          Curl install script
                        </div>
                      )}
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
              No downloadable assets in this release yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

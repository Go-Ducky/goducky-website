"use client";

import { useEffect, useState } from "react";
import { RefreshCw, Star, GitFork } from "lucide-react";

interface Repo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string | null;
  url: string;
  contributors: string[];
}

interface Stats {
  org: {
    login: string;
    name: string;
    publicRepos: number;
    followers: number;
    description: string;
    htmlUrl: string;
  };
  metrics: {
    stars: number;
    forks: number;
    commits: number;
    repos: number;
    contributors: number;
  };
  repos: Repo[];
  updatedAt: string;
}

const REFRESH_INTERVAL = 60000; // 60 seconds

export default function Stats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = async (silent = false) => {
    try {
      const res = await fetch("/api/github-stats", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setStats(data);
      setError(false);
    } catch (e) {
      if (!silent) setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    const interval = setInterval(() => loadStats(true), REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (n: number) => {
    return n.toLocaleString("en-US");
  };

  const lastUpdated = stats?.updatedAt
    ? new Date(stats.updatedAt).toLocaleTimeString("en-US")
    : "";

  return (
    <section className="section">
      <div className="max-w-3xl mx-auto px-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-text-strong font-sans">
            Live GitHub Stats
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-weak">
              {lastUpdated && `Updated ${lastUpdated}`}
            </span>
            <button
              onClick={() => loadStats()}
              className="p-1 rounded hover:bg-background-weak transition-colors cursor-pointer text-text-weak hover:text-text-strong"
              aria-label="Refresh stats"
              disabled={loading}
            >
              <RefreshCw
                size={14}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        {error && !stats ? (
          <p className="text-sm text-text-weak">
            Could not load GitHub stats. Please try again.
          </p>
        ) : (
          <>
            <p className="text-text mb-4">
              The GoDucky organization on{" "}
              <a
                href="https://github.com/Go-Ducky"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-strong hover:underline no-underline"
              >
                GitHub
              </a>{" "}
              has{" "}
              <strong className="font-medium text-text-strong">
                {stats ? formatNumber(stats.metrics.repos) : "3"}
              </strong>{" "}
              public repositories with a total of{" "}
              <strong className="font-medium text-text-strong">
                {stats ? formatNumber(stats.metrics.stars) : "2"}
              </strong>{" "}
              stars, contributed to by{" "}
              <strong className="font-medium text-text-strong">
                {stats ? formatNumber(stats.metrics.contributors) : "2"}
              </strong>{" "}
              contributors.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-xs text-text-weak">Repos</p>
                <p className="text-2xl font-bold text-text-strong mb-1 font-sans">
                  {stats ? formatNumber(stats.metrics.repos) : "—"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-text-weak">Stars</p>
                <p className="text-2xl font-bold text-text-strong mb-1 font-sans">
                  {stats ? formatNumber(stats.metrics.stars) : "—"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-text-weak">Contributors</p>
                <p className="text-2xl font-bold text-text-strong mb-1 font-sans">
                  {stats ? formatNumber(stats.metrics.contributors) : "—"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {stats?.repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 p-3 border border-border-weak rounded no-underline hover:bg-background-weak transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-text-strong">
                      {repo.name}
                    </div>
                    {repo.description && (
                      <div className="text-xs text-text-weak truncate">
                        {repo.description}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-text-weak text-sm shrink-0">
                    {repo.language && (
                      <span className="hidden sm:inline">{repo.language}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={12} aria-hidden="true" />
                      {formatNumber(repo.stars)}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} aria-hidden="true" />
                      {formatNumber(repo.forks)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, RefreshCw } from "lucide-react";

interface Person {
  login: string;
  name: string;
  bio: string;
  avatarUrl: string;
  htmlUrl: string;
  blog: string | null;
  location: string | null;
  followers: number;
}

interface Contributor {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  contributions: number;
  repos: string[];
}

interface OrgData {
  org: {
    login: string;
    name: string;
    description: string;
    location: string | null;
    blog: string | null;
    publicRepos: number;
    followers: number;
    avatarUrl: string;
    htmlUrl: string;
  } | null;
  members: Person[];
  contributors: Contributor[];
  updatedAt: string;
}

export default function AboutPage() {
  const [data, setData] = useState<OrgData | null>(null);
  const [error, setError] = useState(false);

  const load = async () => {
    try {
      const res = await fetch("/api/github-org", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed");
      setData(await res.json());
      setError(false);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const formatNumber = (n: number) => n.toLocaleString("en-US");

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
                understand, and refactor code — available today as a CLI, with
                a GUI desktop app and WebUI coming soon. Our goal is to put
                reliable, privacy-first AI coding assistance in every
                developer&apos;s hands, for free, and to make it work with any
                model you already pay for.
              </p>
              <p className="text-sm leading-relaxed">
                We built GoDucky because we believe AI coding tools should be
                open, trustworthy, and let you keep full control of your data —
                without tying you to a single provider.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-text-strong mb-3 font-sans">
                The Organization
              </h2>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="font-bold text-text-strong text-sm font-sans">
                    {data?.org?.name || "GoDucky"}
                  </h3>
                  <p className="text-sm text-text-weak mb-2">
                    {data?.org?.description}
                  </p>
                  <div className="flex gap-2 items-center">
                    <a
                      href="https://github.com/Go-Ducky"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-weak hover:text-text-strong no-underline flex items-center gap-1"
                    >
                      github.com/Go-Ducky
                    </a>
                    <button
                      onClick={load}
                      className="p-1 rounded hover:bg-background-weak cursor-pointer text-text-weak hover:text-text-strong"
                      aria-label="Refresh data"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {data?.org && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 border border-border-weak rounded-md">
                    <p className="text-xs text-text-weak">Repos</p>
                    <p className="text-xl font-bold text-text-strong font-sans">
                      {formatNumber(data.org.publicRepos)}
                    </p>
                  </div>
                  <div className="text-center p-3 border border-border-weak rounded-md">
                    <p className="text-xs text-text-weak">Followers</p>
                    <p className="text-xl font-bold text-text-strong font-sans">
                      {formatNumber(data.org.followers)}
                    </p>
                  </div>
                  <div className="text-center p-3 border border-border-weak rounded-md">
                    <p className="text-xs text-text-weak">Contributors</p>
                    <p className="text-xl font-bold text-text-strong font-sans">
                      {data.contributors.length}
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-base font-bold text-text-strong mb-3 font-sans">
                Members
              </h2>
              {error || !data ? (
                <p className="text-sm text-text-weak">
                  Could not load members from GitHub.
                </p>
              ) : data.members.length === 0 ? (
                <p className="text-sm text-text-weak">
                  No public members yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {data.members.map((member) => (
                    <div
                      key={member.login}
                      className="flex flex-col sm:flex-row items-start gap-5 p-6 border border-border-weak rounded-md bg-background-weak"
                    >
                      <img
                        src={member.avatarUrl}
                        alt={member.login}
                        className="w-16 h-16 rounded-full object-cover shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-text-strong text-sm font-sans">
                          {member.name}
                        </h3>
                        <p className="text-xs text-text-weak mb-2">
                          {member.login}
                          {member.location && ` · ${member.location}`}
                        </p>
                        <p className="text-sm leading-relaxed mb-3">
                          {member.bio || "Member of the GoDucky organization."}
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <a
                            href={member.htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-weak hover:text-text-strong no-underline"
                          >
                            GitHub · {formatNumber(member.followers)} followers
                          </a>
                          {member.blog && (
                            <a
                              href={member.blog}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text-weak hover:text-text-strong no-underline"
                            >
                              {member.blog.replace(/^https?:\/\//, "")}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-base font-bold text-text-strong mb-3 font-sans">
                Contributors
              </h2>
              {error || !data ? (
                <p className="text-sm text-text-weak">
                  Could not load contributors from GitHub.
                </p>
              ) : (
                <div className="space-y-2">
                  {data.contributors.map((contributor) => (
                    <a
                      key={contributor.login}
                      href={contributor.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 border border-border-weak rounded-md no-underline hover:bg-background-weak transition-colors"
                    >
                      <img
                        src={contributor.avatarUrl}
                        alt={contributor.login}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-text-strong">
                          {contributor.login}
                        </div>
                        <div className="text-xs text-text-weak truncate">
                          {contributor.repos.join(", ")}
                        </div>
                      </div>
                      <div className="text-xs text-text-weak shrink-0">
                        {formatNumber(contributor.contributions)} commits
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-base font-bold text-text-strong mb-3 font-sans">
                Contact
              </h2>
              <p className="text-sm leading-relaxed mb-3">
                Have a question, a bug report, or an idea? We&apos;d love to
                hear from you.
              </p>
              <a
                href="mailto:goduckysupport@proton.me"
                className="inline-flex items-center gap-2 text-sm text-text-weak hover:text-text-strong no-underline transition-colors w-fit btn-secondary"
              >
                <Mail size={16} />
                goduckysupport@proton.me
              </a>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
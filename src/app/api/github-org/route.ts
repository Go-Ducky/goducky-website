import { NextResponse } from "next/server";

const ORG = "Go-Ducky";
const GITHUB_API = "https://api.github.com";
const HDRS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "goducky-website",
};

export const revalidate = 0;

export async function GET() {
  try {
    const orgRes = await fetch(`${GITHUB_API}/orgs/${ORG}`, {
      headers: HDRS,
      next: { revalidate: 0 },
    });
    const org = orgRes.ok ? await orgRes.json() : null;

    // Public members of the org
    let members: {
      login: string;
      name: string;
      bio: string;
      avatarUrl: string;
      htmlUrl: string;
      blog: string | null;
      location: string | null;
      followers: number;
    }[] = [];

    const membersRes = await fetch(
      `${GITHUB_API}/orgs/${ORG}/public_members?per_page=100`,
      { headers: HDRS, next: { revalidate: 0 } }
    );
    if (membersRes.ok) {
      const memberLogins: any[] = await membersRes.json();
      const profiles = await Promise.all(
        memberLogins.map((m) =>
          fetch(`${GITHUB_API}/users/${m.login}`, { headers: HDRS }).then(
            (r) => (r.ok ? r.json() : null)
          )
        )
      );
      members = profiles
        .filter(Boolean)
        .map((u: any) => ({
          login: u.login,
          name: u.name || u.login,
          bio: u.bio || "",
          avatarUrl: u.avatar_url,
          htmlUrl: u.html_url,
          blog: u.blog || null,
          location: u.location || null,
          followers: u.followers ?? 0,
        }));
    }

    // Contributors aggregated across all org repos
    const reposRes = await fetch(
      `${GITHUB_API}/orgs/${ORG}/repos?per_page=100&sort=updated`,
      { headers: HDRS, next: { revalidate: 0 } }
    );
    const repos: any[] = reposRes.ok ? await reposRes.json() : [];

    const contribMap = new Map<
      string,
      { login: string; avatarUrl: string; htmlUrl: string; contributions: number; repos: string[] }
    >();

    for (const repo of repos) {
      const cRes = await fetch(
        `${GITHUB_API}/repos/${ORG}/${repo.name}/contributors?per_page=100`,
        { headers: HDRS }
      );
      if (!cRes.ok) continue;
      const contribs: any[] = await cRes.json();
      for (const c of contribs) {
        const existing = contribMap.get(c.login);
        if (existing) {
          existing.contributions += c.contributions ?? 0;
          existing.repos.push(repo.name);
        } else {
          contribMap.set(c.login, {
            login: c.login,
            avatarUrl: c.avatar_url,
            htmlUrl: c.html_url,
            contributions: c.contributions ?? 0,
            repos: [repo.name],
          });
        }
      }
    }

    const contributors = Array.from(contribMap.values()).sort(
      (a, b) => b.contributions - a.contributions
    );

    return NextResponse.json({
      org: org
        ? {
            login: org.login,
            name: org.name || org.login,
            description: org.description || "",
            location: org.location,
            blog: org.blog,
            publicRepos: org.public_repos ?? 0,
            followers: org.followers ?? 0,
            avatarUrl: org.avatar_url,
            htmlUrl: org.html_url,
          }
        : null,
      members,
      contributors,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub org data" },
      { status: 500 }
    );
  }
}
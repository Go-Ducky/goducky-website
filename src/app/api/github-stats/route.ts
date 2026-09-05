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
    if (!orgRes.ok) {
      return NextResponse.json(
        { error: "Org not found" },
        { status: orgRes.status }
      );
    }
    const org = await orgRes.json();

    const reposRes = await fetch(
      `${GITHUB_API}/orgs/${ORG}/repos?per_page=100&sort=updated`,
      { headers: HDRS, next: { revalidate: 0 } }
    );
    const repos: any[] = reposRes.ok ? await reposRes.json() : [];

    let totalStars = 0;
    let totalForks = 0;
    let totalCommits = 0;

    const repoData: {
      name: string;
      description: string;
      stars: number;
      forks: number;
      language: string | null;
      url: string;
      contributors: string[];
    }[] = [];

    for (const repo of repos) {
      if (!repo.full_name) continue;

      totalStars += repo.stargazers_count ?? 0;
      totalForks += repo.forks_count ?? 0;

      const commitRes = await fetch(
        `${GITHUB_API}/repos/${ORG}/${repo.name}/commits?per_page=1`,
        { headers: HDRS }
      );
      if (commitRes.ok) {
        const linkHeader = commitRes.headers.get("link") || "";
        const lastPageMatch = linkHeader.match(
          /<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/
        );
        totalCommits += lastPageMatch
          ? parseInt(lastPageMatch[1], 10) * 30
          : 0;
      }

      let contributors: string[] = [];
      const contribRes = await fetch(
        `${GITHUB_API}/repos/${ORG}/${repo.name}/contributors?per_page=100`,
        { headers: HDRS }
      );
      if (contribRes.ok) {
        const contribs: any[] = await contribRes.json();
        contributors = contribs.map((c) => c.login).filter(Boolean);
      }

      repoData.push({
        name: repo.name,
        description: repo.description || "",
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        language: repo.language,
        url: repo.html_url,
        contributors,
      });
    }

    const allContributors = Array.from(
      new Set(repoData.flatMap((r) => r.contributors))
    );

    return NextResponse.json({
      org: {
        login: org.login,
        name: org.name || org.login,
        publicRepos: org.public_repos ?? 0,
        followers: org.followers ?? 0,
        description: org.description || "",
        htmlUrl: org.html_url,
      },
      metrics: {
        stars: totalStars,
        forks: totalForks,
        commits: totalCommits,
        repos: repoData.length,
        contributors: allContributors.length,
      },
      repos: repoData,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    );
  }
}
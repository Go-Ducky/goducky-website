import { NextResponse } from "next/server";

const ORG = "Go-Ducky";
const REPOS = ["goducky-website", "goducky-cli"];
const GITHUB_API = "https://api.github.com";

export const revalidate = 0;

export async function GET() {
  try {
    const [orgRes, ...repoResponses] = await Promise.all([
      fetch(`${GITHUB_API}/orgs/${ORG}`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 0 },
      }),
      ...REPOS.map((repo) =>
        fetch(`${GITHUB_API}/repos/${ORG}/${repo}`, {
          headers: { Accept: "application/vnd.github+json" },
          next: { revalidate: 0 },
        })
      ),
    ]);

    const org = await orgRes.json();

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
    }[] = [];

    for (const res of repoResponses) {
      const repo = await res.json();
      if (repo.full_name) {
        totalStars += repo.stargazers_count ?? 0;
        totalForks += repo.forks_count ?? 0;

        const commitRes = await fetch(
          `${GITHUB_API}/repos/${ORG}/${repo.name}/commits?per_page=1`,
          { headers: { Accept: "application/vnd.github+json" } }
        );

        let commitCount = 0;
        if (commitRes.ok) {
          const linkHeader = commitRes.headers.get("link") || "";
          const lastPageMatch = linkHeader.match(
            /<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/
          );
          commitCount = lastPageMatch ? parseInt(lastPageMatch[1], 10) * 30 : 0;
        }

        totalCommits += commitCount;

        repoData.push({
          name: repo.name,
          description: repo.description || "",
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
          language: repo.language,
          url: repo.html_url,
        });
      }
    }

    return NextResponse.json({
      org: {
        login: org.login,
        name: org.name || org.login,
        publicRepos: org.public_repos ?? 0,
        followers: org.followers ?? 0,
      },
      metrics: {
        stars: totalStars,
        forks: totalForks,
        commits: totalCommits,
        repos: repoData.length,
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

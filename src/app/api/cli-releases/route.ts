import { NextResponse } from "next/server";

const REPO = "go-ducky/goducky-cli";
const GITHUB_API = "https://api.github.com";
const REPO_URL = `https://github.com/${REPO}`;

export const revalidate = 0;

interface Asset {
  name: string;
  size: number;
  downloadUrl: string;
  kind: "install-script" | "binary" | "archive" | "other";
}

const HDRS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "goducky-website",
};

// Files we care about when there are no releases yet: install scripts,
// executables, installers, and archives sitting at the latest push.
const ARTIFACT_RE = /(^|[/_-])(install|setup|boot)(\.|$)|\.(sh|ps1|psm1|cmd|bat|exe|msi|dmg|pkg|AppImage|deb|rpm|apk|zip|tar\.gz|tar\.xz|tgz|jar|bin)$/i;

function classify(name: string): Asset["kind"] {
  if (/\.(sh|ps1|psm1|cmd|bat)$/i.test(name) || /^install/i.test(name)) {
    return "install-script";
  }
  if (/\.(exe|msi|dmg|pkg|AppImage|deb|rpm|apk|bin)$/i.test(name)) {
    return "binary";
  }
  if (/\.(zip|tar\.gz|tar\.xz|tgz|jar)$/i.test(name)) {
    return "archive";
  }
  return "other";
}

export async function GET() {
  try {
    const repoRes = await fetch(`${GITHUB_API}/repos/${REPO}`, {
      headers: HDRS,
    });
    if (!repoRes.ok) {
      return NextResponse.json({
        available: false,
        repo: REPO,
        repoUrl: REPO_URL,
        error: "repo_not_found",
      });
    }
    const repo = await repoRes.json();
    const branch: string = repo.default_branch || "main";

    let source: "release" | "repo" = "repo";
    let tag: string | undefined;
    let publishedAt: string | undefined;
    let notes = "";
    let assets: Asset[] = [];

    // 1) Prefer a GitHub Release if one exists (has real release assets).
    const releaseRes = await fetch(
      `${GITHUB_API}/repos/${REPO}/releases/latest`,
      { headers: HDRS }
    );

    if (releaseRes.ok) {
      const release: any = await releaseRes.json();
      source = "release";
      tag = release.tag_name;
      publishedAt = release.published_at;
      notes = release.body || "";
      assets = (release.assets || [])
        .map((asset: any) => ({
          name: asset.name,
          size: asset.size,
          downloadUrl: asset.browser_download_url,
          kind: classify(asset.name),
        }))
        .filter((a: Asset) => a.name);
    } else {
      // 2) No release yet -> scan the latest push on the default branch
      //    for install scripts, exe files, archives, etc.
      const treeRes = await fetch(
        `${GITHUB_API}/repos/${REPO}/git/trees/${branch}?recursive=1`,
        { headers: HDRS }
      );

      if (treeRes.ok) {
        const tree: any = await treeRes.json();
        const entries: any[] = Array.isArray(tree.tree) ? tree.tree : [];
        assets = entries
          .filter(
            (e) =>
              e.type === "blob" &&
              typeof e.path === "string" &&
              ARTIFACT_RE.test(e.path) &&
              !e.path.startsWith(".github")
          )
          .sort((a, b) => a.path.length - b.path.length)
          .map((e) => ({
            name: e.path,
            size: e.size || 0,
            downloadUrl: `https://raw.githubusercontent.com/${REPO}/${branch}/${e.path}`,
            kind: classify(e.path),
          }));
      }
    }

    // 3) Latest commit info so we can show "synced to the latest push".
    let latestCommit: { sha: string; message: string; date: string; url: string } | undefined;
    const commitsRes = await fetch(
      `${GITHUB_API}/repos/${REPO}/commits?sha=${branch}&per_page=1`,
      { headers: HDRS }
    );
    if (commitsRes.ok) {
      const commits: any[] = await commitsRes.json();
      const latest = commits[0];
      if (latest) {
        latestCommit = {
          sha: latest.sha,
          message: (latest.commit?.message || "").split("\n")[0],
          date: latest.commit?.author?.date,
          url: latest.html_url,
        };
      }
    }

    // 4) Curl one-liner if there's an install script in the repo.
    let installCommand: string | undefined;

    const installSh = assets.find((a: Asset) =>
      /(^|\/)install\.sh$/i.test(a.name)
    );
    const installPs1 = assets.find((a: Asset) =>
      /(^|\/)install\.ps1$/i.test(a.name)
    );

    if (installSh) {
      installCommand = `curl -fsSL ${installSh.downloadUrl} | bash`;
    } else if (installPs1) {
      installCommand = `iwr -useb ${installPs1.downloadUrl} | iex`;
    }

    return NextResponse.json({
      available: assets.length > 0,
      sync: true,
      source,
      repo: REPO,
      repoUrl: REPO_URL,
      branch,
      tag,
      publishedAt,
      notes,
      latestCommit,
      installCommand,
      assets,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch CLI releases" },
      { status: 500 }
    );
  }
}
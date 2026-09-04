import { NextResponse } from "next/server";

const REPO = "go-ducky/goducky-cli";
const GITHUB_API = "https://api.github.com";

export const revalidate = 0;

export async function GET() {
  try {
    // Fetch the latest release with its assets (curl scripts, exe, etc.)
    const releaseRes = await fetch(
      `${GITHUB_API}/repos/${REPO}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "goducky-website",
        },
      }
    );

    if (!releaseRes.ok) {
      // No releases yet -> coming soon
      return NextResponse.json({
        available: false,
        repo: REPO,
        repoUrl: `https://github.com/${REPO}`,
      });
    }

    const release = await releaseRes.json();

    const assets: {
      name: string;
      size: number;
      downloadUrl: string;
      contentType: string;
    }[] = (release.assets || []).map((asset: any) => ({
      name: asset.name,
      size: asset.size,
      downloadUrl: asset.browser_download_url,
      contentType: asset.content_type,
    }));

    return NextResponse.json({
      available: true,
      repo: REPO,
      repoUrl: release.html_url,
      tag: release.tag_name,
      name: release.name || release.tag_name,
      publishedAt: release.published_at,
      notes: release.body || "",
      assets,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch CLI releases" },
      { status: 500 }
    );
  }
}

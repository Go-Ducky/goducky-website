import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";

const WAITLIST_KEY = "goducky:waitlist";
const COUNT_KEY = "goducky:waitlist:count";

function getRedis() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    return new Redis({ url, token });
  }
  return null;
}

async function saveToFile(emails: string[]) {
  // Local development fallback so emails persist between edits locally.
  const filePath = path.join(process.cwd(), "waitlist-data.json");
  await fs.writeFile(filePath, JSON.stringify({ emails }, null, 2), "utf-8");
}

async function readFromFile(): Promise<string[] | null> {
  try {
    const filePath = path.join(process.cwd(), "waitlist-data.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data.emails) ? data.emails : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body?.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    const redis = getRedis();

    if (redis) {
      // Production: store in Vercel KV (Upstash Redis)
      const exists = await redis.sismember(WAITLIST_KEY, email);
      if (exists) {
        return NextResponse.json({
          success: true,
          message: "You're already on the waitlist!",
          alreadyJoined: true,
        });
      }

      await redis.sadd(WAITLIST_KEY, email);
      await redis.sadd("goducky:waitlist:providers", "upstash");

      return NextResponse.json({
        success: true,
        message: "Added to waitlist",
      });
    }

    // Local fallback: append to JSON file
    const existing = (await readFromFile()) || [];
    if (existing.includes(email)) {
      return NextResponse.json({
        success: true,
        message: "You're already on the waitlist!",
        alreadyJoined: true,
      });
    }

    existing.push(email);
    await saveToFile(existing);

    return NextResponse.json({
      success: true,
      message: "Added to waitlist",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}

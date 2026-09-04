import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
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

    console.log(`Waitlist signup: ${email}`);

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

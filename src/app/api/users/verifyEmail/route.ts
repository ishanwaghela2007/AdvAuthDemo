import { connectDB } from "@/dbConfig/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }

    const user = await User.findOne({
      verifytoken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    user.isVerified = true; // ✅
    user.verifytoken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Error verifying email:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

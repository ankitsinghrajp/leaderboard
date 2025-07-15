// /app/api/claim/route.js or wherever your claim route is

import User from "@/models/User";
import ClaimHistory from "@/models/ClaimHistory";
import { connectDb } from "@/lib/connectDb";

export async function POST(req) {
  try {
    await connectDb();
    const { userId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const points = Math.floor(Math.random() * 10) + 1;

    // Update user's totalPoints
    user.totalPoints += points;
    user.updatedAt = Date.now();
    await user.save();

    // Create claim history record
    await ClaimHistory.create({
      userId: user._id,
      userName: user.name,
      points,
    });

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error("Claim error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

import User from "@/models/User";
import { NextResponse } from "next/server";

import { connectDb } from "@/lib/connectDb";

export async function POST(req){
    await connectDb();

    let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error("❌ Invalid JSON body:", err);
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

    const {userId} = body;

    if(!userId){
        return NextResponse.json({message:"User Id is required!"},{status: 400})
    }

    const points = Math.floor(Math.random()*10) + 1; // 1 to 10

    try{
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {$inc:{totalPoints: points}, updatedAt: Date.now()},
            {new: true} // return updated doc
        );

        if(!updatedUser){
           return NextResponse.json({message: "User not found!"},{status: 404});
        }

        return NextResponse.json({user: updatedUser, awardedPoints: points}, {status: 200});
    }
    catch (err){
        console.error("Claim error:",err);
        return NextResponse.json({message:err},{status:500});
    }
}
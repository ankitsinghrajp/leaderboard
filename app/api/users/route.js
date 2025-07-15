import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(){
    await connectDb();

    const users = await User.find().sort({points:-1});
    return NextResponse.json(users);
}
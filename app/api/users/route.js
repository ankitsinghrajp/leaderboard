import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(){
    await connectDb();

    const data = await User.find().sort({points:-1});
    return NextResponse.json(data);
}

export async function POST(req){
    await connectDb();
    const {name} = await req.json();

    if(!name){
        return Response.json({message:"Name is required"},{status:400});
    }

    const user = await User.create({name, totalPoints:0});
    return Response.json(user,{status:201});
}
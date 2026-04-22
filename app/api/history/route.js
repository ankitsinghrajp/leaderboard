import { connectDb } from "@/lib/connectDb";
import ClaimHistory from "@/models/ClaimHistory";

export async function GET(){
    try {

        await connectDb();
        const history = await ClaimHistory.find().sort({claimedAt: -1}).limit(100); //latest 100
        return new Response(JSON.stringify(history),{status:200});
        
    } catch (error) {
        return new Response(JSON.stringify({message:"Internal Server Error"}),{status:500});
    }
}
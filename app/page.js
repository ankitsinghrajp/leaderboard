import ClaimHistoryCard from "@/components/claim-history-card";
import LeaderboardCard from "@/components/leaderboard-card";
import SelectUserCard from "@/components/select-user-card";

export default function HOME(){

  return (
    <div className="container py-6 mx-auto">
  <div className="grid grid-cols-1 px-10 md:px-2 gap-6 md:grid-cols-3">
    <div className="">
      <SelectUserCard/>
    </div>
    <div>
      <LeaderboardCard/>
    </div>
    <div>
      <ClaimHistoryCard/>
    </div>
      
  </div>
  </div>
  )
}
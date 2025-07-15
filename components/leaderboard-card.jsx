"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, User } from "lucide-react";
import { Badge } from "./ui/badge";
import calculateRanks from "@/lib/calculateRank";

const LeaderboardCard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch and update ranked users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      const rankedUsers = calculateRanks(data); // apply ranking logic
      setUsers(rankedUsers);
    } catch (error) {
      console.error("Error loading users: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    const refreshHandler = () => {
      setLoading(true);
      fetchUsers();
    };

    window.addEventListener("leaderboard-refresh", refreshHandler);

    return () => {
      window.removeEventListener("leaderboard-refresh", refreshHandler);
    };
  }, []);

  return (
    <Card className="h-[500px] border-1 bg-[#09090b] border-gray-700 shadow-md shadow-green-500/10">
      <CardHeader>
        <CardTitle className="w-full flex items-center gap-2">
          <Trophy className="h-7 w-7 text-emerald-500" />
          <h2 className="text-xl font-extrabold">Leaderboard</h2>
        </CardTitle>
      </CardHeader>

      {loading ? (
        <div className="text-center h-[400px] p-4 text-emerald-600 font-semibold">
          Loading Leaderboard...
        </div>
      ) : (
        <CardContent className="h-[400px] overflow-y-scroll custom-scrollbar">
          <ul className="py-3">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between px-2 items-center py-3 border my-4 border-gray-500/40 shadow-md shadow-black rounded-md"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex gap-1 items-center">
                    <Trophy className="text-emerald-500 h-5 w-5" />
                    <span>#{user.rank}</span>
                  </div>

                  <div className="bg-emerald-500/80 p-2 rounded-full">
                    <User />
                  </div>

                  <div className="flex flex-col">
                    <div className="text-sm font-bold">{user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Total Points
                    </div>
                  </div>
                </div>

                <div className="w-[40px] flex items-center">
                  <Badge variant="outline">{user.totalPoints}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      )}

    </Card>
  );
};

export default LeaderboardCard;


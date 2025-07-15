"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, History, User } from "lucide-react";
import { Badge } from "./ui/badge";

const ClaimHistoryCard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/history");
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error("Error loading claim history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();

    const refreshHandler = () => {
      setLoading(true);
      fetchHistory();
    };

    window.addEventListener("leaderboard-refresh", refreshHandler);
    return () => window.removeEventListener("leaderboard-refresh", refreshHandler);
  }, []);

  return (
    <Card className="h-[500px] border-1 bg-[#09090b] border-gray-700 shadow-md shadow-green-500/10">
      <CardHeader>
        <CardTitle className="w-full flex items-center gap-2">
          <History className="h-7 w-7 text-emerald-500" />
          <h2 className="text-xl font-extrabold">Claim History</h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[400px] overflow-y-scroll custom-scrollbar">
        {loading ? (
          <p className="text-center text-emerald-500 font-semibold">
            Loading Claim History...
          </p>
        ) : history.length === 0 ? (
          <p className="text-center text-muted-foreground">No claims yet.</p>
        ) : (
          <ul className="py-3 space-y-3">
            {history.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center border border-gray-400/40 shadow-md shadow-black/40 px-3 py-3 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-500/80 p-2 rounded-full">
                    <User />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.userName}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="text-muted-foreground h-3 w-3" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.claimedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <Badge className="bg-emerald-500 text-white font-medium">
                    +{item.points} pts
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter>{/* optional footer */}</CardFooter>
    </Card>
  );
};

export default ClaimHistoryCard;

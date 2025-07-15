"use client";
import React, { useState, useEffect } from "react";
import calculateRanks from "@/lib/calculateRank";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, Star, Trophy, User } from "lucide-react";
import { Badge } from "./ui/badge";
import AddUserButton from "./add-user-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

const SelectUserCard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUserName, setNewUserName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const selectedUser = users.find((user) => user._id === selectedUserId);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(calculateRanks(data));
      } catch (error) {
        console.error("Error loading users: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUserName.trim()) return;

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newUserName }),
      });

      if (!res.ok) throw new Error("Failed to add user");

      const newUser = await res.json();
      setUsers((prev) => calculateRanks([...prev, newUser]));
      setNewUserName("");
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUserId) return;

    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUserId }),
      });

      if (!res.ok) throw new Error("Failed to claim points");

      const { user: updatedUser } = await res.json();

      // Trigger leaderboard refresh
      window.dispatchEvent(new Event("leaderboard-refresh"));

      setUsers((prev) =>
        calculateRanks(
          prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
        )
      );
    } catch (error) {
      console.error("Claim failed:", error);
    }
  };

  return (
    <>
      <Card className="h-[500px] border-1 bg-[#09090b] border-gray-700 shadow-md shadow-green-500/10">
        <CardHeader>
          <CardTitle className="w-full flex items-center gap-2">
            <Star className="h-7 w-7 text-emerald-500" />
            <h2 className="text-xl font-extrabold">Select User</h2>
          </CardTitle>
        </CardHeader>

        {loading ? (
          <div className="text-center h-[400px] p-4 text-emerald-600 font-semibold">
            Loading Users...
          </div>
        ) : (
          <CardContent className="h-[400px] overflow-y-scroll custom-scrollbar">
            <ul className="py-3">
              {users.map((user) => {
                const isSelected = selectedUserId === user._id;

                return (
                  <li
                    key={user._id}
                    onClick={() => {
                      setSelectedUserId(user._id);
                      setOpen(true);
                    }}
                    className={`flex my-4 justify-between items-center border border-emerald-500/40 shadow-md ${
                      isSelected
                        ? "shadow-emerald-500/30 border-gray-500 bg-emerald-500/10"
                        : "shadow-black"
                    } cursor-pointer px-3 py-3 rounded-md`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-500/80 p-2 rounded-full">
                        <User />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <div className="flex items-center gap-2">
                          <Trophy className="text-orange-400 h-4 w-4" />
                          <span className="text-sm text-muted-foreground">
                            Rank: #{user.rank}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{user.totalPoints} pts</Badge>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        )}

        <CardFooter>
          <AddUserButton
            handleAddUser={handleAddUser}
            setNewUserName={setNewUserName}
          />
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#09090b]">
          <DialogHeader>
            <DialogTitle className="text-center">Selected User</DialogTitle>
            <div className="text-muted-foreground font-semibold text-center ml-2">
              {selectedUser?.name}
            </div>
            <div className="flex justify-center items-center">
              <Badge variant="outline" className="px-4 text-white font-semibold">
                {selectedUser?.totalPoints} pts
              </Badge>
            </div>
          </DialogHeader>
          <Button
            onClick={handleClaimPoints}
            className="py-5 bg-emerald-500 focus:outline-none focus:ring-0 focus:border-none cursor-pointer text-white shadow-lg shadow-emerald-500/10 hover:bg-emerald-600 animate-pulse"
          >
            <Award className="w-8 h-8" />
            <span>Claim Random Points (1-10)</span>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectUserCard;

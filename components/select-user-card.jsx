"use client"
import React from "react";
import { useState,useEffect } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Star, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const SelectUserCard = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{

   
    const fetchUsers = async ()=>{

        try {
            const res = await fetch("/api/users");
            if(!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error("Error loading users: ",error);
        } 
        finally{
            setLoading(false);
        }

     };

     fetchUsers();

    },[]);

  return (
    <Card className={'h-[500px] border-1 bg-[#09090b] border-gray-700 shadow-md shadow-green-500/10'}>
      <CardHeader>
        <CardTitle className={'w-full flex items-center gap-2'}>
            <Star className="h-7 w-7 text-emerald-500"/>
            <h2 className="text-xl font-extrabold">
            Select User
            </h2>
        </CardTitle>          
      </CardHeader>
      {loading?<div className=" text-center h-[400px] p-4 text-emerald-600 font-semibold">
          Loding Users...
      </div>:
      <CardContent className={'h-[400px]  overflow-y-scroll custom-scrollbar'}>
        <ul className="py-5">
            {users.map((user)=>{

            return <li className="flex my-4 justify-between items-center border border-emerald-500/40 shadow-md shadow-emerald-500/10 px-3 py-3 rounded-md">
                <div className="flex items-center gap-2">
                    <div className="bg-emerald-500/80 p-2 rounded-full">
                       <User/>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-sm font-medium">{user.name}</span>
                       <span className="text-sm text-muted-foreground">Rank: #1</span>
                    </div>
                </div>
                <div className="">
                    <Badge variant={'outline'}>
                        {user.totalPoints} pts
                    </Badge>
                </div>
            </li>
              })}
        </ul>
      </CardContent>
}

      <CardFooter>
        <Button variant={''} className={'w-full shadow-md text-white border border-gray-600 bg-[#09090b] shadow-black/20 cursor-pointer hover:bg-black/20'}>
            <Plus className="w-10 h-10"/>
            <h2 className="font-medium">
            Add New User
            </h2>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SelectUserCard;

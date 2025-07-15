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
import AddUserButton from "./add-user-button";

const SelectUserCard = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUserName, setNewUserName] = useState("");


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

    const handleAddUser = async ()=>{
        if(!newUserName.trim()) return;

        try {
            
            const res = await fetch("/api/users",{
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({name: newUserName}),
            })

            if(!res.ok){
                throw new Error("Failed to add user");
            }

            const newUser = await res.json();
            setUsers(prev=> [...prev,newUser]);
            setNewUserName("");

        } catch (error) {
            console.error("Failed to add user:",error);
        }
    };

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
            {users.map((user,index)=>{

            return <li key={index} className="flex my-4 justify-between items-center border border-emerald-500/40 shadow-md shadow-emerald-500/10 px-3 py-3 rounded-md">
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
        {/* Add user button is here */}
       <AddUserButton handleAddUser={handleAddUser} setNewUserName={setNewUserName}/>
      </CardFooter>
    </Card>
  );
};

export default SelectUserCard;

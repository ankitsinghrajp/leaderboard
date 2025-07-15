import React from "react";
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
      <CardContent className={'h-[400px]  overflow-y-scroll custom-scrollbar'}>
        <ul>
            <li className="flex justify-between items-center border border-emerald-500/40 shadow-md shadow-emerald-500/10 px-3 py-3 rounded-md">
                <div className="flex items-center gap-2">
                    <div className="bg-emerald-500/80 p-2 rounded-full">
                       <User/>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-sm font-medium">Sushant Singh</span>
                       <span className="text-sm text-muted-foreground">Rank: #1</span>
                    </div>
                </div>
                <div className="">
                    <Badge variant={'outline'}>
                        85 pts
                    </Badge>
                </div>
            </li>
        </ul>
      </CardContent>
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

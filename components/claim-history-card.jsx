import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, History, Star, Trophy, User } from 'lucide-react';
import { Badge } from './ui/badge';

const ClaimHistoryCard = () => {
  return (
   <Card className={'h-[500px] border-1 bg-[#09090b] border-gray-700 shadow-md shadow-green-500/10'}>
      <CardHeader>
        <CardTitle className={'w-full flex items-center gap-2'}>
            <History className="h-7 w-7 text-emerald-500"/>
            <h2 className="text-xl font-extrabold">
            Claim History
            </h2>
        </CardTitle>          
      </CardHeader>
     
       <CardContent className={'h-[400px]  overflow-y-scroll custom-scrollbar'}>
        <ul className="py-3">
           

            <li className="flex my-4 justify-between items-center border border-gray-400/40 shadow-md shadow-black/40 px-3 py-3 rounded-md">
                <div className="flex items-center gap-2">
                    <div className="bg-emerald-500/80 p-2 rounded-full">
                       <User/>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-sm font-medium">Nitin Shukla</span>
                       <div className="flex items-center gap-1">
                         <Clock className="text-muted-foreground h-3 w-3 "/>
                         <span className="text-sm text-muted-foreground"> 10:10:10:10</span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <Badge className={'bg-emerald-500 text-white font-medium'}>
                        7 pts
                    </Badge>
                </div>
            </li>

        </ul>
      </CardContent>

      <CardFooter>
        {/* Add user button is here */}
      </CardFooter>
    </Card>
  )
}

export default ClaimHistoryCard
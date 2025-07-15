import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from 'lucide-react';

const ClaimHistoryCard = () => {
  return (
    <Card className={'h-[500px] border-1 bg-[#09090b] border-gray-700 shadow-md shadow-green-500/10'}>
      <CardHeader>
        <CardTitle>
         
          </CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}

export default ClaimHistoryCard
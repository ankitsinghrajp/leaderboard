import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { Plus, Loader2 } from "lucide-react";
import { Input } from "./ui/input";

const AddUserButton = ({handleAddUser, setNewUserName}) => {
    const [open, setOpen] = useState(false);
    const [loading,setLoading] = useState(false);

    const onAddUser = async ()=>{
        setLoading(true);
        await handleAddUser();
        setLoading(false);
        setOpen(false);
    }

  return (
    <div className="w-full">
      

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
        className={
          "w-full shadow-md text-white border border-gray-600 bg-[#09090b] shadow-black/20 cursor-pointer hover:bg-black/20"
        }
      >
        <Plus className="w-10 h-10" />
        <h2 className="font-medium">Add New User</h2>
      </Button>
        </PopoverTrigger>
        <PopoverContent className={'bg-gray-950 border-2 border-emerald-500/30'}>
        <div className="flex flex-col gap-3">
            <Input
            className={'border-2 border-emerald-500/30 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none'}
            placeholder={'Enter user name'}
            onChange={(e)=>setNewUserName(e.target.value)}
            />
            <div className="flex justify-between px-2 items-center">
                <Button
                onClick={onAddUser}
                className="bg-emerald-700 cursor-pointer hover:bg-emerald-800 text-sm font-bold text-white flex gap-2 items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add User"
                )}
              </Button>
                <Button onClick={()=>setOpen(false)} variant={'destructive'} className={'cursor-pointer'}>
                    Cancel
                </Button>
            </div>
            </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddUserButton;

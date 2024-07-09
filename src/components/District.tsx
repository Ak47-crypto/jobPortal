"use client";

/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn, lowerCase, sentenceCase } from "@/lib/utils";
import { useAppContext } from "@/context/SiteContext";
import states from "@/data/district.json"


import { StateProps } from "@/types/userType";
import { CommandList } from "cmdk";


const StateDropdown = () => {
    // const { countryValue,  } = useDropdownStore();
    const {stateValue,setStateValue}=useAppContext()
    // const [stateValue,setStateValue]=useState<string>("")
    const [openStateDropdown,setOpenStateDropdown]=useState<boolean>(false)
    const S = states as StateProps[];
    // const S: StateProps[] = Array.isArray(states) ? states : [];
    
    return (
        <Popover open={openStateDropdown} onOpenChange={setOpenStateDropdown} >
            <PopoverTrigger asChild className="hover:!bg-none">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openStateDropdown}
                    className=" cursor-pointer justify-between  borderx !border-[#27272a]x !bg-[#0f0f11]x bg-white   hover:bg-none  disabled:!cursor-not-allowed disabled:!opacity-50 rounded-3xl"
                    
                >
                    {stateValue ? (
                        <>
                        <div className="flex items-end gap-2">
                            <span className="font-light">{stateValue}</span>
                            <div className="flex items-center">
                        <input
                          type="text"
                          placeholder={"1"}
                          disabled
                          className="rounded-[100%] w-[20px] h-[20px] bg-[#0073e6] placeholder:text-center placeholder:text-white  "
                        />
                      </div>
                        </div>
                        
                      </>
                    ) : (
                        <span className="font-light">Location</span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] rounded-[6px]  p-0">
                <Command>
                    <div className="flex p-3 justify-between">
                    <span className="font-light p-1">Location</span>
                    <span className="text-[#D63500] cursor-pointer hover:bg-gray-200 p-1 rounded-lg" onClick={()=>{setStateValue('');setOpenStateDropdown(false);}}>clear</span>
                    </div>
                    <CommandInput placeholder="Search district..." />
                    
                    <CommandList >
                    <CommandEmpty>No state found.</CommandEmpty>
                    <CommandGroup>
                        
                        <ScrollArea className="h-[300px] w-full">
                            {S.map((state) => (
                                <CommandItem
                                    key={state.population}
                                    value={state.district}
                                    onSelect={(currentValue) => {
                                        console.log(currentValue)
                                        setStateValue(currentValue);
                                        setOpenStateDropdown(false);
                                        
                                    }}
                                    className="flex cursor-pointer items-center justify-between text-xs hover:!bg-slate-300 hover:!text-black"
                                >
                                    <div className="flex items-end gap-2">
                                        <span className="">{state.district}</span>
                                    </div>
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            stateValue === lowerCase(state.district) ? "opacity-100" : "opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                        
                    </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default StateDropdown;

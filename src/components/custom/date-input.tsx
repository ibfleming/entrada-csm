"use client";

import * as React from "react";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function DateInput() {
  const [date, setDate] = React.useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "flex h-9 items-center justify-between gap-4 rounded-md border border-input bg-transparent px-3 py-1 font-inter text-sm text-muted-foreground shadow-md transition-colors hover:text-muted-foreground",
            !date && "text-muted-foreground",
          )}
        >
          {date ? format(date, "P") : <span>Select a date</span>}
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-auto p-1">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          defaultMonth={date ?? new Date()}
          selected={date}
          onSelect={(e) => {
            setDate(e);
            setIsCalendarOpen(false);
            console.log(e?.toLocaleString());
          }}
          initialFocus
          fromYear={1900}
          toYear={new Date().getFullYear()}
          classNames={{
            vhidden: "vhidden hidden",
          }}
          className="font-inter"
        />
      </PopoverContent>
    </Popover>
  );
}

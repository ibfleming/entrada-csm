"use client";

import { residentSchema } from "~/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { format } from "date-fns";
import { DestructiveButton, PrimaryButton } from "@/custom/buttons";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { DialogClose, DialogFooter } from "@/ui/dialog";
import { AsteriskIcon, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/ui/select";
import { useState } from "react";

const residentExample = residentSchema.parse({
  phone: "2086994254",
  phone_type: "mobile",
  email: "sierragkeele@gmail.com",
  first_name: "Sierra",
  middle_name: "Grace",
  last_name: "Keele",
  gender: "female",
  birth_date: "10/03/2002",
});

export default function CreateResidentForm() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const form = useForm<z.infer<typeof residentSchema>>({
    resolver: zodResolver(residentSchema),
    defaultValues: residentExample,
  });

  function onSubmit(values: z.infer<typeof residentSchema>) {
    const date = format(values.birth_date, "MM/dd/yyyy");
    // Submit to the server via api...
    // ✅ This will be type-safe and validated.
    console.log(values, date);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4 py-4">
          <FormField
            rules={{ required: "First name is required" }}
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-start gap-1 font-inter text-primary">
                  First Name
                  <AsteriskIcon className="h-3 w-3 text-destructive" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    className="font-inter text-neutral-800 shadow-md focus-visible:ring-1"
                  />
                </FormControl>
                <FormMessage className="font-inter text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middle_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-start gap-1 font-inter text-primary">
                  Middle Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    className="font-inter text-neutral-800 shadow-md focus-visible:ring-1"
                  />
                </FormControl>
                <FormMessage className="font-inter text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-start gap-1 font-inter text-primary">
                  Last Name
                  <AsteriskIcon className="h-3 w-3 text-destructive" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    className="font-inter text-neutral-800 shadow-md focus-visible:ring-1"
                  />
                </FormControl>
                <FormMessage className="font-inter text-xs text-destructive" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 py-4">
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-start gap-1 font-inter text-primary">
                  Birth Date
                  <AsteriskIcon className="h-3 w-3 text-destructive" />
                </FormLabel>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 font-inter text-sm text-muted-foreground shadow-md transition-colors hover:text-muted-foreground",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "P")
                        ) : (
                          <span>Select a date</span>
                        )}
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="center" className="w-auto p-1">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      defaultMonth={
                        field.value ? new Date(field.value) : undefined
                      }
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        field.onChange(date);
                        setIsCalendarOpen(false);
                      }}
                      fromYear={1900}
                      toYear={currentYear}
                      classNames={{
                        vhidden: "vhidden hidden",
                      }}
                      className="font-inter"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="font-inter text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-start gap-1 font-inter text-primary">
                  Gender
                  <AsteriskIcon className="h-3 w-3 text-destructive" />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="font-inter font-medium text-muted-foreground shadow-md hover:bg-accent">
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-inter text-neutral-800 shadow-md">
                    <SelectItem className="cursor-pointer" value="male">
                      Male
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="female">
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="font-inter text-xs text-destructive" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 py-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-start gap-1 font-inter text-primary">
                  Phone Number
                  <AsteriskIcon className="h-3 w-3 text-destructive" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    className="font-inter text-neutral-800 shadow-md focus-visible:ring-1"
                  />
                </FormControl>
                <FormMessage className="font-inter text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-start gap-1 font-inter text-primary">
                  Phone Type
                  <AsteriskIcon className="h-3 w-3 text-destructive" />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="font-inter font-medium text-muted-foreground shadow-md hover:bg-accent">
                    <SelectTrigger>
                      <SelectValue placeholder="Select phone type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-inter text-neutral-800 shadow-md">
                    <SelectItem className="cursor-pointer" value="mobile">
                      Mobile
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="home">
                      Home
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="work">
                      Work
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="font-inter text-xs text-destructive" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-start gap-1 font-inter text-primary">
                  Email
                  <AsteriskIcon className="h-3 w-3 text-destructive" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    className="font-inter text-neutral-800 shadow-md focus-visible:ring-1"
                  />
                </FormControl>
                <FormMessage className="font-inter text-xs text-destructive" />
              </FormItem>
            )}
          />
          <DialogFooter className="items-end justify-end gap-4 space-x-0 sm:space-x-0">
            <PrimaryButton type="submit">Submit</PrimaryButton>
            <DialogClose asChild>
              <DestructiveButton>Exit</DestructiveButton>
            </DialogClose>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}

/*

  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="first_name" className="text-right font-inter">
        First Name
      </Label>
      <Input
        id="first_name"
        className="col-span-3 font-inter text-neutral-800 shadow-md focus-visible:ring-1"
      />
    </div>
  </div>
*/

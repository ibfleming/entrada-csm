"use client";

import "@/styles/phone-input.css";

import { custom, type z } from "zod";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { residentSchema } from "~/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import PhoneInput from "react-phone-number-input";
import { DialogClose, DialogFooter } from "@/ui/dialog";
import { DestructiveButton, PrimaryButton } from "@/custom/buttons";
import { AsteriskIcon, Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import Throbber from "@/ui/throbber";
import { api } from "~/trpc/react";
import React from "react";

const residentExample = residentSchema.parse({
  phone: "+12086994254",
  phone_type: "mobile",
  email: "sierragkeele@gmail.com",
  first_name: "Sierra",
  middle_name: "Grace",
  last_name: "Keele",
  gender: "female",
  birth_date: new Date("10/03/2002"),
});

export default function ResidentForm() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { toast } = useToast();
  const utils = api.useUtils();
  const currentYear = new Date().getFullYear();

  const form = useForm<z.infer<typeof residentSchema>>({
    resolver: zodResolver(residentSchema),
  });

  const createResident = api.user.createUser.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate();
      toast({
        variant: "custom",
        title: "Succesfully added resident!",
        duration: 5000,
      });
    },
    onError: async (error) => {
      console.log(error.data?.code);

      if (error.data?.code === "INTERNAL_SERVER_ERROR") {
        toast({
          variant: "destructive",
          title: "Internal server error.",
          duration: 5000,
        });
      } else {
        toast({
          variant: "destructive",
          title: error.message,
          duration: 5000,
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof residentSchema>) {
    console.log(values);
    createResident.mutate(values);
  }

  const ResidentForm = () => {
    return (
      <Form {...form} setFocus={() => form.setFocus("first_name")}>
        {createResident.isPending ? (
          <div className="flex items-center justify-center p-8">
            <Throbber></Throbber>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-4 py-4">
              <FormField
                rules={{ required: "First name is required" }}
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem autoFocus={true}>
                    <FormLabel className="flex items-center justify-start gap-1 font-inter text-primary">
                      First Name
                      <AsteriskIcon className="h-3 w-3 text-destructive" />
                    </FormLabel>
                    <FormControl inputMode="text">
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
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
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
                              <span>Select date</span>
                            )}
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="center" className="w-auto p-1">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          defaultMonth={field.value}
                          selected={field.value}
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
                          <SelectValue placeholder="Select gender" />
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
                      <PhoneInput
                        {...field}
                        defaultCountry="US"
                        value={field.value || ""}
                        className="font-inter text-neutral-800 shadow-md focus-visible:ring-1"
                      />
                    </FormControl>
                    <FormMessage className="font-inter text-xs text-destructive" />
                    <FormDescription className="pl-1.5 font-inter text-xs text-muted-foreground">
                      e.g. 0 000 000 0000
                    </FormDescription>
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
        )}
      </Form>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-inter text-primary">
          Add
        </Button>
      </DialogTrigger>
      <DialogContent
        className="p-10 sm:min-w-[512px]"
        aria-hidden
        aria-disabled
      >
        <DialogHeader className="font-inter text-primary">
          <DialogTitle>Add a new resident</DialogTitle>
          <DialogDescription>
            Fill out the form with the resident&apos;s information and submit to
            save.
          </DialogDescription>
        </DialogHeader>
        <ResidentForm />
      </DialogContent>
    </Dialog>
  );
}

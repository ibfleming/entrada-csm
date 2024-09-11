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

const residentExample = residentSchema.parse({
  phone: "000-000-0000",
  phone_type: "mobile",
  email: "default@example.com",
  first_name: "Default",
  middle_name: "Default",
  last_name: "Default",
  gender: "male",
  birth_date: "1999-01-02",
});

export default function CreateResidentForm() {
  const form = useForm<z.infer<typeof residentSchema>>({
    resolver: zodResolver(residentSchema),
    defaultValues: residentExample, // Default values for now...
  });

  function onSubmit(values: z.infer<typeof residentSchema>) {
    // Submit to the server via api...
    // ✅ This will be type-safe and validated.
    const date = format(values.birth_date, "P");
    console.log(date);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-3 pt-4">
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
                <FormMessage className="font-inter text-destructive" />
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
                <FormMessage className="font-inter text-destructive" />
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
                    className="font-inter text-neutral-800 shadow-md focus-visible:ring-1"
                  />
                </FormControl>
                <FormMessage className="font-inter text-destructive" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 pt-4">
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-start gap-1 font-inter text-primary">
                  Birth Date
                  <AsteriskIcon className="h-3 w-3 text-destructive" />
                </FormLabel>
                <Popover>
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
                      defaultMonth={new Date(field.value) ?? new Date()}
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      classNames={{
                        vhidden: "vhidden hidden",
                      }}
                      className="font-inter"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="font-inter text-destructive" />
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
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="font-inter font-medium text-muted-foreground shadow-md">
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 pt-4">
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
                    className="font-inter text-neutral-800 shadow-md focus-visible:ring-1"
                  />
                </FormControl>
                <FormMessage className="font-inter text-destructive" />
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
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="font-inter font-medium text-muted-foreground shadow-md">
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 pt-4">
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
                    className="font-inter text-neutral-800 shadow-md focus-visible:ring-1"
                  />
                </FormControl>
                <FormMessage className="font-inter text-destructive" />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="pt-8">
          <PrimaryButton type="submit">Submit</PrimaryButton>
          <DialogClose asChild>
            <DestructiveButton>Exit</DestructiveButton>
          </DialogClose>
        </DialogFooter>
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

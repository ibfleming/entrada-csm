"use client";

import { residentSchema } from "~/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { DestructiveButton, PrimaryButton } from "@/custom/buttons";
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
import { AsteriskIcon } from "lucide-react";

const residentExample = residentSchema.parse({
  phone: "000-000-0000",
  phone_type: "mobile",
  email: "default@example.com",
  first_name: "Default",
  middle_name: "Default",
  last_name: "Default",
  gender: "male",
  birth_date: "2020-01-01",
});

export default function CreateResidentForm() {
  const form = useForm<z.infer<typeof residentSchema>>({
    resolver: zodResolver(residentSchema),
    defaultValues: {
      phone_type: "mobile",
    }, // Default values for now...
  });

  function onSubmit(values: z.infer<typeof residentSchema>) {
    // Submit to the server via api...
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-start gap-1 font-inter text-primary">
                  Gender
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

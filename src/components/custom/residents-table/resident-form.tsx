"use client";

import "@/styles/phone-input.css";

import React from "react";
import { type z } from "zod";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { format } from "date-fns";
import { api } from "~/trpc/react";
import { useToast } from "@/hooks/use-toast";
import { residentSchema } from "~/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
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
import {
  AsteriskIcon,
  Calendar as CalendarIcon,
  PlusCircleIcon,
} from "lucide-react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import Throbber from "@/ui/throbber";
import { Calendar } from "@/ui/calendar";
import PhoneInput from "react-phone-number-input";
import { DialogClose, DialogFooter } from "@/ui/dialog";
import { DestructiveButton, PrimaryButton } from "@/custom/buttons";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

interface FormProps {
  form: UseFormReturn<z.infer<typeof residentSchema>>;
}

interface FormComponentProps extends FormProps {
  children?: React.ReactNode;
}

interface FormFieldProps extends FormProps {
  name: keyof z.infer<typeof residentSchema>;
  label: string;
  required?: boolean;
}

const exampleValues = residentSchema.parse({
  phone: "+12086994254",
  phone_type: "mobile",
  email: "sierragkeele@gmail.com",
  first_name: "Sierra",
  middle_name: "Grace",
  last_name: "Keele",
  gender: "female",
  birth_date: new Date("10/02/2002"),
});

const DialogComponent: React.FC<FormProps> = ({ form }) => {
  return (
    <Dialog>
      <DialogTrigger className="form-button">
        <PlusCircleIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-inter text-primary">
          <DialogTitle>Add a new resident</DialogTitle>
          <DialogDescription>
            Fill out the form with the resident&apos;s information and submit to
            save.
          </DialogDescription>
        </DialogHeader>
        <div>
          <FormComponent form={form}>
            <DialogFooter>
              <div className="flex items-end justify-end gap-4">
                <PrimaryButton type="submit">Submit</PrimaryButton>
                <DialogClose asChild>
                  <DestructiveButton
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Close
                  </DestructiveButton>
                </DialogClose>
              </div>
            </DialogFooter>
          </FormComponent>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const FormComponent: React.FC<FormComponentProps> = ({ form, children }) => {
  const { toast } = useToast();
  const utils = api.useUtils();

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

  return (
    <Form {...form}>
      {createResident.isPending ? (
        <div className="flex items-center justify-center p-8">
          <Throbber></Throbber>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 pb-4">
            <div className="grid grid-cols-3 gap-4">
              <TextFormField
                form={form}
                name="first_name"
                label="First Name"
                required={true}
              />
              <TextFormField
                form={form}
                name="middle_name"
                label="Middle Name"
                required={false}
              />
              <TextFormField
                form={form}
                name="last_name"
                label="Last Name"
                required={true}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <CalendarFormField
                form={form}
                name="birth_date"
                label="Birth Date"
                required={true}
              />
              <SelectFormField
                form={form}
                name="gender"
                label="Gender"
                required={true}
              />
            </div>
            <div className="grid grid-cols-1">
              <TextFormField
                form={form}
                name="email"
                label="Email"
                required={true}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <PhoneFormField
                form={form}
                name="phone"
                label="Phone Number"
                required={true}
              />
              <SelectFormField
                form={form}
                name="phone_type"
                label="Phone Type"
                required={true}
              />
            </div>
          </div>
          {children}
        </form>
      )}
    </Form>
  );
};

const TextFormField: React.FC<FormFieldProps> = ({
  form,
  name,
  label,
  required = false,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center justify-start gap-1 align-top font-inter text-primary">
            {label}
            {required && (
              <AsteriskIcon
                className="h-3 w-3 text-destructive"
                style={{ strokeWidth: "1px" }}
              />
            )}
          </FormLabel>
          <FormControl inputMode={name === "email" ? "email" : "text"}>
            <Input
              {...field}
              value={
                field.value instanceof Date
                  ? field.value.toISOString()
                  : (field.value ?? "")
              }
              className="font-inter text-neutral-800 shadow-md focus-visible:ring-1"
            />
          </FormControl>
          <FormMessage className="font-inter text-xs text-destructive" />
        </FormItem>
      )}
    />
  );
};

const CalendarFormField: React.FC<FormFieldProps> = ({
  form,
  name,
  label,
  required = false,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center justify-start gap-1 align-top font-inter text-primary">
            {label}
            {required && (
              <AsteriskIcon
                className="h-3 w-3 text-destructive"
                style={{ strokeWidth: "1px" }}
              />
            )}
          </FormLabel>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <FormControl inputMode="none">
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
            <PopoverContent
              align="center"
              side="top"
              avoidCollisions={false}
              className="w-auto p-0.5"
              inputMode="none"
            >
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                defaultMonth={field.value ? new Date(field.value) : undefined}
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  field.onChange(date);
                  setIsCalendarOpen(false);
                }}
                fromYear={1900}
                toYear={new Date().getFullYear()}
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
  );
};

const PhoneFormField: React.FC<FormFieldProps> = ({
  form,
  name,
  label,
  required = false,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center justify-start gap-1 font-inter text-primary">
            {label}
            {required && (
              <AsteriskIcon
                className="h-3 w-3 text-destructive"
                style={{ strokeWidth: "1px" }}
              />
            )}
          </FormLabel>
          <FormControl inputMode="tel">
            <PhoneInput
              {...field}
              defaultCountry="US"
              value={
                field.value instanceof Date
                  ? field.value.toISOString()
                  : (field.value ?? "")
              }
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
  );
};

/*
 * This component is specifically catered for "gender" and "phone_type" keys.
 * Add more options inside the component under the switch statement.
 */
const SelectFormField: React.FC<FormFieldProps> = ({
  form,
  name,
  label,
  required = false,
}) => {
  const placeholders: Record<string, string> = {
    gender: "Select gender",
    phone_type: "Select phone type",
  };
  const options: Record<string, { option: string }[]> = {
    gender: [{ option: "Male" }, { option: "Female" }],
    phone_type: [
      { option: "Mobile" },
      { option: "Office" },
      { option: "Work" },
    ],
  };

  const placeholder = placeholders[name];
  const selectOptions = options[name];

  if (!placeholder || !selectOptions) {
    throw new Error(`SelectFormField: Unknown field name '${name}'`);
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center justify-start gap-1 align-top font-inter text-primary">
            {label}
            {required && (
              <AsteriskIcon
                className="h-3 w-3 text-destructive"
                style={{ strokeWidth: "1px" }}
              />
            )}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value ? field.value.toString() : undefined}
          >
            <FormControl
              className="font-inter font-medium text-muted-foreground shadow-md hover:bg-accent"
              inputMode="none"
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="font-inter shadow-md">
              {selectOptions.map((item) => {
                return (
                  <SelectItem
                    key={item.option}
                    value={item.option.toLowerCase()}
                    className="cursor-pointer"
                  >
                    {item.option}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage className="font-inter text-xs text-destructive" />
        </FormItem>
      )}
    />
  );
};

function ResidentForm() {
  const form = useForm<z.infer<typeof residentSchema>>({
    resolver: zodResolver(residentSchema),
    defaultValues: exampleValues,
  });

  return <DialogComponent form={form} />;
}

export default ResidentForm;

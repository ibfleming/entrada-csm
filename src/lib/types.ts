import { format } from "date-fns";
import { z } from "zod";

/* https://zod.dev */

export const phoneEnum = ["mobile", "home", "work"] as const;
export const genderEnum = ["male", "female"] as const;
const dateSchema = z.coerce
  .date({
    invalid_type_error: "Birth date is required.",
    required_error: "Birth date is required.",
    message: "Birth date is required.",
  })
  .transform((date) => {
    return format(date, "MM/dd/yyyy");
  });

export const residentSchema = z.object({
  phone: z
    .string({
      required_error: "Phone number is required.",
    })
    .min(7, {
      message: "Phone number must be at least 7 characters.",
    })
    .max(15, {
      message: "Phone number must be at most 15 characters.",
    }),
  phone_type: z.enum(phoneEnum, {
    message: "Phone type is required.",
  }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email()
    .min(1, {
      message: "Email must be at least 1 character.",
    })
    .max(256, {
      message: "Email must be at most 256 characters.",
    }),
  first_name: z
    .string({
      required_error: "First name is required.",
    })
    .min(2, {
      message: "First name must be at least 1 character.",
    })
    .max(256, {
      message: "First name must be at most 256 characters.",
    })
    .regex(/^[a-zA-Z]+$/, {
      message: "First name can only contain letters.",
    }),
  middle_name: z
    .string()
    .max(256, {
      message: "Middle name must be at most 256 characters.",
    })
    .regex(/^[a-zA-Z]+$/, {
      message: "First name can only contain letters.",
    })
    .nullish(),
  last_name: z
    .string({
      required_error: "Last name is required.",
    })
    .min(2, {
      message: "Last name must be at least 1 character.",
    })
    .max(256, {
      message: "Last name must be at most 256 characters.",
    })
    .regex(/^[a-zA-Z]+$/, {
      message: "First name can only contain letters.",
    }),
  gender: z.enum(genderEnum, {
    message: "Gender is required.",
  }),
  birth_date: dateSchema, // YYYY-MM-DD is valid!
});

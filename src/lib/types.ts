import { z } from "zod";

/* https://zod.dev */

export const phoneEnum = ["mobile", "home", "work"] as const;
export const genderEnum = ["male", "female"] as const;
const dateSchema = z
  .date({
    required_error: "Birth date is required.",
    invalid_type_error: "Invalid date.",
  })
  .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), {
    message: "Must be 18 years old or older.",
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
    required_error: "Phone type is required.",
  }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({ message: "Invalid email." })
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
    .min(1, {
      message: "First name must be at least 1 character.",
    })
    .max(256, {
      message: "First name must be at most 256 characters.",
    }),
  middle_name: z
    .string()
    .max(256, {
      message: "Middle name must be at most 256 characters.",
    })
    .nullish(),
  last_name: z
    .string({
      required_error: "Last name is required.",
    })
    .min(1, {
      message: "Last name must be at least 1 character.",
    })
    .max(256, {
      message: "Last name must be at most 256 characters.",
    }),
  gender: z.enum(genderEnum, {
    required_error: "Gender is required.",
  }),
  birth_date: dateSchema, // YYYY-MM-DD is valid!
});

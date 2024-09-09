import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Resident } from "@/custom/tables/residents/columns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(row: Resident): string {
  // Remove all non-digit characters from the phone number
  const digits = row.phone.replace(/\D+/g, "");

  // Check if the phone number has exactly 10 digits
  if (digits.length !== 10) {
    throw new Error(
      "Invalid phone number. Please enter a 10-digit phone number.",
    );
  }

  // Format the phone number
  const formattedPhoneNumber = `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  return formattedPhoneNumber;
}

export const getFullName = (row: Resident) => {
  const lastName: string = row.last_name;
  const firstName: string = row.first_name;
  const middleName: string | null = row.middle_name;
  let fullName = `${lastName}, ${firstName}`;

  if (middleName) {
    fullName = `${lastName}, ${firstName} ${middleName.at(0)}.`;
  }

  return fullName;
};

export const getBirthDate = (birthday: Date) => {
  return `${birthday.getMonth() + 1}/${birthday.getDate()}/${birthday.getFullYear()}`;
};

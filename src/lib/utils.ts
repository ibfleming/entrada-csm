import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Resident } from "~/components/custom/residents-table/columns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

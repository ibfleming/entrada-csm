"use client";

import { type ColumnDef } from "@tanstack/react-table";

export type Resident = {
  id: number;
  created_at: Date;
  updated_at: Date | null;
  username: string;
  phone: string;
  phone_type: string;
  email: string;
  password: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  gender: string;
  birth_date: string;
};

export const columns: ColumnDef<Resident>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
];

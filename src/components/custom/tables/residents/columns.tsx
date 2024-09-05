import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/ui/button";
import { GhostButton } from "@/custom/buttons";

type Resident = {
  id: number;
  username: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  phone: string;
  created_at: Date;
};

/*
type Resident = {
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
*/

const residentColumns: ColumnDef<Resident>[] = [
  // SELECT COLUMN
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="bg-background"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // NAME COLUMN
  {
    accessorKey: "residentName",
    header: ({ column }) => {
      return (
        <GhostButton
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Resident Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </GhostButton>
      );
    },
    cell: ({ row }) => {
      const lastName: string = row.getValue("lastName");
      const firstName: string = row.getValue("firstName");
      const middleName: string | undefined = row.getValue("middleName");

      let fullName = `${lastName}, ${firstName}`;

      if (middleName) {
        fullName = `${lastName}, ${firstName} ${middleName.charAt(0).toUpperCase()}${middleName.slice(1)}`;
      }

      return <div className="capitalize">{fullName}</div>;
    },
  },
  // EMAIL COLUMN
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <GhostButton
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </GhostButton>
      );
    },
  },
  // PHONE COLUMN
  {
    accessorKey: "phone",
    header: "Phone",
  },
  // CREATED AT COLUMN
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  // ACTION
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const resident = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="menu-trigger" asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 font-inter text-primary hover:text-primary"
            >
              <span className="sr-only">Open</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="font-rubik text-primary shadow-lg"
            align="end"
          >
            <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(resident.id.toString())
              }
            >
              Copy Resident ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="menu-item">
              View customer
            </DropdownMenuItem>
            <DropdownMenuItem className="menu-item">
              View payment details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export { type Resident, residentColumns };

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { type Row, type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/custom/checkbox";
import { ArrowUpDown, MoreHorizontal, Copy, Trash2 } from "lucide-react";
import { Button } from "@/ui/button";
import { GhostButton } from "@/custom/buttons";
import { formatPhoneNumber, getFullName } from "~/lib/utils";
import "@/styles/dropdown.css";
import { api } from "~/trpc/react";

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
        className=""
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // NAME COLUMN
  {
    id: "fullName",
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
    accessorFn: (row) => getFullName(row),
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("fullName")}</div>;
    },
  },
  // USERNAME COLUMN
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <GhostButton
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </GhostButton>
      );
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
    header: "Phone Number",
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue("phone");
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      return <div>{formattedPhoneNumber}</div>;
    },
  },
  // CREATED AT COLUMN
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date: Date = row.getValue("created_at");
      const formattedDate = date.toLocaleString("en-US", {
        second: "numeric",
        minute: "numeric",
        hour12: true,
        hour: "numeric",
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });
      return <div>{formattedDate}</div>;
    },
  },
  // ACTION
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell {...row} />,
  },
];

function ActionCell(row: Row<Resident>) {
  const resident = row.original;
  const fullName = getFullName(resident);
  const { toast } = useToast();
  const utils = api.useUtils();
  const mutation = api.user.deleteUser.useMutation({
    onSuccess: () => {
      // utils.user.invalidate();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="menu-trigger" asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 font-inter text-inherit">
          <span className="sr-only">Open</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="font-rubik text-primary shadow-lg"
        align="end"
      >
        <DropdownMenuLabel className="font-inter text-sm">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="menu-item"
          onClick={() => {
            void navigator.clipboard.writeText(resident.username);
            toast({
              variant: "copy",
              title: "Copied!",
              duration: 1000,
            });
          }}
        >
          <Copy className="mr-2 h-4 w-4" />
          Username
        </DropdownMenuItem>
        <DropdownMenuItem
          className="menu-item"
          onClick={() => {
            void navigator.clipboard.writeText(fullName);
            toast({
              variant: "copy",
              title: "Copied!",
              duration: 1000,
            });
          }}
        >
          <Copy className="mr-2 h-4 w-4" />
          Name
        </DropdownMenuItem>
        <DropdownMenuItem
          className="menu-item"
          onClick={() => {
            void navigator.clipboard.writeText(resident.email);
            toast({
              variant: "copy",
              title: "Copied!",
              duration: 1000,
            });
          }}
        >
          <Copy className="mr-2 h-4 w-4" />
          Email
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive hover:text-destructive focus:text-destructive"
          onClick={async () => {
            mutation.mutate({ id: resident.id });
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* const residentColumns: ColumnDef<Resident>[] = [
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
        className=""
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // NAME COLUMN
  {
    id: "fullName",
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
    accessorFn: (row) => getFullName(row),
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("fullName")}</div>;
    },
  },
  // USERNAME COLUMN
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <GhostButton
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </GhostButton>
      );
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
    header: "Phone Number",
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue("phone");
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      return <div>{formattedPhoneNumber}</div>;
    },
  },
  // CREATED AT COLUMN
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date: Date = row.getValue("created_at");
      const formattedDate = date.toLocaleString("en-US", {
        second: "numeric",
        minute: "numeric",
        hour12: true,
        hour: "numeric",
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });
      return <div>{formattedDate}</div>;
    },
  },
  // ACTION
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const resident = row.original;
      const fullName = getFullName(resident);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="menu-trigger" asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 font-inter text-inherit"
            >
              <span className="sr-only">Open</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="font-rubik text-primary shadow-lg"
            align="end"
          >
            <DropdownMenuLabel className="font-inter text-sm">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="menu-item"
              onClick={() => navigator.clipboard.writeText(resident.username)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Username
            </DropdownMenuItem>
            <DropdownMenuItem
              className="menu-item"
              onClick={() => navigator.clipboard.writeText(fullName)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Name
            </DropdownMenuItem>
            <DropdownMenuItem
              className="menu-item"
              onClick={() => navigator.clipboard.writeText(resident.email)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="menu-item delete"
              onClick={() => console.log("Deleting", resident.username)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; */

export { type Resident, residentColumns };

"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import "@/styles/dropdown.css";
import { Input } from "@/ui/input";
import { ArrowRightLeftIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Pagination } from "./pagination";
import ResidentForm from "./resident-form";

interface ResidentDataTableProps<Resident> {
  columns: ColumnDef<Resident>[];
  data: Resident[];
}

export function ResidentDataTable<Resident>({
  columns,
  data,
}: ResidentDataTableProps<Resident>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [toggle, setSearchToggle] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center justify-start gap-4">
          <Input
            placeholder="Search emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("email")?.setFilterValue(event.target.value);
              setSearchToggle(!!event.target.value);
            }}
            className="w-[100vw] max-w-sm font-inter text-neutral-800 shadow-md focus-visible:ring-1"
          />
          <ResidentForm />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="menu-trigger shadow-md" asChild>
            <Button className="ml-auto flex items-center justify-center gap-1.5 font-inter text-background hover:bg-hover">
              <ArrowRightLeftIcon className="h-5 w-5" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="font-inter text-primary shadow-lg"
            align="end"
            side="bottom"
          >
            <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="menu-item capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader className="bg-border-background">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-none font-inter hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`${
                      header.id === "select" ? "pl-6" : ""
                    } text-primary`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`${
                      cell.column.id === "select" ? "px-6" : ""
                    } ${cell.column.id === "Resident Name" ? "pl-6" : ""} font-inter text-inherit`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center font-inter font-semibold text-destructive"
              >
                {table.getFilteredRowModel().rows.length === 0 && toggle
                  ? "No search results found."
                  : "No data."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination table={table} />
    </div>
  );
}

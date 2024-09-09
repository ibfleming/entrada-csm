import { type Table } from "@tanstack/react-table";
import { OutlineButton } from "@/custom/buttons";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowRightFromLineIcon,
  ArrowLeftFromLineIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

interface PaginationProps<TData> {
  table: Table<TData>;
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between pt-4 font-inter text-primary">
      <div className="flex-1 pl-4 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-full w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="font-inter text-primary">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className="cursor-pointer hover:text-primary focus:text-primary"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <OutlineButton
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="shadow-md"
          >
            <span className="sr-only">Go to first page</span>
            <ArrowLeftFromLineIcon className="h-5 w-5" />
          </OutlineButton>
          <OutlineButton
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="shadow-md"
          >
            <span className="sr-only">Go to previous page</span>
            <ArrowLeftIcon className="h-5 w-5" />
          </OutlineButton>
          <OutlineButton
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="shadow-md"
          >
            <span className="sr-only">Go to next page</span>
            <ArrowRightIcon className="h-5 w-5" />
          </OutlineButton>
          <OutlineButton
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="shadow-md"
          >
            <span className="sr-only">Go to last page</span>
            <ArrowRightFromLineIcon className="h-5 w-5" />
          </OutlineButton>
        </div>
      </div>
    </div>
  );
}

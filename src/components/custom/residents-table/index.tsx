"use client";

import { api } from "~/trpc/react";
import { type Resident, residentColumns } from "./columns";
import { ResidentDataTable } from "./data-table";
import Throbber from "@/ui/throbber";

export default function ResidentsTable() {
  const { data, isLoading, isError, error } = api.user.fetchUsers.useQuery();
  const residents: Resident[] = data ?? [];

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center pt-32">
        <Throbber />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center pt-32 text-lg font-semibold text-destructive">
        {error.data?.httpStatus === 500 ? "Internal server error. (500)" : ""}
      </div>
    );
  }

  return (
    <div className="p-4">
      <ResidentDataTable columns={residentColumns} data={residents} />
    </div>
  );
}

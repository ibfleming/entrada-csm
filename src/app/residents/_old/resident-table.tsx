"use client";

import { DataTable } from "~/app/residents/_old/data-table";
import { columns, type Resident } from "~/app/residents/_old/columns";
import { api } from "~/trpc/react";
import Throbber from "@/ui/throbber";

export default function ResidentTable() {
  const { data, isLoading, isError, error } = api.user.fetchUsers.useQuery();

  const residents: Resident[] = data ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Throbber />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mb-16 rounded-b-md border-x-[6px] border-b-[6px] border-green-700 bg-[#fafaf9] p-8">
      <DataTable columns={columns} data={residents ?? []} />
    </div>
  );
}

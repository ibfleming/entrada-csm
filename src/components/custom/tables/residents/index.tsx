"use client";

import { api } from "~/trpc/react";
import { type Resident, residentColumns } from "./columns";
import { ResidentDataTable } from "./data-table";

export default function ResidentsTable() {
  const { data, isLoading, isError, error } = api.user.fetchUsers.useQuery();
  const residents: Resident[] = data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ResidentDataTable columns={residentColumns} data={residents} />
    </div>
  );
}

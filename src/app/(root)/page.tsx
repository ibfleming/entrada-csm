import ResidentsTable from "~/components/custom/residents-table";
import { DateInput } from "~/components/custom/date-input";
import React from "react";

export default async function Home() {
  return (
    <div>
      <div className="flex items-center justify-center p-4">
        <DateInput />
      </div>
      <ResidentsTable />
    </div>
  );
}

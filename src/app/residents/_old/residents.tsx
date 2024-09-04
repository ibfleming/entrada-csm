"use client";

import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import "@/styles/resident.css";
import Throbber from "@/ui/throbber";

export default function ResidentsView() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  useEffect(() => {
    console.log(selectedRows);
  });

  const {
    data: residents,
    isLoading,
    isError,
    error,
  } = api.user.fetchUsers.useQuery();

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

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedRows((prevRows) => [...prevRows, id]);
    } else {
      setSelectedRows((prevRows) => prevRows.filter((rowId) => rowId !== id));
    }
  };

  return (
    <div className="p-3">
      <table className="w-full border-x-[1px] border-neutral-700">
        <thead>
          <tr className="bg-neutral-700 font-rubik text-stone-50">
            <th>Select</th>
            <th>Resident</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Birth Date</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody className="bg-stone-100">
          {residents?.map((resident) => (
            <tr key={resident.id}>
              <td>
                <input
                  type="checkbox"
                  value={resident.id}
                  onChange={(e) => handleCheckboxChange(e, resident.id)}
                />
              </td>
              <td className="font-semibold text-green-700">
                {resident.last_name},&nbsp;{resident.first_name}
                {resident.middle_name && `, ${resident.middle_name[0]}.`}
              </td>
              <td>{resident.email}</td>
              <td>+1&nbsp;{resident.phone}</td>
              <td>{resident.birth_date}</td>
              <td className="capitalize">{resident.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

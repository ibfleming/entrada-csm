import { type Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { payments } from "./data";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return payments;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

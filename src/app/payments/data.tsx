export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "a1b2c3d4",
    amount: 50,
    status: "success",
    email: "john.doe@example.net",
  },
  {
    id: "e5f6g7h8",
    amount: 200,
    status: "pending",
    email: "jane.doe@example.io",
  },
  {
    id: "i9j8k7l6",
    amount: 150,
    status: "processing",
    email: "bob.smith@example.co",
  },
  {
    id: "m3n4o5p6",
    amount: 75,
    status: "success",
    email: "alice.johnson@example.edu",
  },
  {
    id: "q1r2s3t4",
    amount: 250,
    status: "pending",
    email: "charlie.brown@example.tv",
  },
  {
    id: "u8v7w6x5",
    amount: 100,
    status: "processing",
    email: "david.lee@example.biz",
  },
  {
    id: "y2z1x0w9",
    amount: 50,
    status: "success",
    email: "emily.chen@example.info",
  },
  {
    id: "3b4a5c6d",
    amount: 300,
    status: "pending",
    email: "frank.wong@example.tel",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "SWAG@SWAG.com",
  },
  {
    id: "a1b2c3d4",
    amount: 50,
    status: "success",
    email: "john.doe@example.net",
  },
  {
    id: "e5f6g7h8",
    amount: 200,
    status: "pending",
    email: "jane.doe@example.io",
  },
  {
    id: "i9j8k7l6",
    amount: 150,
    status: "processing",
    email: "bob.smith@example.co",
  },
  {
    id: "m3n4o5p6",
    amount: 75,
    status: "success",
    email: "alice.johnson@example.edu",
  },
  {
    id: "q1r2s3t4",
    amount: 250,
    status: "pending",
    email: "charlie.brown@example.tv",
  },
  {
    id: "u8v7w6x5",
    amount: 100,
    status: "processing",
    email: "david.lee@example.biz",
  },
  {
    id: "y2z1x0w9",
    amount: 50,
    status: "success",
    email: "emily.chen@example.info",
  },
  {
    id: "3b4a5c6d",
    amount: 300,
    status: "pending",
    email: "frank.wong@example.tel",
  },
];

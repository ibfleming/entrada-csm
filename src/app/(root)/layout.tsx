import { HydrateClient } from "~/trpc/server";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HydrateClient>
      <main>{children}</main>
    </HydrateClient>
  );
}

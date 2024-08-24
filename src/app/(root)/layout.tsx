import { HydrateClient } from "~/trpc/server";
import Navigation from "components/nav/navigation";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <HydrateClient>
      <main>
        <Navigation />
        {children}
      </main>
    </HydrateClient>
  );
}

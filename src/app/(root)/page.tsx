import { api, HydrateClient } from "~/trpc/server";
import Nav from "components/Nav";

export default async function Home() {
  const userMsg = await api.user.test({ text: "Success!" });
  return (
    <HydrateClient>
      <main className="text-7xl">
        {userMsg ? userMsg.greeting : <p>User tRPC loading...</p>}
        <Nav />
      </main>
    </HydrateClient>
  );
}

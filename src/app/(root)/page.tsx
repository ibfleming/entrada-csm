import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const userMsg = await api.user.test({ text: "Success!" });
  return (
    <HydrateClient>
      <main className="text-5xl">
        {/* {userMsg ? userMsg.greeting : <p>User tRPC loading...</p>} */}
      </main>
    </HydrateClient>
  );
}

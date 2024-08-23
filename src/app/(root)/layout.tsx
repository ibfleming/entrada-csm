import "~/styles/globals.css";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import NavMenu from "components/navigation/nav";
import { inter } from "~/lib/fonts";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Entrada",
  description: "CMS for residential housing.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const online = await api.user.test({ text: "Online!" });

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="flex items-center justify-between">
          <NavMenu />
          {online ? online.greeting : "Offline!"}
        </div>

        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

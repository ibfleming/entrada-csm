import "~/styles/globals.css";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { inter, rubik, poppins, ibmPlex } from "~/lib/fonts";
import Navigation from "~/components/ui/navigation";
import Breadcrumbs from "~/components/ui/breadcrumbs";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Entrada (dev)",
  description: "CMS for residential housing.",
  authors: [{ name: "Ian Fleming" }],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${rubik.variable} ${poppins.variable} ${ibmPlex.variable}`}
    >
      <body>
        <TRPCReactProvider>
          <div className="px-1">
            <header className="h-14 font-poppins text-2xl font-semibold text-green-700">
              <span className="flex h-full w-full items-center justify-start pl-4">
                entrada
              </span>
            </header>
            <Navigation>
              <Breadcrumbs />
            </Navigation>
            <div className="h-1.5 w-full bg-green-700"></div>
          </div>
          <HydrateClient>
            <div className="px-1">{children}</div>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

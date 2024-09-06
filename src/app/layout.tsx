import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import Header from "@/header";
import { inter, rubik, poppins, ibmPlex } from "~/lib/fonts";
import "~/styles/globals.css";
import { Toaster } from "@/ui/toaster";

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
      className={`${inter.variable} ${rubik.variable} ${poppins.variable} ${ibmPlex.variable} p-4`}
    >
      <body>
        <Header />
        <TRPCReactProvider>
          <HydrateClient>
            {children}
            <Toaster />
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

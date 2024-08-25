import "~/styles/globals.css";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { inter, rubik, poppins, ibmPlex } from "~/lib/fonts";
import Navigation from "@/navigation";

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
          {" "}
          <Navigation />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}

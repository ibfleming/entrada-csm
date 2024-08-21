import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { inter } from "~/lib/font";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Entrada",
  description: "CMS for residential housing.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

import "~/styles/globals.css";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { inter, rubik, poppins, ibmPlex } from "~/lib/fonts";
import Navigation from "@/ui/navigation";
import Breadcrumbs from "@/ui/breadcrumbs";
import { HydrateClient } from "~/trpc/server";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Checkbox } from "@/ui/checkbox";

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
          <div className="p-4">
            <header className="px-4 pb-4 font-poppins text-2xl font-semibold text-green-700">
              <span className="flex h-full w-full items-center justify-start">
                entrada
              </span>
            </header>

            <div className="shadow-lg">
              <Navigation>
                <Breadcrumbs />
              </Navigation>
              <div className="h-2.5 rounded-b-sm bg-green-700"></div>
            </div>

            <HydrateClient>
              <div className="flex items-center justify-start gap-4 p-4">
                <Button className="font-inter hover:bg-hover">Primary</Button>

                <Button
                  variant="secondary"
                  className="font-inter hover:bg-primary hover:text-background"
                >
                  Secondary
                </Button>

                <Button variant="destructive" className="font-inter">
                  Destructive
                </Button>

                <Button
                  variant="outline"
                  className="font-inter text-primary hover:text-primary"
                >
                  Outline
                </Button>

                <Button
                  variant="ghost"
                  className="font-inter text-primary hover:text-primary"
                >
                  Ghost
                </Button>

                <Button
                  variant="link"
                  className="font-inter text-primary hover:text-primary"
                >
                  Link
                </Button>

                <div className="flex items-center space-x-2 font-inter text-primary">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant="default"
                      className="font-inter focus-within:ring-transparent hover:bg-hover"
                    >
                      Dropdown
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="font-inter text-primary shadow-lg">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:cursor-pointer hover:text-primary focus:text-primary">
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer hover:text-primary focus:text-primary">
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer hover:text-primary focus:text-primary">
                      Team
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer hover:text-primary focus:text-primary">
                      Subscription
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {children}
            </HydrateClient>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

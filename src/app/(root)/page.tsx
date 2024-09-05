import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/ui/dropdown-menu";
import { FileTerminal, Mail } from "lucide-react";
import {
  ButtonIconText,
  DestructiveButton,
  GhostButton,
  IconButton,
  LinkButton,
  OutlineButton,
  PrimaryButton,
  SecondaryButton,
} from "@/custom/buttons";
import { Input } from "@/ui/input";
import { Checkbox, CheckboxWithText } from "@/custom/checkbox";
import { ResidentTable } from "@/custom/tables/resident";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-start gap-4 p-4">
        <PrimaryButton>Primary</PrimaryButton>
        <SecondaryButton>Secondary</SecondaryButton>
        <DestructiveButton>Destructive</DestructiveButton>
        <OutlineButton>Outline</OutlineButton>
        <GhostButton>Ghost</GhostButton>
        <LinkButton>Link</LinkButton>
        <IconButton>
          <FileTerminal className="h-4 w-4" />
        </IconButton>
        <ButtonIconText icon={Mail}>Login</ButtonIconText>
        <CheckboxWithText id="terms" label="Accept terms and conditions" />
        <Checkbox />

        <div className="w-56">
          <Input
            className="border-2 font-inter text-neutral-800 shadow-md focus-visible:ring-2"
            type="email"
            placeholder="Email"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:outline-none">
            <span className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 font-inter text-sm font-medium text-primary-foreground shadow transition-colors focus-within:ring-transparent hover:bg-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Dropdown
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-rubik text-primary shadow-lg">
            <DropdownMenuLabel className="text-xs">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs hover:cursor-pointer hover:text-primary focus:text-primary">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:cursor-pointer hover:text-primary focus:text-primary">
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:cursor-pointer hover:text-primary focus:text-primary">
              Team
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:cursor-pointer hover:text-primary focus:text-primary">
              Subscription
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ResidentTable />
      </div>
    </div>
  );
}

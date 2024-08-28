import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function SettingsButton() {
  return (
    <Link href="/">
      <GearIcon className="hover:animate-pulse" />
    </Link>
  );
}

import { PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function ProfileButton() {
  return (
    <Link href="/">
      <PersonIcon className="hover:animate-pulse" />
    </Link>
  );
}

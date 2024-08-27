"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const name = pathname.split("/").pop();
  if (!name) {
    return (
      <div className="bg-stone-50 font-rubik text-xs">
        <ol className="flex items-center justify-start gap-3 p-2 pl-4 text-neutral-500">
          <Link href="/">/</Link>
        </ol>
      </div>
    );
  }
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="bg-stone-50 font-rubik text-xs">
      <ol className="flex items-center justify-start gap-3 p-2 pl-4 text-neutral-500">
        <Link href="/">/</Link>
        <Link href={pathname}>{capitalized}</Link>
      </ol>
    </div>
  );
}

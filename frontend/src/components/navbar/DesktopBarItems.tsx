"use client";

import { NavBarItems } from "@/constants/NavBarItems";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

export default function DesktopBar({}: Props) {
  const path = usePathname();

  return (
    <ul className="hidden items-center justify-center gap-2 md:flex">
      {NavBarItems.map(({ title, href }, index) => (
        <li
          key={index}
          className={cn(
            "hover:text-zinc-600 hover:dark:text-zinc-400",
            path === href && "text-primary",
          )}
        >
          <Link href={href}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { NavBarItems } from "@/constants/NavBarItems";

type Props = {};

export default function MobileMenuItems({}: Props) {
  const path = usePathname();

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-2">
      {NavBarItems.map(({ title, href }, index) => (
        <Link href={href} key={index} className="w-full">
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full",
              // "w-full hover:text-zinc-600 hover:dark:text-zinc-400",
              path === href && "text-primary",
            )}
          >
            {title}
          </Button>
        </Link>
      ))}
    </div>
  );
}

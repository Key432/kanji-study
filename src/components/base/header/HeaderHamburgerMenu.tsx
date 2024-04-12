"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import Link from "next/link";

import { sitemap } from "@/constant/sitemap";

export function HeaderHamburgerMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton className="mx-4 bg-slate-50 text-black cursor-pointer hover:bg-secondary-300">
          <HamburgerMenuIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {sitemap.children?.map((item, index) => {
          return (
            <Link href={item.href} key={index}>
              <DropdownMenu.Item className="px-4 cursor-pointer text-black bg-slate-50 hover:bg-secondary-300">
                {item.name}
              </DropdownMenu.Item>
            </Link>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

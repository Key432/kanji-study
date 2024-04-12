import { Tooltip } from "@radix-ui/themes";
import Link from "next/link";

import { sitemap } from "@/constant/sitemap";

export function HeaderRibbonMenu() {
  return (
    <ul className="flex">
      {sitemap.children?.map((item, index) => {
        return (
          <Tooltip content={item.description} key={index}>
            <Link
              href={item.href}
              className="mx-2 px-2 py-1 bg-slate-100 rounded-t-lg hover:bg-secondary-300"
            >
              <li>{item.name}</li>
            </Link>
          </Tooltip>
        );
      })}
    </ul>
  );
}

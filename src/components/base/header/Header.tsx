import Link from "next/link";

import { HeaderHamburgerMenu } from "./HeaderHamburgerMenu";
import { HeaderRibbonMenu } from "./HeaderRibbonMenu";
import { TitleLogo } from "../logo/TitleLogo";

export function Header() {
  return (
    <header className="w-full h-12 bg-primary-300 sticky top-0">
      <div className="h-full container mx-auto flex justify-between items-center">
        <Link href="/" className="active:translate-y-0.5">
          <TitleLogo className="text-lg px-2 md:text-xl" />
        </Link>
        <div className="mt-auto hidden sm:block">
          <HeaderRibbonMenu />
        </div>
        <div className="block sm:hidden">
          <HeaderHamburgerMenu />
        </div>
      </div>
    </header>
  );
}

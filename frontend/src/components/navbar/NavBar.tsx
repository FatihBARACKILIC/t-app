import { Images } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import DesktopBar from "./DesktopBarItems";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "../theme";
import LoginButton from "./LoginButton";
import { Button } from "../ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

type Props = {};

export default function NavBar({}: Props) {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-zinc-600 p-4">
        <div className="flex items-center gap-2">
          <MobileMenu />
          <Link href="/" className="flex items-center justify-center gap-2">
            <Image
              src={Images.logo.sm}
              alt={Images.logo.alt}
              width={32}
              height={32}
              className="drop-shadow"
            />
            <span className="hidden text-2xl md:block">T-App</span>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2">
          <DesktopBar />
          <Link
            href="https://github.com/FatihBARACKILIC/t-app"
            target="_blank"
            title="GitHub Url"
          >
            <Button
              type="button"
              variant="outline"
              size="icon"
              title="GitHub Url"
            >
              <GitHubLogoIcon className="h-4 w-4" />
            </Button>
          </Link>
          <ModeToggle />
          <LoginButton />
        </div>
      </nav>
    </>
  );
}

import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import MobileMenuItems from "./MobileMenuItems";
import { Button } from "../ui/button";

type Props = {};

export default function MobileMenu({}: Props) {
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button type="button" size="icon" variant="outline">
            <Bars3BottomLeftIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex h-full flex-col justify-between">
            <div>
              <SheetHeader>
                <SheetTitle>T-App</SheetTitle>
              </SheetHeader>
              <MobileMenuItems />
            </div>
            <SheetClose asChild>
              <Button type="button" variant="ghost" className="w-full">
                Close
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

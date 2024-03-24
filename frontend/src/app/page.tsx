import { Images } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <main className="m-auto grid h-screen place-items-center">
      <Image
        src={Images.logo.md}
        alt={Images.logo.alt}
        width={540}
        height={540}
        className="drop-shadow"
        priority={false}
      />
    </main>
  );
}

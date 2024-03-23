import { ModeToggle } from "@/components/theme";
import Image from "next/image";

export default function Home() {
  return (
    <main className="m-auto flex items-center justify-center h-screen flex-col">
      <Image
        src="/logo.png"
        alt="logo"
        width={540}
        height={540}
        className="drop-shadow-md"
      />

      <div className="mt-4 m-auto">
        <ModeToggle />
      </div>
    </main>
  );
}

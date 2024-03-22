import Image from "next/image";

export default function Home() {
  return (
    <main className="m-auto flex items-center justify-center h-screen">
      <Image
        src="/logo.png"
        alt="logo"
        width={540}
        height={540}
        className="drop-shadow-md"
      />
    </main>
  );
}

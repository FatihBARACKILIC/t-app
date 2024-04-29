import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <Image
        src="/images/logo.png"
        alt="T-App Logo"
        width={1080}
        height={1080}
        className="size-96"
        priority
      />
    </main>
  );
}

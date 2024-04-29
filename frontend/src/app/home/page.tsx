import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const data = await fetch(
    `http://localhost:4000/user/${session?.user.username}`,
    {
      headers: {
        Authorization: `Bearer ${session?.tokens.access_token}`,
      },
    },
  ).then((res) => res.json());

  return (
    <main>
      <pre className="w-full p-4">{JSON.stringify(session, null, 2)}</pre>
      <h1>Data</h1>
      <pre className="w-full p-4">{JSON.stringify(data, null, 2)}</pre>

      <Link href="/sign-out" className="ml-auto flex gap-4 text-rose-500">
        Sign Out
      </Link>
    </main>
  );
}

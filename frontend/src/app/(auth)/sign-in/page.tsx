import { SignInForm } from "@/components/forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {};

export default async function SignInPage({}: Props) {
  return (
    <main className="grid h-dvh w-dvw place-items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter>
          <Link
            href="/password-reset"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Forgot password
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}

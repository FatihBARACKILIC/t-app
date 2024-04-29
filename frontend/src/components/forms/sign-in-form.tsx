"use client";

import { regex } from "@/lib/regex";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

type Props = {};

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().regex(regex.password.regex, regex.password.message),
});

type FormSchema = z.infer<typeof formSchema>;

export function SignInForm({}: Props) {
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    const res = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    if (!res?.error) {
      router.push("http://localhost:3000");
    }
    // const { username, password } = values;
    // const body: Record<string, string> = { password };

    // const isEmail = z.string().email().safeParse(username);
    // const isPhoneNumber = z
    //   .string()
    //   .refine(validator.isMobilePhone)
    //   .safeParse(username);

    // if (isEmail.success === true) body.email = username;
    // else if (isPhoneNumber.success === true) body.phoneNumber = username;
    // else body.username = username;

    // const result = await fetch("http://localhost:4000/signin", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // });
    // if (!result.ok) {
    //   const error = await result.json();
    // }
    // const data = await result.json();
    // console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                You can log in with your username, email, or phone number.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              {field.value.length !== 0 && (
                <FormMessage className="flex flex-col gap-y-0.5">
                  {!field.value.match(/(?=.*[a-z].*[a-z])/) ? (
                    <span>
                      Password must contain at least one lowercase letter.
                    </span>
                  ) : null}

                  {!field.value.match(/(?=.*[A-Z].*[A-Z])/) ? (
                    <span>
                      Password must contain at least one uppercase letter.
                    </span>
                  ) : null}

                  {!field.value.match(/(?=.*\d.*\d)/) ? (
                    <span>Password must contain at least one number.</span>
                  ) : null}

                  {!field.value.match(
                    /(?=.*[!@#$%^&*()-_+=].*[!@#$%^&*()-_+=])/,
                  ) ? (
                    <span>
                      Password must contain at least one special character.
                    </span>
                  ) : null}

                  {!field.value.match(/^.{8,30}$/) ? (
                    <span>
                      Password must be between 8 and 30 characters long.
                    </span>
                  ) : null}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
}

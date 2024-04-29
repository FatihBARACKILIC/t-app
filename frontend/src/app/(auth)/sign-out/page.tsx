"use client";

import { signOut } from "next-auth/react";

type Props = {};

export default function SignOutPage({}: Props) {
  const result = signOut();
  return <>Sign-out Page</>;
}

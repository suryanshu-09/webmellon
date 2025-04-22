"use server"

import { signIn, signOut } from "@/lib/auth";

export const loginGoogle = async () => {
  await signIn("google", { redirectTo: "/dashboard" })
};

export const loginGithub = async () => {
  await signIn("github", { redirectTo: "/dashboard" })
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

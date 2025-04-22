"use server"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import { SignInCard } from "@/components/sign-in-card";

export default async function SignIn() {
  const session = await auth();
  if (session?.user) {
    return redirect("/dashboard")
  }
  return (
    <div className="h-screen w-screen border flex items-center justify-center">
      <div className="p-20 border rounded-lg bg-amber-100">
        <div className="flex justify-center">
          <span className="font-bold text-2xl">
            SignUp to
            <span className="italic pl-1 font-serif font-light text-3xl text-[#FB8500]">
              WebMellon
            </span>
          </span>
        </div>
        <div className="">
          <SignInCard></SignInCard>
        </div>
      </div>
    </div>
  )
}

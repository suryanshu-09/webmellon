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
      <div className="p-12 sm:p-20 border rounded-lg bg-amber-100 dark:bg-[#17171A]">
        <div className="flex justify-center text-nowrap">
          <span className="font-bold text-lg sm:text-2xl dark:text-white">
            SignUp to
            <span className="italic pl-1 font-serif font-light text-xl sm:text-3xl text-[#FB8500]">
              WebMellon
            </span>
          </span>
        </div>
        <div>
          <SignInCard></SignInCard>
        </div>
      </div >
    </div >
  )
}

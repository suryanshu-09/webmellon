"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
export default function AppBarSignIn() {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/signin")} className="bg-[#FFB703] text-[#023047] hover:bg-[#FB8500]">Sign In</Button>
  )
}

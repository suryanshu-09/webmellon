"use client"
import { userAtom } from "@/store/atoms/userAtom";
import AppBarSignIn from "@/components/appbar-sign-in";
import Profile from "@/components/profile";
import { useAtomValue } from "jotai";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AppBar() {
  const session = useAtomValue(userAtom);
  const pathname = usePathname();
  const isEditPage = pathname.startsWith('/edit');
  const isDashboard = pathname.startsWith('/dashboard');
  const isProfile = pathname.startsWith('/user');
  return (
    <div className="w-full">
      <div className="flex justify-between p-3 bg-[#023047] rounded-lg fixed z-50 top-0 left-0 right-0 m-3 shadow" >
        <div className="p-2 flex jusitfy-center items-center font-serif sm:font-medium italic text-xl sm:text-3xl text-[#FB8500]">WebMellon</div>
        <div className="flex items-center justify-center text-[#F6F8E3] sm:text-xl -x-2 sm:min-w-48">
          {
            isEditPage ?
              <div className="hidden md:block">
                <span className="font-semibold"> Edit </span>
                <span className="font-serif italic px-2 text-[#FB8500] text-2xl"> <Link href={"/edit/catalogues"}>Catalogues</Link> </span>
                <span className="font-semibold"> and </span>
                <span className="font-serif italic px-2 text-[#FB8500] text-2xl"> <Link href={"/edit/websites"}>Websites</Link> </span>
              </div>
              : isDashboard ?
                <div>Catalogue</div>
                : isProfile ? <div>Profile</div>
                  : <></>
          }
        </div>
        <div className="flex items-center justify-end p-2 sm:min-w-48">
          {(session) ? <Profile /> : <AppBarSignIn />}
        </div>
      </div >
    </div>
  )
}

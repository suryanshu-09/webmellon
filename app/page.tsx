import { auth } from "@/lib/auth";
import AppBar from "@/components/appbar";
import { redirect } from "next/navigation";
import Footer from "@/components/footer";
import { LoadImage } from "@/components/load-image";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <AppBar />
        <div className="mt-28 lg:mt-32 xl:mt-36">
          <div className="flex justify-center mt-6 animate-slide-up text-nowrap">
            <div className="font-semibold text-xl sm:text-3xl lg:text-5xl xl:text-8xl dark:text-white">Welcome to
              <span className="font-light italic font-serif text-2xl sm:text-4xl lg:text-6xl xl:text-9xl text-[#FB8500] pl-1">WebMellon</span>
            </div>
          </div>
          <div className="flex justify-center mt-6 text-sm lg:text-base xl:text-lg animate-slide-up text-center">
            <span className="sm:font-semibold">
              Your personal bookmark. Organise your frequently visited
              <span className="font-serif font-normal text-[#FB8500] lg:text-lg xl:text-2xl italic px-0.75 lg:px-1">
                Catalgue
              </span>
              <span className="">
                by category.
              </span>
            </span>
          </div>
          <div className="flex justify-center mb-6 text-sm lg:text-base xl:text-lg animate-slide-up">
            <span className="sm:font-semibold">
              All your
              <span className="font-serif font-normal text-[#FB8500] lg:text-lg xl:text-2xl italic px-1">
                Websites
              </span>
              <span className="sm:font-semibold">
                in one place.
              </span>
            </span>
          </div>
          <LoadImage />
        </div>
      </div>
      <Footer />
    </div>
  )
}

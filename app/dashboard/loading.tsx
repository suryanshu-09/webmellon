import { Skeleton } from "@/components/ui/skeleton";
import AppBar from "@/components/appbar";
import Footer from "@/components/footer";
import { CommandDialogDemo } from "@/components/search";

export default function LoadDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <AppBar />
        <div className="flex justify-center mt-30">
          <CommandDialogDemo />
        </div>

        <div className="min-h-screen flex flex-col items-center mt-12 px-4">
          {Array.from({ length: 3 }).map((_, outerIdx) => (
            <div key={outerIdx} className="w-full max-w-screen mb-12">
              <Skeleton className="rounded-lg w-60 h-14 mb-6 mx-auto" />

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, innerIdx) => (
                  <Skeleton
                    key={innerIdx}
                    className="border rounded-lg p-3 w-[80%] lg:w-[70%] xl:w-[60%] h-14 mx-auto"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

import AppBar from "@/components/appbar";
import { EditFeed } from "@/components/edit-feed";
import Footer from "@/components/footer";

export default function Edit() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <AppBar />
        <div className="w-screen flex justify-center mt-28 sm:mt-36">
          <div className="mt-12">
            <div className="font-bold sm:font-xl">
              Edit <span className="italic underline">Feed</span>
            </div>
            <EditFeed />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}

import AppBar from "@/components/appbar";
import { EditWebsite } from "@/components/edit-websites";
import Footer from "@/components/footer";

export default function Edit() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <AppBar />
        <div className="w-screen flex justify-center mt-36">
          <div className="mt-12">
            <div className="font-bold font-xl">Edit <span className="italic underline">Websites</span></div>
            <EditWebsite />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

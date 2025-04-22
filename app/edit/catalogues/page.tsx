import AppBar from "@/components/appbar";
import { EditCatalogue } from "@/components/edit-catalogues";
import Footer from "@/components/footer";
import { EditWebsite } from "@/components/edit-websites";

export default function Edit() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <AppBar />
        <div className="w-screen flex justify-center mt-28 sm:mt-36">
          <div>
            <div className="mt-12">
              <div className="font-bold sm:font-xl">Edit <span className="italic underline">Catalogues</span></div>
              <EditCatalogue />
            </div>
            <div className="visible sm:hidden mt-12 mb-12">
              <div className="font-bold font-xl">Edit <span className="italic underline">Websites</span></div>
              <EditWebsite />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

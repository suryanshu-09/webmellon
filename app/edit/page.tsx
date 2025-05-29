import EditPage from "@/components/edit";
import AppBar from "@/components/appbar";
import Footer from "@/components/footer";

export default function Edit() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <AppBar />
        <div className="w-screen flex justify-center mt-16">
          <div className="mt-12">
            <div className="font-bold">
              Edit{" "}
              <span className="italic underline text-[#FB8500]">Webmellon</span>
            </div>
            <EditPage />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}

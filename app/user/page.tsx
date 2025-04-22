import AppBar from "@/components/appbar";
import { EditProfile } from "@/components/edit-profile";
import Footer from "@/components/footer";

export default function Edit() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <AppBar />
        <div className="w-screen flex justify-center mt-36">
          <div className="mt-12">
            <div className="font-bold font-xl">Edit <span className="italic underline">Profile</span></div>
            <EditProfile />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

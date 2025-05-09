import AppBar from "@/components/appbar";
import CatalogueList from "@/components/catalogue-list";
import Footer from "@/components/footer";
import { CommandDialogDemo } from "@/components/search";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <AppBar />
        <div className="flex justify-center mt-30">
          <CommandDialogDemo />
        </div>
        <CatalogueList />
      </div>
      <Footer />
    </div>
  );
}

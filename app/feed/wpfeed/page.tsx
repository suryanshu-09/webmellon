import AppBar from "@/components/appbar";
import Footer from "@/components/footer";
import WPFeed from "@/components/wp-feed";

export default function Feed() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <AppBar />
        <div className="flex justify-center mt-30">
          <WPFeed />
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}

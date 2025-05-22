import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#023047] dark:bg-sky-900 text-white py-6 mt-auto lg:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm">
          <Link
            href="https://github.com/suryanshu-09/webmellon"
            className="text-sm hover:underline"
            target="_blank"
          >
            Source Code
          </Link>
        </div>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <Link
            href="https://github.com/suryanshu-09/webmellon/blob/main/README.md"
            className="text-sm hover:underline"
            target="_blank"
          >
            About
          </Link>
          <Link
            href="https://find-suryanshu.vercel.app"
            className="text-sm hover:underline"
            target="_blank"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

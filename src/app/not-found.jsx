import Link from "next/link";
import { HiOutlineEmojiSad } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <HiOutlineEmojiSad className="text-emerald-500 w-24 h-24 mb-6" />

      <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 max-w-md mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="px-8 py-3 bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-800 transition-all active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  );
}

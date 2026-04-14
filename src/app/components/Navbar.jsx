"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiMenu, HiX } from "react-icons/hi";
import { MdTimeline } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";

import NavImg from "../assets/logo.png";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: <HiHome className="text-lg" /> },
    {
      name: "Timeline",
      path: "/Timeline",
      icon: <IoIosTimer className="text-lg" />,
    },
    { name: "Stats", path: "/Stats", icon: <MdTimeline className="text-lg" /> },
  ];

  return (
    <nav className="bg-[#FFFFFF] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* logo-img */}
          <div className="flex items-center gap-2">
            <Image
              src={NavImg}
              alt="KeenKeeper Logo"
              width={120}
              height={120}
            />
          </div>

          {/*768<< */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                    isActive
                      ? "bg-emerald-700 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* >768 */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-black focus:outline-none"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* toggle  */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive
                    ? "bg-emerald-700 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

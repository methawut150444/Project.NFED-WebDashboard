"use client"; // Required for useState and usePathname in Next.js

import React from "react"; // ✅ Fix: Explicitly import React
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import BoltIcon from "@mui/icons-material/Bolt";
import CloudIcon from "@mui/icons-material/Cloud";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname(); // Get current route in Next.js

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Check if the link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <MenuIcon />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
      >
        <div className="h-full px-3 py-5 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {/* Close Sidebar Button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 sm:hidden"
          >
            <CloseIcon />
          </button>

          {/* Sidebar Logo */}
          <Link href="/" className="flex items-center ps-2.5 mb-4 pb-5 border-b-2 border-gray-300">
            <Image
              alt="NFED Logo"
              src="/NFED_logo.png"
              className={isSidebarOpen ? "h-12 w-auto" : "h-14 w-auto"}
              
              width={100} 
              height={50}
              priority
            />
          </Link>

          {/* Sidebar Menu */}
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                className={`flex items-center p-2 rounded-lg ${isActive("/") ? "bg-Blue_NFED_1 text-white" : "bg-white text-black hover:bg-gray-100 hover:text-black"
                  } transition`}
              >
                <HomeIcon className={`${isActive("/") ? "text-white" : "text-black"}`} />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/powerMonitoring"
                className={`flex items-center p-2 rounded-lg ${isActive("/powerMonitoring")
                    ? "bg-Blue_NFED_1 text-white"
                    : "bg-white text-black hover:bg-gray-100 hover:text-black"
                  } transition`}
              >
                <BoltIcon className={`${isActive("/powerMonitoring") ? "text-white" : "text-black"}`} />
                <span className="ms-3">Power Monitoring</span>
              </Link>
            </li>
            <li>
              <Link
                href="/weatherStation"
                className={`flex items-center p-2 rounded-lg ${isActive("/weatherStation")
                    ? "bg-Blue_NFED_1 text-white"
                    : "bg-white text-black hover:bg-gray-100 hover:text-black"
                  } transition`}
              >
                <CloudIcon className={`${isActive("/weatherStation") ? "text-white" : "text-black"}`} />
                <span className="ms-3">Weather Station</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
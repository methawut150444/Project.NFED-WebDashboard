"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import BoltIcon from "@mui/icons-material/Bolt";
import CloudIcon from "@mui/icons-material/Cloud";

// console.log("✅ Sidebar Component Loaded!");

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname() || ""; // ✅ ป้องกัน undefined error

  // console.log("🔹 Current Path:", pathname);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <MenuIcon />
      </button>

      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform shadow-2xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}>
        <div className="h-full px-3 py-5 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <button onClick={toggleSidebar} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 sm:hidden">
            <CloseIcon />
          </button>

          <Link href="/" passHref legacyBehavior>
            <a className="flex items-center ps-2.5 mb-4 pb-5 border-b-2 border-gray-300">
              <Image alt="NFED_Logo" src="/img/NFED_logo.png" className="h-14 w-auto" width={5000} height={500} priority />
            </a>
          </Link>

          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/" passHref legacyBehavior>
                <a className={`flex items-center p-2 rounded-lg shadow-lg ${isActive("/") ? "bg-Blue_NFED_2 text-white" : "bg-white text-black hover:bg-gray-100 hover:text-black"} transition`}>
                  <HomeIcon className={`${isActive("/") ? "text-white" : "text-gray-600"}`} />
                  <span className="ms-3">Overview</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/powerMonitoring" passHref legacyBehavior>
                <a className={`flex items-center p-2 rounded-lg shadow-lg ${isActive("/powerMonitoring") ? "bg-Blue_NFED_2 text-white" : "bg-white text-black hover:bg-gray-100 hover:text-black"} transition`}>
                  <BoltIcon className={`${isActive("/powerMonitoring") ? "text-white" : "text-gray-600"}`} />
                  <span className="ms-3">Power Monitoring</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/weatherStation" passHref legacyBehavior>
                <a className={`flex items-center p-2 rounded-lg shadow-lg ${isActive("/weatherStation") ? "bg-Blue_NFED_2 text-white" : "bg-white text-black hover:bg-gray-100 hover:text-black"} transition`}>
                  <CloudIcon className={`${isActive("/weatherStation") ? "text-white" : "text-gray-600"}`} />
                  <span className="ms-3">Weather Station</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
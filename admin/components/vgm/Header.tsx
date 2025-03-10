"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
// import SearchInput from "./SearchInput";
import Link from "next/link";
import { FaBell } from "react-icons/fa6";

// import CartElement from "./CartElement";
// import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";


const Header: React.FC<{ isClient: boolean }> = ({ isClient }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };
  return (
    <header className="bg-white">
      
      {pathname.startsWith("/admin") === true && (
        <div className="bg flex justify-between h-32 bg-white items-center px-16 max-[1320px]:px-10  mx-auto max-[400px]:px-5">
          <Link href="#">
            <img src="/images/ui/logo.png" alt="Vietgourmet logo" className="logo w-auto h-full"/>
          </Link>

          {/* <div className="flex gap-x-5 items-center">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="w-10">
                <Image
                  src="/randomuser.jpg"
                  alt="random profile photo"
                  width={30}
                  height={30}
                  className="w-auto h-full rounded-full"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/admin">Dashboard</Link>
                </li>
                <li>
                  <a>Profile</a>
                </li>
                <li onClick={handleLogout}>
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div> */}
          
          <Link href="http://localhost:3000/">
            <h2 style={{color: "#dfcebb"}}>Về trang chủ</h2>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

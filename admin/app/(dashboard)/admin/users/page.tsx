"use client";
import { CustomButton, DashboardSidebar } from "@/components/vgm";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DashboardUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // sending API request for all users
    fetch("http://localhost:3001/api/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Lọc chỉ lấy users có role là staff
        const staffUsers = data.filter((user: any) => user.role === "staff");
        setUsers(staffUsers);
      });
  }, []);

  return (
    <div className="bg-white flex justify-start  mx-auto h-full max-xl:flex-col max-xl:h-fit max-xl:gap-y-4 component-bg">
      <DashboardSidebar />
      <div className="w-full p-8">
        <h1 className="text-3xl font-semibold text-center mb-8 head">Vui lòng chờ đăng xuất</h1>
        {/* <div className="flex justify-end mb-5">
          <Link href="/admin/users/new">
            <CustomButton
              buttonType="button"
              customWidth="110px"
              paddingX={10}
              paddingY={5}
              textSize="base"
              text="Add new User"
            />
          </Link>
        </div> */}
        {/* <div className="flex gap-x-5 items-center">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="w-10">
                <Link href="/admin">Đn</Link>
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
      </div>
    </div>
  );
};

export default DashboardUsers;

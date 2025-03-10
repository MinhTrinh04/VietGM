import React from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { FaTableCellsLarge } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { FaBlog } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

import Link from "next/link";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

const DashboardSidebar = () => {
  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  return (
    <div className="xl:w-[300px] bg-red-600 h-full max-xl:w-full text-slate-100 min-h-full">
      <Link href="/admin/orders">
        <div className="flex gap-x-2 w-full hover:text-yellow-300 cursor-pointer items-center py-6 pl-5 text-xl admin-cate">
          <FaShoppingCart fontSize="32px" />
          <span className="font-normal">Đơn hàng</span>
        </div>
      </Link>
      <Link href="/admin/reservations">
        <div className="flex gap-x-2 w-full hover:text-yellow-300 cursor-pointer items-center py-6 pl-5 text-xl admin-cate">
          <FaTableCellsLarge fontSize="32px" />
          <span className="font-normal">Đặt bàn</span>
        </div>
      </Link>
      <Link href="/admin/products">
        <div className="flex gap-x-2 w-full hover:text-yellow-300 cursor-pointer items-center py-6 pl-5 text-xl admin-cate">
          <IoFastFood fontSize="32px" />
          <span className="font-normal">Món ăn</span>
        </div>
      </Link>
      
      <Link href="/admin/posts">
        <div className="flex gap-x-2 w-full hover:text-yellow-300 cursor-pointer items-center py-6 pl-5 text-xl admin-cate">
          <FaBlog fontSize="32px" />
          <span className="font-normal">Blog</span>
        </div>
      </Link>
      <Link href="/admin/users">
        <div className="flex gap-x-2 w-full hover:text-yellow-300 cursor-pointer items-center py-6 pl-5 text-xl admin-cate">
          <IoLogOutSharp fontSize="32px" />
          <span className="font-normal">
            <Link href="#" onClick={handleLogout}>Đăng xuất</Link>
          </span>
        </div>
      </Link>

    </div>
  );
};

export default DashboardSidebar;

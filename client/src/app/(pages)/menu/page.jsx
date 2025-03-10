"use client";
import { useEffect, useState } from "react"; // import useState và useEffect
import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import MenuData from "@data/menu.json";

import PageBanner from "@components/PageBanner";
import PromoSection from "@components/sections/Promo";
import { menuApi } from "@/src/app/api/menu"; // import api đúng cách

const MenuFiltered = dynamic(() => import("@components/menu/MenuFiltered"), {
  ssr: false,
});

// export const metadata = {
//   title: {
//     default: "Thực đơn",
//   },
//   description: AppData.settings.siteDescription,
// };

const Menu3 = () => {
  const [menu, setMenu] = useState(null); // Khởi tạo state menu

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await menuApi.getMenu(); // Gọi API bất đồng bộ
        setMenu(data); // Cập nhật state khi có dữ liệu
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu(); // Gọi hàm fetchMenu khi component mount
  }, []); // Chỉ gọi một lần khi component được mount

  if (!menu) {
    return <div>Loading...</div>; // Hiển thị Loading khi menu chưa được tải
  }

  return (
    <>
      <PageBanner
        pageTitle={"Thực đơn món ăn"}
        breadTitle={"Thực đơn"}
        type={1}
      />

      {/* menu section 1 */}
      <section className="sb-menu-section sb-p-90-60">
        <div className="sb-bg-1">
          <div></div>
        </div>
        <div className="container">
          <MenuFiltered categories={menu.categories} />
        </div>
      </section>
      {/* menu end */}

      <PromoSection />
    </>
  );
};

export default Menu3;

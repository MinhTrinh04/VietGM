"use client";
import React, { useEffect, useState } from "react";

import AppData from "@data/app.json";
import ProductsData from "@data/products.json";
import { shopApi } from "@/src/app/api/shop";

import PageBanner from "@components/PageBanner";
import ProductsGrid from "@components/products/ProductsGrid";
import PromoSection from "@components/sections/Promo";

const Shop = () => {
  const [shop, setShop] = useState(null);  // Sử dụng đúng tên biến là shop
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const data = await shopApi.getShop();  // Sử dụng AppApi để gọi API
        setShop(data);
        console.log("Dữ liệu từ API Shop:", data); // Debug dữ liệu API
      } catch (error) {
        console.error("Error fetching shop data:", error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchShop();
  }, []);

  if (loading || !shop) {
    return <p>Loading shop data...</p>;  // Thông báo khi đang tải dữ liệu
  }


  return (
    <>
      <PageBanner pageTitle={"Món chính"} breadTitle={"Món chính"} type={1} />

      {/* shop list */}
      <section className="sb-menu-section sb-p-90-60">
        <div className="sb-bg-1">
          <div />
        </div>
        <div className="container">
          <ProductsGrid items={shop.maindish} /> {/*items 2 chứa thông tin món chính*/}

          
        </div>
      </section>
      {/* shop list end */}

      <PromoSection />
    </>
  );
};
export default Shop;
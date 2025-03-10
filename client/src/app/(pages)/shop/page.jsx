"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import AppData from "@data/app.json";
import Products from '@data/products';

import PageBanner from "@components/PageBanner";
import PromoSection from "@components/sections/Promo";
import TeamSection from "@components/sections/Team";
import CategoriesSection from "@components/sections/Categories";
import { shopApi } from "@/src/app/api/shop"; 

// Dynamic import for ProductsSlider with a loading fallback
const ProductsSlider = dynamic(() => import("@components/sliders/Products"), { ssr: false, loading: () => <p>Loading...</p> });

const Shop = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const data = await shopApi.getShop(); // Gọi API từ shop
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
    return <p>Loading shop data...</p>; // Thông báo khi đang tải dữ liệu
  }

  return (
    <>
      <PageBanner pageTitle={"Đặt đồ ăn"} breadTitle={"Mang về"} type={1} />
      <CategoriesSection heading={0} paddingTop={90} />
      
      {/* Kiểm tra nếu collection có giá trị rồi mới render ProductsSlider */}
      {shop.collection?.popular && (
        <ProductsSlider 
          items={shop.collection['popular']} 
          title={'Tinh hoa ẩm thực'} 
          description={'Tinh hoa ẩm thực không chỉ là món ăn ngon, mà còn là nét đẹp văn hóa được gìn giữ qua bao thế hệ.'} 
          button={{ "link": "/products", "label": "Xem tất cả", "icon": '/img/ui/icons/arrow.svg' }}
          slidesPerView={4}
          itemType={'product'} 
        />
      )}

      {shop.collection?.bestseller && (
        <ProductsSlider 
          items={shop.collection['bestseller']} 
          title={'Best-seller - Sự lựa chọn hàng đầu'} 
          description={'Thực đơn đặc sắc với những món ăn được yêu thích nhất, từ hương vị truyền thống đến phong cách hiện đại, hứa hẹn mang đến cho bạn trải nghiệm ẩm thực tuyệt vời.'} 
          button={0}
          slidesPerView={4}
          itemType={'product'} 
        />
      )}

      <TeamSection />
      <PromoSection />
    </>
  );
};

export default Shop;

// page.js
"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import AppData from "@data/app.json";
import { shopApi } from "@/src/app/api/shop"; // Import API shop

import PageBanner from "@components/PageBanner";
import ProductsGrid from "@components/products/ProductsGrid";
import PromoSection from "@components/sections/Promo";

// Di chuyển metadata ra ngoài component

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
      <PageBanner pageTitle={"Món khai vị"} breadTitle={"Món khai vị"} type={1} />
      <section className="sb-menu-section sb-p-90-60">
        <div className="sb-bg-1">
          <div />
        </div>
        <div className="container">   

          <ProductsGrid
            items={shop.appetizer}  // Dùng đúng tên biến là shop
            title={"Món khai vị"}
            description={"Món khai vị giúp mở đầu bữa ăn thêm phần hấp dẫn và đầy thú vị."}
            button={{ "link": "/products", "label": "Xem thêm", "icon": '/img/ui/icons/arrow.svg' }}
          />

        </div>
      </section>

      <PromoSection />
    </>
  );
};

export default Shop;




// "use client";
// import React, { useEffect, useState } from "react";
// import AppData from "@data/app.json";

// import PageBanner from "@components/PageBanner";
// import ProductsGrid from "@components/products/ProductsGrid";
// import PromoSection from "@components/sections/Promo";
// import { shopApi } from "@/src/app/api/specificCategory"; // Import API shop



// const Products = () => {
//   const [categoryData, setCategoryData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data when the component is mounted
//   useEffect(() => {
//     const fetchCategoryData = async () => {
//       try {
//         // Call API to fetch data for "appetizer" category
//         const data = await shopApi.getCategory("appetizer");
//         setCategoryData(data); // Set the category data to state
//       } catch (error) {
//         console.error("Error fetching category data:", error);
//         setError("Failed to load category data");
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchCategoryData(); // Fetch category data for "appetizer"
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>; // Show loading indicator while fetching data
//   }

//   if (error) {
//     return <p>{error}</p>; // Show error message if data fetching fails
//   }

//   return (
//     <>
//       <PageBanner pageTitle={"Món khai vị"} breadTitle={"Món khai vị"} type={1} />

//       {/* shop list */}
//       <section className="sb-menu-section sb-p-90-60">
//         <div className="sb-bg-1">
//           <div />
//         </div>
//         <div className="container">
//           {categoryData && categoryData.items && categoryData.items.length > 0 ? (
//             <ProductsGrid
//               items={categoryData.items} // Display items from fetched data
//             />
//           ) : (
//             <p>No products found in this category.</p> // Show message if no products found
//           )}
//         </div>
//       </section>
//       {/* shop list end */}

//       <PromoSection />
//     </>
//   );
// };

// export default Products;

import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import Products from '@data/products';

import PageBanner from "@components/PageBanner";
import CategoriesSection from "@components/sections/Categories";
import PromoSection from "@components/sections/Promo";
import TeamSection from "@components/sections/Team";

const ProductsSlider = dynamic(() => import("@components/sliders/Products"), { ssr: false });

export const metadata = {
  title: {
    default: "Mang về",
  },
  description: AppData.settings.siteDescription,
}

const ProductsPage = () => {
  return (
    <>
      <PageBanner pageTitle={"Đặt đồ ăn"} breadTitle={"Mang về"} type={1} />
      <CategoriesSection heading={0} paddingTop={90} />
      <ProductsSlider
        items={Products.collection['popular']}
        title={'Tinh hoa ẩm thực'}
        description={'Tinh hoa ẩm thực không chỉ là món ăn ngon, mà còn là nét đẹp văn hóa được gìn giữ qua bao thế hệ.'}
        button={{ "link": "/products", "label": "View all", "icon": '/img/ui/icons/arrow.svg' }}
        slidesPerView={4}
        itemType={'product'}
      />
      <ProductsSlider
        items={Products.collection['bestseller']}
        title={'Best-seller - Sự lựa chọn hàng đầu'}
        description={'Thực đơn đặc sắc với những món ăn được yêu thích nhất, từ hương vị truyền thống đến phong cách hiện đại, hứa hẹn mang đến cho bạn trải nghiệm ẩm thực tuyệt vời.'}
        button={{ "link": "/products-2", "label": "View all", "icon": '/img/ui/icons/arrow.svg' }}
        slidesPerView={4}
        itemType={'product'}
      />
      <TeamSection />
      <PromoSection />
    </>
  );
};
export default ProductsPage;
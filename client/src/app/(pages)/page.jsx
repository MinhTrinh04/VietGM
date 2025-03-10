import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import Products from '@data/products';

import AboutTwoSection from "@components/sections/AboutTwo";
import CallToActionTwoSection from "@components/sections/CallToActionTwo";
import HeroSection from "@components/sections/Hero";
import FeaturesOneSection from "../_components/sections/Features";

const ProductsSlider = dynamic( () => import("@components/sliders/Products"), { ssr: false } );
const TestimonialSlider = dynamic( () => import("@components/sliders/Testimonial"), { ssr: false } );

export const metadata = {
  title: {
		default: "Trang chủ",
	},
  description: AppData.settings.siteDescription,
}

const Home2 = () => {
  return (
    <>
      <HeroSection type={2} />
      <AboutTwoSection />
      <ProductsSlider items={Products.collection['popular']} slidesPerView={3} />
      <FeaturesOneSection />
      <TestimonialSlider />
      <CallToActionTwoSection />
    </>
  );
};
export default Home2;
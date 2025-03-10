import dynamic from "next/dynamic";

import AppData from "@data/app.json";

import FeaturesOneSection from "@/src/app/_components/sections/Features";
import PageBanner from "@components/PageBanner";
import AboutTwoSection from "@components/sections/AboutTwo";
import PromoVideoSection from "@components/sections/PromoVideo";
import TeamSection from "@components/sections/Team";

import GalleryData from "@data/gallery.json";



import PopularsPostsData from "@data/sliders/popular-posts.json";

import { getFeaturedPostsData, getPaginatedPostsData } from "@library/posts";
import Link from "next/link";




const BlogPaginated = dynamic(() => import("@components/blog/BlogPaginated"), { ssr: false });

const GalleryMasonry = dynamic(() => import("@components/gallery/GalleryMasonry"), { ssr: false });

const TestimonialSlider = dynamic(() => import("@components/sliders/Testimonial"), { ssr: false });

export const metadata = {
  title: {
    default: "Về chúng tôi",
  },
  description: AppData.settings.siteDescription,
}

const About2 = async () => {
  const populars = await getAllPupulars();
  const postsData = await getAllPosts();
  const galleryItems = GalleryData.items.slice(0, 6);

  return (
    <>
      <PageBanner pageTitle={"Sự kết nối với di sản Việt Nam là<br> sự kết nối chân thành nhất"} breadTitle={"Về chúng tôi"} description={"VietGourmet là sự kết hợp hài hoà của không gian hoàn niệm về một Hà Nội xưa <br>với các món ăn, thức uống đơn giản và tinh tế"} type={2} />
      <AboutTwoSection />
      <FeaturesOneSection />
      <PromoVideoSection />
      <TeamSection items={3} />
      <TestimonialSlider />
      {/* <CallToActionSection /> */}
      {/* <PageBanner pageTitle={"Gallery."} breadTitle={"Gallery"} type={3} /> */}
      {/* gallery */}
      <div className="sb-p-90-60">
        <div className="container">
          <div className="sb-group-title sb-mb-30">
            <div className="sb-left sb-mb-30">
              <h2 className="sb-mb-30" dangerouslySetInnerHTML={{ __html: "Khoảng khắc tại Vietgourmet" }} />
              {/* <p className="sb-text" dangerouslySetInnerHTML={{__html : Data.description}} /> */}
            </div>
            <div className="sb-right sb-mb-30">
              {/* button */}
              <Link href="/gallery" className="sb-btn">
                <span className="sb-icon">
                  <img src="/img/ui/icons/arrow.svg" alt="icon" />
                </span>
                <span>Xem thêm thư viện ảnh</span>
              </Link>
              {/* button end */}
            </div>
          </div>
          <GalleryMasonry items={galleryItems} layout={1} />

        </div>

      </div>
      {/* gallery end */}


    </>
  );
};

async function getAllPupulars() {
  const popularsData = await getFeaturedPostsData(PopularsPostsData.featured)

  return popularsData
}

async function getAllPosts() {
  const { posts, total } = getPaginatedPostsData(AppData.settings.perPage, 1);

  return {
    posts: posts,
    totalPosts: total,
    currentPage: 1
  }
}

export default About2;
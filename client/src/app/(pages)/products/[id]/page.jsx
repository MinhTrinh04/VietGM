
"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import PageBanner from "@components/PageBanner";
import ProductButtons from "@components/products/ProductButtons";
import ProductImage from "@components/products/ProductImage";
import ReviewItem from "@components/reviews/ReviewItem";
import CallToActionTwoSection from "@components/sections/CallToActionTwo";

import { shopApi } from "@/src/app/api/shop";
import { usePathname } from 'next/navigation';
const ProductsSlider = dynamic(() => import("@components/sliders/Products"), { ssr: false });
const ProductTabs = dynamic(() => import("@components/products/ProductTabs"), { ssr: false });



const Products = ({ }) => {
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  const productId = id;
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shop, setShop] = useState(null);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const res = await fetch(`http://localhost:3001/api/vgm/products/${productId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await res.json();
        setProductData(data);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProductData();
  }, [productId]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productData) return <div>Product not found</div>;

  const { image, title, price, currency, rating, text, description } = productData;
  function ProductAtts() {
    const AttsData = [
      {
        "label": "Numquam",
        "value": "1 pack"
      },
      {
        "label": "Cupiditate",
        "value": "150g"
      },
      {
        "label": "Adipisicing",
        "value": "500g"
      },
      {
        "label": "Dolorem obcaecati",
        "value": "3 Teaspoon"
      },
      {
        "label": "Porro",
        "value": "2 pack"
      },
      {
        "label": "Facilis",
        "value": "1kg"
      },
      {
        "label": "Goluptatem",
        "value": "1 Teaspoon"
      },
      {
        "label": "Vel fuga",
        "value": "300g"
      }
    ];

    return (
      <>
        <ul className="sb-list">
          {AttsData.map((item, key) => (
            <li key={`product-reviews-item-${key}`}><b>{item.label}</b><span>{item.value}</span></li>
          ))}
        </ul>
      </>
    );
  };

  function ProductDescription() {
    return (
      <>
        <div className="sb-text">
          <p>{description}</p>
        </div>
      </>
    );
  };

  function ProductReviews() {
    const ReviewsData = [
      {
        "title": "Món ăn rất ngon",
        "name": "Emma Newman",
        "rating": 5,
        "image": "/img/faces/1.png",
        "text": ""
      },
      {
        "title": "Tôi ăn món này mỗi ngày",
        "name": "Paul Trueman",
        "rating": 5,
        "image": "/img/faces/2.png",
        "text": ""
      }
    ];

    return (
      <div className="row">
        {ReviewsData.map((item, key) => (
          <div className="col-lg-6" key={`product-reviews-item-${key}`}>
            <ReviewItem item={item} key={key} marginBottom={60} />
          </div>
        ))}
      </div>
    );
  };

  const tabs = [
    {
      "slug": "ingredients",
      "name": "Thành phần"
    },
    {
      "slug": "details",
      "name": "Product details"
    },
    {
      "slug": "reviews",
      "name": "Reviews"
    }
  ];

  return (
    <>
      <PageBanner pageTitle={"Chi tiết sản phẩm"} breadTitle={"Chi tiết"} type={1} />

      {/* product */}
      <section className="sb-p-90-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <ProductImage src={image} alt={title} badge={"<div class='sb-badge sb-vegan'><i class='fas fa-leaf'></i> Vegan</div>"} />
            </div>
            <div className="col-lg-6">
              <div className="sb-product-description sb-mb-90">
                <div className="sb-price-frame sb-mb-30">
                  <h3>{title}</h3>
                  <div className="sb-price">{price / 1000}K<sub>{currency}</sub> </div>
                </div>
                <ul className="sb-stars sb-mb-25">
                  {/* Hiển thị số lượng sao dựa trên rating */}
                  {Array.from({ length: rating }, (_, index) => (
                    <li key={index}><i className="fas fa-star"></i></li>
                  ))}
                  <li><span>({rating} Lượt đánh giá)</span></li>
                </ul>
                <p className="sb-text sb-mb-30">{text}</p>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="sb-features-item sb-features-item-sm sb-mb-30">
                      <div className="sb-number">01</div>
                      <div className="sb-feature-text">
                        <h4 className="sb-mb-15">Đặt giỏ hàng của bạn</h4>
                        <p className="sb-text sb-text-sm">Ấn nút phía dưới để đặt hàng</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="sb-features-item sb-features-item-sm sb-mb-30">
                      <div className="sb-number">02</div>
                      <div className="sb-feature-text">
                        <h4 className="sb-mb-15">Nhập số điện thoại và địa chỉ</h4>
                        <p className="sb-text sb-text-sm">Nhập thông tin để VietGormet có thể ship đến cho bạn</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="sb-features-item sb-features-item-sm sb-mb-30">
                      <div className="sb-number">03</div>
                      <div className="sb-feature-text">
                        <h4 className="sb-mb-15">Tận hưởng món ăn tại nhà</h4>
                        <p className="sb-text sb-text-sm">Thưởng thức món ăn của chúng tôi </p>
                      </div>
                    </div>
                  </div>
                </div>
                <ProductButtons item={productData}/>
              </div>
            </div>
          </div>
          {/* <ProductTabs
            items={tabs}
            active={"ingredients"}
          /> */}

          <div className="sb-masonry-grid sb-tabs">
            <div className="sb-grid-sizer" />

            {tabs.map((tab, key) => (
              <div className={`sb-grid-item sb-${tab.slug}-tab`} key={`product-tab-${key}`}>
                <div className="sb-tab">
                  {/* {tab.slug != 'ingredients' && <ProductAtts />}
                  {tab.slug != 'details' && <ProductDescription />}
                  {tab.slug != 'reviews' && <ProductReviews />} */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* product end */}

      <ProductsSlider
        items={shop.items}
        title={'Món ăn thường ăn kèm với'}
        description={'Kết hợp với những món dưới đây, bạn sẽ có một bữa ăn tuyệt hảo'}
        button={0}
        slidesPerView={4}
        itemType={'product'}
      />
      <CallToActionTwoSection />
    </>
  );
};

export default Products;
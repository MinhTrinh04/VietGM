"use client";

import React, { useEffect, useState } from "react";
import PageBanner from "@components/PageBanner"; // Giả sử đây là đường dẫn tuyệt đối
import CheckoutForm from "@components/forms/CheckoutForm"; // Giả sử đây là đường dẫn tuyệt đối
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

// Hàm lấy giỏ hàng từ localStorage
const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || { items: [], totalPrice: 0 };
};

const formatPrice = (price) => {
  if (typeof price === "string" && price.includes("K")) {
    return parseFloat(price.replace("K", "")) * 1000; // Chuyển "45K" thành 45000
  }
  return parseFloat(price) || 0; // Đảm bảo giá trị là số
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]); // State lưu sản phẩm trong giỏ hàng
  const [subtotal, setSubtotal] = useState(0);
  const shippingFee = 0.000; // Phí vận chuyển cố định

  // Hàm tính tổng giá trị giỏ hàng
  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => {
      const price = formatPrice(item.price); // Chuyển đổi giá
      return total + price * item.quantity;
    }, 0);
  };

  // Load giỏ hàng từ localStorage
  useEffect(() => {
    const cart = getCart();
    setCartItems(cart.items);

    // Tính subtotal khi giỏ hàng thay đổi
    const calculatedSubtotal = calculateSubtotal(cart.items);
    setSubtotal(calculatedSubtotal);
  }, []);

  const total = subtotal + shippingFee; // Tổng cộng = Subtotal + phí vận chuyển

  return (
    <>
      <PageBanner pageTitle={"Thanh toán"} breadTitle={"Thanh toán"} type={1} />

      <section className="sb-p-90-90">
        <div className="container" data-sticky-container>
          <div className="row">
            <div className="col-lg-8">
              <CheckoutForm />
            </div>
            <div className="col-lg-4">
              <div className="sb-pad-type-2 sb-sticky" data-margin-top="120">
                <div className="sb-co-cart-frame">
                  <div className="sb-cart-table">
                    <div className="sb-cart-table-header">
                      <div className="row">
                        <div className="col-lg-9">Danh sách món</div>
                        <div className="col-lg-3 text-right">Tổng</div>
                      </div>
                    </div>

                    {cartItems.length > 0 ? (
                      cartItems.map((item, key) => (
                        <div className="sb-cart-item" key={key}>
                          <div className="row align-items-center">
                            <div className="col-lg-9">
                              <Link className="sb-product" href="/product"> 
                                <div className="sb-cover-frame">
                                  <img
                                    src={item.image || "/img/default.jpg"}
                                    alt={item.title || "No Title"}
                                  />
                                </div>
                                <div className="sb-prod-description">
                                  <h4 className="sb-mb-10">
                                    {item.title || "No Title"}
                                  </h4>
                                  <p className="sb-text sb-text-sm">
                                    x{item.quantity}
                                  </p>
                                </div>
                              </Link>
                            </div>
                            <div className="col-lg-3 text-md-right">
                              <div className="sb-price-2">
                                <span>Total: </span>
                                {(
                                  formatPrice(item.price) * item.quantity
                                ).toLocaleString("vi-VN")}{" "}
                                VNĐ
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Giỏ hàng của bạn trống.</p>
                    )}

                    <div className="sb-cart-total sb-cart-total-2">
                      <div className="sb-sum">
                        <div className="row">
                          <div className="col-6">
                            <div className="sb-total-title">Chi phí:</div>
                          </div>
                          <div className="col-6">
                            <div className="sb-price-1 text-right">
                              {subtotal.toLocaleString("vi-VN")} VNĐ
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sb-realy-sum">
                        <div className="row">
                          <div className="col-6">
                            <div className="sb-total-title">Tổng cộng:</div>
                          </div>
                          <div className="col-6">
                            <div className="sb-price-2 text-right">
                              {total.toLocaleString("vi-VN")} VNĐ
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Toaster />
    </>
  );
};

export default Checkout;
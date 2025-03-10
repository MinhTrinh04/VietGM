"use client";

import React, { useEffect, useState } from "react";
import PageBanner from "@components/PageBanner";
import CartItem from "@components/products/CartItem";
import Link from "next/link";

const getCart = () => JSON.parse(localStorage.getItem("cart")) || { items: [], totalPrice: 0 };

const CartPage = () => {
  // State lưu trữ giỏ hàng và subtotal
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const shipping = 0.0000;

  // Hàm load giỏ hàng từ localStorage
  const loadCart = () => {
    const cart = getCart();
    setCartItems(cart.items);

    const calculatedSubtotal = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);
  };
// Hàm tính subtotal
const calculateSubtotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

  // Hàm cập nhật giỏ hàng khi thay đổi số lượng hoặc xóa sản phẩm
  const handleCartUpdate = (updatedItems) => {
    setCartItems(updatedItems); // Cập nhật state giỏ hàng
    const updatedSubtotal = updatedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubtotal(updatedSubtotal); // Cập nhật subtotal
    localStorage.setItem("cart", JSON.stringify({ items: updatedItems, totalPrice: updatedSubtotal }));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const total = subtotal + shipping;

  return (
    <>
      <PageBanner pageTitle={"Giỏ của bạn"} breadTitle={"Giỏ hàng"} type={1} />

      <section className="sb-p-90-90">
        <div className="container">
          <div className="sb-cart-table">
            <div className="sb-cart-table-header">
              <div className="row">
                <div className="col-lg-6">Tên món ăn</div>
                <div className="col-lg-3">Số lượng</div>
                <div className="col-lg-1">Giá</div>
                <div className="col-lg-1">Tổng cộng</div>
                <div className="col-lg-1"></div>
              </div>
            </div>

            {/* Hiển thị sản phẩm trong giỏ hàng */}
            {cartItems.length > 0 ? (
              cartItems.map((item, key) => (
                <CartItem
                  key={key}
                  item={item}
                  index={key}
                  onCartUpdate={handleCartUpdate} // Truyền hàm callback
                />
              ))
            ) : (
              <p>Giỏ hàng đang trống</p>
            )}

            {/* Tổng giá trị */}
            <div className="row justify-content-end">
              <div className="col-lg-6">
                <div className="sb-cart-total">
                  <div className="sb-sum">
                    <div className="row">
                      <div className="col-8">
                        <div className="sb-total-title">Chi phí:</div>
                      </div>
                      <div className="col-4 text-right">
                        {subtotal.toLocaleString("vi-VN")} VNĐ
                      </div>
                    </div>
                  </div>
                  <div className="sb-sum">
                    <div className="row">
                      <div className="col-8">
                        <div className="sb-total-title">Phí vận chuyển:</div>
                      </div>
                      <div className="col-4 text-right">
                        {shipping.toLocaleString("vi-VN")} VNĐ
                      </div>
                    </div>
                  </div>
                  <div className="sb-realy-sum">
                    <div className="row">
                      <div className="col-8">
                        <div className="sb-total-title">Tổng cộng:</div>
                      </div>
                      <div className="col-4 text-right">
                        {total.toLocaleString("vi-VN")} VNĐ
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sb-cart-btns-frame text-right">
                  <Link href="/shop" className="sb-btn sb-btn-2 sb-btn-gray">
                    <span className="sb-icon">
                      <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                    </span>
                    <span>Tiếp tục mua sắm</span>
                  </Link>
                  <Link href="/checkout" className="sb-btn sb-m-0">
                    <span className="sb-icon">
                      <img src="/img/ui/icons/arrow.svg" alt="icon" />
                    </span>
                    <span>Thanh toán ngay</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;

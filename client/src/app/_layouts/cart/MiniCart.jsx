"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// Hàm lấy giỏ hàng từ localStorage
const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || { items: [], totalPrice: 0 };
};

const MiniCart = () => {
    const [cartItems, setCartItems] = useState([]); // State lưu sản phẩm trong giỏ hàng

    // Load giỏ hàng từ localStorage
    const loadCartFromLocalStorage = () => {
        const cart = getCart();
        setCartItems(cart.items);
    };

    // Gọi load giỏ hàng khi component được mount
    useEffect(() => {
        loadCartFromLocalStorage();
    }, []);

    return (
        <>
            <div className="sb-minicart-content">
                <div className="sb-ib-title-frame sb-mb-30">
                    <h4>Đơn đặt hàng của bạn.</h4>
                    <i className="fas fa-arrow-down" />
                </div>

                {/* Hiển thị danh sách sản phẩm trong giỏ hàng */}
                {cartItems.length > 0 ? (
                    cartItems.map((item, key) => (
                        <div className="sb-menu-item sb-menu-item-sm sb-mb-15" key={`mini-cart-item-${key}`}>
                            <div className="sb-cover-frame">
                                <img src={item.image || "/img/default.jpg"} alt={item.title || "No Title"} />
                            </div>
                            <div className="sb-card-tp">
                                <h4 className="sb-card-title">{item.title || "No Title"}</h4>
                                {/* <div className="sb-price">
                                    <sub>{item.currency || "VNĐ"}</sub> {item.price || "0"}
                                </div> */}
                                <div className="sb-quantity">{item.quantity || 1}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Giỏ hàng của bạn đang rỗng</p>
                )}
            </div>

            {/* Footer */}
            <div className="sb-minicart-footer">
                <Link href="/cart" className="sb-btn sb-btn-gray sb-btn-text">
                    <span>Xem giỏ</span>
                </Link>
                <Link href="/checkout" className="sb-btn sb-btn-text">
                    <span>Thanh toán</span>
                </Link>
            </div>
        </>
    );
};

export default MiniCart;

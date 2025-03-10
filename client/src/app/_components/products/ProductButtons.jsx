// "use client";

// import { useState, useEffect } from "react";
// import CartData from "@data/cart.json";

// const ProductButtons = ({ item }) => {
//   const [cartTotal, setCartTotal] = useState(CartData.total);
//   const [quantity, setQuantity] = useState(1);
//   const minQuantity = 1;
//   const maxQuantity = 10;

//   useEffect(() => {
//     const cartNumberEl = document.querySelector('.sb-cart-number');
//     cartNumberEl.innerHTML = cartTotal;
//   }, [cartTotal]);

//   const addToCart = async (e) => {
//     e.preventDefault();
//     const cartNumberEl = document.querySelector('.sb-cart-number');
//     setCartTotal(cartTotal + quantity);
  
//     cartNumberEl.classList.add('sb-added');
//     e.currentTarget.classList.add('sb-added');
  
//     setTimeout(() => {
//       cartNumberEl.classList.remove('sb-added');
//     }, 600);
  
//     const newItem = {
//       title: item.title,
//       image: item.image,
//       description: item.description,
//       price: item.price,
//       currency: item.currency,
//       rating: item.rating, // Thêm rating nếu có
//       text: item.text,     // Thêm text nếu có
//     };
  
//     try {
//       // Gửi dữ liệu sản phẩm và số lượng đến API
//       const response = await fetch("/api/cart/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           item: newItem,
//           quantity: quantity,
//         }),
//       });
  
//       if (response.ok) {
//         console.log("Sản phẩm đã được thêm vào giỏ hàng.");
//       } else {
//         console.error("Có lỗi khi thêm sản phẩm vào giỏ hàng.");
//       }
//     } catch (error) {
//       console.error("Lỗi khi gọi API:", error);
//     }
//   };
  

//   return (
//     <>
//       <div className="sb-buttons-frame">
//         <div className="sb-input-number-frame">
//           <div className="sb-input-number-btn sb-sub" onClick={() => setQuantity(quantity > minQuantity ? quantity - 1 : quantity)}>-</div>
//           <input type="number" readOnly value={quantity} min={minQuantity} max={maxQuantity} />
//           <div className="sb-input-number-btn sb-add" onClick={() => setQuantity(quantity < maxQuantity ? quantity + 1 : quantity)}>+</div>
//         </div>
//         {/* button */}
//         <a href="#." className="sb-btn sb-atc" onClick={(e) => addToCart(e)}>
//           <span className="sb-icon">
//             <img src="/img/ui/icons/cart.svg" alt="icon" />
//           </span>
//           <span className="sb-add-to-cart-text">Add to cart</span>
//           <span className="sb-added-text">Added</span>
//         </a>
//         {/* button end */}
//       </div>
//     </>
//   );
// };

// export default ProductButtons;


"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

// Hàm lấy giỏ hàng từ localStorage
const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || { items: [], totalPrice: 0 };
};

// Hàm lưu giỏ hàng vào localStorage
const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const ProductButtons = ({ item }) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const minQuantity = 1;
  const maxQuantity = 100;

  // Cập nhật tổng số sản phẩm trong giỏ hàng khi component mount
  useEffect(() => {
    const cart = getCart();
    setCartTotal(cart.items.reduce((total, i) => total + i.quantity, 0));
  }, []);

  const addToCart = (e) => {
    e.preventDefault();
    const cart = getCart();

    // Tạo đối tượng sản phẩm
    const newItem = {
      productId: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
      currency: item.currency,
      quantity: quantity,
      totalPrice: item.price * quantity,
    };

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingIndex = cart.items.findIndex((i) => i.productId === newItem.productId);

    if (existingIndex > -1) {
      // Nếu đã tồn tại, cập nhật số lượng và tổng giá
      cart.items[existingIndex].quantity += quantity;
      cart.items[existingIndex].totalPrice = cart.items[existingIndex].quantity * cart.items[existingIndex].price;
    } else {
      // Thêm mới sản phẩm vào giỏ hàng
      cart.items.push(newItem);
    }

    // Cập nhật tổng giá trị giỏ hàng
    cart.totalPrice = cart.items.reduce((total, i) => total + i.totalPrice, 0);

    // Lưu giỏ hàng vào localStorage
    saveCart(cart);

    // Cập nhật tổng số sản phẩm trong state và giao diện
    const totalItems = cart.items.reduce((total, i) => total + i.quantity, 0);
    setCartTotal(totalItems);

    const cartNumberEl = document.querySelector(".sb-cart-number");
    if (cartNumberEl) {
      cartNumberEl.classList.add("sb-added");
      cartNumberEl.innerHTML = totalItems;
      setTimeout(() => cartNumberEl.classList.remove("sb-added"), 600);
    }

    console.log("Giỏ hàng đã cập nhật:", cart);
  };

  return (
    <>
      <div className="sb-buttons-frame">
        <div className="sb-input-number-frame">
          <div
            className="sb-input-number-btn sb-sub"
            onClick={() => setQuantity(quantity > minQuantity ? quantity - 1 : quantity)}
          >
            -
          </div>
          <input type="number" readOnly value={quantity} min={minQuantity} max={maxQuantity} />
          <div
            className="sb-input-number-btn sb-add"
            onClick={() => setQuantity(quantity < maxQuantity ? quantity + 1 : quantity)}
          >
            +
          </div>
        </div>
        {/* button */}
        <a href="#." className="sb-btn sb-atc" onClick={(e) => addToCart(e)}>
          <span className="sb-icon">
            <img src="/img/ui/icons/cart.svg" alt="icon" />
          </span>
          <span className="sb-add-to-cart-text">Cho vào giỏ</span>
          <span className="sb-added-text">Đã thêm</span>
        </a>
        {/* button end */}
      </div>
    </>
  );
};

export default ProductButtons;

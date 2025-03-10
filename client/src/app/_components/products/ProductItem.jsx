// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// import CartData from "@data/cart.json";

// const ProductItem = ({ item, index, marginBottom, moreType }) => {
//   const [cartTotal, setCartTotal] = useState(CartData.total);
//   const [quantity, setQuantity] = useState(1);

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
//       <div className={`sb-menu-item sb-mb-${marginBottom}`}>
//         <Link href={`/products/${item.id}`} className="sb-cover-frame">
//           <img src={item.image} alt={item.title} />
//           <div dangerouslySetInnerHTML={{ __html: item.badge }} />
//         </Link>
//         <div className="sb-card-tp">
//             <h4 className="sb-card-title"><Link href={`/product`}>{item.title}</Link></h4>
//             {/* <div className="sb-price"><sub>{item.currency}</sub> {item.price}</div> */}
//             <div className="sb-price">{item.price} <sub>{item.currency}</sub></div>
//         </div>
//         <div className="sb-description">
//           <p className="sb-text sb-mb-15">
//             {item.text}
//           </p>
//         </div>
//         <div className="sb-card-buttons-frame">
//           {/* button */}
//           {moreType != 2 ? (
//             <Link href={`/products/${item.id}`} className="sb-btn sb-btn-2 sb-btn-gray sb-btn-icon sb-m-0">
//               <span className="sb-icon">
//                 <img src="/img/ui/icons/arrow.svg" alt="icon" />
//               </span>
//             </Link>
//           ) : (
//             <Link href={`/products/${item.id}`} className="sb-btn sb-btn-gray">
//               <span className="sb-icon">
//                 <img src="/img/ui/icons/arrow.svg" alt="icon" />
//               </span>
//               <span>Chi tiết</span>
//             </Link>
//           )}
//           {/* button end */}
//           {/* button */}
//           <a href="#." className="sb-btn sb-atc" onClick={(e) => addToCart(e)}>
//             <span className="sb-icon">
//               <img src="/img/ui/icons/cart.svg" alt="icon" />
//             </span>
//             <span className="sb-add-to-cart-text">Cho vào giỏ</span>
//             <span className="sb-added-text">Đã cho vào giỏ</span>
//           </a>
//           {/* button end */}
//         </div>
//       </div>
//     </>
//   );
// };
// export default ProductItem;

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Lấy giỏ hàng từ localStorage hoặc tạo mới
const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || { items: [], totalPrice: 0 };
};

// Lưu giỏ hàng vào localStorage
const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const ProductItem = ({ item, marginBottom, moreType }) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Cập nhật tổng số lượng sản phẩm trong giỏ hàng khi component render
  useEffect(() => {
    const cart = getCart();
    setCartTotal(cart.items.reduce((total, i) => total + i.quantity, 0));
  }, []);

  const addToCart = (e) => {
    e.preventDefault();

    // Lấy giỏ hàng từ localStorage
    const cart = getCart();

    // Tạo sản phẩm mới
    const newItem = {
      productId: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
      currency: item.currency,
      quantity: quantity,
      totalPrice: item.price * quantity,
    };

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingIndex = cart.items.findIndex((i) => i.productId === newItem.productId);

    if (existingIndex > -1) {
      // Nếu đã tồn tại, tăng số lượng
      cart.items[existingIndex].quantity += quantity;
      cart.items[existingIndex].totalPrice = cart.items[existingIndex].quantity * cart.items[existingIndex].price;
    } else {
      // Nếu chưa có, thêm mới vào giỏ hàng
      cart.items.push(newItem);
    }

    // Cập nhật tổng giá trị giỏ hàng
    cart.totalPrice = cart.items.reduce((total, i) => total + i.totalPrice, 0);

    // Lưu giỏ hàng vào localStorage
    saveCart(cart);

    // Cập nhật tổng số lượng sản phẩm hiển thị
    setCartTotal(cart.items.reduce((total, i) => total + i.quantity, 0));

    // Thêm hiệu ứng cho UI
    const cartNumberEl = document.querySelector(".sb-cart-number");
    cartNumberEl.classList.add("sb-added");
    setTimeout(() => cartNumberEl.classList.remove("sb-added"), 600);

    console.log("Giỏ hàng đã được cập nhật:", cart);
  };

  return (
    <>
      <div className={`sb-menu-item sb-mb-${marginBottom}`}>
        <Link href={`/products/${item.id}`} className="sb-cover-frame">
          <img src={item.image} alt={item.title} />
          <div dangerouslySetInnerHTML={{ __html: item.badge }} />
        </Link>
        <div className="sb-card-tp">
          <h4 className="sb-card-title">
            <Link href={`/products/${item.id}`}>{item.title}</Link>
          </h4>
          <div className="sb-price">
          {Math.floor(Number(item.price.replace(/\D/g, '')) / 1000)}K <sub>{item.currency}</sub> 
          </div>
        </div>
        <div className="sb-description">
          <p className="sb-text sb-mb-15">{item.text}</p>
        </div>
        <div className="sb-card-buttons-frame">
          {/* button */}
          {moreType !== 2 ? (
            <Link href={`/products/${item.id}`} className="sb-btn sb-btn-2 sb-btn-gray sb-btn-icon sb-m-0">
              <span className="sb-icon">
                <img src="/img/ui/icons/arrow.svg" alt="icon" />
              </span>
            </Link>
          ) : (
            <Link href={`/products/${item.id}`} className="sb-btn sb-btn-gray">
              <span className="sb-icon">
                <img src="/img/ui/icons/arrow.svg" alt="icon" />
              </span>
              <span>Chi tiết</span>
            </Link>
          )}
          {/* button end */}
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
      </div>
    </>
  );
};

export default ProductItem;

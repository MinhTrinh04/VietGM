// cart.js: Quản lý giỏ hàng trong localStorage

// Lấy giỏ hàng từ localStorage
export function getCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || { items: [], totalPrice: 0 };
    return cart;
  }
  
  // Lưu giỏ hàng vào localStorage
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // Thêm sản phẩm vào giỏ hàng
  export function addToCart(product) {
    const cart = getCart();
    const existingIndex = cart.items.findIndex(item => item.productId === product.productId);
  
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += product.quantity;
      cart.items[existingIndex].totalPrice = cart.items[existingIndex].quantity * product.price;
    } else {
      cart.items.push({
        ...product,
        totalPrice: product.quantity * product.price,
      });
    }
  
    cart.totalPrice = cart.items.reduce((total, item) => total + item.totalPrice, 0);
    saveCart(cart);
  }
  
  // Cập nhật số lượng sản phẩm
  export function updateCart(productId, quantity) {
    const cart = getCart();
    const product = cart.items.find(item => item.productId === productId);
  
    if (product) {
      product.quantity = quantity;
      product.totalPrice = quantity * product.price;
    }
  
    cart.totalPrice = cart.items.reduce((total, item) => total + item.totalPrice, 0);
    saveCart(cart);
  }
  
  // Xóa sản phẩm khỏi giỏ hàng
  export function removeFromCart(productId) {
    const cart = getCart();
    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.totalPrice = cart.items.reduce((total, item) => total + item.totalPrice, 0);
    saveCart(cart);
  }
  
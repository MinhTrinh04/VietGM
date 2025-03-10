import fs from 'fs';
import path from 'path';

// Đường dẫn tới file cart.json
const cartFilePath = path.join(process.cwd(), 'src/data/cart.json');

export async function GET() {
    try {
      // Đọc dữ liệu từ file cart.json
      const cartData = JSON.parse(fs.readFileSync(cartFilePath, 'utf8'));
  
      // Phản hồi với dữ liệu giỏ hàng
      return new Response(JSON.stringify(cartData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error fetching cart data:', error.message);
      return new Response(JSON.stringify({ message: 'Lỗi khi lấy dữ liệu giỏ hàng.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

export async function POST(request) {
  try {
    // Lấy dữ liệu từ body của request
    const { item, quantity } = await request.json();

    // Đọc dữ liệu hiện tại từ file cart.json
    let cartData = JSON.parse(fs.readFileSync(cartFilePath, 'utf8'));

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cartData.items.find(cartItem => cartItem.title === item.title);

    if (existingItem) {
      // Nếu sản phẩm đã có, tăng số lượng
      existingItem.quantity = existingItem.quantity ? existingItem.quantity + quantity : quantity;
    } else {
      // Nếu chưa có, thêm sản phẩm mới
      cartData.items.push({
        ...item,
        quantity: quantity
      });
    }

    // Cập nhật tổng số lượng sản phẩm
    cartData.total += quantity;

    // Ghi dữ liệu mới vào file cart.json
    fs.writeFileSync(cartFilePath, JSON.stringify(cartData, null, 2), 'utf8');

    // Phản hồi thành công
    return new Response(JSON.stringify({ message: 'Sản phẩm đã được thêm vào giỏ hàng.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return new Response(JSON.stringify({ message: 'Lỗi khi thêm sản phẩm vào giỏ hàng.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

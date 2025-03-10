
interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  rating: number;
  badge: string;
  categoryId: string;
  isPopular: boolean;
  isBestSeller: boolean;
  views: number;
  orderCount: number;
}

interface Reservation {
  id: string; // ID của đặt bàn
  name: string; // Tên khách hàng
  email: string; // Email của khách hàng
  tel: string; // Số điện thoại của khách hàng
  time: string; // Thời gian đặt bàn
  person: number; // Số lượng người
  note?: string; // Ghi chú (tùy chọn)
  createdAt?: string; // Thời gian tạo (tự động)
  updatedAt?: string; // Thời gian cập nhật (tự động)
}

interface Post {
  id: string; // ID của bài viết
  title: string; // Tiêu đề bài viết
  slug: string; // Đường dẫn (slug) bài viết
  content: string; // Nội dung bài viết
  date: string; // Ngày đăng bài viết (ISO String format)
  image: string; // URL ảnh đại diện bài viết
  categories: string[]; // Danh sách danh mục bài viết
  tags?: string[]; // Danh sách thẻ liên quan (tùy chọn)
  author: string; // ID của tác giả (ref đến Author)
  short: string; // Mô tả ngắn gọn bài viết
  introLayout?: number; // Layout phần giới thiệu bài viết (mặc định là 1)
  postLayout?: number; // Layout phần nội dung bài viết (mặc định là 1)
  createdAt?: string; // Ngày giờ tạo bài viết (tự động)
  updatedAt?: string; // Ngày giờ cập nhật bài viết (tự động)
}

interface SingleProductPageProps {
  params: {
    productSlug: string;
  };
}

type ProductInWishlist = {
  id: string;
  title: string;
  price: number;
  image: string;
  slug: string;
  stockAvailabillity: number;
};

interface OtherImages {
  imageID: number;
  productID: number;
  image: string;
}

interface Category {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string | null;
  role: string;
  isActive: boolean;
}

interface Order {
  id: string;
  adress: string;
  apartment: string;
  company: string;
  dateTime: string;
  email: string;
  lastname: string;
  name: string;
  phone: string;
  postalCode: string;
  status: "processing" | "canceled" | "delivered";
  city: string;
  country: string;
  orderNotice: string?;
  total: number;
}

interface SingleProductBtnProps {
  product: Product;
  quantityCount: number;
}

interface WishListItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
}

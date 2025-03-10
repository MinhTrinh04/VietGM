"use client";

import { DashboardSidebar } from "@/components/vgm";
import { isValidEmailAddressFormat, isValidNameOrLastname } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { orderApi } from "@/app/api/order";
import { FiSave } from "react-icons/fi"; // Import icon

interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  mainImage: string;
}

interface Order {
  _id: string;
  customerName: string;
  customerAddress: string;
  customerTel: string;
  customerEmail: string;
  orderItems: OrderItem[];
  totalPrice: number;
  paymentMethod: number;
  note?: string;
  orderStatus: number;
  createdAt: string;
}

const AdminSingleOrder = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Thêm state để kiểm tra loading

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderApi.getOrderById(params.id);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Không thể tải thông tin đơn hàng.");
      }
    };

    if (params.id) {
      fetchOrder();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!order) {
      toast.error("Không có thông tin đơn hàng để cập nhật.");
      return;
    }

    try {
      setIsLoading(true);

      // Validate data (nếu cần)
      if (!isValidNameOrLastname(order.customerName)) {
        toast.error("Tên khách hàng không hợp lệ");
        return;
      }
      // ... (Validate các trường khác nếu cần) ...

      await orderApi.updateOrder(order._id, order); 
      toast.success("Cập nhật đơn hàng thành công!");
      router.push("/admin/orders"); // Chuyển hướng về trang danh sách đơn hàng sau khi cập nhật
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Có lỗi xảy ra khi cập nhật đơn hàng");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => { // Đổi tên hàm thành handleDelete
    if (!order) return;

    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) return;

    try {
      await orderApi.deleteOrder(order._id);
      toast.success("Xóa đơn hàng thành công!");
      router.push("/admin/orders");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Có lỗi xảy ra khi xóa đơn hàng");
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white flex justify-start  mx-auto min-h-screen"> 
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Chi tiết đơn hàng
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6"> 
          <div className="space-y-6">
            {/* Tên khách hàng */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên khách hàng
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={order.customerName}
                onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={order.customerEmail}
                onChange={(e) => setOrder({ ...order, customerEmail: e.target.value })}
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={order.customerTel}
                onChange={(e) => setOrder({ ...order, customerTel: e.target.value })}
              />
            </div>

            {/* Địa chỉ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={order.customerAddress}
                onChange={(e) => setOrder({ ...order, customerAddress: e.target.value })}
              />
            </div>

            {/* Phương thức thanh toán */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phương thức thanh toán
              </label>
              <select
                className="select select-bordered w-full"
                value={order.paymentMethod}
                onChange={(e) => setOrder({ ...order, paymentMethod: parseInt(e.target.value) })}
              >
                <option value={1}>Chuyển khoản</option>
                <option value={2}>Tiền mặt</option>
              </select>
            </div>

            {/* Ghi chú */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ghi chú
              </label>
              <textarea
                className="textarea textarea-bordered w-full min-h-[100px]"
                value={order.note || ""}
                onChange={(e) => setOrder({ ...order, note: e.target.value })}
              />
            </div>

            {/* Trạng thái đơn hàng */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <select
                className="select select-bordered w-full"
                value={order.orderStatus}
                onChange={(e) => setOrder({ ...order, orderStatus: parseInt(e.target.value) })}
              >
                <option value={1}>Chờ xác nhận</option>
                <option value={2}>Đã huỷ</option>
                <option value={3}>Đang giao hàng</option>
                <option value={4}>Hoàn thành</option>
                {/* ... (Các trạng thái khác) ... */}
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="button-crud btn btn-primary flex-1 gap-2"
            >
              <FiSave className="w-5 h-5" />
              {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>

            <button
              type="button"
              onClick={handleDelete} // Sử dụng handleDelete
              className="button-crud btn btn-outline flex-1"
            >
              Xóa
            </button>
          </div>
        </form>

        {/* Hiển thị danh sách sản phẩm trong đơn hàng */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Danh sách sản phẩm:</h2>
          <ul>
            {order.orderItems.map((item) => (
              <li key={item.productId} className="flex items-center gap-x-4 mb-4">
                <Image
                  src={item.mainImage ? `/${item.mainImage}` : "/product_placeholder.jpg"}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="w-auto h-auto"
                />
                <div>
                  <Link href={`/product/${item.productId}`}>
                    {item.title}
                  </Link>
                  <p>
                    {item.price.toLocaleString("vi-VN")} VNĐ x {item.quantity} = {(item.price * item.quantity).toLocaleString("vi-VN")} VNĐ
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {/* Hiển thị tổng giá */}
          <div className="mt-4">
            <span className="text-xl font-bold">Tổng giá:</span>
            <span className="text-base ml-2"> {order.totalPrice.toLocaleString("vi-VN")} VNĐ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleOrder;
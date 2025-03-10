// components/vgm/AdminOrder.tsx
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiEdit3, FiTrash2, FiSearch } from "react-icons/fi";
import { orderApi } from "@/app/api/order";
import toast from "react-hot-toast";

interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerTel: string;
  orderItems: OrderItem[];
  totalPrice: number;
  paymentMethod: number;
  orderStatus: number;
  createdAt: string;
}

const AdminOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderApi.getAllOrders();
        setOrders(data);
      } catch (error) {
        toast.error("Không thể tải danh sách đơn hàng.");
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) return;

    try {
      await orderApi.deleteOrder(id);
      toast.success("Xóa đơn hàng thành công.");
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa đơn hàng.");
      console.error("Lỗi khi xóa đơn hàng:", error);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerTel.includes(searchTerm)
  );

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý đơn hàng</h1>
      </div>

      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md body-table">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="loading loading-spinner loading-lg text-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên khách hàng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Tổng giá</th>
                  {/* <th>Phương thức thanh toán</th> */}
                  <th>Trạng thái</th>
                  <th>Ngày đặt</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td>{index + 1}</td>
                    <td className="font-medium">{order.customerName}</td>
                    <td>{order.customerEmail}</td>
                    <td>{order.customerTel}</td>
                    <td>{order.totalPrice.toLocaleString("vi-VN")} VNĐ</td>
                    {/* <td>{order.paymentMethod === 1 ? "Chuyển khoản" : "Tiền mặt"}</td> */}
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${order.orderStatus === 1 ? 'bg-yellow-100 text-yellow-800' : 
                         order.orderStatus === 2 ? 'bg-red-100 text-red-800' : 
                         order.orderStatus === 3 ? 'bg-blue-100 text-blue-800' : 
                         'bg-green-100 text-green-800' 
                        }`}>
                        {order.orderStatus === 1 ? "Chờ xác nhận" : 
                         order.orderStatus === 2 ? "Đã huỷ" : 
                         order.orderStatus === 3 ? "Đang giao hàng" : 
                         "Hoàn thành"
                        }
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString("vi-VN")}</td>
                    <td>
                      <Link href={`/admin/orders/${order._id}`}>
                        <button className="btn btn-sm btn-ghost text-blue-600">
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        className="btn btn-sm btn-ghost text-red-600"
                        onClick={() => handleDelete(order._id)}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrder;
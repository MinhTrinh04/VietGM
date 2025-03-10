"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { productApi } from "@/app/api/product";
import toast from "react-hot-toast";
import { FiEdit3, FiTrash2, FiSearch, FiPlus } from 'react-icons/fi';

// Định nghĩa interface cho Product
interface Product {
  _id: string;
  title: string;
  image?: string;
  price: number;
  rating?: number;
  views?: number;
  isActive: boolean;
  isPopular?: boolean;
  isBestSeller?: boolean;
  orderCount?: number;
  category?: {
    name: string;
  };
}

const DashboardProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const filters: any = {};
        if (activeFilter !== "all") {
          filters.isActive = activeFilter === "active";
        }
        const data = await productApi.getAllProducts(filters);
        setProducts(data);
      } catch (error) {
        toast.error("Không thể tải danh sách sản phẩm");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [activeFilter]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    try {
      await productApi.deleteProduct(id);
      toast.success("Xóa sản phẩm thành công");
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 head">Quản lý sản phẩm</h1>
        <Link href="/admin/products/new">
          {/* <CustomButton
            paddingX={4}
            paddingY={2}
            text="Thêm sản phẩm"
            buttonType="button"
            customWidth="no"
            textSize="base"
            icon={<FiPlus className="w-5 h-5" />}
          /> */}
          <button className="button-crud">Thêm sản phẩm</button>
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filter Dropdown */}
        <select 
          className="select select-bordered w-48"
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
        >
          <option value="all">Tất cả sản phẩm</option>
          <option value="active">Đang bán</option>
          <option value="inactive">Ngừng bán</option>
        </select>
      </div>

      {/* Products Table */}
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
                  <th className="w-20">Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  {/* <th>Thể loại</th> */}
                  <th className="text-right">Giá (VNĐ)</th>
                  <th className="text-center">Đánh giá</th>
                  <th className="text-center">Lượt xem</th>
                  <th className="text-center">Số lần đặt hàng</th>
                  <th className="text-center">Trạng thái</th>
                  <th className="text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="w-20 h-20 p-2">
                      {product.image ? (
                        <div className="relative w-16 h-16">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="rounded object-cover"
                            sizes="64px"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </td>
                    <td className="font-medium max-w-[200px] truncate">
                      {product.title}
                    </td>
                    {/* <td>{product.category?.name || "Không có"}</td> */}
                    <td className="text-right">{product.price.toLocaleString('vi-VN')}</td>
                    <td className="text-center">{product.rating || 0}</td>
                    <td className="text-center">{product.views || 0}</td>
                    <td className="text-center">{product.orderCount || 0}</td>
                    <td className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${product.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.isActive ? 'Đang bán' : 'Ngừng bán'}
                      </span>
                    </td>
                    <td className="text-right space-x-1">
                      <Link href={`/admin/products/${product._id}`}>
                        <button className="btn btn-sm btn-ghost text-blue-600">
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                      </Link>
                      <button 
                        className="btn btn-sm btn-ghost text-red-600"
                        onClick={() => handleDelete(product._id)}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardProductTable;

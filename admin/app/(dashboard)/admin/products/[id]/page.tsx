"use client";

import { DashboardSidebar } from "@/components/vgm";
import { productApi } from "@/app/api/product";
import { categoryApi } from "@/app/api/category";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiUpload, FiSave } from "react-icons/fi";
import Image from "next/image";

interface DashboardProductDetailsProps {
  params: { id: string };
}

interface Category {
  _id: string;
  name: string;
}

const DashboardProductDetails = ({
  params: { id },
}: DashboardProductDetailsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: null as File | null,
    badge: "",
    categoryId: "", // Dùng trực tiếp _id của danh mục
    isActive: true,
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, categoriesData] = await Promise.all([
          productApi.getProductById(id),
          categoryApi.getAllCategories(),
        ]);

        console.log("Product Data from API:", productData);
        console.log("Categories Data from API:", categoriesData);

        if (Array.isArray(categoriesData) && categoriesData.length > 0) {
          setCategories(categoriesData);

          setProduct({
            ...productData,
            categoryId:
              productData.categoryId?._id || productData.categoryId || "",
          });

          setPreviewImage(productData.image);
        } else {
          toast.error("Danh mục không hợp lệ hoặc trống");
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Không thể tải thông tin sản phẩm hoặc danh mục");
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.title || !product.description || !product.categoryId) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setIsLoading(true);
      await productApi.updateProduct(id, {
        ...product,
        categoryId: product.categoryId, // Gửi đúng _id danh mục
      });
      toast.success("Cập nhật sản phẩm thành công!");
      router.push("/admin/products");
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật sản phẩm");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Kích thước ảnh không được vượt quá 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Vui lòng chọn file ảnh");
        return;
      }

      setProduct((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white flex justify-start  mx-auto min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Chỉnh sửa sản phẩm
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ảnh chính
            </label>
            <div className="space-y-2">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">
                        Click để thay đổi ảnh
                      </span>
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {previewImage && (
                <div className="relative w-full h-64">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Product details */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên sản phẩm
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: Number(e.target.value) })
                }
                required
                min="0"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục
              </label>
              <select
                className="select select-bordered w-full"
                value={product.categoryId}
                onChange={(e) =>
                  setProduct({ ...product, categoryId: e.target.value })
                }
                required
              >
                <option value="" disabled>
                  Chọn danh mục
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <textarea
                className="textarea textarea-bordered w-full min-h-[200px]"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={product.isActive}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      isActive: e.target.checked,
                    })
                  }
                />
                <span className="text-sm text-gray-600">
                  {product.isActive ? "Đang bán" : "Ngừng bán"}
                </span>
              </div>
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
              onClick={() => router.push("/admin/products")}
              className="button-crud btn btn-outline flex-1"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardProductDetails;

"use client";

import { DashboardSidebar } from "@/components/vgm";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { productApi } from "@/app/api/product";
import { categoryApi } from "@/app/api/category";
import { useRouter } from "next/navigation";

interface ProductForm {
  title: string;
  price: number;
  currency: string;
  image: File | null;
  description: string;
  rating: number;
  badge: string;
  categoryId: string;
  isPopular: boolean;
  isBestSeller: boolean;
  isActive: boolean;
}

const AddNewProduct = () => {
  const router = useRouter();
  const [product, setProduct] = useState<ProductForm>({
    title: "",
    price: 0,
    currency: "VNĐ",
    image: null,
    description: "",
    rating: 5,
    badge: "",
    categoryId: "",
    isPopular: false,
    isBestSeller: false,
    isActive: true,
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await categoryApi.getAllCategories();
      setCategories(data);
      if (data.length > 0) {
        setProduct((prev) => ({ ...prev, categoryId: data[0]._id }));
      }
    } catch (error: any) {
      toast.error("Không thể tải danh sách danh mục");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct({ ...product, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async () => {
    if (
      !product.title ||
      !product.price ||
      !product.description ||
      !product.image ||
      !product.categoryId
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      setLoading(true);
      console.log("Submitting product:", product);
      await productApi.createProduct(product);
      toast.success("Thêm sản phẩm thành công");
      router.push("/admin/products");
      // Reset form
      setProduct({
        title: "",
        price: 0,
        currency: "VNĐ",
        image: null,
        description: "",
        rating: 5,
        badge: "",
        categoryId: categories[0]?._id || "",
        isPopular: false,
        isBestSeller: false,
        isActive: true,
      });
      setImagePreview("");
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi thêm sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex justify-start  mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5 component-bg">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 w-full p-8">
        <h1 className="text-3xl font-semibold head">Thêm món ăn mới</h1>

        <div className="flex flex-col md:flex-row gap-8"> 

          {/* Left side (Title, Price, Category) */}
          <div className="md:w-1/2"> 
            {/* Title */}
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text add-field">Tên sản phẩm:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs body-table"
                  value={product.title}
                  onChange={(e) =>
                    setProduct({ ...product, title: e.target.value })
                  }
                />
              </label>
            </div>

            {/* Price */}
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text add-field">Giá:</span>
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full max-w-xs body-table"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: Number(e.target.value) })
                  }
                />
              </label>
            </div>

            {/* Category */}
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text add-field">Danh mục:</span>
                </div>
                <select
                  className="select select-bordered body-table"
                  value={product.categoryId}
                  onChange={(e) =>
                    setProduct({ ...product, categoryId: e.target.value })
                  }
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Right side (Image) */}
          <div className="md:w-1/2"> 
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text add-field">Hình ảnh:</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full max-w-xs body-table "
                  onChange={handleImageChange}
                />
              </label>
              {imagePreview && (
                <div className="mt-2">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

        </div>  



        {/* Description */}
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text add-field">Mô tả:</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 body-table"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </label>
        </div>


        {/* Badge */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text add-field">Badge (tùy chọn):</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs body-table"
              value={product.badge}
              onChange={(e) =>
                setProduct({ ...product, badge: e.target.value })
              }
            />
          </label>
        </div>

        {/* Checkboxes */}
        <div className="flex gap-4">
          <label className="cursor-pointer label">
            <span className="label-text mr-2 add-field">Phổ biến</span>
            <input
              type="checkbox"
              className="checkbox checkbox-color"
              checked={product.isPopular}
              onChange={(e) =>
                setProduct({ ...product, isPopular: e.target.checked })
              }
            />
          </label>

          <label className="cursor-pointer label">
            <span className="label-text mr-2 add-field">Bán chạy</span>
            <input
              type="checkbox"
              className="checkbox checkbox-color"
              checked={product.isBestSeller}
              onChange={(e) =>
                setProduct({ ...product, isBestSeller: e.target.checked })
              }
            />
          </label>

          <label className="cursor-pointer label">
            <span className="label-text mr-2 add-field">Đang bán</span>
            <input
              type="checkbox"
              className="checkbox checkbox-color"
              checked={product.isActive}
              onChange={(e) =>
                setProduct({ ...product, isActive: e.target.checked })
              }
            />
          </label>
        </div>

        {/* Submit */}
        <div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn btn-primary button-crud "
          >
            {loading ? "Đang xử lý..." : "Thêm món ăn"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;

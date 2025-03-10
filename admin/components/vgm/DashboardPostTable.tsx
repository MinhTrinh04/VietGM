"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { postApi } from "@/app/api/post";
import toast from "react-hot-toast";
import { FiEdit3, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";

// Định nghĩa interface cho Post
interface Post {
  _id: string;
  title: string;
  short?: string;
  author: { title: string };
  date: string;
}

const DashboardPostTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postApi.getAllPosts();
        console.log(data);
        setPosts(data);
      } catch (error) {
        toast.error("Không thể tải danh sách bài viết");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle delete post
  const handleDelete = async (_id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;

    try {
      await postApi.deletePost(_id);
      toast.success("Xóa bài viết thành công");
      setPosts(posts.filter((post) => post._id !== _id));
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa bài viết");
    }
  };

  // Filter posts by search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý bài viết</h1>
        <Link href="/admin/posts/new">
          <CustomButton
            paddingX={4}
            paddingY={2}
            text="Thêm bài viết"
            buttonType="button"
            customWidth="no"
            textSize="base"
            icon={<FiPlus className="w-5 h-5" />}
          />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-md">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="loading loading-spinner loading-lg text-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>Mô tả ngắn</th>
                  <th>Tác giả</th>
                  <th>Ngày tạo</th>
                  <th className="text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="font-medium">{post.title}</td>
                    <td>{post.short || "Không có mô tả"}</td>
                    <td>{post.author?.title || "Không rõ"}</td>
                    <td>{new Date(post.date).toLocaleDateString()}</td>
                    <td className="text-right space-x-1">
                      <Link href={`/admin/posts/${post._id}`}>
                        <button className="btn btn-sm btn-ghost text-blue-600">
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        className="btn btn-sm btn-ghost text-red-600"
                        onClick={() => handleDelete(post._id)}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!isLoading && filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Không tìm thấy bài viết nào</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPostTable;

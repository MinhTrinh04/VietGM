"use client";
import { DashboardSidebar } from "@/components/vgm";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { postApi } from "@/app/api/post";
import { useRouter } from "next/navigation";

interface PostForm {
  title: string;
  image: File | null;
  content: string;
  short: string;
  category: string;
  tag: string;
  author: string;
}

const AddNewPost = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostForm>({
    title: "",
    image: null,
    content: "",
    short: "",
    category: "",
    tag: "",
    author: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const authors = [
    {
      title: "Nguyễn Hoàng Việt",
      avatar:
        "https://res.cloudinary.com/dv1blsnnu/image/upload/v1734280913/VGM/authors/psuoni0w3u6rfjfzsxjl.jpg",
    },
    {
      title: "Nguyễn Trung Kiên",
      avatar:
        "https://res.cloudinary.com/dv1blsnnu/image/upload/v1734280912/VGM/authors/a4o5hi9xbojvivhe91qr.jpg",
    },
    {
      title: "Trinh Quang Minh",
      avatar:
        "https://res.cloudinary.com/dv1blsnnu/image/upload/v1734280914/VGM/authors/h9ehubr7hdx7chgbsis8.jpg",
    },
    {
      title: "Nguyễn Đăng Phúc Hưng",
      avatar:
        "https://res.cloudinary.com/dv1blsnnu/image/upload/v1734280911/VGM/authors/cmu8nhlydpvby9cn5klo.jpg",
    },
  ];
  const categories = ["Đồ ăn", "Thức uống", "Văn hoá", "Ẩm thực"];
  const tags = ["Chiên", "Mặn", "Giòn", "Béo", "Ngon", "Đậm đà", "Hương vị", "Đặc sản", "Truyền thống", "Dân dã"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPost({ ...post, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleMarkdownUpload = (file: File) => {
    const validExtensions = [".md", ".markdown"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (!fileExtension || !validExtensions.includes(`.${fileExtension}`)) {
      toast.error("Vui lòng chọn file Markdown hợp lệ (.md hoặc .markdown).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content.trim()) {
        setPost({ ...post, content });
        toast.success("Nội dung Markdown đã được tải lên!");
      } else {
        toast.error("File Markdown rỗng. Vui lòng chọn file hợp lệ.");
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    const selectedAuthor = authors.find(
      (author) => author.title === post.author
    );

    if (
      !post.title ||
      !post.content.trim() ||
      !post.short ||
      !post.category ||
      !post.tag ||
      !selectedAuthor ||
      !post.image
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    try {
      setLoading(true);

      const postData = {
        title: post.title,
        content: post.content,
        short: post.short,
        category: post.category,
        tag: post.tag,
        author: selectedAuthor,
        image: post.image, // URL sẽ được xử lý trong BE
      };
      await postApi.createPost(postData);
      toast.success("Thêm bài viết thành công!");
      router.push("/admin/posts");
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi thêm bài viết.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:ml-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Thêm Bài Viết Mới</h1>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Hình Ảnh:</span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full max-w-xs"
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

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Tiêu Đề:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Tác Giả:</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              value={post.author}
              onChange={(e) => setPost({ ...post, author: e.target.value })}
            >
              <option value="">Chọn Tác Giả</option>
              {authors.map((author) => (
                <option key={author.title} value={author.title}>
                  {author.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Danh Mục:</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              value={post.category}
              onChange={(e) => setPost({ ...post, category: e.target.value })}
            >
              <option value="">Chọn Danh Mục</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Thẻ:</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
            >
              <option value="">Chọn Thẻ</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Mô Tả Ngắn:</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              value={post.short}
              onChange={(e) => setPost({ ...post, short: e.target.value })}
            ></textarea>
          </label>
        </div>

        <div>
          <input
            type="file"
            accept=".md"
            className="file-input file-input-bordered mt-2"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleMarkdownUpload(file);
            }}
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Đang xử lý..." : "Thêm Bài Viết"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewPost;

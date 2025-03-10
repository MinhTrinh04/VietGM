import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { removeVietnameseTones } from "@helpers/removeVietnameseTones";
const postsDirectory = path.join(process.cwd(), "src/data/posts");
const jsonDir = "src/data/.json";

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.includes(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
      };
    });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getCategoryPosts(cat_id) {
  // Get file names under /posts
  const allData = [];
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.includes(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      const cats = matterResult.data.categories;

      if (cats != undefined) {
        const catsSlug = cats.map((element) => {
          return removeVietnameseTones(element) // Loại bỏ dấu tiếng Việt
            .toLowerCase()
            .replace(/\s+/g, "-"); // Chuyển thành slug (viết thường, thay khoảng trắng bằng dấu gạch ngang)
        });

        if (catsSlug != undefined) {
          // So sánh category đã loại bỏ dấu tiếng Việt
          if (
            catsSlug.includes(
              removeVietnameseTones(cat_id).toLowerCase().replace(/\s+/g, "-")
            )
          ) {
            // Combine the data with the id
            allData.push({
              id,
              ...matterResult.data,
            });
          }
        }
      }
    });

  // Sort posts by date
  return allData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getTagPosts(tag_id) {
  const allData = [];
  const fileNames = fs.readdirSync(postsDirectory);

  fileNames
    .filter((fileName) => fileName.includes(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      const tags = matterResult.data.tags;

      if (tags != undefined) {
        const tagsSlug = tags.map((element) => {
          return removeVietnameseTones(element.toLowerCase().replace(" ", "-"));
        });

        // Kiểm tra nếu tagSlug chứa tag_id
        if (tagsSlug.includes(tag_id)) {
          allData.push({
            id,
            ...matterResult.data,
          });
        }
      }
    });

  // Sắp xếp bài viết theo ngày
  return allData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Cập nhật hàm getAuthorPosts để sử dụng hàm loại bỏ dấu
export function getAuthorPosts(author_id) {
  const allData = [];
  const fileNames = fs.readdirSync(postsDirectory);

  fileNames
    .filter((fileName) => fileName.includes(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      // Lấy author từ metadata, loại bỏ dấu và chuẩn hóa tên
      const author = removeVietnameseTones(matterResult.data.author)
        .toLowerCase()
        .replace(/\s+/g, "-") // Thay dấu cách bằng gạch nối
        .replace(/[^a-zA-Z0-9-]/g, "") // Loại bỏ ký tự đặc biệt
        .trim();

      // Kiểm tra nếu author trùng với author_id
      if (author === author_id) {
        allData.push({
          id,
          ...matterResult.data,
        });
      }
    });

  // Sắp xếp bài viết theo ngày
  return allData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArchivePosts(archive_id) {
  // Get file names under /posts
  const allData = [];
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.includes(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      const dateObj = new Date(matterResult.data.date);
      const dateSlug = dateObj.getMonth() + 1 + "-" + dateObj.getFullYear();

      // Check current category
      if (dateSlug == archive_id) {
        // Combine the data with the id
        allData.push({
          id,
          ...matterResult.data,
        });
      }
    });
  // Sort posts by date
  return allData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPaginatedPostsData(limit, page) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.includes(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
      };
    });
  // Sort posts by date
  allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  const paginatedPosts = allPostsData.slice((page - 1) * limit, page * limit);
  return { posts: paginatedPosts, total: allPostsData.length };
}

export function getFeaturedPostsData(ids) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allData = [];
  fileNames
    .filter((fileName) => fileName.includes(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      if (ids.includes(id)) {
        // Combine the data with the id
        allData.push({
          id,
          ...matterResult.data,
        });
      }
    });

  // Sort posts by date
  return allData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getRelatedPosts(current_id) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allData = [];

  fileNames
    .filter((fileName) => fileName.includes(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Exclude current id from result

      if (id != current_id) {
        // Combine the data with the id
        allData.push({
          id,
          ...matterResult.data,
        });
      }
    });

  // Sort posts by date
  return allData.sort((a, b) => {
    if (a.category > b.category) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostsIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.includes(".md"))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ""),
        },
      };
    });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (fs.existsSync(fullPath)) {
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  } else {
    return;
  }
}

export async function generateJsonPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.includes(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      const content = matterResult.content;

      // Use remark to convert markdown into HTML string
      //const processedContent = await remark()
      //.use(html)
      //.process(matterResult.content)
      //const contentHtml = processedContent.toString()

      // Combine the data with the id
      return {
        id,
        content,
        ...matterResult.data,
      };
    });
  // Sort posts by date
  const posts = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  // Create JSON File
  try {
    if (!fs.existsSync(jsonDir)) {
      fs.mkdirSync(jsonDir);
    }
    fs.writeFileSync(`${jsonDir}/posts.json`, JSON.stringify(posts));
  } catch (err) {
    console.error(err);
  }
}

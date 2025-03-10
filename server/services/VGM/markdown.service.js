const Post = require("../../models/VGM/Post");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");

const clientPath = path.join(__dirname, "../../../client/src/data/posts");

const markdownService = {
  getAllPostsAsMarkdown: async () => {
    try {
      const posts = await Post.find();
      return posts.map((post) => ({
        id: post.slug,
        content: post.content,
        title: post.title,
        date: new Date(post.date).toISOString().split("T")[0],
        image: post.image,
        categories: [post.category],
        tags: [post.tag],
        author: post.author.title,
        short: post.short,
        introLayout: post.introLayout,
        postLayout: post.postLayout,
      }));
    } catch (error) {
      console.error("Error converting posts to markdown format:", error);
      throw new Error("Lỗi khi chuyển đổi bài viết sang định dạng markdown");
    }
  },

  getPostMarkdownBySlug: async (slug) => {
    try {
      const post = await Post.findOne({ slug });
      if (!post) {
        throw new Error("Bài viết không tồn tại");
      }

      return {
        id: post.slug,
        content: post.content,
        title: post.title,
        date: new Date(post.date).toISOString().split("T")[0],
        image: post.image,
        categories: [post.category],
        tags: [post.tag],
        author: post.author.title,
        short: post.short,
        introLayout: post.introLayout,
        postLayout: post.postLayout,
      };
    } catch (error) {
      console.error(`Error converting post to markdown format: ${slug}`, error);
      throw new Error("Lỗi khi chuyển đổi bài viết sang định dạng markdown");
    }
  },

  createSlug: (text) => {
    return text.toLowerCase().replace(/\s+/g, "-");
  },

  createPostFile: async (post) => {
    const content = `---
title: "${post.title}"
date: "${new Date(post.date).toISOString().split("T")[0]}"
image: "${post.image}"
categories:
  - ${post.category}
tags:
  - ${post.tag}
author: ${post.author.title}
short: ${post.short}
introLayout: ${post.introLayout || 2}
postLayout: ${post.postLayout || 2}
---

${post.content}`;

    fs.writeFileSync(path.join(clientPath, `${post.slug}.md`), content);
  },

  createMetaFile: (type, title, extra = {}) => {
    const dir = path.join(clientPath, type);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let content = `---
#preview
title: ${title}`;

    Object.entries(extra).forEach(([key, value]) => {
      content += `\n${key}: ${value}`;
    });

    content += "\n---";

    const fileName = `${slugify(title, {
      lower: true,
      strict: true,
      locale: "vi",
    })}.md`;

    fs.writeFileSync(path.join(dir, fileName), content);
  },

  deletePostFile: (slug) => {
    const filePath = path.join(clientPath, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  },

  syncFiles: async () => {
    try {
      const posts = await Post.find().populate("author");

      for (const post of posts) {
        await markdownService.createPostFile(post);

        markdownService.createMetaFile("categories", post.category);

        markdownService.createMetaFile("tags", post.tag);

        markdownService.createMetaFile("authors", post.author.title, {
          avatar: post.author.avatar || "/img/faces/default.jpg",
        });
      }

      const existingFiles = fs
        .readdirSync(clientPath)
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(".md", ""));

      const validSlugs = posts.map((post) => post.slug);

      existingFiles.forEach((file) => {
        if (!validSlugs.includes(file)) {
          markdownService.deletePostFile(file);
        }
      });

      return true;
    } catch (error) {
      console.error("Error syncing markdown files:", error);
      throw error;
    }
  },
};

module.exports = markdownService;

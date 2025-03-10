const mongoose = require("mongoose");
const slugify = require("slugify");

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  title: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, unique: true },
  date: { type: Date, default: Date.now },
  image: { type: String, required: true },
  category: { type: String, trim: true },
  tag: { type: String, trim: true },
  author: {
    title: { type: String, required: true, trim: true },
    avatar: { type: String },
  },
  short: { type: String, trim: true },
  introLayout: { type: Number, default: 2 },
  postLayout: { type: Number, default: 2 },
});

postSchema.pre("save", async function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      locale: "vi",
    });

    const existingSlug = await mongoose
      .model("Post")
      .findOne({ slug: this.slug });
    if (existingSlug) {
      throw new Error("Slug đã tồn tại, vui lòng sửa title.");
    }
  }
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

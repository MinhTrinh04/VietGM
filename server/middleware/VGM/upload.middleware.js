const cloudinary = require("../../config/VGM/cloudinary");

const uploadMiddleware =
  (type = "product") =>
  async (req, res, next) => {
    try {
      const config = {
        product: {
          fileField: "image",
          folder: "VGM/products",
          urlField: "image",
        },
        post: {
          fileField: "image",
          folder: "VGM/posts",
          urlField: "image",
        },
      };

      const { fileField, folder, urlField } = config[type];

      if (!req.files || !req.files[fileField]) {
        return next();
      }

      const file = req.files[fileField];

      if (!file.mimetype.startsWith("image")) {
        return res.status(400).json({
          message: "Please upload an image file",
        });
      }

      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: folder,
        use_filename: true,
        unique_filename: true,
      });

      req.body[urlField] = result.secure_url;

      next();
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: error.message });
    }
  };

module.exports = uploadMiddleware;

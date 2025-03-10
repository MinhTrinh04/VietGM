const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const connectDb = require("./utills/db");
require("dotenv").config();

// Import routes cho VGM
const vgmCategoryRouter = require("./routes/VGM/category.routes");
const vgmProductRouter = require("./routes/VGM/product.routes");
const authRouter = require("./routes/VGM/auth.routes");
const useRouter = require("./routes/VGM/user.routes");
const menuRouter = require("./routes/VGM/menu.routes");
const postRouter = require("./routes/VGM/post.routes");
const markdownRouter = require("./routes/VGM/markdown.routes");
const reservationRouter = require("./routes/VGM/reservation.routes");
const shopRouter = require("./routes/VGM/shop.routes");
const categoryRouter = require("./routes/VGM/category.routes");
const orderRouter = require("./routes/VGM/order.routes");
const app = express();

// Kết nối với MongoDB
connectDb();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
    createParentPath: true,
  })
);

// Routes cho VGM
app.use("/api/vgm/categories", vgmCategoryRouter);
app.use("/api/vgm/products", vgmProductRouter);
app.use("/api/vgm/auth", authRouter);
app.use("/api/vgm/users", useRouter);
app.use("/api/vgm/menu", menuRouter);
app.use("/api/vgm/posts", postRouter);
app.use("/api/vgm/markdown", markdownRouter);
app.use("/api/vgm/reservations", reservationRouter);
app.use("/api/vgm/shops", shopRouter);
app.use("/api/vgm/categories", categoryRouter);
app.use("/api/vgm/orders", orderRouter);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

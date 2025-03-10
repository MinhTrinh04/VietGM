// const Reservation = require("../../models/VGM/Reservation");  // Giả sử bạn có model Reservation

// // Controller để tạo một đặt bàn mới
// async function createReservation(req, res) {
//   const { name, email, tel, time, person } = req.body;

//   try {
//     // Kiểm tra dữ liệu
//     if (!name || !email || !tel || !time || !person) {
//       return res.status(400).json({ message: "Tất cả các trường là bắt buộc." });
//     }

//     // Tạo mới một đặt bàn
//     const newReservation = new Reservation({
//       name,
//       email,
//       tel,
//       time,
//       person,
//     });

//     // Lưu vào cơ sở dữ liệu
//     await newReservation.save();

//     return res.status(201).json({ message: "Đặt bàn thành công!", data: newReservation });
//   } catch (error) {
//     console.error("Error creating reservation:", error);
//     return res.status(500).json({ message: "Lỗi khi tạo đặt bàn" });
//   }
// }

// module.exports = {
//   createReservation,
// };

const Reservation = require("../../models/VGM/Reservation");

// Hàm để tạo một đặt bàn mới
async function createReservation(req, res) {
  const { name, email, tel, time, person, note, check } = req.body;

  try {
    if (!name || !email || !tel || !time || !person) {
      return res.status(400).json({ message: "Tất cả các trường là bắt buộc." });
    }

    // Lưu dữ liệu vào cơ sở dữ liệu
    const newReservation = new Reservation({
      name,
      email,
      tel,
      time,
      person,
      note, // Ghi chú
      check,
    });

    await newReservation.save();

    return res.status(201).json({ message: "Đặt bàn thành công!", data: newReservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res.status(500).json({ message: "Lỗi khi tạo đặt bàn" });
  }
}

// Hàm để lấy tất cả các đặt bàn
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error retrieving reservations:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách đặt bàn" });
  }
};

// Hàm để xóa một đặt bàn
const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({ message: "Không tìm thấy đặt bàn" });
    }

    return res.status(200).json({ message: "Xóa đặt bàn thành công", data: deletedReservation });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return res.status(500).json({ message: "Lỗi khi xóa đặt bàn" });
  }
};

// Hàm để lấy một đặt bàn theo ID
const getReservationById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Không tìm thấy đặt bàn" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    console.error("Error retrieving reservation:", error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin đặt bàn" });
  }
};

// Hàm để cập nhật một đặt bàn
const updateReservation = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; 

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({ message: "Không tìm thấy đặt bàn" });
    }
    res.status(200).json({ message: "Cập nhật đặt bàn thành công", data: updatedReservation });
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật đặt bàn" });
  }
};

module.exports = {
  getAllReservations,
  createReservation,
  deleteReservation, // Đảm bảo chỉ export những hàm đã định nghĩa
  getReservationById, // Thêm hàm getReservationById vào export
  updateReservation, // Thêm hàm updateReservation vào export
};

// "use client";

// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { FiEdit3, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";
// import { reservationApi } from "@/app/api/reservation";
// import toast from "react-hot-toast";

// interface Reservation {
//   _id: string;
//   name: string;
//   email: string;
//   tel: string;
//   time: string;
//   person: number;
//   note?: string;
// }

// const AdminReservation: React.FC = () => {
//   const [reservations, setReservations] = useState<Reservation[]>([]);

//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchReservations = async () => {
//       try {
//         const response = await reservationApi.getAllReservations();
//         if (response?.data && Array.isArray(response.data)) {
//           setReservations(response.data); // Đặt reservations là mảng từ response.data
//         } else {
//           toast.error("Dữ liệu trả về không hợp lệ từ API.");
//           console.error("API không trả về danh sách hợp lệ:", response);
//         }
//       } catch (error) {
//         toast.error("Không thể tải danh sách đặt bàn.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
  
//     fetchReservations();
//   }, []);
  

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Bạn có chắc chắn muốn xóa đặt bàn này?")) return;

//     try {
//       await reservationApi.deleteReservation(id); // Sử dụng reservationApi để xóa đặt bàn
//       toast.success("Xóa đặt bàn thành công.");
//       setReservations(reservations.filter((reservation) => reservation._id !== id));
//     } catch (error) {
//       toast.error("Có lỗi xảy ra khi xóa đặt bàn.");
//     }
//   };

//   const filteredReservations = reservations.filter((reservation) =>
//     reservation.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex-1 p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Quản lý đặt bàn</h1>
//         <Link href="/admin/reservation/new">
//           <button className="button-crud">Thêm đặt bàn</button>
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <div className="relative">
//           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Tìm kiếm đặt bàn..."
//             className="input input-bordered w-full pl-10"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Reservation Table */}
//       <div className="bg-white rounded-lg shadow-md body-table">
//         {isLoading ? (
//           <div className="text-center py-12">
//             <div className="loading loading-spinner loading-lg text-primary"></div>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="table w-full">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Tên khách hàng</th>
//                   <th>Email</th>
//                   <th>Số điện thoại</th>
//                   <th>Thời gian</th>
//                   <th>Số người</th>
//                   <th>Ghi chú</th>
//                   <th>Thao tác</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredReservations.map((reservation, index) => (
//                   <tr key={reservation._id} className="hover:bg-gray-50">
//                     <td>{index + 1}</td>
//                     <td className="font-medium">{reservation.name}</td>
//                     <td>{reservation.email}</td>
//                     <td>{reservation.tel}</td>
//                     <td>{reservation.time}</td>
//                     <td>{reservation.person}</td>
//                     <td>{reservation.note || "Không có"}</td>
//                     <td>
//                       <Link href={`/admin/reservations/${reservation._id}`}>
//                         <button className="btn btn-sm btn-ghost text-blue-600">
//                           <FiEdit3 className="w-4 h-4" />
//                         </button>
//                       </Link>
//                       <button
//                         className="btn btn-sm btn-ghost text-red-600"
//                         onClick={() => handleDelete(reservation._id)}
//                       >
//                         <FiTrash2 className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminReservation;

"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiEdit3, FiTrash2, FiSearch } from "react-icons/fi";
import { reservationApi } from "@/app/api/reservation";
import toast from "react-hot-toast";

interface Reservation {
  _id: string;
  name: string;
  email: string;
  tel: string;
  time: string;
  person: number;
  note?: string;
  check: boolean;
}

const AdminReservation: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await reservationApi.getAllReservations();   
          setReservations(data);
      } catch (error) {
        toast.error("Không thể tải danh sách đặt bàn.");
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đặt bàn này?")) return;

    try {
      await reservationApi.deleteReservation(id);
      toast.success("Xóa đặt bàn thành công.");
      setReservations(reservations.filter((reservation) => reservation._id !== id));
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa đặt bàn.");
      console.error("Lỗi khi xóa đặt bàn:", error);
    }
  };

  // Hàm lọc đặt bàn theo tên khách hàng hoặc email
  const filteredReservations = reservations.filter((reservation) =>
    reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.tel.includes(searchTerm)
  );

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý đặt bàn</h1>
        <Link href="/admin/reservations/new">
          <button className="button-crud">Thêm đặt bàn</button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm đặt bàn..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Reservation Table */}
      <div className="bg-white rounded-lg shadow-md body-table">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="loading loading-spinner loading-lg text-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên khách hàng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Thời gian</th>
                  <th>Số người</th>
                  <th>Ghi chú</th>
                  <th>Trạng thái đặt bàn</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation, index) => (
                  <tr key={reservation._id} className="hover:bg-gray-50">
                    <td>{index + 1}</td>
                    <td className="font-medium">{reservation.name}</td>
                    <td>{reservation.email}</td>
                    <td>{reservation.tel}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.person}</td>
                    <td>{reservation.note || "Không có"}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${reservation.check
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {reservation.check ? "Thành công" : "Không khả dụng"}
                      </span>
                    </td>
                    <td>
                      <Link href={`/admin/reservations/${reservation._id}`}>
                        <button className="btn btn-sm btn-ghost text-blue-600">
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        className="btn btn-sm btn-ghost text-red-600"
                        onClick={() => handleDelete(reservation._id)}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReservation;

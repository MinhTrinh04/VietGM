// AdminSingleReservation.js
"use client";

import { DashboardSidebar } from "@/components/vgm";
import { reservationApi } from "@/app/api/reservation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiSave } from "react-icons/fi";

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

interface AdminSingleReservationProps {
  params: { id: string };
}

const AdminSingleReservation = ({ params: { id } }: AdminSingleReservationProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        // Gọi API để lấy reservation theo id
        const data = await reservationApi.getReservationById(id); 
        setReservation(data);
      } catch (error) {
        console.error("Error fetching reservation:", error);
        toast.error("Không thể tải thông tin đặt bàn.");
      }
    };

    fetchReservation();
  }, [id]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reservation) {
      toast.error("Không có thông tin đặt bàn để cập nhật.");
      return;
    }

    try {
      setIsLoading(true);
      // Cập nhật reservation sử dụng API
      await reservationApi.updateReservation(reservation._id, {
        // Chỉ gửi trường check lên để cập nhật
        check: reservation.check,
      }); 
      toast.success("Cập nhật đặt bàn thành công!");
      router.push("/admin/reservations");
    } catch (error: any) {
      console.error("Error updating reservation:", error);
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật đặt bàn");
    } finally {
      setIsLoading(false);
    }
  };

  if (!reservation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white flex justify-start  mx-auto min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Chi tiết đặt bàn
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên khách hàng
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={reservation.name}
                readOnly 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={reservation.email}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={reservation.tel}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={reservation.time}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số người
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={reservation.person}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ghi chú
              </label>
              <textarea
                className="textarea textarea-bordered w-full min-h-[100px]"
                value={reservation.note || ""}
                readOnly
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={reservation.check}
                  onChange={(e) =>
                    setReservation({
                      ...reservation,
                      check: e.target.checked,
                    })
                  }
                />
                <span className="text-sm text-gray-600">
                  {reservation.check ? "Thành công" : "Không khả dụng"}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="button-crud btn btn-primary flex-1 gap-2"
            >
              <FiSave className="w-5 h-5" />
              {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/reservations")}
              className="button-crud btn btn-outline flex-1"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default AdminSingleReservation;

  
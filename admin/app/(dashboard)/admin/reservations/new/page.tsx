// reservation/new.js
"use client";

import { DashboardSidebar } from "@/components/vgm";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { reservationApi } from "@/app/api/reservation";
import { useRouter } from "next/navigation";

interface ReservationForm {
  name: string;
  email: string;
  tel: string;
  time: string;
  person: number;
  note?: string;
  check: boolean;
}

const AddNewReservation = () => {
  const router = useRouter();
  const [reservation, setReservation] = useState<ReservationForm>({
    name: "",
    email: "",
    tel: "",
    time: "",
    person: 1, // Giá trị mặc định cho số người
    note: "",
    check: true,
  });

  const [loading, setLoading] = useState(false);

  // Submit form
  const handleSubmit = async () => {
    if (
      !reservation.name ||
      !reservation.email ||
      !reservation.tel ||
      !reservation.time ||
      !reservation.person
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      setLoading(true);
      await reservationApi.createReservation(reservation);
      toast.success("Thêm đặt bàn thành công");
      router.push("/admin/reservations");
      // Reset form
      setReservation({
        name: "",
        email: "",
        tel: "",
        time: "",
        person: 1,
        note: "",
        check: true,
      });
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi thêm đặt bàn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex justify-start  mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5 component-bg">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 w-full p-8">
        <h1 className="text-3xl font-semibold head">Thêm đặt bàn mới</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side (Name, Email, Tel) */}
          <div className="md:w-1/2">
            {/* Name */}
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text add-field">Tên khách hàng:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs body-table"
                  value={reservation.name}
                  onChange={(e) =>
                    setReservation({ ...reservation, name: e.target.value })
                  }
                />
              </label>
            </div>

            {/* Email */}
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text add-field">Email:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs body-table"
                  value={reservation.email}
                  onChange={(e) =>
                    setReservation({ ...reservation, email: e.target.value })
                  }
                />
              </label>
            </div>

            {/* Tel */}
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text add-field">Số điện thoại:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs body-table"
                  value={reservation.tel}
                  onChange={(e) =>
                    setReservation({ ...reservation, tel: e.target.value })
                  }
                />
              </label>
            </div>
          </div>

          {/* Right side (Time, Person, Note) */}
          <div className="md:w-1/2">
            {/* Time */}
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text add-field">Thời gian:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs body-table"
                  value={reservation.time}
                  onChange={(e) =>
                    setReservation({ ...reservation, time: e.target.value })
                  }
                />
              </label>
            </div>

            {/* Person */}
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text add-field">Số người:</span>
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full max-w-xs body-table"
                  value={reservation.person}
                  onChange={(e) =>
                    setReservation({
                      ...reservation,
                      person: parseInt(e.target.value),
                    })
                  }
                />
              </label>
            </div>

            {/* Note */}
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text add-field">Ghi chú (tùy chọn):</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs body-table"
                  value={reservation.note}
                  onChange={(e) =>
                    setReservation({ ...reservation, note: e.target.value })
                  }
                />
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn btn-primary button-crud"
          >
            {loading ? "Đang xử lý..." : "Thêm đặt bàn"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewReservation;
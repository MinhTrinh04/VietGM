"use client";

import { AdminOrders, CheckReservation, DashboardSidebar } from "@/components/vgm";
import React from "react";

const DashboardReservationsPage = () => {
  return (
    <div className="bg-white flex justify-start  mx-auto h-full max-xl:flex-col max-xl:h-fit">
      {/* <AdminOrders /> */}
      <CheckReservation />
    </div>
  );
};

export default DashboardReservationsPage;

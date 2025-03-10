"use client";

import { AdminReservation, DashboardSidebar } from "@/components/vgm";
import React from "react";

const DashboardReservationsPage = () => {
  return (
    <div className="bg-white flex justify-start  mx-auto h-full max-xl:flex-col max-xl:h-fit">
      <DashboardSidebar />
      <AdminReservation />
    </div>
  );
};

export default DashboardReservationsPage;

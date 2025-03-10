"use client";
import { AdminOrders, DashboardSidebar } from "@/components/vgm";
import React from "react";

const DashboardOrdersPage = () => {
  return (
    <div className="bg-white flex justify-start  mx-auto h-full max-xl:flex-col max-xl:h-fit">
      <DashboardSidebar />
      <AdminOrders />
    </div>
  );
};

export default DashboardOrdersPage;

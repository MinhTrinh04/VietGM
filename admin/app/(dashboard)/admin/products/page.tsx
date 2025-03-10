"use client";
import {
  CustomButton,
  DashboardProductTable,
  DashboardSidebar,
} from "@/components/vgm";
import React from "react";

const DashboardProducts = () => {
  return (
    <div className="bg-white flex justify-start  mx-auto h-full max-xl:flex-col max-xl:h-fit max-xl:gap-y-4 component-bg">
      <DashboardSidebar />
      <DashboardProductTable />
    </div>
  );
};

export default DashboardProducts;

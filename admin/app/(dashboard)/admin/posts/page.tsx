"use client";
import {
  CustomButton,
  DashboardPostTable,
  DashboardSidebar,
} from "@/components/vgm";
import React from "react";

const DashboardPost = () => {
  return (
    <div className="bg-white flex justify-start mx-auto h-full max-xl:flex-col max-xl:h-fit max-xl:gap-y-4 component-bg">
      <DashboardSidebar />
      <DashboardPostTable />
    </div>
  );
};

export default DashboardPost;

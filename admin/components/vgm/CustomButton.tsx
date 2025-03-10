import React from "react";

interface CustomButtonProps {
  paddingX: number;
  paddingY: number;
  text: string;
  buttonType: "submit" | "reset" | "button";
  customWidth: string;
  textSize: string;
  icon?: React.ReactNode; // Thêm thuộc tính icon
}

const CustomButton = ({
  paddingX,
  paddingY,
  text,
  buttonType,
  customWidth,
  textSize,
  icon, // Nhận icon từ props
}: CustomButtonProps) => {
  return (
    <button
      type={`${buttonType}`}
      className={`${customWidth !== "no" && `w-${customWidth}`} uppercase bg-white px-${paddingX} py-${paddingY} text-${textSize} button-crud border border-black border-gray-300 font-bold text-blue-600 shadow-sm hover:bg-black hover:bg-gray-100 focus:outline-none focus:ring-2 text-center flex items-center gap-2`}
    >
      {icon && <span className="items-center">{icon}</span>} {/* Hiển thị icon nếu có */}
      {text}
    </button>
  );
};

export default CustomButton;

// *********************
// IN DEVELOPMENT
// *********************

import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

const StatsElement = () => {
  return (
    <div className="overflow-x-auto p-4 mb-4em">
      <table className="table-auto w-full border-collapse">
        <tbody>
          {/* Pending Orders */}
          <tr className="bg-yellow-100">
            <td className="px-4 py-2 font-medium">Đơn đang chờ</td>
            <td className="px-4 py-2 text-3xl font-bold">15</td>
            <td className="px-4 py-2 text-red-600 flex items-center gap-x-1">
              <FaArrowDown />
              5.4%
            </td>
          </tr>

          {/* Delivering Orders */}
          <tr className="bg-purple-100">
            <td className="px-4 py-2 font-medium">Đơn đang vận chuyển</td>
            <td className="px-4 py-2 text-3xl font-bold">7</td>
            <td className="px-4 py-2 text-blue-600 flex items-center gap-x-1">
              <FaArrowUp />
              2.3%
            </td>
          </tr>

          {/* Completed Orders */}
          <tr className="bg-green-100">
            <td className="px-4 py-2 font-medium">Đơn đã hoàn thành</td>
            <td className="px-4 py-2 text-3xl font-bold">850</td>
            <td className="px-4 py-2 text-green-600 flex items-center gap-x-1">
              <FaArrowUp />
              8.9%
            </td>
          </tr>

          {/* Total Revenue */}
          <tr className="bg-red-100">
            <td className="px-4 py-2 font-medium">Tổng doanh thu</td>
            <td className="px-4 py-2 text-3xl font-bold">45.678.000</td>
            <td className="px-4 py-2 text-green-600 flex items-center gap-x-1">
              <FaArrowUp />
              7.8%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatsElement;
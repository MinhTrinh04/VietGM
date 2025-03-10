"use client";
import { DashboardSidebar } from "@/components/vgm";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DashboardUserDetailsProps {
  params: { id: number };
}

const DashboardSingleUserPage = ({
  params: { id },
}: DashboardUserDetailsProps) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    role: "",
  });
  const router = useRouter();

  const deleteUser = async () => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          toast.success("User deleted successfully");
          router.push("/admin/users");
        } else {
          const errorData = await response.json();
          console.error("Server error:", errorData);
          throw new Error(errorData.error || "Error deleting user");
        }
      } catch (error: any) {
        console.error("Delete error details:", error);
        toast.error(error.message || "Error deleting user");
      }
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }
        return res.json();
      })
      .then((data) => {
        setUserDetails({
          email: data?.email,
          role: data?.role,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error loading user details");
      });
  }, [id]);

  return (
    <div className="bg-white flex justify-start  mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:pl-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Staff Details</h1>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{userDetails.email}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Role</p>
              <p className="font-medium capitalize">{userDetails.role}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-x-2">
          <button
            type="button"
            className="uppercase bg-red-600 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2"
            onClick={deleteUser}
          >
            Delete user
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSingleUserPage;

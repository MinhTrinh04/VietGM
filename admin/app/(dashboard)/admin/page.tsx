"use client";
import { DashboardSidebar, StatsElement } from "@/components/vgm";
import NewOrderGraph from "@/components/vgm/NewOrderGraph";
import SaleGraph from "@/components/vgm/SaleGraph";
import NewOrderbyProvinceGraph from "@/components/vgm/NewOrderByProvinceGraph";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface SessionUser {
  id: string;
  email: string;
  role: string;
  name?: string;
  image?: string;
}

interface Session {
  user: SessionUser;
  expires: string;
}

const AdminDashboardPage = () => {
  const { data: session, status } = useSession() as {
    data: Session | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  const router = useRouter();

  useEffect(() => {
    // Double check bảo mật ở client side
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (session?.user?.role !== "admin") {
      router.push("/login");
    }
  }, [session, status, router]);

  // Show loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white flex justify-start  mx-auto max-xl:flex-col mb-16 whole">
      <DashboardSidebar />
      <div className="flex flex-col justify-center items-center ml-5 gap-y-4 w-full max-xl:ml-0 max-xl:px-2 max-xl:mt-5 max-md:gap-y-1 ">
        {/* <StatsElement />
        <div className="flex flex-wrap justify-evenly items-center gap-y-4 w-full">
          <NewOrderbyProvinceGraph />
          <NewOrderGraph />
          <SaleGraph />
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
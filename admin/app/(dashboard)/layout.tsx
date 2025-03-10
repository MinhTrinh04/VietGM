'use client';

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Chỉ check session lần đầu load
    if (status !== 'loading') {
      setIsLoading(false);
    }
  }, [status]);

  // Show loading khi đang check session
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Development mode: bỏ qua check role
  return <>{children}</>;
}
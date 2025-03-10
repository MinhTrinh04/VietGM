// import {
//   CategoryMenu,
//   Hero,
//   Incentives,
//   IntroducingSection,
//   Newsletter,
//   ProductsSection,
// } from "@/components/singitronic";

// export default function Home() {
//   return (
//     <>
//       <Hero />
//       <IntroducingSection />
//       <CategoryMenu />
//       <ProductsSection />
//     </>
//   );
// }

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (isAuthenticated) {
      router.push('/admin');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}

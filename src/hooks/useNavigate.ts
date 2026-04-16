"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useNavigate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToPage = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, value.toString());
    
    router.push(`/meals?${params.toString()}`, { scroll: false });

    window.scrollTo({
      top: 700,
      behavior: "smooth",
    });
  };

  return { navigateToPage };
};
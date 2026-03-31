"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";


interface PaginationProps {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  }
}

export function PaginationControls({meta}: PaginationProps = {meta:{total: 0, page: 1, limit: 10, totalPage: 1}}) {
  const { total, page, limit, totalPage } = meta;
  const queryString = useSearchParams();
  const router = useRouter()

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(queryString.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });

    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  }

  let startPage = Math.max(1, page - 1);
  let endPage = Math.min(totalPage, startPage + 2);

  if (endPage - startPage < 2 && totalPage > 2) {
    startPage = Math.max(1, endPage - 2);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination className="mt-10">
      <PaginationContent className="bg-fh-cream-dark rounded-md p-1.5">
        <PaginationItem>
          <Button
            onClick={() => navigateToPage(page - 1)}
            variant="ghost"
            disabled={page === 1}
            className="hover:bg-fh-green-light hover:text-fh-green-mid cursor-pointer"
          >
            <ChevronLeft /> Previous
          </Button>
        </PaginationItem>

        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <Button
              variant="ghost"
              onClick={() => navigateToPage(pageNumber)}
              className={`hover:bg-fh-green-light hover:text-fh-green-mid bg-fh-cream-mid ${
                pageNumber === page ? "bg-fh-green-light text-fh-green-mid" : ""
              } cursor-pointer`}
            >
              {pageNumber}
            </Button>
          </PaginationItem>
        ))}

        {endPage < totalPage && (
          <>
            {endPage < totalPage - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <Button
                variant="ghost"
                onClick={() => navigateToPage(totalPage)}
                className="hover:bg-fh-green-light hover:text-fh-green-mid bg-fh-cream-mid cursor-pointer"
              >
                {totalPage}
              </Button>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <Button
            onClick={() => navigateToPage(page + 1)}
            disabled={page === totalPage}
            variant="ghost"
            className="hover:bg-fh-green-light hover:text-fh-green-mid cursor-pointer"
          >
            Next <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

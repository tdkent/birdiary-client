"use client";

// Paginate a list of items using shadcn Pagination components
// Pagination items are conditionally rendered based on the
// current page and the number of pages remaining.
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { MOBILE_PAGINATION_PAGES } from "@/constants/constants";

type PaginateListProps = {
  currentPage: number;
  finalPage: number;
  startsWith: string | undefined;
  sortBy: string | undefined;
};

export default function PaginateList({
  currentPage,
  finalPage,
  startsWith,
  sortBy,
}: PaginateListProps) {
  const pathname = usePathname();
  const updateUrl = (page: number) => {
    const startsWithQuery = startsWith ? `&startsWith=${startsWith}` : "";
    const sortByQuery = sortBy ? `&sortBy=${sortBy}` : "";
    return `${pathname}?page=${page}${startsWithQuery}${sortByQuery}`;
  };

  // TODO: change number of buttons based on screen size

  // Remaining length of list
  const remainingPages = finalPage - currentPage + 1;
  // If total pages OR total remaining pages <= 5
  if (finalPage <= MOBILE_PAGINATION_PAGES || remainingPages <= 5) {
    const rowLength =
      finalPage < MOBILE_PAGINATION_PAGES ? finalPage : MOBILE_PAGINATION_PAGES;
    // Map remaining pages to array
    // Base off `finalPage` instead of `currentPage` to avoid deviation
    const pages: number[] = [];
    for (let i = rowLength; i > 0; i--) {
      const page = finalPage - i + 1;
      pages.push(page);
    }
    return (
      <>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href={updateUrl(currentPage - 1)}
                inert={currentPage === 1}
                scroll={false}
                className={`${currentPage === 1 && "opacity-50"}`}
              >
                <ChevronLeft />
              </PaginationLink>
            </PaginationItem>
            {pages.map((item) => {
              return (
                <PaginationItem key={item}>
                  <PaginationLink
                    href={updateUrl(item)}
                    isActive={currentPage === item}
                    inert={currentPage === item}
                    scroll={false}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationLink
                href={updateUrl(currentPage + 1)}
                inert={currentPage === finalPage}
                className={`${currentPage === finalPage && "opacity-50"}`}
                scroll={false}
              >
                <ChevronRight />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </>
    );
  }

  // Create array of clickable page buttons
  // Number of buttons should be total clickable - 2 (ellipse and final page)
  const pages = [];
  for (let i = 0; i < MOBILE_PAGINATION_PAGES - 2; i++) {
    const page = currentPage + i;
    pages.push(page);
  }

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href={updateUrl(currentPage - 1)}
              inert={currentPage === 1}
              scroll={false}
              className={`${currentPage === 1 && "opacity-50"}`}
            >
              <ChevronLeft />
            </PaginationLink>
          </PaginationItem>
          {pages.map((item) => {
            return (
              <PaginationItem key={item}>
                <PaginationLink
                  href={updateUrl(item)}
                  isActive={currentPage === item}
                  inert={currentPage === item}
                  scroll={false}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={updateUrl(finalPage)}>
              {finalPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={updateUrl(currentPage + 1)} scroll={false}>
              <ChevronRight />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

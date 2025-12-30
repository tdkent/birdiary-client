"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

type PaginateListProps = {
  currentPage: number;
  finalPage: number;
  search?: string;
  startsWith?: string;
  sortBy: string | undefined;
};

/** Paginate a list of items based on current page and number of pages remaining */
export default function PaginateList({
  currentPage,
  finalPage,
  search,
  startsWith,
  sortBy,
}: PaginateListProps) {
  const pathname = usePathname();
  const updateUrl = (page: number) => {
    const searchQuery = search ? `&search=${search}` : "";
    const startsWithQuery = startsWith ? `&startsWith=${startsWith}` : "";
    const sortByQuery = sortBy ? `&sortBy=${sortBy}` : "";
    return `${pathname}?page=${page}${searchQuery}${startsWithQuery}${sortByQuery}`;
  };

  const MAX_PAGES_TO_DISPLAY = 5;
  const remainingPages = finalPage - currentPage + 1;

  // If total pages OR total remaining pages <= 5, map remaining pages to array
  // Base off `finalPage` instead of `currentPage` to avoid deviation
  if (finalPage <= MAX_PAGES_TO_DISPLAY || remainingPages <= 5) {
    const rowLength =
      finalPage < MAX_PAGES_TO_DISPLAY ? finalPage : MAX_PAGES_TO_DISPLAY;
    const pages: number[] = [];
    for (let i = rowLength; i > 0; i--) {
      const page = finalPage - i + 1;
      pages.push(page);
    }
    return (
      <>
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href={updateUrl(currentPage - 1)}
                scroll={false}
                className={`${(currentPage <= 1 || currentPage - 1 > finalPage) && "pointer-events-none opacity-50"}`}
                aria-disabled={currentPage <= 1 || currentPage - 1 > finalPage}
                tabIndex={
                  currentPage <= 1 || currentPage - 1 > finalPage
                    ? -1
                    : undefined
                }
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
                    className="md:text-xl"
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationLink
                href={updateUrl(currentPage + 1)}
                className={`${currentPage >= finalPage && "pointer-events-none opacity-50"}`}
                scroll={false}
                aria-disabled={currentPage >= finalPage}
                tabIndex={currentPage >= finalPage ? -1 : undefined}
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
  for (let i = 0; i < MAX_PAGES_TO_DISPLAY - 2; i++) {
    const page = currentPage + i;
    pages.push(page);
  }

  return (
    <>
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href={updateUrl(currentPage - 1)}
              scroll={false}
              className={`${currentPage <= 1 && "pointer-events-none opacity-50"}`}
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : undefined}
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
                  className="md:text-xl"
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
            <PaginationLink href={updateUrl(finalPage)} className="md:text-xl">
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

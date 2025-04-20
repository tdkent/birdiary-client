"use client";

// Paginate a list of items using shadcn Pagination components
// Pagination items are conditionally rendered based on the
// current page and the number of pages remaining.

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

// Props:
// `currentPage`: the current page
// `pages`: number of pages to render in the current list
type PaginateListProps = {
  currentPage: number;
  pages: number;
  startsWith: string | undefined;
};

export default function PaginateList({
  currentPage,
  pages,
  startsWith,
}: PaginateListProps) {
  const updateUrl = (page: number) => {
    return `/birds?page=${page}${startsWith ? `&startsWith=${startsWith}` : ""}`;
  };
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
          <PaginationItem>
            <PaginationLink href="#" isActive inert>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={updateUrl(currentPage + 1)} scroll={false}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={updateUrl(currentPage + 2)} scroll={false}>
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={updateUrl(pages)}>{pages}</PaginationLink>
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

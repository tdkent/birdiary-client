// Paginate a list of items using shadcn Pagination components
// Pagination items are conditionally rendered based on the
// current page and the number of pages remaining.

import type { Dispatch, SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Props:
// `currentPage`: the current page
// `pages`: number of pages to render in the current list
type PaginateListProps = {
  currentPage: number;
  pages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export default function PaginateList({
  currentPage,
  pages,
  setCurrentPage,
}: PaginateListProps) {
  return (
    <>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              />
            </PaginationItem>
          )}
          <PaginationItem>{currentPage}</PaginationItem>
          {currentPage !== pages && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}

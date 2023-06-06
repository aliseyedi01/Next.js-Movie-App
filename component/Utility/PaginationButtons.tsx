import React from "react";
import Pagination from "@mui/material/Pagination";

export default function PaginationButtons({ handlePageChange }) {
  return (
    <div className="grid place-content-center  pb-6 pt-2 dark:bg-indigo-950 ">
      <Pagination
        count={10}
        shape="rounded"
        onChange={handlePageChange}
        className="rounded-md dark:bg-sky-300 "
      />
    </div>
  );
}

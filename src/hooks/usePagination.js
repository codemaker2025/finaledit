import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import axiosInstance from "../api/axiosInstance";

const fetcher = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

const usePagination = (url, pageSize) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Math.max(parseInt(searchParams.get("page")) || 1, 1);
  const [page, setPage] = useState(initialPage);

  const { data: apiData, error, isLoading } = useSWR(
    `${url}?length=${pageSize}&page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const totalRecords = apiData?.data?.rows?.total || 50;
  const totalPages = Math.ceil(totalRecords / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      setSearchParams({ page: newPage.toString() });
    }
  };

  return {
    apiData,
    error,
    isLoading,
    page,
    totalPages,
    handlePageChange,
  };
};

export default usePagination;

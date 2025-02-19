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

  const { data: apiData, error, isLoading, mutate } = useSWR(
    `${url}?length=${pageSize}&page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
      onErrorRetry: (err, key, config, revalidate, { retryCount }) => {
        // Only retry if there are less than 3 attempts
        if (retryCount >= 3) return;

        // If the error is a network error or a server error, retry the request
        if (err.status >= 500 || err.code === 'ERR_NETWORK') {
          setTimeout(() => revalidate({ retryCount }), 5000); // Retry after 5 seconds
        }
      },
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
    mutate, // You can also use mutate to trigger manual revalidation
  };
};

export default usePagination;

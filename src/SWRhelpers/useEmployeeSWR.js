import useSWR from "swr"
import axiosInstance from "../api/axiosInstance"

const fetcher = async ([url, id]) => {
  const response = await axiosInstance.get(`${url}?id=${id}`)
  return response.data
}

export default function useEmployee(id) {
  const { data, error, mutate } = useSWR(id ? ["/api/v1/employee/show", id] : null, fetcher)

  return {
    employee: data?.data,
    isLoading: !data && !error,
    isError: error,
    mutate
  }
}

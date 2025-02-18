import  { useMemo } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import EntirepageLoad from "../Loading/EntirepageLoad";
import usePagination from "../../hooks/usePagination";
import TableHeader from "../Table/TableHeader.jsx";
import TableBody from "../Table/TableBody.jsx";
import Pagination from "../Table/Pagination.jsx";


export default function Dashboard() {
  const pageSize = 10;
  
  const {
    apiData,
    isLoading,
    page,
    totalPages,
    handlePageChange,
  } = usePagination("/api/v1/employee", pageSize);

  const columns = useMemo(
    () => [
      {
        accessorKey: "employee_code",
        header: "Employee Id",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone",
        header: "Mobile",
      },
      {
        accessorKey: "designation.title",
        header: "Designation",
        cell: ({ row }) => row.original.designation.title,
      },
      {
        accessorKey: "designation_id",
        header: "Designation ID",
      },
      {
        accessorKey: "view_details",
        header: "View Details",
        cell: ({ row }) => (
          <Link to={`/employees/${row.original.id}`} className="text-blue-600">
            View Details
          </Link>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: apiData?.data?.rows?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // if (isLoading ) return <EntirepageLoad />;

  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300">
        <TableHeader headerGroups={table.getHeaderGroups()} />
        <TableBody rows={table.getRowModel().rows} />
      </table>

      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

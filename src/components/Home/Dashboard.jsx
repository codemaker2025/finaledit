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

  const tableData = apiData?.data?.rows?.data || [];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 position-relative">
      {/* Show the loading overlay without removing content */}
      {isLoading && <EntirepageLoad />}
      
      {/* Always render the table (it will show last known data while loading) */}
      <div className={isLoading ? 'opacity-50' : ''}>
        <table className="w-full border-collapse border border-gray-300">
          <TableHeader headerGroups={table.getHeaderGroups()} />
          {tableData.length > 0 ? (
            <TableBody rows={table.getRowModel().rows} />
          ) : (
            <tbody>
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  {isLoading ? 'Loading data...' : 'No data available'}
                </td>
              </tr>
            </tbody>
          )}
        </table>

        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
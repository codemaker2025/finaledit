import { flexRender } from "@tanstack/react-table";

export default function TableHeader({ headerGroups }) {
  return (
    <thead className="bg-gray-100">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className="border p-2">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

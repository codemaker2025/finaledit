import { flexRender } from "@tanstack/react-table";

export default function TableBody({ rows }) {
  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.id} className="border-b">
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="border p-2">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import TableSkeleton from "../../pages/Order/TableSkeleton";

interface Column {
  label: string;
  value: string;
}

interface DataItem {
  _id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface ManageTableProps {
  data: DataItem[];
  loading: boolean;
  columns: Column[];
  isvalue: string;
  onDelete: (id: string) => void;
}

const ManageTable: React.FC<ManageTableProps> = ({
  data,
  loading,
  columns,
  onDelete,
  isvalue,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Filtered data based on search
  const filteredData = data?.filter((item) =>
    columns.some((column) =>
      column.value
        .split(".")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((o: any, k: string) => (o?.[k] ? o[k] : ""), item)
        ?.toString()
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="bg-white border rounded-md p-4">
      {/* Search Input */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-md w-1/3"
        />
        <p className="text-gray-600 font-semibold">
          Total Data: {filteredData?.length}
        </p>
      </div>

      {filteredData?.length > 0 ? (
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              {columns?.map((column, idx) => (
                <TableHead key={idx} className="text-black">
                  {column.label}
                </TableHead>
              ))}
              {isvalue == "userOrder" && (
                <TableHead className="text-black">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-500">
            {paginatedData?.map((item, index) => (
              <TableRow key={index}>
                {columns?.map((column, idx) => (
                  <TableCell key={idx}>
                    {column.value
                      .split(".")

                      .reduce(
                        (o: any, k: string) => (o?.[k] ? o[k] : ""),
                        item
                      )}
                  </TableCell>
                ))}
                <TableCell className="flex gap-2">
                  {isvalue == "product" && (
                    <Link to={`/dashboard/updateProduct/${item._id}`}>
                      <button className="px-2 py-1 cursor-pointer text-blue-500 transition border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white">
                        Update
                      </button>
                    </Link>
                  )}
                  {isvalue == "user" && (
                    <button
                      onClick={() => UpdateRole(item._id)}
                      className="px-2 py-1 cursor-pointer text-blue-500 transition border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white"
                    >
                      {"Update Role"}
                    </button>
                  )}
                  {isvalue == "userOrder" && (
                    <button
                      onClick={() => onDelete(item._id)}
                      className="px-2 cursor-pointer py-1 text-red-500 transition border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center p-4">No Data Available</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageTable;

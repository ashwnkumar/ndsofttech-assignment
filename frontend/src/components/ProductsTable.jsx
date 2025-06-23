import React from "react";
import Button from "./form/Button";
import { Pencil, Trash2 } from "lucide-react";
import { formatText } from "../utils/formatText";

const ProductsTable = ({
  products,
  columns,
  openEditModal,
  setDeleteModal,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[600px] w-full border-collapse">
        <thead>
          <tr className="bg-brand text-white text-left ">
            {columns.map((col) => (
              <th key={col.key} className="py-2 px-4 border-b border-gray">
                {col.header}
              </th>
            ))}
            <th className="py-2 px-4 border-b border-gray">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-hover cursor-pointer ">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 whitespace-nowrap">
                  {col.key === "category"
                    ? formatText(product[col.key])
                    : product[col.key]}
                </td>
              ))}
              <td className="py-3 px-4 flex gap-2 whitespace-nowrap">
                <Button
                  label="Edit"
                  icon={Pencil}
                  className="bg-warning hover:bg-warning-hover text-xs sm:text-sm"
                  onClick={() => openEditModal(product._id)}
                />
                <Button
                  label="Delete"
                  icon={Trash2}
                  variant="danger"
                  className="text-xs sm:text-sm"
                  onClick={() => setDeleteModal(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;

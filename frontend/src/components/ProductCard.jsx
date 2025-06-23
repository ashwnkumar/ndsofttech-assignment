import React from "react";
import Button from "./form/Button";
import { Pencil, Trash2 } from "lucide-react";

const ProductCard = ({ product, handleEdit, handleDelete }) => {
  const { name, price, quantity } = product;
  return (
    <div className="w-full flex items-center justify-between hover:bg-hover px-4 py-3 rounded-lg">
      <div className="flex flex-col items-start justify-center ">
        <h3 className="font-semibold text-xl">{name}</h3>
        <div className="flex flex-row items-center justify-center font-normal gap-2 text-secondary">
          <p className=""> Price: {price}</p> |
          <p className=""> Quantity: {quantity}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <Button label={"Edit"} icon={Pencil} className="bg-warning hover:bg-warning-hover" onClick={() => handleEdit(product._id)} />
        <Button label={"Delete"} icon={Trash2} variant="danger" onClick={() => handleDelete(product._id)} />
      </div>
    </div>
  );
};

export default ProductCard;

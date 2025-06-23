import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { ArchiveX, Plus } from "lucide-react";
import ModalComponent from "../components/ModalComponent";
import DynamicForm from "../components/form/DynamicForm";
import toast from "react-hot-toast";
import { useGlobal } from "../contexts/GlobalContext";
import Button from "../components/form/Button";
import axiosInstance from "../utils/axiosInstance";
import { apiConfig } from "../configs/apiConfig";
import ProductCard from "../components/ProductCard";

const categoryOptions = [
  { value: "shirt", option: "Shirt" },
  { value: "pants", option: "Pants" },
  { value: "shoes", option: "Shoes" },
  { value: "other", option: "Other" },
];

const Dashboard = () => {
  const { products, setProducts } = useGlobal();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quantity: 0,
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const validateForm = () => {
    let err = {};

    if (!formData.name) err.name = "Name is Required";
    if (!formData.price) err.price = "Price is Required";
    if (!formData.quantity) err.quantity = "Quantity is Required";
    if (!formData.category) err.category = "Category is Required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) {
      return toast.error("Please fill all the required fields");
    }

    try {
      const res = await axiosInstance.post(apiConfig.product.add, formData);
      console.log("res from add product", res);
      toast.success(res.data.message || "Product added successfully");
      handleClose();
    } catch (error) {
      console.log("Error adding product:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleClose = () => {
    setFormData({
      name: "",
      price: 0,
      quantity: 0,
      category: "",
    });
    setErrors({});
    setModalOpen(false);
  };

  const handleDropdownChange = (item) => {
    setFormData({
      ...formData,
      category: item.value,
    });
  };

  const handleEdit = (id) => {
    console.log("edit triggered for ", id);
  };
  
  const handleDelete = (id) => {
    console.log("delete triggered for ", id);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axiosInstance.get(apiConfig.product.get);
        console.log("res from get product", res);
        const { products } = res.data.data;
        setProducts(products);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const formOptions = [
    {
      fields: [
        {
          formType: "input",
          label: "Name",
          name: "name",
          type: "text",
          required: true,
          value: formData.name,
          onChange: handleInputChange,
          error: errors.name,
        },
        {
          formType: "dropdown",
          label: "Category",
          name: "category",
          placeholder: "Select a Category",
          options: categoryOptions,
          required: true,
          value: formData.category,
          onChange: (item) => handleDropdownChange(item),
          error: errors.category,
        },
        {
          formType: "input",
          label: "Price",
          name: "price",
          type: "number",
          required: true,
          value: formData.price,
          onChange: handleInputChange,
          error: errors.price,
        },
        {
          formType: "input",
          label: "Quantity",
          name: "quantity",
          type: "number",
          required: true,
          value: formData.quantity,
          onChange: handleInputChange,
          error: errors.quantity,
        },
      ],
    },
  ];

  const modalButtons = [
    {
      label: "Cancel",
      variant: "outline",
      onClick: handleClose,
    },
    {
      label: "Add Product",
      onClick: () => handleAddProduct(),
    },
  ];

  const headerButtons = [
    {
      label: "Add Product",
      icon: Plus,
      onClick: () => setModalOpen(true),
    },
  ];
  return (
    <div className="w-full space-y-2">
      <ModalComponent
        title="Add Product"
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        buttons={modalButtons}
        onClose={handleClose}
      >
        <div className="">
          <DynamicForm options={formOptions} />
        </div>
      </ModalComponent>
      <PageHeader
        title="Inventory"
        desc={"Welcome to your Inventory"}
        buttons={headerButtons}
      />
      {products?.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 ">
          {products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <div className="h-[70vh] flex flex-col items-center justify-center gap-3 text-center">
          <div className="bg-brand-faded rounded-full p-4 text-brand">
            <ArchiveX size={50} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-primary">
              No products found
            </h1>
            <p className="text-secondary text-lg">
              You haven't added any products to the inventory yet
            </p>
          </div>
          <Button label="Add Product" onClick={() => setModalOpen(true)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

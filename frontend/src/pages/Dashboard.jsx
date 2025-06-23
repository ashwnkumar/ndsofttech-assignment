import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { ArchiveX, Plus } from "lucide-react";
import ModalComponent from "../components/ModalComponent";
import DynamicForm from "../components/form/DynamicForm";
import toast from "react-hot-toast";
import { useGlobal } from "../contexts/GlobalContext";
import Button from "../components/form/Button";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../contexts/ProductContext";

const categoryOptions = [
  { value: "shirt", option: "Shirt" },
  { value: "pants", option: "Pants" },
  { value: "shoes", option: "Shoes" },
  { value: "other", option: "Other" },
];

const Dashboard = () => {
  const { setLoading } = useGlobal();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
  } = useProducts();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quantity: 0,
    category: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const err = {};
    if (!formData.name) err.name = "Name is required";
    if (!formData.price) err.price = "Price is required";
    if (!formData.quantity) err.quantity = "Quantity is required";
    if (!formData.category) err.category = "Category is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      quantity: 0,
      category: "",
    });
    setErrors({});
    setIsEditing(false);
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = async (id) => {
    setIsEditing(true);
    setEditingId(id);
    const data = await getProductDetails(id);
    if (data) {
      setFormData({
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        category: data.category,
      });
      setModalOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDropdownChange = (item) => {
    setFormData((prev) => ({ ...prev, category: item.value }));
  };

  const handleSubmit = async () => {
    if (!validateForm())
      return toast.error("Please fill all the required fields");

    if (isEditing) {
      await updateProduct(editingId, formData).then(() => setModalOpen(false));
    } else {
      await addProduct(formData);
    }

    handleClose();
  };

  const handleClose = () => {
    resetForm();
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setDeleteModal(null);
  };

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
          onChange: handleDropdownChange,
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
    { label: "Cancel", variant: "outline", onClick: handleClose },
    {
      label: isEditing ? "Update Product Details" : "Add Product",
      onClick: handleSubmit,
    },
  ];

  return (
    <div className="w-full space-y-2">
      <ModalComponent
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        buttons={[
          {
            label: "Cancel",
            variant: "outline",
            onClick: () => setDeleteModal(null),
          },
          {
            label: "Delete",
            variant: "danger",
            onClick: () => handleDelete(deleteModal),
          },
        ]}
      />

      <ModalComponent
        title={isEditing ? "Edit Product" : "Add Product"}
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        buttons={modalButtons}
        onClose={handleClose}
      >
        <DynamicForm options={formOptions} />
      </ModalComponent>

      <PageHeader
        title="Inventory"
        desc="Welcome to your Inventory"
        buttons={[{ label: "Add Product", icon: Plus, onClick: openAddModal }]}
      />

      {products?.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-2">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              handleDelete={() => setDeleteModal(product._id)}
              handleEdit={() => openEditModal(product._id)}
            />
          ))}
        </div>
      ) : (
        <div className="h-[70vh] flex flex-col items-center justify-center gap-3 text-center">
          <div className="bg-brand-faded rounded-full p-4 text-brand">
            <ArchiveX size={50} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-medium text-primary">
            No products found
          </h1>
          <p className="text-secondary text-lg">
            You haven't added any products to the inventory yet
          </p>
          <Button label="Add Product" onClick={openAddModal} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

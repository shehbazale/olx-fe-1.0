// EditModal.tsx
import React, { useEffect, useState } from "react";
import { UpdateProduct } from "../utils/editproducts";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onUpdate: (updatedProduct: Product) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  product,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form data", formData);
    if (formData) {
      try {
        const updatedData = await UpdateProduct(formData._id, formData);
        console.log("upated data product", updatedData);
        onUpdate(updatedData.data);
        onClose();
        console.log("edit successfully");
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-[40%] mx-auto">
        <h2 className="text-lg font-bold">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData?.title || ""}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData?.description || ""}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm">
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              value={formData?.price || ""}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;

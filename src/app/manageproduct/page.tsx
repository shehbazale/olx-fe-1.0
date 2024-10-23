"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditModal from "../components/editModel";
import { productDelete } from "../utils/deleteproduct";
import DeleteModel from "../components/deleteModel";
import toast, { Toaster } from "react-hot-toast";
interface Product {
  _id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

const ManageProduct = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [deleteProductId, setDeletedProductId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3001/products");
      const response = await res.json();
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (item: Product) => {
    setCurrentProduct(item);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    console.log("updated data a gia", updatedProduct);
    if (!updatedProduct || !updatedProduct._id) {
      console.error("Invalid product data");
      return;
    }

    setProduct((prev) =>
      prev.map((item) =>
        item._id === updatedProduct._id ? updatedProduct : item
      )
    );
    setIsModalOpen(false);
  };

  // deleted function to delete the product
  const deleteProduct = (id: string) => {
    setDeletedProductId(id);
    setOpenDeleteModal(true);
  };
  const handleDeleteProduct = async () => {
    if (!deleteProductId) return;
    try {
      await productDelete(deleteProductId);
      setProduct((prev) => prev.filter((item) => item._id !== deleteProductId));
      setOpenDeleteModal(false);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete the product");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full h-[calc(100vh-80px)] relative top-[80px] bg-slate-100 pt-24">
        <h1 className="text-center text-3xl font-bold"> Manage Product</h1>
        <div className="w-[80%] mx-auto mt-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.map((item) => (
                  <tr
                    key={item._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.title}
                    </th>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={60}
                        height={60}
                      />
                    </td>
                    <td className="px-6 py-4 space-x-4">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(item._id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={currentProduct}
        onUpdate={handleUpdateProduct}
      />
      {/* Delete Modal */}
      <DeleteModel
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteProduct}
      />
    </>
  );
};

export default ManageProduct;

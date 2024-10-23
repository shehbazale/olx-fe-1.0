"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import uploadFile from "../config/firebase";
import { publishAdd } from "../utils/ads";

const ManageProduct = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loader state

  const publishAds = async () => {
    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadFile(imageFile);
      }

      const product = { title, description, price, imageUrl };
      const data = await publishAdd(product);

      setLoading(false);
      if (data) {
        toast.success("Ad published successfully!");
        setTitle("");
        setDescription("");
        setPrice("");
      } else {
        toast.error("Failed to publsihed Ad. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
      console.error("Error Publishig Ad:", error);
    }
  };

  return (
    <div className="w-full absolute top-20 pt-8  bg-gray-300 min-h-[calc(100vh-64px)]">
      <div className="w-96 mx-auto rounded-md shadow-xl shadow-current bg-white">
        <div className="flex flex-col gap-2 p-8">
          <p className="text-center text-3xl text-gray-700 mb-4">
            Advertisement
          </p>

          {/* Product Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full text-black rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Title"
          />

          {/* Product Description */}
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-black rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Description"
          />

          {/* Product Price */}
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="w-full text-black rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Price"
          />
          <input
            type="file"
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            }
          />
          {/* Add Product Button */}
          <button
            onClick={publishAds}
            className="inline-block w-fit mx-auto mt-4 cursor-pointer rounded-md bg-blue-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:scale-95"
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ManageProduct;

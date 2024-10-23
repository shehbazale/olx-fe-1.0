"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface Product {
  _id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

export default function ProductDetailPage() {
  const pathname = usePathname(); // Get the current pathname
  const [product, setProduct] = useState<Product | null>(null);

  // Extract the product ID from the pathname
  const productId = pathname?.split("/").pop(); // Get the last part of the pathname

  const fetchData = async (productId: string) => {
    try {
      const res = await fetch(`http://localhost:3001/ads/${productId}`);
      const response = await res.json();
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchData(productId);
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <div className="w-[40%] mx-auto p-3 shadow-xl border rounded-md border-opacity-40 flex flex-col items-center">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="relative w-[300px] h-[300px]">
          <Image
            alt={product.title}
            src={product.imageUrl}
            fill
            style={{ objectFit: "contain" }} // Set object fit
            className="rounded-lg"
          />
        </div>
        <span className="font-bold text-red-600">Rs.{product.price}</span>
        <p>{product.description}</p>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
        >
          <svg
            className="w-3.5 h-3.5 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 21"
          >
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          Buy now
        </button>
      </div>
    </div>
  );
}

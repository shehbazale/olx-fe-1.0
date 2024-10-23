"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Hero from "./components/hero";
import { addToCart } from "./store/cartslice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { MdAddShoppingCart } from "react-icons/md";
import Footer from "./components/footer";
import AdPage from "./components/ads";
interface Product {
  _id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

export default function Home() {
  const [product, setProduct] = useState<Product[]>([]);

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3001/products");
      const response = await res.json();
      setProduct(response.data);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function addTocart(selectedProduct: Product) {
    const cartItem = {
      _id: selectedProduct._id,
      title: selectedProduct.title,
      image: selectedProduct.imageUrl,
      price: parseFloat(selectedProduct.price),
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    toast.success("Product successfully added to cart");
    console.log("click");
  }

  return (
    <>
      <Toaster />
      <Hero />
      <AdPage />
      <div className="w-full h-screen  absolute top-[950px] bg-slate-100 p-10 z-0">
        <h1 className="text-3xl text-black text-center font-bold text-pretty">
          {" "}
          Featured Products
        </h1>

        <div className="flex  justify-center gap-6 mt-12">
          {product.map((ele) => (
            <div
              className="w-64  h-80 bg-white border shadow-inner p-3 flex flex-col gap-1"
              key={ele._id}
            >
              <div className="relative w-48 h-48  mx-auto flex justify-center items-center  ">
                <Image
                  alt="image"
                  src={ele.imageUrl}
                  // width={100}
                  // height={100}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                ></Image>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between mt-2">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold"> {ele?.title}</span>
                    <p className="text-xs text-gray-700">{ele.description}</p>
                  </div>
                  <span className="font-bold  text-red-600">
                    Rs.{ele.price}
                  </span>
                </div>
                {/* <button
                  onClick={() => addTocart(ele)}
                  className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2"
                >
                  Add to cart
                </button> */}

                <button
                  onClick={() => addTocart(ele)}
                  className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-sky-700 p-4 px-6 py-3 font-medium text-indigo-600 shadow-md transition duration-300 ease-out hover:border-4 hover:border-double"
                >
                  <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-sky-700 text-white duration-300 group-hover:translate-x-0">
                    {/* <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg> */}
                    <MdAddShoppingCart size={25} />
                  </span>
                  <span className="ease absolute flex h-full w-full transform items-center justify-center text-black transition-all duration-300 group-hover:translate-x-full">
                    Add to Cart
                  </span>
                  <span className="invisible relative"> Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

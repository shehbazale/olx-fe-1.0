"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import FlashSaleTimer from "./flashsale";

interface Product {
  _id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

export default function AdPage() {
  const [product, setProduct] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3001/ads");
      const response = await res.json();
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Slick settings for horizontal row
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };

  return (
    <div className="w-full h-screen absolute top-[450px] bg-slate-100 p-10 z-0">
      {/* <h1 className="text-3xl text-black text-center font-bold">Flash Sales</h1> */}
      <div className="w-[90%] mx-auto">
        <div className="flex justify-end">
          <FlashSaleTimer />
        </div>
        <Slider {...settings} className="w-full">
          {product.map((ele) => (
            <div
              className="w-full mt-6 mx-auto flex gap-8 justify-center items-center  bg-white border shadow-inner p-3"
              key={ele._id}
            >
              {/* Flex container to display items in the same row */}
              <div className="flex flex-row items-center w-full gap-4">
                {/* Image Section */}
                <div className="relative w-[200px] h-[200px] flex-shrink-0">
                  <Image
                    alt="image"
                    src={ele.imageUrl}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-xl"
                  />
                </div>

                {/* Text Section */}
                <div className="flex flex-col justify-between w-full">
                  <span className="text-xl font-bold">{ele?.title}</span>
                  <p className="text-sm text-gray-700">{ele.description}</p>

                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-red-600">
                      Rs.{ele.price}
                    </span>
                    <Link href={`/ad/${ele._id}`}>
                      <button
                        type="button"
                        className="text-white mr-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

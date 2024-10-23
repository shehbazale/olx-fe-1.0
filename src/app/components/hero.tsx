import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";

const Hero = () => {
  const mobile = [
    {
      id: 1,
      src: "/image/iphone.png",
    },
    {
      id: 2,
      src: "/image/laptop.png",
    },
    {
      id: 3,
      src: "/image/blue-watch.png",
    },
  ];
  const [selectedImage, setSelectedImage] = useState(mobile[0].src);
  const [isChanging, setIsChanging] = useState(false);

  // Handle image change with a transition
  const handleImageChange = (newImage: string) => {
    setIsChanging(true);
    setTimeout(() => {
      setSelectedImage(newImage);
      setIsChanging(false);
    }, 300); // Duration of the fade-out effect
  };

  return (
    <>
      <div className="w-full h-[450px] pt-28 bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 fixed top-0 left-0 -z-50">
        <div className="h-[400px] w-[400px] contrast-100 hover:bg-blue-800 bg-primary/40 bg-blue-900 absolute -top-28 right-4 rounded-3xl rotate-45 -z-9"></div>
        <div className="w-[90%] mx-auto h-96 flex flex-col md:flex-row justify-evenly items-center">
          <div className="w-1/2">
            <h1>
              North Store is your one-stop shop for high-quality products that
              combine style and functionality. From fashion to home essentials,
              we offer a curated selection of items to elevate your everyday
              living. Discover the latest trends and timeless classics, all
              available at competitive prices. Shop with us and experience
              exceptional customer service and fast, reliable delivery.
            </h1>
            <div className="flex gap-2 mt-5 items-center">
              {mobile.map((pro) => (
                <div
                  key={pro.id}
                  className="flex items-center relative h-28 w-28 cursor-pointer"
                  onClick={() => handleImageChange(pro.src)}
                >
                  <Image
                    alt="Mobile image"
                    src={pro.src}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Right side - display the selected image with transition */}
          <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
            <Image
              alt="Selected image"
              src={selectedImage}
              width={250}
              height={300}
              className={classNames("rounded-lg transition-all duration-300", {
                "opacity-0 scale-90": isChanging,
                "opacity-100 scale-100": !isChanging,
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

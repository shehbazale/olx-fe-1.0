"use client";
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const FlashSaleTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(606800);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isVisible && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isVisible, timeLeft]);

  const formatTimeLeft = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return { days, hours, minutes, secs };
  };

  if (!isVisible) return null;

  const { days, hours, minutes, secs } = formatTimeLeft(timeLeft);

  return (
    <div className="relative w-fit  bg-gradient-to-r from-purple-400 to-pink-500  bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-gray-300 animate-pulse">
      <h2 className="text-2xl font-bold text-gray-800">Flash Sale Ends In</h2>
      <div className="flex justify-center space-x-4 mt-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800">
            {String(days).padStart(2, "0")}
          </div>
          <span className="text-sm text-gray-600">Days</span>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800">
            {String(hours).padStart(2, "0")}
          </div>
          <span className="text-sm text-gray-600">Hours</span>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800">
            {String(minutes).padStart(2, "0")}
          </div>
          <span className="text-sm text-gray-600">Minutes</span>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800">
            {String(secs).padStart(2, "0")}
          </div>
          <span className="text-sm text-gray-600">Seconds</span>
        </div>
      </div>

      <button
        onClick={handleClose}
        className="absolute top-2 right-1 text-black hover:text-gray-600 transition duration-300 rounded-lg px-3 py-1 "
      >
        <IoCloseSharp size={20} />
      </button>
    </div>
  );
};

export default FlashSaleTimer;

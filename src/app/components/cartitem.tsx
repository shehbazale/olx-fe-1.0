import React, { useState } from "react";
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../store/cartslice";
// import CheckoutModal from "./CheckoutModal"; // Assuming this is imported
import { RootState } from "../store/rootreducer";
import CheckoutModal from "./checkoutmodel";

const CartItem = () => {
  const cart = useSelector((state: RootState) => state.cartStore.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [animatedProductId, setAnimatedProductId] = useState<number | null>(
    null
  );

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    console.log("cart ID", id);
  };

  const quantityIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
    triggerAnimation(id);
  };

  const quantityDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
    triggerAnimation(id);
  };

  const triggerAnimation = (id: number) => {
    setAnimatedProductId(id);
    setTimeout(() => setAnimatedProductId(null), 200);
  };

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className="relative">
            <div className="overflow-y-auto h-[360px] mt-8">
              {cart.map((product) => (
                <div className="flex flex-col" key={product._id}>
                  <div className="flex items-center justify-between p-2 border-b border-gray-300 mt-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-contain rounded-md"
                    />
                    <div className="flex-1 ml-4">
                      <h4 className="text-lg font-semibold">{product.title}</h4>
                      <p className="text-sm font-semibold mt-1">
                        Rs {product.price * product.quantity}
                      </p>
                    </div>

                    <div className="flex items-end w-fit">
                      <div className="flex justify-center gap-1 border border-gray-300 rounded-full px-2 py-1">
                        {product.quantity > 1 ? (
                          <button
                            onClick={() => quantityDecrement(product._id)}
                            className="hover:opacity-90 transition-colors duration-300 items-end"
                          >
                            <FaMinus size={10} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRemove(product._id)}
                            className="hover:opacity-90 transition-colors duration-300 items-end"
                          >
                            <FaRegTrashAlt size={10} />
                          </button>
                        )}
                        <p
                          className={`mx-2 ${
                            animatedProductId === product._id
                              ? "animate-scaleUp"
                              : ""
                          }`}
                        >
                          {product.quantity}
                        </p>
                        <button
                          onClick={() => quantityIncrement(product._id)}
                          className="hover:opacity-90 transition-colors duration-300 items-end"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center p-4">
              <span className="text-lg font-semibold">Total Price:</span>
              <span className="text-lg font-semibold">
                Rs {totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-end p-4 absolute bottom-[-90px] left-0 right-0">
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-sm font-semibold hover:bg-green-600 transition-all duration-300 w-full"
                onClick={() => setIsModalOpen(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img src="/cart/empty-cart.png" alt="empty-cart" />
          <p className="text-center text-red-600 font-bold">No items in cart</p>
        </div>
      )}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CartItem;

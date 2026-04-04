import React from "react";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <div>
      <h2 className="text-2xl font-bold">User Shopping Cart</h2>
      <p className="bg-slate-100 shadow-md rounded-3xl text-slate-600 mt-2 p-4">
        Your shopping cart is currently empty. Start adding products to see them
      </p>
    </div>
  );
}

export default Cart;

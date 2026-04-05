import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../feature/cart/cartSlice";

// export const selectCartItems = (state) => state.cart.items;

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = useSelector((state) =>
    state.cart.items.reduce((sum, item) => {
      const discountedPrice =
        item.product.price * (1 - item.product.discountPercentage / 100);
      return sum + discountedPrice * item.quantity;
    }, 0),
  );

  const dispatch = useDispatch();

  console.log(cartItems.length);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Your Cart is Empty 🛒</h2>
        <p className="text-gray-500 mt-2">Start adding some products!</p>
        <Link
          to="/products"
          className="mt-4 inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Shopping Cart ({cartItems.length} items)
        </h2>
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-300 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => {
          const discountedPrice = (
            item.product.price *
            (1 - item.product.discountPercentage / 100)
          ).toFixed(2);

          const itemTotal = (discountedPrice * item.quantity).toFixed(2);

          return (
            <div
              key={item.product.id}
              className="flex items-center gap-4 border rounded-xl p-4 bg-white shadow"
            >
              <Link to={`/products/${item.product.id}`}>
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-24 h-24 object-contain rounded-lg border"
                />
              </Link>

              <div className="flex-1">
                <Link
                  to={`/products/${item.product.id}`}
                  className="text-lg font-semibold hover:text-green-600 transition"
                >
                  {item.product.title}
                </Link>
                <p className="text-sm text-gray-500">
                  {item.product.brand} • {item.product.category}
                </p>
                <p className="text-green-600 font-bold mt-1">
                  ${discountedPrice} each
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.product.id,
                        quantity: item.quantity - 1,
                      }),
                    )
                  }
                  className="w-8 h-8 rounded bg-slate-200 hover:bg-slate-300 text-lg font-bold transition"
                >
                  −
                </button>

                <span className="w-8 text-center font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.product.id,
                        quantity: item.quantity + 1,
                      }),
                    )
                  }
                  className="w-8 h-8 rounded bg-slate-200 hover:bg-slate-300 text-lg font-bold transition"
                >
                  +
                </button>
              </div>

              <p className="text-lg font-bold w-24 text-right">${itemTotal}</p>

              <button
                onClick={() => dispatch(removeFromCart(item.product.id))}
                className="text-red-500 hover:text-red-700 text-xl transition"
                title="Remove"
              >
                🗑️
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 border-t pt-6 flex items-center justify-between">
        <div>
          <p className="text-gray-500">Total</p>
          <p className="text-3xl font-bold text-green-600">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
        <button className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-600 transition">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;

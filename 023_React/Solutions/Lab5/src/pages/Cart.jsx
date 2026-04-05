import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../feature/cart/cartSlice";

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
      <div className="rounded-2xl border border-neutral-200 bg-white py-20 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-neutral-900">
          Your Cart is Empty 🛒
        </h2>
        <p className="mt-2 text-neutral-500">Start adding some products!</p>
        <Link
          to="/products"
          className="mt-4 inline-block rounded-lg bg-primary-600 px-6 py-3 text-white transition-all duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 active:bg-primary-800"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">
          Shopping Cart ({cartItems.length} items)
        </h2>
        <button
          onClick={() => dispatch(clearCart())}
          className="rounded-lg border border-neutral-300 bg-neutral-100 px-4 py-2 text-neutral-700 transition-all duration-200 hover:border-primary-300 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-200 active:bg-primary-100"
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
              className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4"
            >
              <Link to={`/products/${item.product.id}`}>
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="h-24 w-24 rounded-lg border border-neutral-200 object-contain"
                />
              </Link>

              <div className="flex-1">
                <Link
                  to={`/products/${item.product.id}`}
                  className="text-lg font-semibold text-neutral-900 transition-colors duration-200 hover:text-primary-600"
                >
                  {item.product.title}
                </Link>
                <p className="text-sm text-neutral-500">
                  {item.product.brand} • {item.product.category}
                </p>
                <p className="mt-1 font-bold text-secondary-700">
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
                  className="h-8 w-8 rounded bg-neutral-200 text-lg font-bold text-neutral-700 transition-all duration-200 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-200 active:bg-primary-200"
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
                  className="h-8 w-8 rounded bg-neutral-200 text-lg font-bold text-neutral-700 transition-all duration-200 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-200 active:bg-primary-200"
                >
                  +
                </button>
              </div>

              <p className="text-lg font-bold w-24 text-right">${itemTotal}</p>

              <button
                onClick={() => dispatch(removeFromCart(item.product.id))}
                className="text-xl text-neutral-500 transition-colors duration-200 hover:text-primary-700"
                title="Remove"
              >
                🗑️
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-6">
        <div>
          <p className="text-neutral-500">Total</p>
          <p className="text-3xl font-bold text-secondary-700">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
        <button className="rounded-lg bg-secondary-600 px-8 py-3 text-lg text-white transition-all duration-200 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-300 active:bg-secondary-800">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;

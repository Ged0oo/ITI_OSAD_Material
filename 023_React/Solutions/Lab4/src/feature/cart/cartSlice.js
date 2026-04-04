import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",

    initialState: {
        items: [],
    },

    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find((cartItem) => cartItem.product.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ product, quantity: 1 });
            }
        },

        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.product.id !== productId);
        },

        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            if (quantity < 1) {
                state.items = state.items.filter((item) => item.product.id !== productId);
            }
            else {
                const item = state.items.find((item) => item.product.id === productId);
                if (item) {
                    item.quantity = quantity;
                }
            }
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state) => state.cart.items.reduce((sum, item) => {
    const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
    return sum + discountedPrice * item.quantity;
}, 0);

export default cartSlice.reducer;
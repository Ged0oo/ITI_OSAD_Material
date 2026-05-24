import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useLocalStorage } from "@/composables/useLocalStorage";
import { useProductStore } from "@/stores/productStore";

const normalizeCartItem = (item) => ({
    ...item,
    id: item.id ?? item.productId,
    name: item.name ?? item.title ?? "",
    title: item.title ?? item.name ?? "",
    price: Number(item.price ?? 0),
    quantity: Number(item.quantity ?? item.qty ?? 1),
});

export const useCartStore = defineStore("cart", () => {
    const items = useLocalStorage("cart", []);
    const loading = ref(false);
    const error = ref("");
    const productStore = useProductStore();

    items.value = Array.isArray(items.value) ? items.value.map(normalizeCartItem) : [];

    const totalItems = computed(() =>
        items.value.reduce((sum, item) => sum + Number(item.quantity ?? 0), 0),
    );

    const totalPrice = computed(() =>
        items.value.reduce(
            (sum, item) => sum + Number(item.price ?? 0) * Number(item.quantity ?? 0),
            0,
        ),
    );

    const addToCart = async (product) => {
        loading.value = true;
        error.value = "";

        try {
            if (!product || typeof product.id === "undefined") {
                throw new Error("A valid product is required");
            }

            const storeProduct = productStore.getProductById(product.id) ?? normalizeCartItem(product);
            const availableStock = Number(storeProduct.stock ?? 0);

            if (availableStock <= 0) {
                throw new Error("This product is out of stock");
            }

            await productStore.decreaseStock(product.id);

            const existingItem = items.value.find((item) => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                items.value.push({
                    ...normalizeCartItem(product),
                    quantity: 1,
                });
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : String(err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const removeFromCart = (id) => {
        items.value = items.value.filter((item) => item.id !== id);
    };

    const clearCart = () => {
        items.value = [];
    };

    return {
        items,
        loading,
        error,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
    };
});
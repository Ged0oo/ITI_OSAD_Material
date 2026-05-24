import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "@/composables/useApi";

export const useProductStore = defineStore("product", () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "https://fakestoreapi.com";
    // const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
    const { getAll, getOne, update } = useApi(apiBaseUrl);

    const normalizeProduct = (product) => {
        const stock = Number(product.stock ?? product.rating?.count ?? 0);

        return {
            ...product,
            name: product.name ?? product.title ?? "",
            title: product.title ?? product.name ?? "",
            description: product.description ?? "",
            image: product.image ?? "",
            badge: product.badge ?? "",
            discount: Number(product.discount ?? 0),
            price: Number(product.price ?? 0),
            tags: Array.isArray(product.tags) ? product.tags : product.category ? [product.category] : [],
            stock,
            isAvailable: product.isAvailable ?? stock > 0,
        };
    };

    // State
    const products = ref([]);
    const loading = ref(false);
    const error = ref("");
    const featuredProduct = ref(null);
    const relatedProducts = ref([]);

    // Getters

    // Actions
    const getProductById = (id) => {
        const product = products.value.find((p) => p.id === id) || null;
        featuredProduct.value = product;
        return product;
    };

    const getRelatedProducts = (id) => {
        const product = getProductById(id);
        if (!product) {
            relatedProducts.value = [];
            return [];
        }

        const related = products.value.filter((p) => p.id !== id && p.category === product.category);
        relatedProducts.value = related;
        return related;
    };

    const fetchProducts = async () => {
        loading.value = true;
        error.value = "";

        try {
            const response = await getAll("products");
            products.value = Array.isArray(response) ? response.map(normalizeProduct) : [];
            return products.value;
        } catch (err) {
            error.value = err instanceof Error ? err.message : String(err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const decreaseStock = async (productId) => {
        loading.value = true;
        error.value = "";

        try {
            const currentProduct = products.value.find((product) => product.id === productId) ?? await getOne("products", productId);

            if (!currentProduct) {
                throw new Error(`Product with id ${productId} was not found`);
            }

            const normalizedCurrentProduct = normalizeProduct(currentProduct);

            const updatedProduct = {
                ...normalizedCurrentProduct,
                stock: Math.max(Number(normalizedCurrentProduct.stock ?? 0) - 1, 0),
            };

            const savedProduct = await update("products", productId, updatedProduct);
            const nextProduct = normalizeProduct(savedProduct ?? updatedProduct);

            products.value = products.value.map((product) =>
                product.id === productId ? nextProduct : product,
            );

            if (featuredProduct.value?.id === productId) {
                featuredProduct.value = nextProduct;
            }

            relatedProducts.value = relatedProducts.value.map((product) =>
                product.id === productId ? nextProduct : product,
            );

            return nextProduct;
        } catch (err) {
            error.value = err instanceof Error ? err.message : String(err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        products,
        loading,
        error,
        getProductById,
        fetchProducts,
        decreaseStock,
        featuredProduct,
        relatedProducts,
        getRelatedProducts
    };
});
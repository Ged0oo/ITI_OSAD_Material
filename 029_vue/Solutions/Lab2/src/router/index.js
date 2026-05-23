import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/HomeView.vue")
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@/views/AboutView.vue")
    },
    {
        path: "/products/:id(\\d+)",
        name: "ProductDetail",
        component: () => import("@/components/ProductDetailsView.vue"),
        props: (route) => ({ id: Number(route.params.id) })
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: () => import("@/views/NotFoundView.vue")
    }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

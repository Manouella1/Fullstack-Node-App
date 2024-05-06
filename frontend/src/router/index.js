import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Games from "../views/GamesView.vue";
import PostGamesView from "@/views/PostGamesView.vue";
import NewsView from "../views/NewsView.vue";
import ReviewsView from "../views/ReviewsView.vue";
import CartView from "../views/CartView.vue";
import orderView from "@/views/orderView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/games",
      name: "games",
      component: Games,
    },
    {
      path: "/games/suggestions",
      name: "suggestions",
      component: PostGamesView,
    },
    {
      path: "/news",
      name: "news",
      component: NewsView,
    },
    {
      path: "/orders",
      name: "orders",
      component: orderView,
    },
    {
      path: "/reviews",
      name: "reviews",
      component: ReviewsView,
    },
    {
      path: "/carts",
      name: "carts",
      component: CartView,
    },
  ],
});

export default router;

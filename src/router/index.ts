import DetailPage from "@/views/Detail";
import ListPage from "@/views/List/index";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: ListPage,
  },
  {
    path: "/:name",
    name: "Detail",
    component: DetailPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/features/Home.vue";
import Settings from "@/features/Settings.vue";
import Stats from "@/features/Stats/Stats.vue";
import Main from "@/features/Main/Main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
  },
  {
    path: "/stats",
    name: "stats",
    component: Stats
  },
  {
    path: "/main",
    name: "main",
    component: Main
  }
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

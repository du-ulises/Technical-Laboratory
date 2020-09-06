import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import Details from "../views/Details.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/pokemon-detail",
    name: "Details",
    component: Details,
  },
  { path: '/404', name: "Not Found", component: NotFound },  
  { path: '*', redirect: '/404' }, 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const protectedRoutes = ["/home", "/about", "/pokemon-detail"];
  if (protectedRoutes.includes(to.path) && !store.getters.user) next("/");
  else if (to.path === "/" && store.getters.user) next("/home");
  else next();
});

export default router;

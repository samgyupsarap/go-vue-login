import RouterView from "@/views/RouterView.vue";
import HomeView from "@/views/HomeView.vue";
import UserView from "@/views/UserView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { getCookie } from "@/interceptor";
import axios from "axios";

const CallbackResponse = () => import("../views/CallbackResponse.vue");
const LoginView = () => import("../views/LoginView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/callback",
      name: "callback",
      component: CallbackResponse,
    },
    {
      path: "/",
      component: RouterView,
      children: [
        {
          path: "home",
          name: "home",
          component: HomeView,
          meta: { requiresAuth: true }
        },
        {
          path: "user",
          name: "user",
          component: UserView,
          meta: { requiresAuth: true }
        }
      ]
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = getCookie('token');
    if (!token) {
      console.log('No token found, redirecting to login');
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next(); // Always call next() if not protected
  }
});

export default router;

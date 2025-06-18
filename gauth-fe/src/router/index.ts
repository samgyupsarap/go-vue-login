import RouterView from "@/views/RouterView.vue";
import HomeView from "@/views/HomeView.vue";
import UserView from "@/views/UserView.vue";
import { createRouter, createWebHistory } from "vue-router";
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

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      const response = await axios.get('/get_cookie');
      const token = response.data.token;
      
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${String(token)}`;
        next();
      } else {
        next({ name: 'login' });
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;

import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import '@/interceptor'

const app = createApp(App);

app.use(Vue3Toastify, {
  autoClose: 5000,
  position: "top-right",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
});
app.use(router);

app.mount("#app");

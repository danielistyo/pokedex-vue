import { createApp } from "vue";
import App from "./App";
import "@/assets/scss/index.scss";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");

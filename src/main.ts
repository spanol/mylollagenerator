import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from '@/store';
import Flicking from "@egjs/vue3-flicking";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "@egjs/vue3-flicking/dist/flicking.css";
import "@egjs/vue3-flicking/dist/flicking-inline.css";
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App)
app.use(router)
app.use(store, key);
app.component("Flicking", Flicking)
app.mount('#app')
app.use(
  Vue3Toasity,
  {
    autoClose: 3000,
    position: 'top-center',
    role: 'auto',

  } as ToastContainerOptions,
);
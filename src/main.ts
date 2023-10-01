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

const app = createApp(App)
app.use(router)
app.use(store, key);
app.component("Flicking", Flicking)
app.mount('#app')

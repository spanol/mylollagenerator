import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from '@/store';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App)
app.use(router)
app.use(store, key);
app.mount('#app')

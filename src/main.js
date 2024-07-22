import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';

// Import the MotionPlugin from vueuse motion
import { MotionPlugin } from '@vueuse/motion';

import './assets/main.css'

const app = createApp(App)

app.use(createPinia());
app.use(MotionPlugin);
app.mount('#app')
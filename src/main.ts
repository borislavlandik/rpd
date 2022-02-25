import { createApp } from 'vue';
import { VTooltip } from 'floating-vue';

import App from './App.vue';
import router from './router';

import './assets/styles/style.scss';
import 'floating-vue/dist/style.css';

createApp(App)
  .use(router)
  .directive('tooltip', VTooltip)
  .mount('#app');

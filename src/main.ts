import { createApp } from 'vue';
import { createPinia } from 'pinia';
import FloatingVue from 'floating-vue';

import App from './App.vue';
import router from './router';

createApp(App)
  .use(createPinia())
  .use(router)
  .use(FloatingVue, {
    themes: {
      tooltip: {
        $extends: 'tooltip',
        $resetCss: true,
        triggers: ['hover', 'focus'],
        autoHide: true,
      },
    },
  })
  .mount('#app');

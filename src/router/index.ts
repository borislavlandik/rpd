import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { mainRotes } from './main-routes';

const routes: Array<RouteRecordRaw> = mainRotes;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

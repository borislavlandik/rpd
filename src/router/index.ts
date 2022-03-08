import { useGlobalRpdStore } from '@/store/storeCurrentRpd';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { mainRotes } from './main-routes';

const routes: Array<RouteRecordRaw> = mainRotes;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  const store = useGlobalRpdStore();

  if (to.meta.breadcrumbsGlobalStore && store.list.length === 0) {
    store.restoreData();
  }
});

export default router;
